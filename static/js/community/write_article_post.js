// let backend_server = 'http://127.0.0.1:8000'
// 작성한 게시글 post하기
async function postArticle(e) {
    const title = document.getElementById('article_title').value;
    // const content = document.getElementById('article_content').value;
    const content = document.getElementById('article_content').getElementsByClassName('ql-editor')[0].innerHTML;
    const noticeboard = e.id.split('_')[3];
    const file = document.getElementById('article_file').files[0];
    const image = document.getElementById('article_image').files;
    const formdata = new FormData();

    for (i=0; i<image.length; i++) {
        formdata.append('image_'+i, image[i])
    }
    formdata.append('title', title);
    formdata.append('content', content);
    formdata.append('file', file);
    formdata.append('noticeboard', noticeboard);
    formdata.append('user_id', localStorage.getItem('payload'));
    await fetch('http://127.0.0.1:8000/article/write/', {
        method: 'POST',
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

}
