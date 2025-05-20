# event-module

---
### docker compose 실행 명령어 - 
    - docker-compose up --build

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
    - http://localhost:3000/api - auth api
    - http://localhost:3002/api - event api
    - 사용법
        - 스웨거에 자물쇠버튼을 누르면 access token을 입력할 수 있는 창이 나옵니다.
        - 스웨거는 gateway서버로 요청을 보내게 구성되어있습니다.(게이트웨이 통하지 않으면 요청이 안됩니다.)
        - 스웨거에서 요청을 보낼 수 있습니다.
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

### 초기 데이터
    - 초기데이터는 mongo-init.js 에 작성되어 있습니다.

## 스카마
### users
    - _id ObjectId를 사용합니다
    - email 이메일은 고유해야합니다.
    - password bcrypt로 암호화된 비밀번호를 저장합니다.
    - role 권한은 default USER입니다.
    - status 상태는 default ACTIVE입니다. 휴먼, 탈퇴, 정지 등을 관리합니다.

### events
    - _id 아이디를 입력하지 않으면 ObjectId를 사용합니다.
    - status 이벤트의 상태를 관리합니다.
    - conditions 이벤트의 조건을 관리합니다.
    - endAt 이벤트의 종료시간을 관리합니다.
    - type 이벤트의 타입을 관리합니다.(신규가입자, 출석체크, 친구초대)
### rewards
    - _id 아이디를 입력하지 않으면 ObjectId를 사용합니다.
    - type 보상 타입을 관리합니다.
    - status 보상 상태를 관리합니다.
    - amount 보상 금액을 관리합니다.
    - units 보상 단위를 리스트로 관리합니다.(아이템, 캐시, 쿠폰, 포인트, 메소)
### rewardRequests
    - _id 아이디를 입력하지 않으면 ObjectId를 사용합니다.
    - 중복요청을 막기 위해 userId와 eventId를 유니크 인덱스로 설정합니다.
    - 보상요청등록시 자동으로 reward-logs에 등록되고 보상이 지급됩니다.(서비스단 트랜잭션 추가 필요)
    - 보상요청을 관리자가 처리한다고 가정해 adminId를 추가했습니다.
### reward-logs
    - 아이디는 ObjectId를 사용합니다.
    - 어떤 보상이 지급됐는지 확인을 위해 리워드로그에 보상아이템들을 기록합니다
    - 보상요청시 자동으로 리워드로그에 등록됩니다.
    - requestedByUser 사용자 요청 여부를 기록합니다.
    - requestedByAdmin 관리자가 요청했다면 관리자 아이디를 기록합니다.
    - rewardId 보상 아이디를 기록합니다.

### user-event-progress
    - 아이디는 ObjectId를 사용합니다.
    - 어떤 이벤트가 진행중인지 확인을 위해 유저이벤트진행도에 기록합니다.
    - 유저가 이벤트조건을 충족하면 자동으로 이벤트 상태를 COMPLETED로 변경합니다.(서비스 단에서 처리
  

### 권한처리 
    - 권한은 USER, AUDITOR, OPERATOR, ADMIN으로 나뉘어져 있습니다.
    - RolesGuard, AuthGuard, JwtAuthGuard를 사용해 권한을 처리합니다.

### 스스로의 개선사항
    - 공통된 response 구조를 만들어서 사용하면 좋을 것 같습니다.
    - 에러처리를 공통으로 처리하면 좋을 것 같습니다.
    - 여러 스키마를 저장할때 transaction을 사용하면 좋을 것 같습니다.
    - validation처리를 구현하지 못했습니다.(게이트웨이와 서버 dto 불일치 문제가 발생했습니다.)
    - 게이트웨이에서도 dto로 데이터를 받도록 구현하면 좋을 것 같습니다.
    - 스웨거에 예상 에러 response를 추가하면 좋을 것 같습니다.
    - 테스트 코드를 추가하면 좋을 것 같습니다.



    




