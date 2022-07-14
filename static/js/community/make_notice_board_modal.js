//make noticeboard
function modal_show() {
    document.querySelector('.modal_background').className = 'modal_background modal_show';
}

function modal_close() {
    document.querySelector('.modal_background').className = 'modal_background';
}

document.querySelector('#modal_show').addEventListener('click', modal_show);
document.querySelector('#modal_close').addEventListener('click', modal_close);
