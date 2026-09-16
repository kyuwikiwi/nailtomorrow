import {useState, useEffect} from "react";
import {colors, cardStyle, badgeStyle} from "../styles/tokens";

export default function MyPage(){
    const [reservations, setReservations]= useState([]);
    const [wallet, setWallet]= useState(null);

    useEffect(()=> {
        const userId = localStorage.getItem("user_id");

        fetch(`http://localhost:8000/reservations/${userId}`)
            .then((res)=> res.json())
            .then((data)=> setReservations(data));

        fetch(`http://localhost:8000/wallet/${userId}`)
            .then((res)=> res.json())
            .then((data)=> setWallet(data));
    },[]);

    return (
    <div>

        {/* 프로필 */}
        <div style={{textAlign: "center", marginBottom: 24}}>
            <div style={{
                width: 72, height: 72, borderRadius: "50%",
                background: `linear-gradient(135deg, ${colors.pinkLight}, ${colors.pink})`,
                display:"flex", alignItems: "center", justifyContent:"center",
                fontSize: 30, margin:"0 auto 12px",
            }}>
                👩
            </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: colors.brown }}>
          {localStorage.getItem("nickname") || "게스트"} 님
        </div>
            <div style={{fontSize: 13, color: colors.brownLight, marginTop: 4}}>
                오늘도 당신의 손끝에 반짝임을 ✨
            </div>
        </div>

        {/* 통계 */}
        <div style={{display:"flex", gap: 10, marginBottom: 24}}>
            {[
                { n: 12, label:"찜한 샵"},
                { n: 45, label:"내 후기"},
                { n: 3, label:"진행 예약"},
            ].map((s,i)=> (
                <div key={i} style={{flex:1, ...cardStyle, textAlign: "center", padding: "16px 8px"}}>
                    <div style= {{fontSize: 22, fontWeight: 800, color: colors.brown}}>{s.n}</div>
                    <div style={{fontSize: 12, color: colors.brownLight, marginTop: 4}}>{s.label}</div>
                    </div>
            ))
            }
        </div>

        {/* 예약 카드 */}
        <div style={{...cardStyle, marginBottom: 16}}>
            <div style={{display:"flex", justifyContent:"space-between", marginBottom: 14}}>
                <span style= {{fontSize: 14, fontWeight: 600, color: colors.brownLight}}>📅 예약 내역</span>
                <span style={{fontSize: 13, color: colors.pinkDark, fontWeight: 600}}>전체보기</span>
            </div>
            <div style={{
                padding: 14, borderRadius: 16, background: colors.pinkLight,
                display:"flex", alignItems:"center", gap: 14,
            }}>
                <div style={{
                    width: 56, height: 56, borderRadius: 14,
                    background: `linear-gradient(135deg, ${colors.pink}, ${colors.pinkDark})`,
                    display:"flex", alignItems: "center", justifyContent:"center", fontSize: 24,

                }}>
                    💅
                </div>
                <div style={{flex:1}}>
                    <span style={badgeStyle(colors.white, colors.pinkDark)}>D-2 남음</span>
                    <div style={{fontSize: 15, fontWeight: 700, color: colors.brown, marginTop: 4}}>블링블링 네일샵</div>
                    <div style={{fontSize:12, color: colors.brownLight, marginTop:2}}>이달의 아트 · 파츠 추가 </div>
                </div>
                <div style={{textAlign:"right"}}>
                    <div style={{fontSize: 13, fontWeight: 700, color:colors.brown}}>11월 24일</div>
                    <div style={{fontSize: 12, color:colors.brownLight}}>14:00</div>
                </div>
            </div>
        </div>

        {/* 리터치 D-7 알림 */}
        <div style={{
            ...cardStyle, marginBottom: 16, padding: "14px 16px",
            background: colors.yellow,
        }}>
            <div style={{display: "flex", justifyContent:"space-between", marginBottom: 8}}>
                <span style={{fontSize: 12, color: colors.brownLight}}>오늘 오전 09:00</span>
                <span style={badgeStyle(colors.pinkLight, colors.pinkDark)}>리터치 D-7</span>

            </div>
            <div style={{fontSize:14, fontWeight:700,color:colors.brown, marginBottom: 8}}>
                💕 손톱 단장할 시간 다가와요! 늦기 전에 단골 샵 예약할까요?
            </div>
            <button style={{
                padding:"10px 20px", borderRadius: 14, border:"none",
                background: colors.white, color: colors.brown, fontWeight: 700, fontSize: 13,
            }}>
                빠른 예약하기 ⚡
            </button>
        </div>

        {/* 설정 메뉴 */}
        <div style={{fontSize: 14, fontWeight: 700, color:colors.brownLight, marginBottom: 10}}>
            내 정보 설정
        </div>
        <div style={{...cardStyle, padding: 0, overflow:"hidden"}}>
            {[
                {icon: "👤", label: "내 정보 수정" },
                { icon: "🎟️", label: "내 쿠폰함" },
                { icon: "⚙️", label: "알림 및 서비스 설정" },
                { icon: "❓", label: "고객 센터" },
            ].map((m, i)=>(
                <div key={i} style={{
                    display:"flex", alignItems:"center", padding: "16px 20px",
                    borderBottom: i<3? `1px solid ${colors.pinkLight}`: "none",
                    cursor: "pointer",
                }}>
                    <span style={{fontSize: 18, marginRight: 12}}>{m.icon}</span>
                    <span style={{ flex:1, color: colors.brown }}>{m.label}</span>
                    <span style={{ color: colors.brownLight }}>›</span>
                </div>
            ))}
        </div>

        {/*로그아웃 */}
        <div style={{textAlign:"center", marginTop: 24}}>
            <span style={{fontSize: 13, color:colors.brownLight}}>로그아웃</span>
        </div>
    </div>
    );
    
}