async function submit() {
    user_id = document.getElementById("user_id").value
    username = document.getElementById("username").value
    password = document.getElementById("password").value
    password_check = document.getElementById("password_check").value

    if (password != password_check) {
        alert('비밀번호를 확인해주세요');
        return;
    }

    fetch("http://127.0.0.1:8000/user/signup/", {
        method: "POST",
        headers:{
            Accept:"application/json",
            'Content-type':'application/json'
        },
        body: JSON.stringify({
          user_id: user_id,
          username: username,
          password: password
        }),
      })
        .then((response) => response.json())
        .then((result) => {
            if (result.user_id) {
                alert(result.user_id)
                throw new Error('wrong userid')
            }
            if (result.username) {
                alert(result.username)
                throw new Error('wrong username')
            }
            alert('회원 가입이 완료 되었습니다')
            window.location.href = 'http://127.0.0.1:5500/login.html'
        })
        .catch((err)=>{console.log(err)
        })
    }

window.onload = ()=>{
    const payload = JSON.parse(localStorage.getItem("payload"));
    if (payload.exp > (Date.now() / 1000)){
        window.location.replace(`main.html`);
    } else {
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

        requestRefreshToken("http://127.0.0.1:8000/user/refresh/").then((data)=>{
            const accessToken = data.access;
            localStorage.setItem("access", accessToken);
        });
    }
};