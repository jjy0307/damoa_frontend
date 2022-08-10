// 글 수정 페이지로 이동 및 불러오기
function edit_article(clicked_id) {
    try {
        console.log(clicked_id);
        article_num = clicked_id.split('_', 4)[3];
        fetch(`http://127.0.0.1:8000/article/${article_num}/write`)
            .then((response) => response.json())
            .then((json) => {
                let hide_display = document.getElementById('article_and_comment_display');
                hide_display.setAttribute('style', 'display:none');
                let show_display = document.getElementById('article_mod_wrap_area');
                show_display.setAttribute('style', 'display:flex');
                let hide_display_all_article = document.getElementById('noticeboard_all');
                hide_display_all_article.setAttribute('style', 'display:none');

                let article_mod_area = document.getElementById('article_mod_area');
                article_mod_area.innerHTML = `
                <div class="article_header">
                    <h2>${json.noticeboard_name}</h2>
                    <button id="article_mod_fin_${json.id}" class="article_write_button" onclick="edit_article_post(this.id)">수정 완료</button>
                </div>
                <hr />
                <div class="article_mod_writearea">
                    <input id = "edit_article_title" class = "article_input_title" placeholder="수정할 내용을 입력해 주세요." value="${json.title}"></input>
                    <div class = "article_input_date">${json.created_date.slice(5, 10)}</div>
                </div>
                <hr />
                <div class="article_mod_content">
                    <div id = "edit_article_content">${json.content}</div>
                </div>   
                <div class ="article_mod_image_wrap_area">
                    <div id="article_mod_image_area" class="article_wrapimage"></div>
                    <form>
                        <input id="edit_article_images" type="file" accept="image/*" multiple />
                    </form>
                </div>
                <hr />
                <div class="article_mod_file_area">
                    <div> 파일 이름 : ${0}</div>
                        <a href=" ${0}" download>
                            파일 미리보기
                        </a>
                    <form>
                        <input id="edit_article_file" type="file" />
                    </form>
                </div>`;
            let toolbarOptions = [
                // [{font: ['Sans Serif', 'Serif', 'Monospace']}]
                [{header : [1, 2, false]}],
                [{ size: [ 'small', false, 'large', 'huge' ]}],
                ['bold', 'italic', 'underline', 'strike'],
                ['color', 'background'],
                ['script'],
                ['blockquote', 'code-block'],
                ['list', 'indent', 'align', 'direction'],
                ['link', 'image', 'video', 'formula']
            ];
            let quillEditor = new Quill(
                '#edit_article_content',
                {
                    modules: {
                        toolbar: toolbarOptions
                    },
                    theme:'snow'
                }
            );
        })

            
    } catch (error) {
        console.error(error);
        alert('글 수정 페이지를 불러오는 중 에러가 발생했습니다!');
    }
}
