article_num = 1;
user_num = 1;
// post comment
function new_comment() {
    let comment_form_data = document.getElementById('comment_input_area').value;

    fetch('http://127.0.0.1:8000/article/comment/write/', {
        method: 'POST',
        body: JSON.stringify({
            user: user_num,
            article: article_num,
            content: comment_form_data,
        }),
        headers: {
            //헤더 값 정의
            'content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            alert('댓글을 작성했습니다.');
            // location.reload();
            window.location.reload();
        });
}

//get article list
fetch(`http://127.0.0.1:8000/article/${article_num}/write`)
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
        let article_title = json.title;
        let article_date = json.created_date.slice(2, 10);
        let article_author = json.user_name;
        let article_content = json.content;
        console.log(article_content, article_title, article_date);

        // 데이터 보여줄 영역 지정
        let title_area = document.getElementById('article_title_area');
        let date_area = document.getElementById('article_date_area');
        let author_area = document.getElementById('article_author_area');
        let content_area = document.getElementById('article_content_area');

        // 제목 데이터
        let make_title = document.createElement('div');
        make_title.setAttribute('id', 'article_title');
        title_area.innerHTML = article_title;

        // 날짜 데이터
        let make_date = document.createElement('div');
        make_date.setAttribute('id', 'article_date');
        date_area.innerHTML = article_date;

        // 작성자 데이터
        let make_author = document.createElement('div');
        make_author.setAttribute('id', 'article_author');
        author_area.innerHTML = article_author;

        // 작성자 데이터
        let make_content = document.createElement('div');
        make_content.setAttribute('id', 'article_content');
        content_area.innerHTML = article_content;

        return fetch(`http://127.0.0.1:8000/article/comment/write/`);
    })
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
        let comment_author_list = [];
        let comment_content_list = [];
        let comment_created_date_list = [];

        for (i = 0; i < json.length; i++) {
            let current_article = json[i]['article'];
            if (current_article == `${article_num}`) {
                let comment_author = json[i]['user_name'];
                let comment_content = json[i]['content'];
                let comment_date = json[i]['created_date'].slice(5, 10);

                console.log(comment_author, comment_content, comment_date);
                comment_author_list.push(comment_author);
                comment_content_list.push(comment_content);
                comment_created_date_list.push(comment_date);
            }
        }
        console.log(comment_author_list, comment_content_list, comment_created_date_list);

        let comment_area = document.getElementById('comment_area');

        for (i = 0; i < comment_content_list.length; i++) {
            // 한 줄 추가
            let make_comment = document.createElement('div');
            make_comment.setAttribute('class', 'comment_all_show');
            make_comment.setAttribute('id', `comment_all_show${i}`);
            comment_area.appendChild(make_comment);

            let one_comment_area = document.getElementById(`comment_all_show${i}`);

            let make_comment_author = document.createElement('div');
            make_comment_author.innerHTML = comment_author_list[i];
            one_comment_area.appendChild(make_comment_author);

            let make_comment_content = document.createElement('div');
            make_comment_content.innerHTML = comment_content_list[i];
            one_comment_area.appendChild(make_comment_content);

            let make_comment_date = document.createElement('div');
            make_comment_date.innerHTML = comment_created_date_list[i];
            one_comment_area.appendChild(make_comment_date);
        }
    });
