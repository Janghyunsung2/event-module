db = db.getSiblingDB('authdb'); // 사용할 DB명
db.users.insertOne({
    email: 'admin@nexon.com',
    password: '$2b$10$12uFzWP9UuazL8EG8/ydZu3FdYids07rIiG5IsQ9N3ucoIJrW0rga',
    nickname: 'admin',
    role: 'ADMIN',
    createdAt: new Date(),
    updatedAt: new Date()
});

db.users.insertOne({
    email: 'operator@nexon.com',
    password: '$2b$10$12uFzWP9UuazL8EG8/ydZu3FdYids07rIiG5IsQ9N3ucoIJrW0rga',
    nickname: 'OPERATOR',
    role: 'OPERATOR',
    createdAt: new Date(),
    updatedAt: new Date()
});

db.users.insertOne({
    email: 'auditor@nexon.com',
    password: '$2b$10$12uFzWP9UuazL8EG8/ydZu3FdYids07rIiG5IsQ9N3ucoIJrW0rga',
    nickname: 'AUDITOR',
    role: 'AUDITOR',
    createdAt: new Date(),
    updatedAt: new Date()
});

db.users.insertOne({
    email: 'user@nexon.com',
    password: '$2b$10$12uFzWP9UuazL8EG8/ydZu3FdYids07rIiG5IsQ9N3ucoIJrW0rga',
    nickname: 'user',
    role: 'USER',
    createdAt: new Date(),
    updatedAt: new Date()
});