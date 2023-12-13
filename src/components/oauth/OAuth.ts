export const KAKAO_REST_API_KEY: string|undefined = process.env.KAKAO_REST_API_KEY;
export const KAKAO_REDIRECT_URI: string|undefined  = process.env.KAKAO_REDIRECT_URI;
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`;

