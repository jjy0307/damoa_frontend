// 로그아웃 부분
async function handleLogout() {
    localStorage.removeItem('payload');
    localStorage.removeItem('refresh');
    localStorage.removeItem('access');
    alert('로그아웃 되었습니다.');
    location.reload();

    // [IP 변경]
    // window.location.replace(`http://43.200.24.208/main`);
    window.location.replace(`http://127.0.0.1:5500/main.html`);
}

async function handleLogin() {
    // [IP 변경]
    // window.location.replace(`http://43.200.24.208/login`);
    window.location.replace(`http://127.0.0.1:5500/login.html`);
}

async function handleSignUp() {
    // [IP 변경]
    // window.location.replace(`http://43.200.24.208/signup`);
    window.location.replace(`http://127.0.0.1:5500/signup.html`);
}

async function handleMain() {
    // [IP 변경]
    // window.location.replace(`http://43.200.24.208/main`);
    window.location.replace(`http://127.0.0.1:5500/main.html`);
}
async function handleMypage() {
    // [IP 변경]
    // window.location.replace(`http://43.200.24.208/mypage`);
    window.location.replace(`http://127.0.0.1:5500/my_page.html`);
}
