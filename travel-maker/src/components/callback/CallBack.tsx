import { useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext,  AuthContextValue } from '../../components/contexts/AuthContext';

const REST_API_KEY = import.meta.env.VITE_REST_API_KEY as string;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI as string;

const Callback: React.FC = () => {
    const navigate = useNavigate();
    const { setIsLoggedIn } = useContext(AuthContext) as AuthContextValue;
  
    const logout = async () => {
      const token = localStorage.getItem('access_token');
  
      axios({
        method: "POST",
        url: "https://kapi.kakao.com/v1/user/logout",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        if (response.status === 200) {
          localStorage.removeItem('access_token');
          setIsLoggedIn(false);
          navigate('/');
        } else {
          console.error('로그아웃 실패');
        }
      }).catch((error) => {
        console.error(error);
      });
    };
    
  useEffect(() => {
    
    const login = async () => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');

    if (!code) {
      alert('인증 코드가 없습니다.');
      navigate('/');
      return;
    }

    try {
        const tokenResponse = await axios.post(
          "https://kauth.kakao.com/oauth/token",
          `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
          { headers: { "content-type": "application/x-www-form-urlencoded" } }
        );
        const { access_token } = tokenResponse.data;
        localStorage.setItem('access_token', access_token);
        setIsLoggedIn(true);
  
        const userResponse = await axios({
          method: "POST",
          url: "https://kapi.kakao.com/v2/user/me",
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        });
        const { id, properties, kakao_account } = userResponse.data;
        const { profile, email, gender, age_range } = kakao_account;
        console.log(id, properties, profile, email, gender, age_range);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.data.code === -401) {
          await logout();
        }
        console.error(error);
      } finally {
        navigate('/');
      }
    };
    login();
  }, [navigate, setIsLoggedIn]);

  return <div>Callback</div>;
};

export default Callback;