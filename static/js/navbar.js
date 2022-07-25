// 로그아웃 부분
async function handleLogout(){
    localStorage.removeItem("payload");
    localStorage.removeItem("refresh");
    localStorage.removeItem("access");
    alert("로그아웃 되었습니다.")
    location.reload()
    window.location.replace(`main.html`);
}

async function handleLogin(){
    window.location.replace(`login.html`);
}

async function handleSignUp(){
    window.location.replace(`signup.html`);
}

async function handleMain(){
    window.location.replace(`main.html`);
}