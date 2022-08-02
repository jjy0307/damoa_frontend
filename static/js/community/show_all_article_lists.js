//get article list
fetch('http://127.0.0.1:8000/noticeboard/create/')
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
        let noticeboard_all = document.getElementById('noticeboard_all'); // 전체 부분 // 게시판 이름 부분

        for (i = 0; i < json.length; i++) {
            let noticeboard_div = document.createElement('div');
            noticeboard_div.setAttribute('id', 'noticeboard');
            noticeboard_div.setAttribute('class', 'right_side');
            noticeboard_div.innerHTML = `
                            <div id="noticeboard_area_inner" class="article_header">
                                <h2 id="noticeboard_title">${json[i]['name']}</h2>
                            </div>  
                            <table id="noticeboard_list_${json[i]['name']}"> 
                                <tr>
                                    <th>번호</th>
                                    <th>제목</th>
                                    <th>작성자</th>
                                    <th>작성일</th>
                                    <th>조회</th>
                                </tr>`;
            noticeboard_all.append(noticeboard_div);

            let id_number = `${json[i]['name']}`;

            let noticeboard_list = document.getElementById('noticeboard_list_' + id_number);

            let article = json[i]['article_set'].length;
            // console.log(json[i]);
            if (article == 0) {
                let noticeboard_tr = document.createElement('tr');
                noticeboard_tr.setAttribute('class', 'article_null');
                noticeboard_tr.innerHTML = `<h3>작성된 글이 없습니다.</h3>`;

                noticeboard_list.append(noticeboard_tr);
            } else {
                for (j = 0; j < 5; j++) {
                    let noticeboard_tr = document.createElement('tr');
                    noticeboard_tr.innerHTML = `<td>${json[i]['article_set'][j]['id']}</td>
                                                    <td>${json[i]['article_set'][j]['title']}</td>
                                                    <td>${json[i]['article_set'][j]['user']}</td>
                                                    <td>${json[i]['article_set'][j]['created_date'].slice(5, 10)}</td>
                                                    <td>3</td>`;
                    noticeboard_list.append(noticeboard_tr);
                }
            }
        }
    });
