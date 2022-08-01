let community_num = 1;

// 특정 게시판 클릭시 해당 게시판의 id 값 중 숫자만 불러오게 함
function noticeboard_name(clicked_id) {
    let noticeboard_real_id = clicked_id.split('_', 3)[2];
    // console.log(noticeboard_real_id);

    fetch(`http://127.0.0.1:8000/noticeboard/create/${noticeboard_real_id}`)
        .then((response) => response.json())
        .then((json) => {
            // console.log(json);
            let hide_display = document.getElementById('article_and_comment_display');
            hide_display.setAttribute('style', 'display:none');
            let show_display = document.getElementById('right_side_item');
            show_display.setAttribute('style', 'display:flex');
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

function article_id(clicked_id) {
    article_num = clicked_id.split('_', 2)[1];
    let article_show = document.getElementById('article_and_comment_display');
    let article_hide = document.getElementById('right_side_item');
    article_show.setAttribute('style', 'display:flex');
    article_hide.setAttribute('style', 'display:none');

    /* 댓글 작성하는 부분 */
    function new_comment() {
        let comment_form_data = document.getElementById('comment_input_area').value;
        fetch('http://127.0.0.1:8000/article/comment/write/', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access'),
                'content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                user: user_id,
                article: article_num,
                content: comment_form_data,
            }),
        })
            .then((response) => response.json())
            .then((json) => {
                alert('댓글을 작성했습니다.');
                window.location.reload();
            });
    }

    /* 글의 디테일한 부분, 댓글 목록 가져오는 부분 */
    fetch(`http://127.0.0.1:8000/article/${article_num}/write`)
        .then((response) => response.json())
        .then((json) => {
            // console.log(json);

            let article_title = json.title;
            let currrent_noticeboard = json.noticeboard_name;
            let article_date = json.created_date.slice(2, 10);
            let article_author = json.user_name;
            let article_content = json.content;

            // 데이터 보여줄 영역 지정
            let title_area = document.getElementById('article_title_area');
            let date_area = document.getElementById('article_date_area');
            let author_area = document.getElementById('article_author_area');
            let content_area = document.getElementById('article_content_area');
            let currrent_noticeboard_area = document.getElementById('noticeboard_name_area');

            // 게시판 데이터
            currrent_noticeboard_area.innerHTML = currrent_noticeboard;

            // 제목 데이터
            let make_title = document.createElement('div');
            make_title.setAttribute('id', 'article_title');
            title_area.innerHTML = article_title;

            // 날짜 데이터
            let make_date = document.createElement('div');
            make_date.setAttribute('id', 'article_date');
            date_area.innerHTML = article_date;

            // 작성자 데이터
            let make_author = document.createElement('div');
            make_author.setAttribute('id', 'article_author');
            author_area.innerHTML = article_author;

            // 내용 데이터
            let make_content = document.createElement('div');
            make_content.setAttribute('id', 'article_content');
            content_area.innerHTML = article_content;

            //get comment
            return fetch('http://127.0.0.1:8000/article/comment/write/');
        })
        .then((response) => response.json())
        .then((json) => {
            // console.log(json);
            let comment_area = document.getElementById('comment_area');

            for (i = 0; i < json.length; i++) {
                // console.log(json[i]['article']);
                let current_article = json[i]['article'];
                if (current_article == `${article_num}`) {
                    // console.log(article_num);
                    let make_comment = document.createElement('div');
                    make_comment.setAttribute('class', 'comment_all_show');
                    make_comment.innerHTML = `
                        <div>${json[i]['user_name']}</div>
                        <div>${json[i]['content']}</div>
                        <div>${json[i]['created_date'].slice(5, 10)}</div>
                        `;
                    comment_area.appendChild(make_comment);
                }
            }
        });

    // 댓글에 현재 로그인된 사용자 이름 띄우기
    let currnet_user_area = document.getElementById('current_user_name');
    currnet_user_area.innerHTML = username;

    // 이미지 보여주기
    fetch(`http://127.0.0.1:8000/article/images/`)
        .then((response) => response.json())
        .then((json) => {
            let image_area = document.getElementById('article_image_area');
            for (i = 0; i < json.length; i++) {
                if (article_num == json[i]['article_id']) {
                    let make_image = document.createElement('div');
                    make_image.innerHTML = `<img src= ${json[i]['image_url']} class=article_show_image></img>`;
                    image_area.appendChild(make_image);
                }
            }
        });
}

// get noticeboard
fetch('http://127.0.0.1:8000/noticeboard/create/')
    .then((response) => response.json())
    .then((json) => {
        let noticeboard = [];
        for (i = 0; i < json.length; i++) {
            noticeboard.push(json[i]['name']);
        }

        let tag_area = document.getElementById('noticeboard_name');

        for (i = 0; i < noticeboard.length; i++) {
            let make_noticeboard = document.createElement('button');
            make_noticeboard.setAttribute('id', `noticeboard_name_${json[i]['id']}`);
            make_noticeboard.setAttribute('onclick', `noticeboard_name(this.id)`);
            make_noticeboard.innerHTML = noticeboard[i];
            tag_area.appendChild(make_noticeboard);
        }
    });

// post noticeboard
function new_noticeboard() {
    let noticeboard_form_data = document.getElementById('modal_input_text').value;

    fetch('http://127.0.0.1:8000/noticeboard/create/', {
        method: 'POST',
        body: JSON.stringify({
            community: community_num,
            name: noticeboard_form_data,
        }),
        headers: {
            'content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            // console.log(json);
            alert(noticeboard_form_data + ' 이 생성되었습니다.');
            location.reload();
        });
}
