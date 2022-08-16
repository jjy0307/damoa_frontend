// let backend_server = 'http://127.0.0.1:8000'
// 글 수정 페이지로 이동 및 불러오기
async function edit_article(clicked_id) {
    try {
        article_num = clicked_id.split('_', 4)[3];
        await fetch(`http://127.0.0.1:8000/article/${article_num}/write`)
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
                    <h2>${json.noticeboard_name} 게시판</h2>
                    <button id="article_mod_fin_${json.id}_${json.noticeboard_id}" class="article_write_button" onclick="edit_article_post(this.id)">수정 완료</button>
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
                <hr />
                <div class="article_mod_file_area">
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


async function edit_article_post(clicked_id) {
    try {
        const article_num = clicked_id.split("article_mod_fin_")[1].split("_")[0];
        const noticeboard_num = clicked_id.split("article_mod_fin_")[1].split("_")[1];
        const title = document.getElementById('edit_article_title').value;
        const content = document.getElementById('edit_article_content').getElementsByClassName('ql-editor')[0].innerHTML;
        const file = document.getElementById('edit_article_file').files[0];
        const formdata = new FormData();
        formdata.append('article', article_num);
        formdata.append('noticeboard', noticeboard_num)
        formdata.append('title', title);
        formdata.append('content', content);
        formdata.append('file', file);
        formdata.append('user_id', localStorage.getItem('payload'));
        await fetch('http://127.0.0.1:8000/article/write/', {
            method: 'PUT',
            body: formdata,
        })
        .then((response) => response.json())
        .then((result) => {
            if (result.message==='contents_error'){
                alert('제목과 내용은 필수 항목입니다.')
            } 
            if (result.message==='upload_error'){
                alert('업로드 중 문제가 생겼습니다. 추후에 재시도 해보세요.')
            }
            if (result.message==='success'){
                alert('작성 완료!');
                window.location.reload();
            }
        });
    
    
    } catch (error) {
        console.error(error);
        alert('게시글을 post하는 중 오류 발생!');
    }
}
