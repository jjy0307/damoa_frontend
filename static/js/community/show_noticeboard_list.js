// get noticeboard
fetch('http://127.0.0.1:8000/noticeboard/create/')
    .then((response) => response.json())
    .then((json) => {
        let noticeboard = [];
        for (i = 0; i < json.length; i++) {
            noticeboard.push(json[i]['name']);
        }

        let tag_area = document.getElementById('noticeboard_name');

        for (i = 0; i < noticeboard.length; i++) {
            let make_noticeboard = document.createElement('p');
            make_noticeboard.setAttribute('class', 'noticeboard_name');
            make_noticeboard.innerHTML = noticeboard[i];
            tag_area.appendChild(make_noticeboard);
        }
    });

// post noticeboard
function new_noticeboard() {
    let noticeboard_form_data = document.querySelector('input[type="text"]').value;

    fetch('http://127.0.0.1:8000/noticeboard/create/', {
        method: 'POST',
        body: JSON.stringify({
            community: '1',
            name: noticeboard_form_data,
        }),
        headers: {
            //헤더 값 정의
            'content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            alert(noticeboard_form_data + ' 이 생성되었습니다.');
            location.reload();
        });
}
