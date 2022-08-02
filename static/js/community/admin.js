function admin_articles() {
    try {
        fetch('http://127.0.0.1:8000/article/admin/')
            .then((response) => response.json())
            .then((json) => {
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
                                                <td id="article_click_${json[i]['id']}" onclick="article_id(this.id)">${json[i]['title']}</td>
                                                <td id="article_click_2_${json[i]['id']}" style="display:none;">${json[i]['content']}</td>
                                                <td>${json[i]['user_name']}</td>
                                                <td>${json[i]['created_date'].slice(5, 10)}</td>
                                                <button id="article_delete_${json[i]['id']}" onclick="article_yes_delete(this)">yes</button>
                                                <button id="article_no_delete_${json[i]['id']}"onclick="article_no_delete(this)">no</button>`;

                    table.append(create_article_list);
                }
            });
    } catch (error) {
        console.error(error);
        alert('게시글을 불러오는 중 오류가 발생했습니다!');
    }
}
function admin_comments() {
    try {
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
                                                <td id="comment_click_${json[i]['id']}" onclick="article_id(this.id);">${json[i]['content']}</td>
                                                <td id="comment_click_2_${json[i]['id']}" style="display:none;">${json[i]['article']}</td>
                                                <td>${json[i]['user_name']}</td>
                                                <td>${json[i]['created_date'].slice(5, 10)}</td>
                                                <button id="comment_delete_${json[i]['id']}" onclick="comment_yes_delete(this)">yes</button>
                                                <button id="comment_no_delete_${json[i]['id']}"onclick="comment_no_delete(this)">no</button>`;
                    table.append(create_article_list);
                }
            });
    } catch (error) {
        console.error(error);
        alert('댓글을 불러오는 중 오류가 발생했습니다!');
    }
}
function article_yes_delete(delete_id) {
    try {
        select_one = delete_id.id.split('_', 3)[2];
        fetch(`http://127.0.0.1:8000/article/${select_one}/write/delete/`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access'),
            },
        })
            .then((response) => response.json())
            .then((json) => {
                alert('게시글이 삭제되었습니다!');
            });
    } catch (error) {
        console.error(error);
        alert('게시글 삭제 중 오류가 발생했습니다!');
    }
}
function article_no_delete(delete_id) {
    try {
        select_one = delete_id.id.split('_', 4)[3];
        let title_display = document.getElementById(`article_click_${select_one}`).innerHTML;
        let content_display = document.getElementById(`article_click_2_${select_one}`).innerHTML;

        fetch(`http://127.0.0.1:8000/article/${select_one}/write/put/`, {
            method: 'PUT',
            body: JSON.stringify({
                title: title_display,
                content: content_display,
                is_valid: false,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: 'Bearer ' + localStorage.getItem('access'),
            },
        })
            .then((response) => response.json())
            .then((json) => {
                alert('게시글이 보류되었습니다!');
            });
    } catch (error) {
        console.error(error);
        alert('게시글 보류 중 오류가 발생했습니다!');
    }
}
function comment_yes_delete(delete_id) {
    try {
        select_one = delete_id.id.split('_', 3)[2];

        fetch(`http://127.0.0.1:8000/article/comment/${select_one}/write/delete/`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access'),
            },
        })
            .then((response) => response.json())
            .then((json) => {
                alert('댓글이 삭제되었습니다!');
            });
    } catch (error) {
        console.error(error);
        alert('댓글 삭제 중 오류가 발생했습니다!');
    }
}
//http://127.0.0.1:8000/article/comment/7/write/put/
function comment_no_delete(delete_id) {
    try {
        select_one = delete_id.id.split('_', 4)[3];
        let content_display = document.getElementById(`comment_click_${select_one}`).innerHTML;
        let article_display = document.getElementById(`comment_click_2_${select_one}`).innerHTML;

        fetch(`http://127.0.0.1:8000/article/comment/${select_one}/write/put/`, {
            method: 'PUT',
            body: JSON.stringify({
                article: article_display,
                content: content_display,
                is_valid: false,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: 'Bearer ' + localStorage.getItem('access'),
            },
        })
            .then((response) => response.json())
            .then((json) => {
                alert('댓글이 보류되었습니다!');
            });
    } catch (error) {
        console.error(error);
        alert('댓글 보류 중 오류가 발생했습니다!');
    }
}
