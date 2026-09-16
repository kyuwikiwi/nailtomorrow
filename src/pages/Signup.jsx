import { useState, useEffect} from "react";
import {colors, cardStyle} from "../styles/tokens";

export default function Signup({onSuccess}) {
    const [step, setStep]= useState(1);

    // 스텝1: 계정 정보
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    // 스텝 2: 본인 인증
    const [name, setName] = useState("");
    const [birth, setBirth] = useState("--");
    const [phone, setPhone] = useState("");
    const [code, setCode] = useState("");
    const [codeSent, setCodeSent] = useState(false);
    const [timer, setTimer] = useState(0);
    const [verified, setVerified] = useState(false);

    // 스텝 3: 닉네임
    const [nickname, setNickname] = useState("");
    const [message, setMessage] = useState("");

    // 비밀번호 규칙 확인 (8자 이상, 영어+숫자 포함)
    const isValidPassword= (pw) => {
        return pw.length >= 8 && /[a-zA-Z]/.test(pw) && /[0-9]/.test(pw);
    };

    // 이메일 형식 확인
    const isValidEmail= (em) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);
    };

    //타이머
    useEffect(()=> {
        if (timer>0){
            const interval= setInterval(()=> setTimer((t)=> t-1), 1000);
            return ()=> clearInterval(interval);
        }
    }, [timer]);

    //인증번호 발송
    const sendCode=() =>{
        setCodeSent(true);
        setTimer(180);
        setMessage("인증번호가 발송되었습니다");
    };
    
    //인증번호 확인
    const verifyCode =() =>{
        if (code ==="1234") {
            setVerified(true);
            setMessage("인증 완료!");
        } else{
            setMessage("인증번호가 올바르지 않습니다");
        }
    };

    //스텝 1-> 2 넘어갈때
    const goStep2=() => {
        if (!isValidEmail(email)){
            setMessage("올바른 이메일 형식을 입력하세요");
            return;
        }
        if (!isValidPassword(password)){
            setMessage("비밀번호는 8자 이상, 영어와 숫자를 포함해야 합니다");
            return;
        }
        if (password !== passwordConfirm) {
            setMessage("비밀번호가 일치하지 않습니다");
            return;
        }
        setMessage("");
        setStep(2);
    }

    //스텝 2> 3 넘어갈때
    const goStep3= () =>{
        if(!name){
            setMessage("이름을 입력하세요");
            return;
        }
        if (birth=== "--"){
            setMessage("생년월일을 선택하세요")
        }
        if (!verified){
            setMessage("휴대폰 인증을 완료하세요");
            return;
        }
        setMessage("");
        setStep(3);
    }

    //최종 회원가입
    const handleSignup= ()=> {
        if (!nickname) {
            setMessage("닉네임을 입력하세요");
            return;
        }

        fetch("http://localhost:8000/signup", {
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ name, nickname, birth, email, password, phone}),
        })
        .then((res)=> res.json())
        .then((data)=> {
            if (data.error){
                setMessage(data.error);
            } else {
                setMessage("회원가입 완료! 로그인해주세요.");
                setTimeout(()=> onSuccess(), 1500);
            }
        });
    };

    //타이머 표시
    const formatTime= (s) => `${Math.floor(s/ 60)}:${String(s%60).padStart(2, "0")}`;

    //입력창 공통 스타일
    const inputStyle={
        width: "100%", padding:"12px 14px", borderRadius: 12,
        border: `1px solid ${colors.pinkLight}`, fontSize: 14, outline: "none",
        boxSizing: "border-box",
    };

    const labelStyle= {fontSize: 13, color: colors.brownLight, marginBottom: 6, display:"block"};
    const btnStyle={
        width: "100%", padding: 14, borderRadius: 16, border: "none",
        background: `linear-gradient(135deg, ${colors.pinkDark}, ${colors.pink})`,
        color: colors.white, fontSize: 15, fontWeight: 700, cursor: "pointer",
    };
    const btnDisabled= {...btnStyle, background: "#ddd", color: "#aaa", cursor: "default"};

    return (
        <div style={{padding: "40px 0"}}>

            {/*로고 */}
            <div style ={{textAlign: "center", marginBottom: 40}}>
                <div style ={{fontSize: 40, marginBottom: 8}}>💅</div>
                <div style ={{fontSize: 22, fontWeight: 800, color:colors.brown}}>회원가입</div>
            </div>

            {/* 스텝 인디케이터 */}
            <div style= {{display:"flex", alignItems:"center", justifyContent:"center", marginBoittom: 40}}>
                {[1,2,3].map((n,i)=> (
                    <div key={n} style={{display: "flex", alignItems: "center"}}>
                        <div style={{
                            width: 30, height: 30, borderRadius: "50%",
                            background: step>= n? colors.pinkDark: "#eee",
                            color: step >= n? colors.white: colors.brownLight,
                            display:"flex", alignItems:"center", justifyContent:"center",
                            fontSize: 13, fontWeight: 700,
                         }}>
                            {n}
                        </div>
                        {i<2 &&(
                            <div style= {{ width: 40, height: 2, background: step > n ? colors.pinkDark : "#eee", margin: "0 6px" }}/>
                        )}
                    </div>
                ))}
            </div>

            <div style={{...cardStyle, marginTop: 20}}>

                {/* 스텝 1: 계정 정보 */}
                  {step === 1 && (
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: colors.brown, marginBottom: 16 }}>
              계정 정보
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>이메일</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력하세요" style={inputStyle} />
              {email.length > 0 && !isValidEmail(email) && (
                <div style={{ fontSize: 12, color: colors.red, marginTop: 6 }}>올바른 이메일 형식을 입력하세요.</div>
              )}
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>비밀번호</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요" style={inputStyle} />
              {password.length > 0 && !isValidPassword(password) && (
                <div style={{ fontSize: 12, color: colors.red, marginTop: 6 }}>영어와 숫자를 포함해서 8자리 이상 입력하세요.</div>
              )}
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>비밀번호 확인</label>
              <input type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}
                placeholder="비밀번호를 다시 입력하세요" style={inputStyle} />
              {passwordConfirm.length > 0 && password !== passwordConfirm && (
                <div style={{ fontSize: 12, color: colors.red, marginTop: 6 }}>비밀번호가 일치하지 않습니다.</div>
              )}
            </div>

            <button onClick={goStep2} style={btnStyle}>다음</button>
          </div>
        )}

            {/* 스텝2: 본인 인증 */}
            {step === 2 && (
            <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: colors.brown, marginBottom: 16 }}>
                본인 인증
                </div>

                <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>이름</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="이름을 입력하세요" style={inputStyle} />
                </div>

                <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>생년월일</label>
                <div style={{ display: "flex", gap: 8 }}>
                    <select value={birth.split("-")[0] || ""}
                    onChange={(e) => setBirth(`${e.target.value}-${birth.split("-")[1] || ""}-${birth.split("-")[2] || ""}`)}
                    style={{ ...inputStyle, flex: 1 }}>
                    <option value="">년</option>
                    {Array.from({ length: 50 }, (_, i) => 2010 - i).map((y) => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                    </select>
                    <select value={birth.split("-")[1] || ""}
                    onChange={(e) => setBirth(`${birth.split("-")[0] || ""}-${e.target.value}-${birth.split("-")[2] || ""}`)}
                    style={{ ...inputStyle, flex: 1 }}>
                    <option value="">월</option>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                        <option key={m} value={m}>{m}월</option>
                    ))}
                    </select>
                    <select value={birth.split("-")[2] || ""}
                    onChange={(e) => setBirth(`${birth.split("-")[0] || ""}-${birth.split("-")[1] || ""}-${e.target.value}`)}
                    style={{ ...inputStyle, flex: 1 }}>
                    <option value="">일</option>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                        <option key={d} value={d}>{d}일</option>
                    ))}
                    </select>
                </div>
                </div>

                <div style= {{marginBottom: 16}}>
                    <label style={labelStyle}>휴대폰 번호</label>
                    <div style= {{display:"flex", gap: 8}}>
                        <input type="tel" value={phone} onChange={(e)=> setPhone(e.target.value)}
                        placeholder="01012345678" style={{...inputStyle, flex:1}} />
                        <button onClick={sendCode} style={{
                            padding: "12px 16px", borderRadius: 12, border:"none",
                            background: colors.pinkLight, color:colors.brown, fontWeight: 700,
                            fontSize: 13, whiteSpace:"nowrap", cursor:"pointer",
                        }}>
                            {codeSent? "재전송": "인증요청"}
                        </button>
                    </div>

                </div>

                {codeSent && (
                <div style={{ marginBottom: 20 }}>
                    <label style={labelStyle}>인증번호</label>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <input type="text" value={code} onChange={(e) => setCode(e.target.value)}
                        placeholder="인증번호 입력" style={{ ...inputStyle, flex: 1 }}
                        disabled={verified} />
                    <button onClick={verifyCode} disabled={verified}
                        style={{
                        padding: "12px 16px", borderRadius: 12, border: "none",
                        background: verified ? colors.greenLight : colors.pinkDark,
                        color: verified ? colors.green : colors.white,
                        fontWeight: 700, fontSize: 13, whiteSpace: "nowrap",
                        cursor: verified ? "default" : "pointer",
                        }}>
                        {verified ? "✓ 완료" : "확인"}
                    </button>
                    </div>
                    {!verified && timer > 0 && (
                    <div style={{ fontSize: 12, color: colors.pinkDark, marginTop: 6 }}>
                        남은 시간: {formatTime(timer)}
                    </div>
                    )}
                </div>
                )}

                <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => { setStep(1); setMessage(""); }}
                    style={{ flex: 1, padding: 14, borderRadius: 16, border: `1px solid ${colors.pinkLight}`,
                    background: colors.white, color: colors.brown, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
                    이전
                </button>
                <button onClick={goStep3} style={{ ...btnStyle, flex: 2 }}>다음</button>
                </div>
            </div>
            )}

            {/* 스텝3: 닉네임 */}
            {step === 3 && (
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: colors.brown, marginBottom: 8 }}>
              프로필 설정
            </div>
            <div style={{ fontSize: 13, color: colors.brownLight, marginBottom: 20 }}>
              네일내일에서 사용할 닉네임을 정해주세요 ✨
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>닉네임</label>
              <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임을 입력하세요" style={inputStyle} />
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => { setStep(2); setMessage(""); }}
                style={{ flex: 1, padding: 14, borderRadius: 16, border: `1px solid ${colors.pinkLight}`,
                  background: colors.white, color: colors.brown, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
                이전
              </button>
              <button onClick={handleSignup} style={{ ...btnStyle, flex: 2 }}>가입 완료 🎉</button>
            </div>
          </div>
        )}

            {/* 메시지 */}
            {message && (
            <div style={{ marginTop: 16, textAlign: "center", fontSize: 13, color: colors.brown }}>
                {message}
            </div>
            )}

            {/* 로그인으로 이동 */}
            <div onClick={onSuccess}
            style={{ marginTop: 16, textAlign: "center", fontSize: 13, color: colors.pinkDark, cursor: "pointer" }}>
            이미 계정이 있으신가요? 로그인
            </div>
        </div>

    </div>
    );
}