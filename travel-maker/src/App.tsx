
import './App.css'
import ScheduleRegistrationPage from "./pages/scheduleregistration/ScheduleRegistrationPage.tsx"
import GlobalStyles from "./utils/css/GlobalStyles.ts"
import DetailMappingPage from "./pages/detailmapping/DetailMappingPage.tsx";
import MainPage from "./pages/main/mainpage.tsx"; // MainPage 컴포넌트 import
import "./utils/css/mainpage.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <GlobalStyles/>
      <Routes>
        <Route path='/' element= { <MainPage/> }/>
        <Route path='/detailmap' element= { <DetailMappingPage/> }/>
        <Route path='/registration' element= { <ScheduleRegistrationPage/> }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
