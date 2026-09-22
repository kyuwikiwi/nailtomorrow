# 💅 네일내일 (NailTomorrow)

카카오톡 수기 예약의 번거로움을 없앤 네일샵 예약 플랫폼입니다.
샵마다 제각각인 '이달의 아트' 오픈일을 규격화해서 한눈에 모아보고,
개인 방문 주기에 맞춘 리터치 알림으로 예약을 놓치지 않게 도와줍니다.

## ✨ 핵심 기능

### ⏰ 리터치 D-7 맞춤 알림
- 유저의 예약 이력을 바탕으로 개인별 평균 방문 주기를 자동 계산
- 다음 방문 예상일 7일 전, 맞춤형 알림을 발송해 예약 타이밍을 놓치지 않도록 유도
- APScheduler로 매일 자동 실행, Firebase FCM으로 실제 푸시 알림 발송

### 💳 디지털 지갑형 회원권 관리
- 정액권(금액 차감형) / 횟수권(카운트 차감형) 두 가지 타입 지원
- 잔액을 직접 덮어쓰지 않고, 모든 충전·사용 내역을 누적해 합산하는 방식으로 안전하게 계산
- 프로그레스 바로 잔액을 한눈에 확인, 언제 얼마가 차감됐는지 투명한 이용 내역 제공

### 📅 예약 관리
- 카카오 로컬 API로 실제 네일샵을 검색해서 바로 예약
- 시술 선택 → 날짜/시간 선택 → 회원권 결제 or 현장 결제까지 한 흐름으로 진행
- 노쇼 방지를 위한 예약금 제도 (2일 전 100% / 1일 전 50% / 당일 환불 불가)
- 취소 시 환불 규정에 따라 회원권으로 자동 환불

### 🔐 회원가입 & 로그인
- 3단계 스텝형 가입: 계정 정보 → 본인 인증(휴대폰) → 프로필(닉네임)
- 비밀번호 8자 이상 + 영문/숫자 포함 규칙을 프론트/백엔드 양쪽에서 검증
- bcrypt 암호화 + JWT 토큰 기반 인증 (만료시간 적용)

## 🛠 기술 스택

**프론트엔드**
- React (Vite)
- react-router-dom

**백엔드**
- FastAPI (Python)
- SQLAlchemy + MySQL
- APScheduler (D-7 대상자 자동 추출)
- Firebase Admin SDK (FCM 푸시 알림)
- bcrypt, PyJWT (인증)

**외부 API**
- 카카오 로컬 검색 API (실제 네일샵 검색)

## 🗂 프로젝트 구조

```
nail-tomorrow/               # 프론트엔드
  src/
    styles/                  # 디자인 토큰 (컬러, 카드 스타일)
    components/              # 하단 탭바 등 공용 컴포넌트
    pages/
      Home.jsx                # 홈 (인기 네일샵, 리터치 알림 카드)
      Search.jsx               # 네일샵 검색
      Booking.jsx               # 예약 (샵/시술 선택 → 날짜/시간 → 결제)
      Wallet.jsx                # 내 지갑 (회원권 관리)
      MyPage.jsx                # 마이페이지
      Login.jsx / Signup.jsx     # 로그인 / 3단계 회원가입
    App.jsx, main.jsx

nail-tomorrow-backend/        # 백엔드
  main.py                      # 서버 진입점, 라우터 연결
  database.py                   # MySQL 연결 설정
  models.py                      # User / Shop / Reservation / Wallet / WalletHistory
  init_db.py                      # 초기 데이터 세팅
  auth.py                          # 회원가입 / 로그인
  shops.py                          # 네일샵 API
  reservations.py                    # 예약 생성/조회/취소·환불
  wallet.py                           # 회원권 등록/충전/사용
  visit_cycle.py                       # 방문 주기 계산
  scheduler.py                          # D-7 대상자 추출 스케줄러
  notification.py                        # FCM 푸시 발송
  naver_search.py                         # 카카오 로컬 검색 연동
```

## 🎨 디자인 시스템

| 용도 | 컬러 |
|------|------|
| 메인 (파스텔 핑크) | `#FFD1DC` |
| 배경 (크림 화이트) | `#FFF9FA` |
| 텍스트 (초코 브라운) | `#5C4D4D` |
| 포인트 (커스터드 옐로우) | `#FFF4CC` |

- 모서리 둥글기 20~24px로 통일 (과도한 캡슐형/원형 지양)
- 귀엽고 아기자기한 무드, 딸기 우유 감성

## 🔒 보안

- SQL 인젝션 방어 (SQLAlchemy ORM)
- 비밀번호 bcrypt 암호화
- JWT 토큰 만료시간 적용
- 비밀번호 규칙 프론트/백엔드 이중 검증
- API 키·인증 파일은 `.env`, `firebase-key.json`으로 분리해 `.gitignore` 처리

## 🚀 실행 방법

### 프론트엔드
```bash
cd nail-tomorrow
npm install
npm run dev
```

### 백엔드
```bash
cd nail-tomorrow-backend
pip install -r requirements.txt
python init_db.py     # 최초 1회, 테이블 생성 + 초기 데이터
uvicorn main:app --reload
```

`.env` 파일에 아래 값 설정 필요:
```
KAKAO_API_KEY=카카오_REST_API_키
SECRET_KEY=JWT_서명용_비밀키
```

Firebase 푸시 알림을 쓰려면 `firebase-key.json`(서비스 계정 키)을 백엔드 루트에 위치시켜야 합니다.

## 📌 개발 배경

- **경쟁 우위**: 핑거프린세스 등 기존 서비스 대비 압도적으로 편리한 예약 동선
- **페인포인트 해결**: 샵마다 제각각인 이달의 아트 오픈일을 규격화해서 한눈에 모아보기
- **개발 방식**: 1인 개발, MVP 핵심 기능 위주로 빠르게 출시
