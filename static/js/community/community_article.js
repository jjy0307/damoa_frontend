let backend_server = 'http://3.39.1.228:8000'

async function load_individual_noticeboard(clicked_id) {
    let noticeboard_real_id = clicked_id.split('_', 4)[2];
    let noticeboard_real_name = clicked_id.split('_', 4)[3];
    fetch(backend_server + `/noticeboard/view/${noticeboard_real_id}`)
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            let hide_display = document.getElementById('article_and_comment_display');
            let hide_display_mod = document.getElementById('article_mod_wrap_area');
            let hide_display_all_article = document.getElementById('noticeboard_all');
            hide_display.setAttribute('style', 'display:none');
            hide_display_mod.setAttribute('style', 'display:none');
            hide_display_all_article.setAttribute('style', 'display:none');
            let show_display = document.getElementById('right_side_item');
            show_display.setAttribute('style', 'display:flex');
            let table = document.getElementById('article_list_table');
            let h2 = document.getElementById('noticeboard_name_area_in_show_article_list');
            h2.innerHTML = noticeboard_real_name;

            let article_button = document.getElementById('article_write_button_area');
            article_button.innerHTML = `<button id="write_article_id_${noticeboard_real_id}_${noticeboard_real_name}" class="article_write_button" onclick="write_article(this.id)">글 작성하기</button>`;
            table.innerHTML = `<tr id = "article_list_tr" class="show_article_list">
                                    <th>번호</th>
                                    <th>제목</th>
                                    <th>작성자</th> 
                                    <th>작성일</th>
                                    <th>조회</th>
                                </tr>
                                `;
            const article_objects = json[0]['article_set'];
            for (i = 0; i < article_objects.length; i++) {
                let create_article_list = document.createElement('tr');
                create_article_list.innerHTML = `<td>${i + 1}</td>
                                            <td id="click_${article_objects[i]['id']}" onclick="article_id(this.id);">${article_objects[i]['title']}</td>
                                            <td>${article_objects[i]['user_name']}</td>
                                            <td>${article_objects[i]['created_date'].slice(5, 10)}</td>
                                            <td>조회수</td>`;
                table.append(create_article_list);
            }
        });
}