async function login() {
    user_id = document.getElementById('user_id').value;
    password = document.getElementById('password').value;
    const response = await fetch("http://127.0.0.1:8000/user/login/", {
        method: "POST",
        headers:{
            Accept:"application/json",
            'Content-type':'application/json'
        },
        body: JSON.stringify({
          user_id: user_id,
          password: password
        }),
      })
      
      response_json = await response.json();

      // access,refresh 값 저장
      if (response.status ==200){
          localStorage.setItem("access", response_json.access)
          localStorage.setItem("refresh", response_json.refresh)
          
          console.log(response_json.access)
          const base64Url = response_json.access.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
  
  
          //payload 저장 후 로그인시 메인 페이지로 이동
          localStorage.setItem("payload", jsonPayload);
          window.location.replace(`main.html`);
      }else{
          alert("아이디 or 비밀번호가 틀립니다.")
      }
}

// 로그아웃 부분
async function handleLogout(){
    localStorage.removeItem("payload");
    localStorage.removeItem("refresh");
    localStorage.removeItem("access");
    alert("로그아웃 되었습니다.")
    location.reload()
    window.location.replace(`login.html`);
}