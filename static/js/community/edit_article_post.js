// 게시글 작성후 post하는 함수
function edit_article_post(clicked_id) {
    try {
        let edit_article_num = clicked_id.split('_', 4)[3];

        let edit_article_title = document.getElementById('edit_article_title');
        let edit_article_content = document.getElementById('edit_article_content');
        let edit_article_images = document.getElementById('edit_article_images');
        let edit_article_file = document.getElementById('edit_article_file');
    } catch (error) {
        console.error(error);
        alert('게시글을 post하는 중 오류 발생!');
    }
    // let noticeboard_form_data = document.getElementById('modal_input_text').value;

    // fetch('http://127.0.0.1:8000/article/1/write/put/', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //         community: community_num,
    //         name: noticeboard_form_data,
    //     }),
    //     headers: {
    //         'content-type': 'application/json; charset=UTF-8',
    //     },
    // })
    //     .then((response) => response.json())
    //     .then((json) => {
    //
    //         alert(noticeboard_form_data + ' 이 생성되었습니다.');
    //         location.reload();
    //     });
}
