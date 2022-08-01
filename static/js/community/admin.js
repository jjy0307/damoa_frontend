function admin_articles() {
    // let admin_article = document.getElementById('report_articles');
    fetch('http://127.0.0.1:8000/article/admin/')
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            let hide_display = document.getElementById('article_and_comment_display');
            hide_display.setAttribute('style', 'display:none');
            let show_display = document.getElementById('right_side_item');
            show_display.setAttribute('style', 'display:flex');

            let h2 = document.getElementById('noticeboard_name_area_in_show_article_list');
            h2.innerHTML = '신고된 게시물';

            let table = document.getElementById('article_list_table');
            table.innerHTML = `<tr id = "article_list_tr" class="show_article_list">
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th> 
            <th>작성일</th>
            <th>조회</th>
        </tr>
        `;
            for (i = 0; i < json.length; i++) {
                let create_article_list = document.createElement('tr');
                create_article_list.innerHTML = `<td>${i + 1}</td>
                                                <td id="click_${json[i]['id']}" onclick="article_id(this.id)">${json[i]['title']}</td>
                                                <td>${json[i]['user_name']}</td>
                                                <td>${json[i]['created_date'].slice(5, 10)}</td>
                                                <td>조회수</td>`;
                table.append(create_article_list);
            }
        });
}
function admin_comments() {
    // let admin_article = document.getElementById('report_articles');
    fetch('http://127.0.0.1:8000/article/comment/admin/')
        .then((response) => response.json())
        .then((json) => {
            console.log(json);

            let hide_display = document.getElementById('article_and_comment_display');
            hide_display.setAttribute('style', 'display:none');
            let show_display = document.getElementById('right_side_item');
            show_display.setAttribute('style', 'display:flex');

            let h2 = document.getElementById('noticeboard_name_area_in_show_article_list');
            h2.innerHTML = '신고된 댓글';

            let table = document.getElementById('article_list_table');
            table.innerHTML = `<tr id = "article_list_tr" class="show_article_list">
            <th>번호</th>
            <th>댓글내용</th>
            <th>작성자</th> 
            <th>작성일</th>
            <th>조회</th>
        </tr>
        `;
            for (i = 0; i < json.length; i++) {
                let create_article_list = document.createElement('tr');
                create_article_list.innerHTML = `<td>${i + 1}</td>
                                                <td id="click_${json[i]['id']}" onclick="article_id(this.id);">${json[i]['content']}</td>
                                                <td>${json[i]['user_name']}</td>
                                                <td>${json[i]['created_date'].slice(5, 10)}</td>
                                                <td>조회수</td>`;
                table.append(create_article_list);
            }
        });
}
