import { useState, useEffect } from "react";
import { colors, cardStyle } from "../styles/tokens";

export default function Wallet() {
  const [wallet, setWallet] = useState(null);
  const [history, setHistory] = useState([]);
  const [showRegister, setShowRegister] = useState(false);
  const [regShop, setRegShop] = useState("");
  const [regType, setRegType] = useState("amount");
  const [regTotal, setRegTotal] = useState("");

  const userId = localStorage.getItem("user_id");

  const loadWallet = () => {
    fetch(`http://localhost:8000/wallet/${userId}`)
      .then((res) => res.json())
      .then((data) => setWallet(data));

    fetch(`http://localhost:8000/wallet/${userId}/history`)
      .then((res) => res.json())
      .then((data) => setHistory(data));
  };

  useEffect(() => { loadWallet(); }, []);

  // 회원권 등록
  const handleRegister = () => {
    if (!regShop || !regTotal) return;
    fetch("http://localhost:8000/wallet/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: parseInt(userId),
        shop_name: regShop,
        wallet_type: regType,
        total: parseInt(regTotal),
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setShowRegister(false);
        loadWallet();
      });
  };

  if (!wallet) return <div style={{ textAlign: "center", padding: 40 }}>로딩중...</div>;

  // 회원권 없으면 등록 화면
  if (wallet.error) return (
    <div style={{ padding: "20px 0" }}>
      {!showRegister ? (
        <div style={{ textAlign: "center", padding: 40 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>💳</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: colors.brown }}>아직 등록된 회원권이 없어요</div>
          <div style={{ fontSize: 13, color: colors.brownLight, marginTop: 6, marginBottom: 20 }}>
            네일샵 회원권을 등록해보세요
          </div>
          <button onClick={() => setShowRegister(true)} style={{
            padding: "14px 28px", borderRadius: 16, border: "none",
            background: `linear-gradient(135deg, ${colors.pinkDark}, ${colors.pink})`,
            color: colors.white, fontSize: 15, fontWeight: 700, cursor: "pointer",
          }}>
            + 회원권 등록하기
          </button>
        </div>
      ) : (
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: colors.brown, marginBottom: 20 }}>
            회원권 등록
          </h2>
          <div style={{ ...cardStyle }}>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: colors.brownLight, marginBottom: 6 }}>네일샵 이름</div>
              <input type="text" value={regShop} onChange={(e) => setRegShop(e.target.value)}
                placeholder="예: 유후네일" style={{
                  width: "100%", padding: "12px 14px", borderRadius: 12,
                  border: `1px solid ${colors.pinkLight}`, fontSize: 14, outline: "none",
                  boxSizing: "border-box",
                }} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: colors.brownLight, marginBottom: 6 }}>회원권 종류</div>
              <div style={{ display: "flex", gap: 10 }}>
                <div onClick={() => setRegType("amount")} style={{
                  flex: 1, padding: "12px", borderRadius: 12, textAlign: "center",
                  background: regType === "amount" ? colors.pinkDark : colors.pinkLight,
                  color: regType === "amount" ? colors.white : colors.brown,
                  fontWeight: 700, fontSize: 14, cursor: "pointer",
                }}>
                  💰 정액권
                </div>
                <div onClick={() => setRegType("count")} style={{
                  flex: 1, padding: "12px", borderRadius: 12, textAlign: "center",
                  background: regType === "count" ? colors.pinkDark : colors.pinkLight,
                  color: regType === "count" ? colors.white : colors.brown,
                  fontWeight: 700, fontSize: 14, cursor: "pointer",
                }}>
                  🔢 횟수권
                </div>
              </div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, color: colors.brownLight, marginBottom: 6 }}>
                {regType === "amount" ? "충전 금액 (원)" : "총 횟수 (회)"}
              </div>
              <input type="number" value={regTotal} onChange={(e) => setRegTotal(e.target.value)}
                placeholder={regType === "amount" ? "예: 300000" : "예: 5"}
                style={{
                  width: "100%", padding: "12px 14px", borderRadius: 12,
                  border: `1px solid ${colors.pinkLight}`, fontSize: 14, outline: "none",
                  boxSizing: "border-box",
                }} />
            </div>
            <button onClick={handleRegister} style={{
              width: "100%", padding: 14, borderRadius: 16, border: "none",
              background: `linear-gradient(135deg, ${colors.pinkDark}, ${colors.pink})`,
              color: colors.white, fontSize: 15, fontWeight: 700, cursor: "pointer",
            }}>
              등록 완료
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // 회원권이 있으면 표시
  const isAmount = wallet.wallet_type === "amount";
  const unit = isAmount ? "원" : "회";
  const pct = wallet.total > 0 ? Math.round((wallet.balance / wallet.total) * 100) : 0;

  return (
    <div>

      {/* 멤버십 카드 */}
      <div style={{
        ...cardStyle,
        padding: "24px 20px",
        background: `linear-gradient(135deg, ${colors.pinkLight}, ${colors.yellow})`,
        marginBottom: 16,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: colors.brownLight }}>
            {isAmount ? "정액권" : "횟수권"}
          </div>
          <div style={{
            padding: "4px 10px", borderRadius: 10, fontSize: 11, fontWeight: 700,
            background: isAmount ? colors.pinkLight : colors.greenLight,
            color: isAmount ? colors.pinkDark : colors.green,
          }}>
            {isAmount ? "💰 금액 차감" : "🔢 횟수 차감"}
          </div>
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: colors.brown, margin: "4px 0 16px" }}>
          {wallet.shop_name}
        </div>
        <div style={{ fontSize: 11, color: colors.brownLight }}>회원</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: colors.brown }}>
          {localStorage.getItem("nickname") || "게스트"} 님
        </div>
      </div>

      {/* 잔액/잔여횟수 카드 */}
      <div style={{ ...cardStyle, marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: colors.brownLight }}>
            {isAmount ? "현재 잔액" : "잔여 횟수"}
          </span>
          <span style={{ fontSize: 13, color: colors.pinkDark, fontWeight: 600 }}>
            {isAmount ? "⊕ 충전하기" : "⊕ 횟수 추가"}
          </span>
        </div>
        <div style={{ fontSize: 28, fontWeight: 800, color: colors.brown, marginBottom: 8 }}>
          {isAmount ? wallet.balance.toLocaleString() : wallet.balance} {unit}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: colors.brownLight, marginBottom: 8 }}>
          <span>사용 가능</span>
          <span>{pct}% 남음</span>
        </div>
        <div style={{ height: 8, borderRadius: 4, background: colors.pinkLight }}>
          <div style={{
            width: `${pct}%`, height: "100%", borderRadius: 4,
            background: `linear-gradient(90deg, ${colors.pinkDark}, ${colors.pink})`,
          }} />
        </div>
      </div>

      {/* 이용 내역 */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: colors.brown }}>이용 내역</h2>
      </div>

      {history.length === 0 && (
        <div style={{ textAlign: "center", padding: 20, color: colors.brownLight, fontSize: 13 }}>
          아직 이용 내역이 없어요
        </div>
      )}

      {history.map((item, i) => (
        <div key={i} style={{
          ...cardStyle, padding: "16px",
          display: "flex", alignItems: "center", gap: 14,
          marginBottom: 12,
          background: item.amount > 0 ? colors.pinkLight : colors.white,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 14,
            background: item.amount > 0 ? colors.pink : colors.pinkLight,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20,
          }}>
            {item.amount > 0 ? "💳" : "💅"}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: colors.brown }}>
              {item.service}
            </div>
            <div style={{ fontSize: 12, color: colors.brownLight, marginTop: 2 }}>
              {item.date}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{
              fontSize: 16, fontWeight: 800,
              color: item.amount > 0 ? colors.green : colors.red,
            }}>
              {item.amount > 0 ? "+" : ""}{isAmount ? item.amount.toLocaleString() : item.amount} {unit}
            </div>
            <div style={{ fontSize: 11, color: colors.brownLight, marginTop: 2 }}>
              {item.amount > 0 ? "✓ 충전 완료" : "상세보기"}
            </div>
          </div>
        </div>
      ))}

    </div>
  );
}