import {useState } from "react";
import {colors, cardStyle } from "../styles/tokens";

export default function Login({onSuccess, onGoSignup}){
    const [email, setEmail] =useState("");
    const [password, setPassword]= useState("");
    const [message, setMessage]= useState("");

    //로그인 버튼 눌렀을때
    const handleLogin= ()=> {
        fetch("http://localhost:8000/login",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ email, password}),

        })
            .then((res)=> res.json())
            .then((data)=> {
                if (data.error){
                    setMessage(data.error);
                } else {
                    setMessage(`${data.nickname} 님 환영합니다!`);
                    //토큰을 브라우저에 저장(다음에 재사용)
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user_id", data.user_id);
                    localStorage.setItem("nickname", data.nickname);
                    onSuccess();
                }
            });
    };

    return (
        <div style ={{padding: "40px 0"}}>
            
            {/* 로고 */}
            <div style={{ textAlign: "center", marginBottom: 40}}>
                <div style= {{fontSize: 40, marginBottom: 8}}>💅</div>
                <div style= {{fontSize: 22, fontWeight: 800, color: colors.brown}}>네일내일</div>
            </div>

            {/* 로그인 폼 */}
            <div style={{ ...cardStyle}}>
                <div style={{marginBottom: 16}}>
                    <label style={{fontSize: 13, color: colors.brownLight, marginBottom: 6, display: "block"}}>
                        이메일
                    </label>
                    <input
                        type="email"
                        value= {email}
                        onChange={(e)=> setEmail(e.target.value)}
                        placeholder="이메일을 입력하세요"
                        style={{
                            width: "100%",
                            padding: "12px 14px",
                            borderRadius: 12,
                            border: `1px solid ${colors.pinkLight}`,
                            fontSize: 14,
                            outline: "none",
                        }}
                        />
                </div>

                <div style={{marginBottom: 20}}>
                    <label style= {{fontSize: 13, color: colors.brownLight, marginBottom: 6, display:"block" }}>
                        비밀번호
                    </label>
                    <input
                        type= "password"
                        value={password}
                        onChange= {(e) => setPassword(e.target.value)}
                        placeholder="비밀번호를 입력하세요"
                        style= {{
                            width: "100%",
                            padding: "12px 14px",
                            borderRadius: 12,
                            border: `1px solid ${colors.pinkLight}`,
                            fontSize: 14,
                            outline: "none",
                        }}
                        />

                </div>

                {/* 로그인 버튼 */}
                <button 
                    onClick ={handleLogin}
                    style={{
                        width: "100%",
                        padding: 14,
                        borderRadius: 16,
                        border: "none",
                        background: `linear-gradient(135deg, ${colors.pinkDark}, ${colors.pink})`,
                        color: colors.white,
                        fontSize: 15,
                        fontWeight: 700,
                    }}
                    >
                        로그인
                    </button>

                    {/* 결과 메시지 */}
                    {message && (
                        <div style ={{
                            marginTop: 16,
                            textAlign: "center",
                            fontSize: 13,
                            color: colors.brown,
                        }}>
                            {message}
                        </div>
                    )
                    }

                    <div 
                        onClick= {onGoSignup}
                        style={{
                            marginTop: 16, textAlign: "center", fontSize: 13,
                            color: colors.pinkDark, cursor:"pointer",
                        }}
                        >
                            계정이 없으신가요? 회원가입
                    </div>
            </div>

        </div>
    );
}