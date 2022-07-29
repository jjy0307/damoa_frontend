//get article list
fetch('http://127.0.0.1:8000/noticeboard/create/')

    .then((response) => response.json())
    .then((result) => {

        const noticeboard_all = document.getElementById("noticeboard_all"); // 전체 부분 // 게시판 이름 부분
    
            for (i = 0; i < result.length; i++) {
                let noticeboard_div = document.createElement('div');
                noticeboard_div.setAttribute('id', 'noticeboard'); 
                noticeboard_div.setAttribute('class', 'right_side');
                noticeboard_div.innerHTML = `
                            <div id="noticeboard_area_inner" class="article_header">
                                <h2 id="noticeboard_title">${result[i]['name']}</h2>
                                <button class="article_write_button">글 작성하기</button>
                            </div>  
                            <table id="noticeboard_list_${result[i]['name']}"> 
                                <tr>
                                    <th>번호</th>
                                    <th>제목</th>
                                    <th>작성자</th>
                                    <th>작성일</th>
                                    <th>조회</th>
                                </tr>`
                noticeboard_all.append(noticeboard_div)    

                const id_number = `${result[i]['name']}`
             
                const noticeboard_list = document.getElementById("noticeboard_list_" + id_number);

                article = result[i]['article_set'].length  
                console.log(result[i])
                if (article == 0){
                        let noticeboard_tr = document.createElement('tr');
                        noticeboard_tr.setAttribute('class', 'article_null');
                        noticeboard_tr.innerHTML = `<h3>작성된 글이 없습니다.</h3>`

                        noticeboard_list.append(noticeboard_tr)

                }else{
                    for (j = 0; j < 5; j++) {
                        let noticeboard_tr = document.createElement('tr');
                        noticeboard_tr.innerHTML = `<th>${result[i]['article_set'][j]['id']}</th>
                                                    <th>${result[i]['article_set'][j]['title']}</th>
                                                    <th>${result[i]['article_set'][j]['user']}</th>
                                                    <th>${result[i]['article_set'][j]['created_date'].slice(5, 10)}</th>
                                                    <th>3</th>`
                        noticeboard_list.append(noticeboard_tr) 
                    } 
                }   
            }
        })     


   