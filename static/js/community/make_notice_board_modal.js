//게시글 만들기 모달 띄우기
function modal_show() {
    try {
        document.querySelector('.modal_background').className = 'modal_background modal_show';
    } catch (error) {
        console.error(error);
        alert('모달 띄우기에서 오류 발생!');
    }
}
//게시글 만들기 모달 닫기
function modal_close() {
    try {
        document.querySelector('.modal_background').className = 'modal_background';
    } catch (error) {
        console.error(error);
        alert('모달 닫기에서 오류 발생!');
    }
}
try {
    document.querySelector('#modal_show').addEventListener('click', modal_show);
    document.querySelector('#modal_close').addEventListener('click', modal_close);
} catch (error) {
    console.error(error);
    alert('모달 열기, 닫기 버튼 누를 시 오류 발생!');
}
