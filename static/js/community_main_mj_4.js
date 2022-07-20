var backend_base_url = "http://127.0.0.1:8000"
var frontend_base_url = "http://127.0.0.1:5500"


async function postArticle(){
    const title = document.getElementById("article_title").value
    const content = document.getElementById("article_content").value
    const created_date = document.getElementById("article_time_data").value
    const file = document.getElementById("article_file").value
    const images = document.getElementById("article_images").files[0]


    const formdata = new FormData();

    formdata.append('title', title)
    formdata.append('content', content)
    formdata.append('created_date', created_date)
    formdata.append('file', file)
    formdata.append('images', images)

    console.con

    const response = await fetch("http://127.0.0.1:8000/article/",{
        method:'POST',
        body: formdata
    }
    )



    if (response.status ==200){
        alert("글작성 완료!")
        window.location.replace("http://127.0.0.1:5500/");
    }else{
        alert(response.status)
    }




}