// 작성한 게시글 post하기
async function postArticle() {
    try {
        let title = document.getElementById('article_title').value;
        let content = document.getElementById('article_content').value;
        let noticeboard = document.getElementById('noticeboard').value;
        // let file = document.getElementById("article_file").value
        let image = document.getElementById('article_image').files[0];

        let formdata = new FormData();

        formdata.append('title', title);
        formdata.append('content', content);
        // formdata.append('file', file)
        formdata.append('image', image);
        formdata.append('noticeboard', noticeboard);

        let response = await fetch('http://127.0.0.1:8000/article/write/', {
            method: 'POST',
            body: formdata,
        });

        if (response.status == 200) {
            alert('글작성 완료!');
            window.location.replace('http://127.0.0.1:5500/');
        } else {
            alert(response.status);
        }
    } catch (error) {
        console.error(error);
        alert('작성한 게시글 post하기에서 오류가 발생했습니다!');
    }
}
