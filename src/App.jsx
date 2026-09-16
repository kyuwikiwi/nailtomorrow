import {BrowserRouter, Routes,Route} from "react-router-dom";
import {colors} from "./styles/tokens";
import {useState} from "react";
import BottomTabBar from "./components/BottomTabBar";
import Home from "./pages/Home"; 
import Wallet from "./pages/Wallet";
import MyPage from "./pages/MyPage";
import Booking from "./pages/Booking";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Signup from "./pages/Signup"

export default function App(){
  //로그인 여부 확인(토큰이 있으면 로그인 상태)
  const [isLoggedIn, setIsLoggedIn]= useState(!!localStorage.getItem("token"));
  const [showSignup, setShowSignup]= useState(false);

  // 로그인 안했으면 -> 로그인 or 회원가입 화면만 보여줌
  if (!isLoggedIn){
    return (
      <div style={{maxWidth: 420, margin: "0 auto", minHeight: "100vh", background: colors.bg, padding: "0 16px"}}>
        {showSignup ? (
          <Signup onSuccess={() => setShowSignup(false)} />
        ) : (
          <Login onSuccess={()=> setIsLoggedIn(true)} onGoSignup={() => setShowSignup(true)} />
        )}
      </div>
    )
  }

//로그인 했으면 원래 앱 화면
  return(
    <BrowserRouter>
      <div style={{
        maxWidth: 420, //모바일 화면 너비
        margin: "0 Auto", //가운데 정렬
        minHeight: "100vh", //화면 전체 높이
        background: colors.bg, //크림 화이트 배경
        paddingBottom: 80,
      }}>
        {/* 상단 헤더 */}
        <header style={{
          padding: "16px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top:0,
          background: colors.bg,
          zIndex: 10,
        }}>
          <div style={{
            fontSize: 18,
            fontWeight: 800,
            color: colors.pinkDark,
          }}>
            💅 네일내일
          </div>
          <span>🔔</span>
        </header>

        {/* 페이지 전환 영역 */}
        <main style={{padding: "0 16px 20px"}}>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/wallet" element={<Wallet />}/>
            <Route path="/mypage" element={<MyPage />}/>
            <Route path="/reservations" element={<Booking />}/>
            <Route path="/search" element={<Search />}/>
            <Route path="/login" element={<Login />}/>
          </Routes>
        </main>

        {/*하단 탭바 */}
        <BottomTabBar />

        </div>
      </BrowserRouter>
  );
}