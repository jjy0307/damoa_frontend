//get article list
fetch('http://127.0.0.1:8000/article/')
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
        let article_id = [];
        let article_title = [];
        let article_user = [];
        let article_created_date = [];
        for (i = 0; i < json.length; i++) {
            article_id.push(json[i]['id']);
            article_title.push(json[i]['title']);
            article_user.push(json[i]['user_name']);
            article_created_date.push(json[i]['created_date'].slice(5, 10));
        }
        console.log(article_id, article_title, article_user, article_created_date);

        let tag_area = document.getElementById('article_list');

        for (i = 0; i < article_id.length; i++) {
            // 한 줄 추가
            let make_article = document.createElement('tr');
            make_article.setAttribute('class', 'article_name');
            tag_area.appendChild(make_article);

            // 글 번호 추가
            let make_article_id = document.createElement('td');
            make_article_id.setAttribute('class', 'article_name');
            make_article_id.innerHTML = article_id[i];
            tag_area.appendChild(make_article_id);

            // 글 제목 추가
            let make_article_title = document.createElement('button');
            make_article_title.setAttribute('class', 'article_name');
            make_article_title.setAttribute('onclick', `location.href="https://github.com/soiyo"`);
            make_article_title.innerHTML = article_title[i];
            tag_area.appendChild(make_article_title);

            // 글 작성자 추가
            let make_article_user = document.createElement('td');
            make_article_user.setAttribute('class', 'article_name');
            make_article_user.innerHTML = article_user[i];
            tag_area.appendChild(make_article_user);

            // 글 작성일 추가
            let make_article_created_date = document.createElement('td');
            make_article_created_date.setAttribute('class', 'article_name');
            make_article_created_date.innerHTML = article_created_date[i];
            tag_area.appendChild(make_article_created_date);
        }
    });
