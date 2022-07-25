async function if_login() {
    console.log('byby');
    let nav_bar = document.getElementsById("nav_bar");
    nav_bar.setAttribute("style", "display:none")
};

window.onload = ()=>{
    const payload = JSON.parse(localStorage.getItem("payload"));
    // 아직 access 토큰의 인가 유효시간이 남은 경우
    console.log('ㅗㅑㅗㅑㅗㅑㅗㅑ')
    console.log(payload.exp)
    console.log(Date.now()/1000)
    if (payload.exp > (Date.now() / 1000)){
        console.log('hihi')
        if_login();
    } else {
        console.log('설마')
        // 인증 시간이 지났기 때문에 다시 refreshToken으로 다시 요청을 해야 한다.
        const requestRefreshToken = async (url) => {
              const response = await fetch(url, {
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  method: "POST",
                  body: JSON.stringify({
                      "refresh": localStorage.getItem("refresh")
                  })}
              );
              return response.json();
        };

        // 다시 인증 받은 accessToken을 localStorage에 저장하자.
        requestRefreshToken("http://127.0.0.1:8000/user/refresh/").then((data)=>{
            // 새롭게 발급 받은 accessToken을 localStorage에 저장
            const accessToken = data.access;
            localStorage.setItem("access", accessToken);
            console.log(accessToken)
            console.log(access.exp)
        });
    }
};

// 로그아웃 부분
async function handleLogout(){
    localStorage.removeItem("payload");
    localStorage.removeItem("refresh");
    localStorage.removeItem("access");
    alert("로그아웃 되었습니다.")
    location.reload()
    window.location.replace(`login.html`);
}