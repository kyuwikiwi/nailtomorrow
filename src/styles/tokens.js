//네일내일 디자인 토큰
//기획 노트 컬러 팔레트 기반

//앱 전체에서 쓰는 색상 모음
export const colors={
    pink: "#FFD1DC",        //메인- 딸기 우유 파스텔 핑크
    pinkLight: "#FFE8EE",   // 연한 핑크 배경
    pinkDark: "#F5A3B8",    // 진한 핑크 (버튼, 강조)
    bg: "#FFF9FA",         // 전체 배경 — 크림 화이트
    brown: "#5C4D4D",      // 메인 텍스트 — 초코 브라운
    brownLight: "#8A7575", // 보조 텍스트
    yellow: "#FFF4CC",     // 포인트 — 커스터드 옐로우
    yellowDark: "#FFE699",
    white: "#FFFFFF",
    green: "#7BC67E",
    greenLight: "#E8F5E9",
    red: "#E85D5D",
};

//카드 컴포넌트 기본 스타일(둥근 모서리 22px)
export const cardStyle= {
    background: colors.white,
    borderRadius: colors.white,
    padding: "20px",
    boxShadow: "0 2px 12px rgba(92, 77, 77, 0.06)",
};

// 뱃지 스타일 만드는 함수
// 사용법: badgeStyle(colors.pink, colors.brown)
export const badgeStyle= (bg, color) => ({
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: 10,
    fontSize: 11,
    fontWeight: 700,
    background: bg,
    color: color,
});