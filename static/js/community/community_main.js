let backend_server = 'http://3.39.1.228:8000'

async function community_mainpage() {
    const community_num = window.location.href.split('?')[1].split('=')[1]
    fetch(backend_server + `/noticeboard/create/${community_num}/`)
        .then((response) => response.json())
        .then((json) => {
            // 옆 사이드 바
            let tag_area = document.getElementById('left_nav_bar_noticeboard_name');
            let noticeboard = [];
            for (i = 0; i < json.length; i++) {
                noticeboard.push(json[i]['name']);
            }
            for (i = 0; i < noticeboard.length; i++) {
                let make_noticeboard = document.createElement('button');
                make_noticeboard.setAttribute('id', `noticeboard_name_${json[i]['id']}_${json[i]['name']}`);
                make_noticeboard.setAttribute('class', 'community_noticeboard_button');
                make_noticeboard.setAttribute('onclick', `load_individual_noticeboard(this.id)`);
                make_noticeboard.innerHTML = noticeboard[i];
                tag_area.appendChild(make_noticeboard);
            }

            // 게시글 전체 불러오기
            let noticeboard_all = document.getElementById('noticeboard_all');

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
                if (article == 0) {
                    let noticeboard_tr = document.createElement('tr');
                    noticeboard_tr.setAttribute('class', 'article_null');
                    noticeboard_tr.innerHTML = `<h3>작성된 글이 없습니다.</h3>`;

                    noticeboard_list.append(noticeboard_tr);
                } else {
                    if (json[i]['article_set'].length < 5) {
                        len = json[i]['article_set'].length;
                    } else {
                        len = 5;
                    }
                    for (j = 0; j < len; j++) {
                        let noticeboard_tr = document.createElement('tr');
                        noticeboard_tr.innerHTML = `
                                                    <td>${json[i]['article_set'][j]['id']}</td>
                                                    <td id='click_${json[i]['article_set'][j]['id']}' onclick="article_id(this.id)">${json[i]['article_set'][j]['title']}</td>
                                                    <td>${json[i]['article_set'][j]['user']}</td>
                                                    <td>${json[i]['article_set'][j]['created_date'].slice(5, 10)}</td>
                                                    <td>3</td>
                                                    `;
                        noticeboard_list.append(noticeboard_tr);
                    }
                }
            }
        })
};
community_mainpage();
