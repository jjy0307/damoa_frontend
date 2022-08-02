let community_num = 1;

/* storage에서 payload 값 모두 가져오는 부분 */
let storage = localStorage.getItem('payload');
// JSON 문자열을 객체, 배열로 변환
const personObj = JSON.parse(storage);
username = personObj['username'];
user_id = personObj['user_id'];

// 특정 게시판 클릭시 해당 게시판의 id 값 중 숫자만 불러오게 함
function noticeboard_name(clicked_id) {
    let noticeboard_real_id = clicked_id.split('_', 4)[2];
    let noticeboard_real_name = clicked_id.split('_', 4)[3];

    fetch(`http://127.0.0.1:8000/noticeboard/create/${noticeboard_real_id}`)
        .then((response) => response.json())
        .then((json) => {
            // console.log(json);
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
            for (i = 0; i < json.length; i++) {
                let create_article_list = document.createElement('tr');
                create_article_list.innerHTML = `<td>${i + 1}</td>
                                                <td id="click_${json[i]['id']}" onclick="article_id(this.id);">${json[i]['title']}</td>
                                                <td>${json[i]['user_name']}</td>
                                                <td>${json[i]['created_date'].slice(5, 10)}</td>
                                                <td>조회수</td>`;
                table.append(create_article_list);
            }
        });
}

/* 댓글 작성하는 부분 */
function new_comment() {
    let comment_area = document.getElementById('comment_area');

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
            // console.log(json);
            alert('댓글을 작성했습니다.');
            let comment = document.createElement('div');
            // console.log(article_num);
            comment.setAttribute('class', 'comment_all_show');
            comment.innerHTML = `
                        <div>${json['user_name']}</div>
                        <div>${json['content']}</div>
                        <div>${json['created_date'].slice(5, 10)}</div>
                        `;
            comment_area.append(comment);
            // window.location.reload();     // 수정 할 부분 append로 바꿔서 보여주기
        });
}

function article_id(clicked_id) {
    article_num = clicked_id.split('_', 2)[1];
    let article_show = document.getElementById('article_and_comment_display');
    let article_hide = document.getElementById('right_side_item');
    let hide_display_mod = document.getElementById('article_mod_wrap_area');
    let hide_display_all_article = document.getElementById('noticeboard_all');
    hide_display_all_article.setAttribute('style', 'display:none');
    hide_display_mod.setAttribute('style', 'display:none');
    article_show.setAttribute('style', 'display:flex');
    article_hide.setAttribute('style', 'display:none');

    /* 글의 디테일한 부분, 댓글 목록 가져오는 부분 */
    fetch(`http://127.0.0.1:8000/article/${article_num}/write`)
        .then((response) => response.json())
        .then((json) => {
            // console.log(json);
            let article_detail = document.getElementById('article_and_comment_display');
            article_detail.innerHTML = `
        <div id = "article_head" class="article_header">
            <h2 id="noticeboard_name_area">${json.noticeboard_name}</h2>
        </div>
        <hr />
        <!-- post 시 id 설정 -->
        <div class="article_writearea">
            <div id="article_title_area" class="article_writearea_child">${json.title}</div>
            <div id="article_date_area" class="article_writearea_child_right">${json.created_date.slice(2, 10)}</div>
        </div>
        <hr />
        <div id="article_author_area" class="article_writearea">
            <div>${json.user_name}</div>
            <div class="article_font_color">조회1 댓글1 url 복사</div>   
            <!-- 파일 다운로드 구현 -->
        </div>
        <div id="article_content_area" class="article_writearea article_font_color">${json.content}</div>
            <div>
            <p>파일이 존재합니다 : ${json.file.slice(62, 76)}...</p>
            <a href=" ${json.file}" download>
                파일 다운로드하기
            </a>
            </div>
            <div id="article_image_area" class="article_wrapimage"><!-- 이미지가 들어가는 곳입니다. --></div>
                <h2>댓글</h2>
                <hr />
                <!-- comment get -->
                <div>
                    <div id="comment_area"></div>
                    <!-- comment post -->
                    <div class="comment_write">
                        <div id="current_user_name" class="comment_nickname">${username}</div>
                        <input id="comment_input_area" class="comment_writearea" type="text" name="comment" placeholder="댓글이 작성되는 곳입니다." />
                        <input class="comment_submit" type="submit" value="작성" onclick="new_comment()" />
                    </div>
                </div>    
            </div>`;

            if (user_id == json.user) {
                let article_head = document.getElementById('article_head');
                article_head.innerHTML = `
                <h2 id="noticeboard_name_area">${json.noticeboard_name}</h2>
                <button id="mod_article_num_${json.id}" class="article_write_button" onclick="edit_article(this.id)">글 수정하기</button>`;
            }
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
                    let make_comment = document.createElement('div');
                    // console.log(article_num);
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
            make_noticeboard.setAttribute('id', `noticeboard_name_${json[i]['id']}_${json[i]['name']}`);
            make_noticeboard.setAttribute('class', 'community_noticeboard_button');
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
