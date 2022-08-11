let backend_server = 'http://3.39.1.228:8000'

// URL 복사 하는 부분
function clip(){

	var url = '';
	var textarea = document.createElement("textarea");
	document.body.appendChild(textarea);
	url = window.document.location.href;
	textarea.value = url;
	textarea.select();
	document.execCommand("copy");
	document.body.removeChild(textarea);
	alert("URL이 복사되었습니다.")
}

// 파일 다운로드 하는 부분
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
      type: mime
    });
  }
  
  function downloadImg(imgSrc) {
    alert('아직 준비중인 기능입니다!');
  }

// payload에서 필요한 정보 불러오기
try {
    // community_num = 3;
    community_num = window.location.href.split('?')[1].split('=')[1];

    let storage = localStorage.getItem('payload');
    const personObj = JSON.parse(storage);
    username = personObj['username'];
    user_id = personObj['user_id'];
} catch (error) {
    console.error(error);
    alert('payload에서 필요한 정보를 불러오는 데에 오류가 발생했습니다!');
}

// 댓글 작성
function new_comment() {
    try {
        let comment_area = document.getElementById('comment_area');

        let comment_form_data = document.getElementById('comment_input_area').value;
        fetch(backend_server + '/article/comment/write/', {
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
                let comment = document.createElement('div');
                comment.setAttribute('class', 'comment_all_show');
                comment.innerHTML = `
                        <div>${json['user_name']}</div>
                        <div>${json['content']}</div>
                        <div>${json['created_date'].slice(5, 10)}</div>
                        `;
                comment_area.append(comment);
            });
    } catch (error) {
        console.error(error);
        alert('댓글을 작성하는 데에 오류가 발생했습니다!');
    }
}

// 한 개의 글 디테일한 부분 가져오기
function article_id(clicked_id) {
    try {
        article_num = clicked_id.split('_', 2)[1];
        let article_show = document.getElementById('article_and_comment_display');
        let article_hide = document.getElementById('right_side_item');
        let hide_display_mod = document.getElementById('article_mod_wrap_area');
        let hide_display_all_article = document.getElementById('noticeboard_all');
        hide_display_all_article.setAttribute('style', 'display:none');
        hide_display_mod.setAttribute('style', 'display:none');
        article_show.setAttribute('style', 'display:flex');
        article_hide.setAttribute('style', 'display:none');

        fetch(backend_server + `/article/${article_num}/write`)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
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
            <div class="article_font_color" >조회${json.count} 댓글${json.comment_count}</div>  
            <span onclick="clip(); return false;">URL 주소복사</span>
            <!-- 파일 다운로드 구현 -->
        </div>
        <div id="article_content_area">${json.content}</div>
            <div>
            <button onclick="downloadImg()";>파일 다운로드</button>
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

                let quillEditor = new Quill(
                    '#article_content_area',
                    {
                        readOnly: true,
                        theme:'snow',
                        "modules": {
                            "toolbar": false
                        }
                    }
                );

                if (user_id == json.user) {
                    let article_head = document.getElementById('article_head');
                    article_head.innerHTML = `
                <h2 id="noticeboard_name_area">${json.noticeboard_name}</h2>
                <button id="mod_article_num_${json.id}" class="article_write_button" onclick="edit_article(this.id)">글 수정하기</button>`;
                }
                //get comment
                return fetch(backend_server + '/article/comment/write/');

                
            })
            .then((response) => response.json())
            .then((json) => {
                let comment_area = document.getElementById('comment_area');

                for (i = 0; i < json.length; i++) {
                    let current_article = json[i]['article'];
                    if (current_article == `${article_num}`) {
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
    } catch (error) {
        console.error(error);
        alert('한 개의 글 디테일한 부분 가져오기에서 오류가 발생했습니다!');
    }
}

// 게시판 만들기
function new_noticeboard() {
    try {
        let noticeboard_form_data = document.getElementById('modal_input_text').value;

        fetch(backend_server + '/noticeboard/create/', {
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
                alert(noticeboard_form_data + ' 이 생성되었습니다.');
                location.reload();
            });
    } catch (error) {
        console.error(error);
        alert('게시판 만들기에서 오류가 발생했습니다!');
    }
}