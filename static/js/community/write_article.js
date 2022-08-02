function write_article(clicked_id) {
    let write_article_num = clicked_id.split('_', 5)[3];
    let write_article_name = clicked_id.split('_', 5)[4];
    console.log(write_article_num, write_article_name);
    let hide_display = document.getElementById('article_and_comment_display');
    hide_display.setAttribute('style', 'display:none');
    let hide_display_article = document.getElementById('right_side_item');
    hide_display_article.setAttribute('style', 'display:none');
    let show_display = document.getElementById('article_mod_wrap_area');
    show_display.setAttribute('style', 'display:flex');
    let hide_display_all_article = document.getElementById('noticeboard_all');
    hide_display_all_article.setAttribute('style', 'display:none');

    let article_mod_area = document.getElementById('article_mod_area');
    article_mod_area.innerHTML = `<div class="article_header">
    <h2 id="noticeboard">${write_article_name}</h2>
    <button type="button" onclick="postArticle()" class="article_write_button">작성</button>
    </div>
    <hr />    
    <div class="article_writearea">
    <input class="article_title" type="text" name="title" id="article_title" placeholder="제목을 입력해 주세요."></input>
    </div>
    <hr />
    <div class="text">
    <div>
        <textarea rows="38" cols="178" class="article_content" type="text" name="content" id="article_content" placeholder="내용을 입력해 주세요."></textarea>
    </div>
    </div>
    <div >
    <input type="file" name="file" id="article_file"></input>
    <input type="file" name="image" id="article_image"></input>
    </div>
`;

    // // post noticeboard
    // function new_noticeboard() {
    //     let noticeboard_form_data = document.getElementById('modal_input_text').value;

    //     fetch('http://127.0.0.1:8000/noticeboard/create/', {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             community: community_num,
    //             name: noticeboard_form_data,
    //         }),
    //         headers: {
    //             'content-type': 'application/json; charset=UTF-8',
    //         },
    //     })
    //         .then((response) => response.json())
    //         .then((json) => {
    //             // console.log(json);
    //             alert(noticeboard_form_data + ' 이 생성되었습니다.');
    //             location.reload();
    //         });
    // }
}
