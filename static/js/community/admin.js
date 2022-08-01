function admin_articles() {
    // let admin_article = document.getElementById('report_articles');
    fetch('http://127.0.0.1:8000/article/admin/')
        .then((response) => response.json())
        .then((json) => {
            // console.log(json);
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
            <th>삭제여부</th>
        </tr>
        `;
            for (i = 0; i < json.length; i++) {
                let create_article_list = document.createElement('tr');
                create_article_list.innerHTML = `<td>${i + 1}</td>
                                                <td id="click_${json[i]['id']}" onclick="article_id(this.id)">${json[i]['title']}</td>
                                                <td>${json[i]['user_name']}</td>
                                                <td>${json[i]['created_date'].slice(5, 10)}</td>
                                                <button id="article_delete_${json[i]['id']}" onclick="article_yes_delete(this)">yes</button>
                                                <button id="article_no_delete_${json[i]['id']}"onclick="article_no_delete(this)">no</button>`;

                table.append(create_article_list);
            }
        });
}
function admin_comments() {
    fetch('http://127.0.0.1:8000/article/comment/admin/')
        .then((response) => response.json())
        .then((json) => {
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
            <th>삭제여부</th>
        </tr>
        `;
            for (i = 0; i < json.length; i++) {
                let create_article_list = document.createElement('tr');
                create_article_list.innerHTML = `<td>${i + 1}</td>
                                                <td id="click_${json[i]['id']}" onclick="article_id(this.id);">${json[i]['content']}</td>
                                                <td>${json[i]['user_name']}</td>
                                                <td>${json[i]['created_date'].slice(5, 10)}</td>
                                                <button id="comment_delete_${json[i]['id']}" onclick="comment_yes_delete(this)">yes</button>
                                                <button id="comment_no_delete_${json[i]['id']}"onclick="comment_no_delete(this)">no</button>`;
                table.append(create_article_list);
            }
        });
}
//http://127.0.0.1:8000/article/1/write/delete/
function article_yes_delete(delete_id) {
    select_one = delete_id.id.split('_', 3)[2];
    alert('게시글이 삭제되었습니다!');
    fetch(`http://127.0.0.1:8000/article/${select_one}/write/delete/`, {
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access'),
        },
    });
}
//http://127.0.0.1:8000/article/1/write/put/
function article_no_delete(delete_id) {
    select_one = delete_id.id.split('_', 4)[3];
    alert('게시글이 보류되었습니다!');
    fetch(`http://127.0.0.1:8000/article/${select_one}/write/`)
        .then((response) => response.json())
        .then((json) => {
            return fetch(`http://127.0.0.1:8000/article/${select_one}/write/put/`, {
                method: 'PUT',
                body: JSON.stringify({
                    title: json.title,
                    content: json.content,
                    is_valid: false,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    Authorization: 'Bearer ' + localStorage.getItem('access'),
                },
            });
        })
        .then((response) => response.json())
        .then((json) => console.log(json));
}
//http://127.0.0.1:8000/article/comment/7/write/delete/
function comment_yes_delete(delete_id) {
    select_one = delete_id.id.split('_', 3)[2];
    alert('게시글이 삭제되었습니다!');
    fetch(`http://127.0.0.1:8000/article/comment/${select_one}/write/delete/`, {
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access'),
        },
    });
}
//http://127.0.0.1:8000/article/comment/7/write/put/
function comment_no_delete(delete_id) {
    select_one = delete_id.id.split('_', 4)[3];
    alert('게시글이 보류되었습니다!');
    fetch(`http://127.0.0.1:8000/article/comment/${select_one}/write/`)
        .then((response) => response.json())
        .then((json) => {
            return fetch(`http://127.0.0.1:8000/article/comment/${select_one}/write/put/`, {
                method: 'PUT',
                body: JSON.stringify({
                    article: json.article,
                    content: json.content,
                    is_valid: false,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    Authorization: 'Bearer ' + localStorage.getItem('access'),
                },
            });
        })
        .then((response) => response.json())
        .then((json) => console.log(json));
}
