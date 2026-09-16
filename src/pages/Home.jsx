import { useState, useEffect } from "react";
import { colors, cardStyle, badgeStyle } from "../styles/tokens";

export default function Home() {
  const [shops, setShops] = useState([]);
  const nickname = localStorage.getItem("nickname") || "게스트";

  useEffect(() => {
    fetch("http://localhost:8000/search/shops?query=서울네일샵&display=5")
      .then((res) => res.json())
      .then((data) => setShops(data));
  }, []);

  return (
    <div>

      {/* ── 리터치 알림 카드 ── */}
      <div style={{
        background: "#FFF0F5",
        borderRadius: 24,
        padding: "20px",
        marginBottom: 24,
        boxShadow: "0 4px 16px rgba(245,163,184,0.15)",
      }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: colors.brown, marginBottom: 8 }}>
          ⏰ {nickname}님, 리터치 주기가 다가왔어요!
        </div>
      
        <button style={{
          padding: "10px 20px",
          borderRadius: 12,
          border: "none",
          background: colors.pinkDark,
          color: colors.white,
          fontWeight: 700,
          fontSize: 13,
        }}>
          👉 3초 만에 예약하기
        </button>
      </div>

      {/* ── 이달의 아트 배너 ── */}
      <div style={{
        borderRadius: 24,
        overflow: "hidden",
        marginBottom: 24,
        position: "relative",
      }}>
        <img
          src="/nail-art.jpg"
          alt="이달의 아트"
          style={{
            width: "100%",
            height: 400,
            objectFit: "cover",
            display: "block",
          }}
        />
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "20px",
          background: "linear-gradient(transparent, rgba(0,0,0,0.5))",
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.8)", letterSpacing: 1 }}>
            Trend of the Month
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: colors.white, margin: "4px 0 6px" }}>
            이달의 아트
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", marginBottom: 14 }}>
            요즘 유행 디자인을 저렴한 가격에 만나보세요!
          </div>
          <button style={{
            padding: "10px 20px", borderRadius: 14, border: "none",
            background: colors.white, color: colors.brown, fontWeight: 700, fontSize: 13,
          }}>
            지금 확인하기
          </button>
        </div>
      </div>

      {/* ── 인기 급상승 타이틀 ── */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "center", marginBottom: 14,
      }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: colors.brown }}>
          인기 급상승 네일샵
        </h2>
        <span style={{ fontSize: 13, color: colors.pinkDark, fontWeight: 600 }}>
          전체보기
        </span>
      </div>

      {/* ── 샵 카드 리스트 ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {shops.map((shop, i) => (
          <div key={i} style={{
            background: "#FFF0F5",
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: "0 4px 16px rgba(245,163,184,0.15)",
            cursor: "pointer",
          }}
            onClick={() => window.open(shop.url, "_blank")}
          >
            {/* 썸네일 영역 */}
            <div style={{
              width: "100%",
              height: 160,
              background: `linear-gradient(135deg, hsl(${340 + i * 30},60%,88%), hsl(${20 + i * 30},50%,82%))`,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              padding: 10,
              position: "relative",
            }}>
              <div style={{ fontSize: 40, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
                💅
              </div>
              {/* 거리 정보 오버레이 */}
              <div style={{
                padding: "4px 10px",
                borderRadius: 10,
                background: "rgba(0,0,0,0.4)",
                color: colors.white,
                fontSize: 11,
                fontWeight: 600,
              }}>
                📍 {shop.road_address.split(" ").slice(1, 3).join(" ")}
              </div>
            </div>

            {/* 샵 정보 영역 */}
            <div style={{ padding: "16px 18px" }}>
              {/* 샵 이름 */}
              <div style={{ fontSize: 17, fontWeight: 800, color: colors.brown }}>
                {shop.name}
              </div>

              {/* 위치 요약 */}
              <div style={{ fontSize: 12, color: colors.brownLight, marginTop: 4 }}>
                {shop.road_address.split(" ").slice(1, 3).join(" ")} 인근
              </div>

              {/* 소셜 프루프 + 가격 */}
              <div style={{
                display: "flex", alignItems: "center", gap: 12, marginTop: 10,
              }}>
                <span style={{ fontSize: 13, color: colors.pinkDark, fontWeight: 600 }}>
                  ♥ {Math.floor(Math.random() * 300 + 50)}
                </span>
                <span style={{ fontSize: 13, color: colors.brown, fontWeight: 600 }}>
                  💸 이달아 {(Math.floor(Math.random() * 4 + 3)).toFixed(1)}만~
                </span>
              </div>

              {/* 뱃지 영역 */}
              <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
                <span style={{
                  padding: "5px 10px", borderRadius: 10, fontSize: 11, fontWeight: 700,
                  background: colors.yellow, color: colors.brown,
                }}>
                  📅 1일 오픈
                </span>
                {i % 2 === 0 && (
                  <span style={{
                    padding: "5px 10px", borderRadius: 10, fontSize: 11, fontWeight: 700,
                    background: colors.greenLight, color: colors.green,
                  }}>
                    ⚡ 당일 예약
                  </span>
                )}
                {i % 3 === 0 && (
                  <span style={{
                    padding: "5px 10px", borderRadius: 10, fontSize: 11, fontWeight: 700,
                    background: colors.pinkLight, color: colors.pinkDark,
                  }}>
                    🌙 심야 영업
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── 카테고리별 찾기 ── */}
      <h2 style={{
        fontSize: 18, fontWeight: 800, color: colors.brown,
        marginTop: 28, marginBottom: 14,
      }}>
        카테고리별 찾기
      </h2>
      <div style={{ display: "flex", gap: 12, overflowX: "auto" }}>
        {[
          { icon: "✨", label: "디자인" },
          { icon: "🌿", label: "케어/영양" },
          { icon: "👣", label: "페디큐어" },
          { icon: "⭐", label: "이달의 아트" },
          { icon: "🎀", label: "트렌드" },
        ].map((cat, i) => (
          <div key={i} style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: 8, minWidth: 64, cursor: "pointer",
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: 18,
              background: colors.pinkLight, display: "flex",
              alignItems: "center", justifyContent: "center",
              fontSize: 22, border: `2px solid ${colors.pink}`,
            }}>
              {cat.icon}
            </div>
            <span style={{ fontSize: 12, fontWeight: 600, color: colors.brown }}>
              {cat.label}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}