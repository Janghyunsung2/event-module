# event-module

---
### docker compose 실행 명령어 - 
docker-compose up --build

### 테스트 계정
- ADMIN 
  - ID : admin@nexon.com
  - PW : 12345678
- OPERATOR
  - ID : operator@nexon.com
  - PW : 12345678
- AUDITOR
  - ID : auditor@nexon.com
  - PW : 12345678
- USER
  - ID : user@nexon.com
  - PW : 12345678


### Swagger Api 문서 경로(서버 실행시 접속가능)
- https://localhost:3000/api - auth api
- https://localhost:3002/api - event api

### jwt 토큰
- 로그인 시 발급되는 jwt access 토큰을 Authorization 헤더에 Bearer {token} 형식으로 넣으면 됩니다.
- jwt 토큰은 1시간 후 만료됩니다.(테스트용, 실제로는 더 짧게)

### refresh token 전략
- refresh token은 uuid를 발급해주고 캐시 메모리 uuid를 키로 저장하고 value로 userId를 저장합니다.
- access token만료시 프론트에서 리프레쉬 토큰을 요청할때 만료된 access와 refresh 토큰을 보내면 캐시에 저장된
refresh token을 삭제하고 새로운 access token과 refresh token을 발급합니다.
- uuid로 발급하면 출동가능성이 매우 낮고, 토큰에 개인정보가 없으므로 정보 노출 위험이 없습니다.

### redis
- redis는 현재 캐시 메모리로 사용하고 있습니다.(refresh token 저장소)
- redis는 docker-compose.yml에 설정되어 있습니다.
- redis는 docker-compose로 실행되며, localhost:6379에서 접속 가능합니다.

### mongodb
- mongodb는 현재 데이터베이스로 사용하고 있습니다.
- mongodb는 docker-compose.yml에 설정되어 있습니다.
- mongodb는 docker-compose로 실행되며, localhost:27018에서 접속 가능합니다.

### auth-server
- auth-server는 인증 서버입니다.
- auth-server는 jwt 토큰을 발급하고, refresh token을 관리합니다.
- user의 회원가입, 로그인, 로그아웃을 처리합니다.

### event-server
- event-server는 이벤트 서버입니다.
- 이벤트, 보상, 보상요청, 보상로그, 유저이벤트진행도 등을 처리합니다.

### gateway-server
- gateway-server는 api gateway 서버입니다.
- jwt 토큰을 검증하고, auth-server와 event-server로 요청을 전달합니다.
- jwt 토큰을 이용해 권한을 검증합니다.

### 공통
- 헤더에 gatewayKey를 넣어야 api 요청이 가능합니다.(게이트웨이에서만 api 요청을 받기위해서)
- 각 서버의 설정파일은 .env 파일에 있습니다.

