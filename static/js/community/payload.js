/* storage에서 payload 값 모두 가져오는 부분 */
let storage = localStorage.getItem('payload');
// JSON 문자열을 객체, 배열로 변환
const personObj = JSON.parse(storage);
username = personObj['username'];
user_id = personObj['user_id'];
