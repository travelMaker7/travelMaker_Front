import "./App.css";
import ScheduleRegistrationPage from "./pages/scheduleregistration/ScheduleRegistrationPage.tsx";
import GlobalStyles from "./utils/css/GlobalStyles.ts";
import DetailMappingPage from "./pages/detailmapping/DetailMappingPage.tsx";
import MainPage from "./pages/main/mainpage.tsx";
import "./utils/css/mainpage.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login.tsx";
import { AuthProvider } from "../src/components/contexts/AuthContext.tsx";
import MyPage from "./pages/mypage/MyPage.tsx";
import ProfileModalPage from "./components/profile/profilemodal/ProfileModalPage.tsx";
import LocalCategoryMappingPage from "./pages/localcategorymapping/LocalCategoryMappingPage.tsx";
import ChatRoomButton from "@/components/chat/chatRoomButton";
import Chat from "./pages/chat/chat.tsx";
import ChatRooms from "./components/chat/chatRooms.tsx";
import LoginHandeler from "./pages/login/LoginHandeler.tsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/detailmap/:scheduleId"
            element={<DetailMappingPage />}
          />
          <Route path="/registration" element={<ScheduleRegistrationPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/chatList" element={<ChatRooms />} />
          <Route path="/chat" element={<ChatRoomButton handleCreateAndEnterRoom={function (): void {
            throw new Error("Function not implemented.");
          } } />} /> 
          <Route path="/chat/room/:redisRoomId" element={<Chat />} />
          <Route path="/auth/kakao" element={<LoginHandeler />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/profileModal" element={<ProfileModalPage />} />
          <Route path="/localcategorymap" element={<LocalCategoryMappingPage/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
