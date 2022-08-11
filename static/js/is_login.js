// let backend_server = 'http://3.39.1.228:8000'

async function if_logout() {
    let make_community_btn = document.getElementById("make_community");
    let show_joined_community = document.getElementById("by_joined");
    make_community_btn.remove();
    show_joined_community.remove();
}



async function if_login() {
    let nav_bar_login = document.getElementById('nav_login_btn');
    let nav_bar_logout = document.getElementById('nav_logout_btn');
    nav_bar_login.setAttribute("style", "display:none");
    nav_bar_logout.setAttribute("style", "display:flex");
};

window.onload = ()=> {try {
    const payload = JSON.parse(localStorage.getItem("payload"));
    // 아직 access 토큰의 인가 유효시간이 남은 경우
    if (payload.exp > (Date.now() / 1000)){
        if_login();
    } else {
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
        requestRefreshToken("http://3.39.1.228:8000/user/refresh/").then((data)=>{
            // 새롭게 발급 받은 accessToken을 localStorage에 저장
            const accessToken = data.access;
            localStorage.setItem("access", accessToken);
            if_login();
        });
    }
} catch (error) {
    if_logout();
    };
}