import { useState, useEffect } from "react";
import { colors, cardStyle } from "../styles/tokens";

export default function Booking() {
  const [step, setStep] = useState(1);
  const [shops, setShops] = useState([]);
  const [shopQuery, setShopQuery] = useState("");
  const [selectedShop, setSelectedShop] = useState(null);
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [reservations, setReservations] = useState([]);
  const [payMethod, setPayMethod] = useState("wallet");

  const userId = localStorage.getItem("user_id");

  // 내 예약 목록 + 샵 검색
  useEffect(() => {
    fetch(`http://localhost:8000/reservations/${userId}`)
      .then((res) => res.json())
      .then((data) => setReservations(data));
  }, []);

  const searchShops= ()=> {
    if (!shopQuery) return;
    fetch(`http://localhost:8000/search/shops?query=${shopQuery}&display=5`)
        .then((res) => res.json())
        .then((data)=> setShops(data));
  };

  // 예약 생성
  const handleReserve = () => {
    console.log("보내는 데이터:", {
      user_id: parseInt(userId),
      shop_name: selectedShop?.name,
      service: service,
      date: date,
      time: time,
    });
    fetch("http://localhost:8000/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: parseInt(userId),
        shop_name: selectedShop.name,
        service: service,
        date: date,
        time: time,
        price: services.find((s) => s.name === service)?.price || 50000,
        deposit: 20000,
        pay_with_wallet: payMethod === "wallet",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage("예약이 완료되었어요! 🎉");
        setStep(4);
        // 예약 목록 새로고침
        fetch(`http://localhost:8000/reservations/${userId}`)
          .then((res) => res.json())
          .then((data) => setReservations(data));
      });
  };

  // 시술 목록
  const services = [
    { name: "이달의 아트", price: 65000, icon: "✨" },
    { name: "젤네일", price: 45000, icon: "💅" },
    { name: "케어/영양", price: 35000, icon: "🌿" },
    { name: "페디큐어", price: 40000, icon: "👣" },
    { name: "글리터 네일", price: 55000, icon: "🪩" },
    { name: "원컬러", price: 30000, icon: "🎨" },
  ];

  // 시간 목록
  const times = [
    "10:00", "10:30", "11:00", "11:30",
    "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30",
  ];

  // 공통 스타일
  const btnStyle = {
    width: "100%", padding: 14, borderRadius: 16, border: "none",
    background: `linear-gradient(135deg, ${colors.pinkDark}, ${colors.pink})`,
    color: colors.white, fontSize: 15, fontWeight: 700, cursor: "pointer",
  };

  return (
    <div>

      {/* ── 내 예약 목록 ── */}
      {step === 1 && reservations.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: colors.brown, marginBottom: 14 }}>
            내 예약
          </h2>
          {reservations.filter((r) => r.status !== "취소됨").map((r, i) => (
            <div key={i} style={{
              ...cardStyle, marginBottom: 12,
              background: r.d_day >= 0 ? "#FFF0F5" : colors.white,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: colors.brown }}>{r.shop_name}</div>
                  <div style={{ fontSize: 13, color: colors.brownLight, marginTop: 2 }}>{r.service}</div>
                  <div style={{ fontSize: 12, color: colors.brownLight, marginTop: 4 }}>
                    {r.date} {r.time}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{
                    padding: "4px 10px", borderRadius: 10, fontSize: 12, fontWeight: 700,
                    background: r.d_day >= 0 ? colors.pinkLight : "#eee",
                    color: r.d_day >= 0 ? colors.pinkDark : colors.brownLight,
                  }}>
                    {r.d_day >= 0 ? `D-${r.d_day}` : "지난 예약"}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: colors.brown, marginTop: 4 }}>
                    {r.price.toLocaleString()}원
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── 새 예약 버튼 ── */}
      {step === 1 && (
        <div>
          <button onClick={() => setStep(2)} style={btnStyle}>
            + 새 예약하기
          </button>
        </div>
      )}

      {/* ── 스텝 2: 샵 & 시술 선택 ── */}
      {step === 2 && (
        <div>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
            <span onClick={() => setStep(1)} style={{ fontSize: 20, cursor: "pointer", marginRight: 10 }}>←</span>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: colors.brown }}>시술 선택</h2>
          </div>

            {/* 샵 검색 */}
          <div style={{ fontSize: 14, fontWeight: 700, color: colors.brown, marginBottom: 10 }}>
            네일샵 검색
          </div>
          <div style={{
            ...cardStyle, padding: "10px 14px",
            display: "flex", gap: 10, marginBottom: 12,
          }}>
            <input
              type="text"
              value={shopQuery}
              onChange={(e) => setShopQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchShops()}
              placeholder="지역 (예: 강남)"
              style={{
                flex: 1, border: "none", outline: "none",
                fontSize: 14, color: colors.brown, background: "transparent",
              }}
            />
            <button onClick={searchShops} style={{
              padding: "8px 14px", borderRadius: 12, border: "none",
              background: colors.pinkDark, color: colors.white,
              fontWeight: 700, fontSize: 13, whiteSpace: "nowrap",
            }}>
              검색
            </button>
          </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
            {shops.map((shop, i) => (
              <div key={i} onClick={() => setSelectedShop(shop)} style={{
                ...cardStyle, padding: "14px 16px", cursor: "pointer",
                border: selectedShop?.name === shop.name && selectedShop?.road_address === shop.road_address ? `2px solid ${colors.pinkDark}` : "2px solid transparent",
              }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: colors.brown }}>{shop.name}</div>
                <div style={{ fontSize: 12, color: colors.brownLight, marginTop: 2 }}>{shop.road_address}</div>
              </div>
            ))}
          </div>

          {/* 시술 선택 */}

          {/* 시술 선택 */}
          <div style={{ fontSize: 14, fontWeight: 700, color: colors.brown, marginBottom: 10 }}>
            시술 선택
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
            {services.map((s, i) => (
              <div key={i} onClick={() => setService(s.name)} style={{
                padding: "12px 16px", borderRadius: 16, cursor: "pointer",
                background: service === s.name ? colors.pinkDark : colors.pinkLight,
                color: service === s.name ? colors.white : colors.brown,
                fontWeight: 700, fontSize: 13,
              }}>
                {s.icon} {s.name}
                <div style={{
                  fontSize: 11, marginTop: 4,
                  color: service === s.name ? "rgba(255,255,255,0.8)" : colors.brownLight,
                }}>
                  {s.price.toLocaleString()}원
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => selectedShop && service && setStep(3)}
            style={{
              ...btnStyle,
              background: selectedShop && service
                ? `linear-gradient(135deg, ${colors.pinkDark}, ${colors.pink})`
                : "#ddd",
              color: selectedShop && service ? colors.white : "#aaa",
            }}
          >
            다음
          </button>
        </div>
      )}

      {/* ── 스텝 3: 날짜 & 시간 선택 ── */}
      {step === 3 && (
        <div>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
            <span onClick={() => setStep(2)} style={{ fontSize: 20, cursor: "pointer", marginRight: 10 }}>←</span>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: colors.brown }}>날짜 & 시간</h2>
          </div>

          {/* 선택한 샵 + 시술 요약 */}
          <div style={{ ...cardStyle, marginBottom: 20, background: "#FFF0F5" }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: colors.brown }}>{selectedShop.name}</div>
            <div style={{ fontSize: 13, color: colors.pinkDark, marginTop: 4 }}>{service}</div>
          </div>

          {/* 날짜 선택 */}
          <div style={{ fontSize: 14, fontWeight: 700, color: colors.brown, marginBottom: 10 }}>
            날짜 선택
          </div>
          <input
            type="date"
            value={date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
            style={{
              width: "100%", padding: "12px 14px", borderRadius: 12,
              border: `1px solid ${colors.pinkLight}`, fontSize: 14, outline: "none",
              boxSizing: "border-box", marginBottom: 20,
            }}
          />

          {/* 시간 선택 */}
          <div style={{ fontSize: 14, fontWeight: 700, color: colors.brown, marginBottom: 10 }}>
            시간 선택
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
            {times.map((t, i) => (
              <div key={i} onClick={() => setTime(t)} style={{
                padding: "10px 16px", borderRadius: 12, cursor: "pointer",
                background: time === t ? colors.pinkDark : colors.pinkLight,
                color: time === t ? colors.white : colors.brown,
                fontWeight: 600, fontSize: 13,
              }}>
                {t}
              </div>
            ))}
          </div>

          {/* 결제 요약 */}
          {date && time && (
            <div style={{ ...cardStyle, marginBottom: 20 }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: colors.brown, marginBottom: 14 }}>
                결제 금액
              </h3>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 8 }}>
                <span style={{ color: colors.brownLight }}>시술 금액</span>
                <span style={{ color: colors.brown }}>
                  {(services.find((s) => s.name === service)?.price || 0).toLocaleString()}원
                </span>
              </div>
              <div style={{
                display: "flex", justifyContent: "space-between", fontSize: 14,
                padding: "8px 12px", background: colors.pinkLight, borderRadius: 12, marginBottom: 8,
              }}>
                <span style={{ fontWeight: 700, color: colors.brown }}>예약금</span>
                <span style={{ fontWeight: 700, color: colors.brown }}>20,000원</span>
              </div>
              <div style={{
                display: "flex", justifyContent: "space-between", fontSize: 14,
                borderTop: `1px dashed ${colors.pinkLight}`, paddingTop: 10,
              }}>
                <span style={{ color: colors.brownLight }}>현장 결제</span>
                <span style={{ fontSize: 18, fontWeight: 800, color: colors.brown }}>
                  {((services.find((s) => s.name === service)?.price || 0) - 20000).toLocaleString()}원
                </span>
              </div>
            </div>
          )}

                  

          {/* 결제 수단 — 여기에 추가! */}
          <div style={{ fontSize: 14, fontWeight: 700, color: colors.brown, marginBottom: 10 }}>
            결제 수단
          </div>
          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            <div onClick={() => setPayMethod("wallet")} style={{
              flex: 1, padding: "14px", borderRadius: 16, textAlign: "center",
              background: payMethod === "wallet" ? colors.pinkDark : colors.pinkLight,
              color: payMethod === "wallet" ? colors.white : colors.brown,
              fontWeight: 700, fontSize: 13, cursor: "pointer",
            }}>
              💳 회원권 결제
            </div>
            <div onClick={() => setPayMethod("card")} style={{
              flex: 1, padding: "14px", borderRadius: 16, textAlign: "center",
              background: payMethod === "card" ? colors.pinkDark : colors.pinkLight,
              color: payMethod === "card" ? colors.white : colors.brown,
              fontWeight: 700, fontSize: 13, cursor: "pointer",
            }}>
              💰 현장 결제
            </div>
          </div>


          <button
            onClick={() => date && time && handleReserve()}
            style={{
              ...btnStyle,
              background: date && time
                ? `linear-gradient(135deg, ${colors.pinkDark}, ${colors.pink})`
                : "#ddd",
              color: date && time ? colors.white : "#aaa",
            }}
          >
            20,000원 예약 결제하기 →
          </button>
        </div>
      )}

      {/* ── 스텝 4: 완료 ── */}
      {step === 4 && (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <div style={{ fontSize: 60, marginBottom: 16 }}>🎉</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: colors.brown, marginBottom: 8 }}>
            예약 완료!
          </div>
          <div style={{ fontSize: 14, color: colors.brownLight, marginBottom: 8 }}>
            {selectedShop?.name} · {service}
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: colors.brown, marginBottom: 24 }}>
            {date} {time}
          </div>
          <button onClick={() => { setStep(1); setMessage(""); setService(""); setDate(""); setTime(""); setSelectedShop(null); }} style={btnStyle}>
            예약 내역 보기
          </button>
        </div>
      )}

    </div>
  );
}