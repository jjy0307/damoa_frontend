let community_num = 1;

/* storage에서 payload 값 모두 가져오는 부분 */
let storage = localStorage.getItem('payload');
// JSON 문자열을 객체, 배열로 변환
const personObj = JSON.parse(storage);
username = personObj['username'];
user_id = personObj['user_id'];


// 글 수정 페이지로 이동
function edit_post()  {
    location.href = "community_main_mj_3.html";
}


// 글 작성 페이지로 이동
function writing()  {
    location.href = "community_main_mj_4.html";
}



