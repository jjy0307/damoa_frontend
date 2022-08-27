# ☘ Project Damoa

## 🔜 목차
1. 프로젝트 소개  
2. 팀 구성  
3. Stack
4. 주요 기능  
5. Architecture
6. API
7. Layout

## 📄 프로젝트 소개
프로젝트 다모아는 인가된 인원에 대해 자유롭게 커뮤니티를 형성할 수 있는 사이트입니다. 기업, 커뮤니티, 작게는 개인까지 소통을 이어나갈 수 있으며 운동, IT, 음식 등 다양한 주제로 소통방을 만들 수 있습니다. 글 또한 고민, 질문, 자랑 등 자유로운 얘기를 할 수 있습니다.    

### ⏲ 개발 기간 : 2022.7.14 ~ 2022.8.16

### 홈페이지  (현재는 닫힌 상태입니다.)

### 소개 영상  [youtube](https://youtu.be/6c7Q82DfTAU)

### Github  [Back-end](https://github.com/jjy0307/damoa_backend)

## 🧑 팀 구성 
* 4인 팀 프로젝트  <br>
* 맡은 역할 : AI Engineer

<table>
  <tr>
    <td align="center"><strong>구분</strong></td>
    <td align="center"><strong>Back-end</strong></td>
    <td align="center"><strong>Front-end</strong></td>
    <td align="center"><strong>Designer</strong></td>
    <td align="center"><strong>AI Engineer</strong></td>	  
  </tr>
  <tr>
    <td align="center"><strong>메인페이지</strong></td>
    <td align="center">이승태</td>
    <td align="center">이승태</td>
    <td align="center">이승태</td>
    <td rowspan="5" align="center">전진영</td>
  </tr>
  <tr>
    <td align="center"><strong>마이페이지</strong></td>
    <td align="center">이승태</td>
    <td align="center">이승태</td>
    <td align="center">이승태</td>
  </tr>
  <tr>
    <td align="center"><strong>로그인 페이지</strong></td>
    <td align="center">이승태</td>
    <td align="center">이승태</td>
    <td align="center">이승태</br>전진영</td>
  </tr>
  <tr>
    <td align="center"><strong>회원가입 페이지</strong></td>
    <td align="center">이승태</td>
    <td align="center">이승태</td>
    <td align="center">이승태</br>전진영</td>
  </tr>
  <tr>
    <td align="center"><strong>커뮤니티 페이지</strong></td>
    <td align="center">이승태</br>윤가현</br>김민재</td>
    <td align="center">이승태</br>윤가현</br>김민재</td>
    <td align="center">이승태</br>윤가현</br>김민재</td>
  </tr>
</table>

## ✨ Stack
* Language : Javascript

## 🕹 주요 기능
### 로그인 / 회원가입
* JWT 토큰 방식으로 구현
* Local Storage에 저장
* 각 페이지마다 접속시 refresh token을 받게 설정
* 아이디를 고유값으로 지정하여 중복 방지

### 메인 페이지
* 로그인 유무에 따라 추천 커뮤니티 변경
    * 추천 커뮤니티는 무조건 공개 커뮤니티에 대해서만 제공
* 커뮤니티 별 하루 접속자 수 순위표 제공
* 가입되지 않은 커뮤니티에 가입 요청 / 요청 취소 가능
* 커뮤니티 카드를 누를시 해당 커뮤니티로 이동
    * 단 가입되지 않은 커뮤니티는 접속 불가능
* 커뮤니티 생성
    * 커뮤니티 생성자는 관리자로 자동 설정

### 마이 페이지
* 비밀번호 변경 가능
* 가입된 커뮤니티 관리
* 작성한 글 관리(이동은 미구현)
* 작성한 댓글 관리(이동은 미구현)
* 유저->커뮤니티 가입 요청 결과 조회 / 요청 철회 / 요청 삭제
* 커뮤니티->유저 가입 요청 승락 / 요청 거절

### 커뮤니티 페이지
* 게시판 생성
   * 생성자는 게시판 관리자도 자동 설정
* 게시글 작성
   * Quill Library로 게시글 작성 기능 구현
   * 게시글에서 이미지 업로드 가능
   * 파일 업로드 가능
   * 게시글 제목, 내용중 하나라도 누락이 있을시 작성 불가능
* 게시글 수정
   * 게시글 제목, 내용중 하나라도 누락이 있을시 작성 불가능
* 댓글 작성
   * 생성시 날짜, 아이디 노출
   * 시간순으로 배치
   * 내용이 없으면 작성 불가능

## 🏚 Architecture
![186589235-d27760f4-2d18-4642-90be-950eca5e2a92](https://user-images.githubusercontent.com/90381057/186792240-d9ec22b6-849c-4743-a5fd-8e01c93194a5.png)

## 🚀 **[API 설계](https://documenter.getpostman.com/view/16204656/VUqypEbL)**

## 🗺 Layout
![Group 26](https://user-images.githubusercontent.com/90381057/186547234-04a9537b-2f48-4a3d-903b-bed3f7b3ba8d.png)
