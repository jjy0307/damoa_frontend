// 글 수정 페이지로 이동
function edit_article(clicked_id) {
    article_num = clicked_id.split('_', 4)[3];
    // console.log(article_num);
    fetch(`http://127.0.0.1:8000/article/${article_num}/write`)
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            let hide_display = document.getElementById('article_and_comment_display');
            hide_display.setAttribute('style', 'display:none');
            let show_display = document.getElementById('article_mod_wrap_area');
            show_display.setAttribute('style', 'display:flex');

            let article_mod_area = document.getElementById('article_mod_area');
            article_mod_area.innerHTML = `<div class="article_header">
            <h2>${json.noticeboard_name}</h2>
            <button class="article_write_button">수정 완료</button>
        </div>
        <hr />
        <div class="article_mod_writearea">
            <input class = "article_input_title" placeholder="수정할 내용을 입력해 주세요." value="${json.title}"></input>
            <div class = "article_input_date">${json.created_date.slice(5, 10)}</div>
        </div>
        <hr />
        <div class="article_mod_content">
            <input class = "article_input_content" placeholder="수정할 내용을 입력해 주세요." value="${json.content}"></input>
        </div>   
        <div class ="article_mod_image_wrap_area">
            <div id="article_mod_image_area" class="article_wrapimage"></div>
            <form>
                <input type="file" accept="image/*" multiple />
            </form>
        </div>
        <hr />
        <div class="article_mod_file_area">
            <div> 파일 이름 : ${json.file.slice(62, 76)}</div>
                <a href=" ${json.file}" download>
                    파일 미리보기
                </a>
            <form>
                <input type="file" />
            </form>
        </div>
        `;
            return fetch(`http://127.0.0.1:8000/article/images/`);
        }) // 이미지 보여주기
        .then((response) => response.json())
        .then((json) => {
            let image_area = document.getElementById('article_mod_image_area');
            for (i = 0; i < json.length; i++) {
                if (article_num == json[i]['article_id']) {
                    let make_image = document.createElement('div');
                    make_image.innerHTML = `<img src= ${json[i]['image_url']} class=article_show_image></img>`;
                    image_area.appendChild(make_image);
                }
            }
        });
}
