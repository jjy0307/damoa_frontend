async function login() {
    user_id = document.getElementById('user_id').value;
    password = document.getElementById('password').value;
    const response = await fetch('http://127.0.0.1:8000/user/login/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            user_id: user_id,
            password: password,
        }),
    });

    response_json = await response.json();

    // access,refresh 값 저장
    if (response.status == 200) {
        localStorage.setItem('access', response_json.access);
        localStorage.setItem('refresh', response_json.refresh);

        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
        );

        //payload 저장 후 로그인시 메인 페이지로 이동
        localStorage.setItem('payload', jsonPayload);
        window.location.replace(`main.html`);
    } else {
        alert('아이디 or 비밀번호가 틀립니다.');
    }
}

// 이미 로그인된 상태라면
window.onload = () => {
    const payload = JSON.parse(localStorage.getItem('payload'));
    // 아직 access 토큰의 인가 유효시간이 남은 경우
    if (payload.exp > Date.now() / 1000) {
        window.location.replace(`main.html`);
    } else {
        // 인증 시간이 지났기 때문에 다시 refreshToken으로 다시 요청을 해야 한다.
        const requestRefreshToken = async (url) => {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    refresh: localStorage.getItem('refresh'),
                }),
            });
            return response.json();
        };

        // 다시 인증 받은 accessToken을 localStorage에 저장하자.
        requestRefreshToken('http://127.0.0.1:8000/user/refresh/').then((data) => {
            // 새롭게 발급 받은 accessToken을 localStorage에 저장
            const accessToken = data.access;
            localStorage.setItem('access', accessToken);
        });
    }
};
