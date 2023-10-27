
import './App.css'
import ScheduleRegistrationPage from "./pages/ScheduleRegistrationPage"
import GlobalStyles from "./utils/GlobalStyles"
import DetailMappingPage from "./pages/DetailMappingPage.tsx";
import MainPage from "./pages/mainpage"; // MainPage 컴포넌트 import
import "./pages/mainpage.css";

function App() {
  return (
    <>
      <GlobalStyles/>
      <MainPage/>
      <DetailMappingPage/>
      <ScheduleRegistrationPage/>
    </>
  )
}

export default App;
