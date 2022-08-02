async function if_logout() {
    let make_community_btn = document.getElementById("make_community");
    make_community_btn.remove();
    fetch("http://127.0.0.1:8000/community/main/", {
        },
      )
      .then((response)=>(response.json()))
      .then((result)=>{
        const community = result.community;
        const container = document.getElementById("main-container");
        for (i=0; i<community.length; i++) {
            const contanier_div = document.createElement('div');
            contanier_div.classList.add("main-community")
            contanier_div.innerHTML =   
            `
                <img
                class="main-community-thumbnail"
                src="${community[i].image}"
                />
                <div class="main-community__info">
                <div class="main-community__info__name">${community[i].name}</div>
                <div class="main-community__info__discription">
                    ${community[i].introduction}
                </div>
                <div class="main-community__info__tags" id="tag_${community[i].name}">
                </div>
                <div class="main-community__info__else">
                    <div class="main-community__info__public">공개 커뮤니티</div>
                    |
                    <div class="main-community__info__number">회원 수 ${community[i].user_num}</div>
                </div>
                </div>
            `

            container.append(contanier_div);

            for (j=0; j<community[i].tag.length; j++) {
                const tag_id = document.getElementById("tag_"+community[i].name)
                const tag_div = document.createElement('div');
                tag_div.classList.add("main-community__info__tag");
                tag_div.append('# '+community[i].tag[j].name);
                tag_id.append(tag_div);
            }
        }

        const tag = result.tag;
        const tag_filter = document.getElementById('tag_filter');
        for (i=0; i<tag.length; i++) {
            const tag_option = document.createElement('option');
            tag_option.setAttribute('value', tag[i])
            tag_option.textContent = tag[i]
            tag_filter.append(tag_option)
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
            const all_tag = result.all_tag;
            const all_tag_div = document.getElementsByClassName("main-community-modal__body__tags")[0]
            for (i=0; i<all_tag.length; i++) {
                const tag_span = document.createElement('span')
                tag_span.innerHTML = `${all_tag[i]}`
                const tag_div = document.createElement('input');
                tag_div.classList.add("main-community-modal__body__tag");
                tag_div.setAttribute("type", "checkbox");
                tag_div.setAttribute("id", "make_community_tag_"+all_tag[i]);
                tag_div.setAttribute('value', all_tag[i])
                all_tag_div.append(tag_span)
                all_tag_div.append(tag_div)
            }

            const community = result.community;
            const container = document.getElementById("main-container");
            for (i=0; i<community.length; i++) {
                const contanier_div = document.createElement('div');
                contanier_div.classList.add("main-community")
                contanier_div.innerHTML =   
                `
                    <img
                    class="main-community-thumbnail"
                    src="${community[i].community_info.image}"
                    />
                    <div class="main-community__info">
                    <div class="main-community__info__name">${community[i].community_info.name}</div>
                    <div class="main-community__info__discription">
                        ${community[i].community_info.introduction}
                    </div>
                    <div class="main-community__info__tags" id="tag_${community[i].community}">
                    </div>
                    <div class="main-community__info__else">
                        <div class="main-community__info__public" id="community_is_public_${community[i].community}">공개 커뮤니티</div>
                        |
                        <div class="main-community__info__number">회원 수 ${community[i].community_info.user_num}</div>
                    </div>
                    </div>
                `
                container.append(contanier_div);
                
                if (community[i].community_info.is_public === false) {
                    const public_tag = document.getElementById("community_is_public_"+community[i].community);
                    public_tag.textContent = "비공개 커뮤니티"
                }
                
                for (j=0; j<community[i].community_info.tag.length; j++) {
                    const tag_id = document.getElementById("tag_"+community[i].community)
                    const tag_div = document.createElement('div');
                    tag_div.classList.add("main-community__info__tag");
                    tag_div.append('# '+community[i].community_info.tag[j].name);
                    tag_id.append(tag_div);
                }
            }
            const tag = result.tag;
            const tag_filter = document.getElementById('tag_filter');
            for (i=0; i<tag.length; i++) {
                const tag_option = document.createElement('option');
                tag_option.setAttribute('value', tag[i])
                tag_option.textContent = tag[i]
                tag_filter.append(tag_option)
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

async function create_community() {
    const community_name = document.getElementById('make_community_name').value
    const community_discription = document.getElementById('make_community_discription').value
    const community_image = document.getElementById('make_community_sumbnail').files[0]
    const community_tags_div = document.getElementsByClassName('main-community-modal__body__tag');
    const community_tags = []
    for (i=0; i<community_tags_div.length; i++) {
        if(community_tags_div[i].checked === true) {
            community_tags.push(community_tags_div[i].value)
        }
    }
    let community_isPublic = false
    if (document.getElementById('make_community_isPublic').checked === true) {
        community_isPublic = true;
    }
    const formdata = new FormData();
    formdata.append("name", community_name)
    formdata.append("introduction", community_discription)
    formdata.append("image", community_image)
    formdata.append("tags", community_tags)
    formdata.append("is_public", community_isPublic)
    formdata.append("user_id", localStorage.getItem("payload"))
    fetch("http://127.0.0.1:8000/community/main/create", {
        method: "POST",
        body: formdata
        })
        .then((response) => response.json())
        .then((result) => {
            if (result.message === 'name_none') {
                throw new Error('커뮤니티 이름을 작성해주세요') 
            }
            if (result.message === 'name_exist') {
                throw new Error('이미 존재하는 커뮤니티 이름입니다.') 
            }
            if (result.message === 'introduction') {
                throw new Error('커뮤니티 설명을 작성해주세요')
            }
            if (result.message === 'image') {
                throw new Error('썸내일은 필수 사항입니다. 추후에 수정할 수 있으니 업로드 해주세요.')
            }
            alert(result.message);
            window.location.reload();
            }
        )
        .catch((err)=>{
            alert(err)
        })
};
