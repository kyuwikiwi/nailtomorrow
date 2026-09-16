import { useState } from "react";
import { colors, cardStyle } from "../styles/tokens";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (!query) return;
    fetch(`http://localhost:8000/search/shops?query=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
        setSearched(true);
      });
  };

  return (
    <div>

      {/* 검색바 */}
      <div style={{
        ...cardStyle,
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 20,
      }}>
        <span>🔍</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="지역, 네일샵, 디자인 검색"
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            fontSize: 14,
            color: colors.brown,
            background: "transparent",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "8px 16px",
            borderRadius: 12,
            border: "none",
            background: colors.pinkDark,
            color: colors.white,
            fontWeight: 700,
            fontSize: 13,
          }}
        >
          검색
        </button>
      </div>

      {/* 검색 결과 */}
      {searched && results.length === 0 && (
        <div style={{ textAlign: "center", padding: 40, color: colors.brownLight }}>
          검색 결과가 없습니다
        </div>
      )}

      {results.map((shop, i) => (
        <div key={i} style={{ ...cardStyle, marginBottom: 12, cursor: "pointer" }}
          onClick={() => window.open(shop.url, "_blank")}
        >
          <div style={{ fontSize: 15, fontWeight: 700, color: colors.brown }}>
            {shop.name}
          </div>
          <div style={{ fontSize: 12, color: colors.brownLight, marginTop: 4 }}>
            {shop.road_address}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <span style={{ fontSize: 12, color: colors.pinkDark }}>{shop.category}</span>
            <span style={{ fontSize: 12, color: colors.brownLight }}>{shop.phone}</span>
          </div>
        </div>
      ))}

      {/* 검색 전이면 인기 검색어 표시 */}
      {!searched && (
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: colors.brown, marginBottom: 12 }}>
            인기 검색어
          </h3>
          {[
            "이달의 아트",
            "글리터 네일",
            "강남 네일샵",
            "케어 전문",
            "웨딩 네일",
          ].map((word, i) => (
            <div key={i} onClick={() => { setQuery(word); }}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "12px 0", borderBottom: `1px solid ${colors.pinkLight}`,
                cursor: "pointer",
              }}
            >
              <span style={{
                width: 24, height: 24, borderRadius: 8,
                background: colors.pinkLight, color: colors.brown,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700,
              }}>
                {i + 1}
              </span>
              <span style={{ fontSize: 14, color: colors.brown }}>{word}</span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}