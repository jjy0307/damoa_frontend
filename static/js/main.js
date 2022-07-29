async function if_login() {
    let nav_bar_login = document.getElementById('nav_login_btn');
    let nav_bar_logout = document.getElementById('nav_logout_btn');
    nav_bar_login.setAttribute("style", "display:none");
    nav_bar_logout.setAttribute("style", "display:flex");

    let recommendation = document.getElementById('by_recommendation');
    let joined = document.getElementById('by_joined');
    recommendation.setAttribute("style", "display:none");
    joined.setAttribute("style", "display:flex");

    fetch("http://127.0.0.1:8000/community/main/", {
        headers:{
            Authorization : "Bearer " + localStorage.getItem("access"),
        },
      })
        .then((response) => response.json())
        .then((result) => {
            const category = result;
            const container = document.getElementById("main-container");
            let tags = "";
            for (i=0; i<category.length; i++) {
                const contanier_div = document.createElement('div');
                contanier_div.classList.add("main-communtiy")
                contanier_div.innerHTML =   
                `
                    <img
                    class="main-community-thumbnail"
                    src="${category[i].community_info.image}"
                    />
                    <div class="main-community__info">
                    <div class="main-community__info__name">${category[i].community_info.name}</div>
                    <div class="main-community__info__discription">
                        ${category[i].community_info.introduction}
                    </div>
                    <div class="main-community__info__tags">
                        <div class="main-community__info__tag"># ${category[i].community_info.tag}</div>
                    </div>
                    <div class="main-community__info__else">
                        <div class="main-community__info__public">공개커뮤니티</div>
                        |
                        <div class="main-community__info__number">회원 수 1,100</div>
                    </div>
                    </div>
                `
                container.append(contanier_div);
            }
        })

};

window.onload = ()=>{
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
        requestRefreshToken("http://127.0.0.1:8000/user/refresh/").then((data)=>{
            // 새롭게 발급 받은 accessToken을 localStorage에 저장
            const accessToken = data.access;
            localStorage.setItem("access", accessToken);
            if_login();
        });
    }
};