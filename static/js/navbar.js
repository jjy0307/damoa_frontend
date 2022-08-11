// 로그아웃 부분
async function handleLogout() {
    localStorage.removeItem('payload');
    localStorage.removeItem('refresh');
    localStorage.removeItem('access');
    alert('로그아웃 되었습니다.');
    location.reload();
    window.location.replace(`http://43.200.24.208/main`);
}

async function handleLogin() {
    window.location.replace(`http://43.200.24.208/login`);
}

async function handleSignUp() {
    window.location.replace(`http://43.200.24.208/signup`);
}

async function handleMain() {
    window.location.replace(`http://43.200.24.208/main`);
}
async function handleMypage() {
    window.location.replace(`http://43.200.24.208/mypage`);
}
