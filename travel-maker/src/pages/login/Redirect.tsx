import axios from 'axios';

const AUTHORIZE_CODE = new URLSearchParams(window.location.search).get("code");
const GRANT_TYPE = "authorization_code";
const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

axios.post(
  `https://kauth.kakao.com/oauth/token`,
  `grant_type=${GRANT_TYPE}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${AUTHORIZE_CODE}`,
  {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    }
  }
)
.then((response) => {
  console.log(response);
  if (response.data.access_token) {
    localStorage.setItem('access_token', response.data.access_token);
    console.log('access_token 저장 완료!');
  }
})
  .catch((error) => console.log(error));
