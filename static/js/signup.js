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
            }
            if (result.username) {
                alert(result.username)
            }
            alert('회원 가입이 완료 되었습니다')
            window.location.href = 'http://127.0.0.1:5500/login.html'
        })
    }