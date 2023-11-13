import "./App.css";
import ScheduleRegistrationPage from "./pages/scheduleregistration/ScheduleRegistrationPage.tsx";
import GlobalStyles from "./utils/css/GlobalStyles.ts";
import DetailMappingPage from "./pages/detailmapping/DetailMappingPage.tsx";
import MainPage from "./pages/main/mainpage.tsx";
import "./utils/css/mainpage.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login.tsx";
import Callback from "../src/components/callback/CallBack.tsx";
import { AuthProvider } from "../src/components/contexts/AuthContext.tsx";
import ProfileTestPage from "./components/profile/profilemodal/ProfileTestPage.tsx";
import MyPageProfileTest from "./components/profile/mypageprofile/MyPageProfileTest.tsx";
import ProfileTestPage2 from "./components/profile/profilemodal/ProfileTestPage2.tsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/detailmap" element={<DetailMappingPage />} />
          <Route path="/registration" element={<ScheduleRegistrationPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/kakao/callback" element={<Callback />} />
          <Route
            path="/profiletest"
            element={<ProfileTestPage userId="dbsehddl9161" />}
          />
          <Route path="/mypageprofiletest" element={<MyPageProfileTest />} />
          <Route path="/profiletest2" element={<ProfileTestPage2 />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
