//get article list
fetch('http://127.0.0.1:8000/article/')
    .then((response) => response.json())
    .then((json) => {
        // console.log(json);
        let article_id = [];
        let article_title = [];
        let article_created_date = [];

        for (i = 0; i < json.length; i++) {
            article_id.push(json[i]['id']);
            article_title.push(json[i]['title']);
            article_created_date.push(json[i]['created_date'].slice(5, 10));
        }
        console.log(article_id, article_title, article_created_date);

        //1. 상위태그 아이디 가져오기
        let tag_area = document.getElementById('article_list'); //부모태그(table)의 아이디

        //2. 하위태그 만들기
        for (i = 0; i < article_id.length; i++) {
            let make_article = document.createElement('tr'); //tr 만들고
            make_article.setAttribute('class', 'article_name'); //tr에 속성 부여
            tag_area.appendChild(make_article); //부모태그(table)에 붙여준다

            let make_article_id = document.createElement('td'); //td 만들고
            make_article_id.setAttribute('class', 'article_name'); //td에 속성 부여
            make_article_id.innerHTML = article_id[i]; //id 값을 td에 넣는다
            tag_area.appendChild(make_article_id); //부모태그(table)에 붙여준다

            let make_article_title = document.createElement('button');
            make_article_title.setAttribute('class', 'article_name');
            make_article_title.setAttribute('onclick', `location.href="https://github.com/soiyo"`);
            make_article_title.innerHTML = article_title[i];
            tag_area.appendChild(make_article_title);

            let make_article_user = document.createElement('td');
            make_article_user.setAttribute('id', `article_user${i}`);
            tag_area.appendChild(make_article_user);

            let make_article_created_date = document.createElement('td');
            make_article_created_date.setAttribute('class', 'article_name');
            make_article_created_date.innerHTML = article_created_date[i]; //created_date를 td에 넣는다
            tag_area.appendChild(make_article_created_date);
        }
        return fetch('http://127.0.0.1:8000/article/user/');
    })
    .then((response) => response.json())
    .then((json) => {
        let username = [];
        for (i = 0; i < json.length; i++) {
            username.push(json[i]['username']);
        }
        console.log(username);
        for (i = 0; i < username.length; i++) {
            let tag_area = document.getElementById(`article_user${i}`);
            tag_area.innerHTML = username[i];
        }
    });
