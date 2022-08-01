async function postArticle() {
    const title = document.getElementById('article_title').value;
    const content = document.getElementById('article_content').value;
    const noticeboard = document.getElementById('noticeboard').value;
    // const file = document.getElementById("article_file").value
    const image = document.getElementById('article_image').files[0];

    const formdata = new FormData();

    formdata.append('title', title);
    formdata.append('content', content);
    // formdata.append('file', file)
    formdata.append('image', image);
    formdata.append('noticeboard', noticeboard);

    const response = await fetch('http://127.0.0.1:8000/article/write/', {
        method: 'POST',
        body: formdata,
    });

    if (response.status == 200) {
        alert('글작성 완료!');
        window.location.replace('http://127.0.0.1:5500/');
    } else {
        alert(response.status);
    }
}
