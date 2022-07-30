async function if_logout() {
    let make_community_btn = document.getElementById("make_community");
    make_community_btn.remove();
    fetch("http://127.0.0.1:8000/community/main/", {
        },
      )
      .then((response)=>(response.json()))
      .then((result)=>{
        const category = result;
        const container = document.getElementById("main-container");
        for (i=0; i<category.length; i++) {
            const contanier_div = document.createElement('div');
            contanier_div.classList.add("main-communtiy")
            contanier_div.innerHTML =   
            `
                <img
                class="main-community-thumbnail"
                src="${category[i].image}"
                />
                <div class="main-community__info">
                <div class="main-community__info__name">${category[i].name}</div>
                <div class="main-community__info__discription">
                    ${category[i].introduction}
                </div>
                <div class="main-community__info__tags" id="tag_${category[i].name}">
                </div>
                <div class="main-community__info__else">
                    <div class="main-community__info__public">공개 커뮤니티</div>
                    |
                    <div class="main-community__info__number">회원 수 ${category[i].user_num}</div>
                </div>
                </div>
            `

            container.append(contanier_div);

            for (j=0; j<category[i].tag.length; j++) {
                const tag_id = document.getElementById("tag_"+category[i].name)
                const tag_div = document.createElement('div');
                tag_div.classList.add("main-community__info__tag");
                tag_div.append('# '+category[i].tag[j].name);
                tag_id.append(tag_div);
            }
        }
      })
}



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
                    <div class="main-community__info__tags" id="tag_${category[i].community}">
                    </div>
                    <div class="main-community__info__else">
                        <div class="main-community__info__public" id="community_is_public_${category[i].community}">공개 커뮤니티</div>
                        |
                        <div class="main-community__info__number">회원 수 ${category[i].community_info.user_num}</div>
                    </div>
                    </div>
                `
                container.append(contanier_div);
                
                if (category[i].community_info.is_public === false) {
                    const public_tag = document.getElementById("community_is_public_"+category[i].community);
                    public_tag.textContent = "비공개 커뮤니티"
                }
                
                for (j=0; j<category[i].community_info.tag.length; j++) {
                    const tag_id = document.getElementById("tag_"+category[i].community)
                    const tag_div = document.createElement('div');
                    tag_div.classList.add("main-community__info__tag");
                    tag_div.append('# '+category[i].community_info.tag[j].name);
                    tag_id.append(tag_div);
                }
            }
        })
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
        requestRefreshToken("http://127.0.0.1:8000/user/refresh/").then((data)=>{
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