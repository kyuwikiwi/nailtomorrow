import {useNavigate, useLocation} from "react-router-dom";
import { colors } from "../styles/tokens";

// 탭 목록 정의
const tabs= [
    {path: "/", label:"홈", icon:"🏠"},
    {path:"/search", label:"검색", icon:"🔍"},
    {path:"/reservations", label:"예약내역", icon:"📅"},
    {path:"/wallet", label:"내 지갑", icon:"💳"},
    {path:"/mypage", label:"마이페이지", icon:"👤"},
];

export default function BottomTablBar(){
    const navigate= useNavigate(); //페이지 이동 함수
    const location= useLocation(); //현재 어떤 페이지인지 확인

    return (
        <nav style={{
            position:"fixed",
            bottom: 0,
            left:"50%",
            transform: "translateX(-50%)",
            width:"100%",
            maxWidth: 420,
            background: colors.white,
            borderTop: `1px solid ${colors.pinkLight}`,
            display:"flex",
            justifyContent:"space-around",
            padding: "10px 0 18px",
            zIndex: 20,
        }}>

            {tabs.map((tab)=> {
                //현재 페이지와 탭의 경로가 같으면 활성화
                const active= location.pathname=== tab.path;

                return(
                    <button
                    key={tab.path}
                    onClick={()=> navigate(tab.path)}
                    style={{
                        background:"none",
                        border:"none",
                        display:"flex",
                        flexDirection:"column",
                        alignItems:"center",
                        gap: 4,
                        padding:"4px 8px",
                        opacity: active? 1: 0.5,
                    }}
                    >
                       <span style= {{fontSize: 20}}>{tab.icon}</span>
                       <span style={{
                            fontSize:10,
                            fontWeight: active? 700:400,
                            color: active? colors.pinkDark: colors.brownLight,
                       }}>
                        {tab.label}
                       </span>
                    </button>
                );
            })}
        </nav>
    );
}