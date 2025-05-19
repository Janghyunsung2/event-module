db = db.getSiblingDB('authdb'); // 사용할 DB명
db.users.insertOne({
    email: 'admin@example.com',
    password: 'hashed_password', // 실제 해시된 비밀번호로 교체
    nickname: 'admin',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
});