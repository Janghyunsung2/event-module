db = db.getSiblingDB('eventdb');

// 1. 이벤트 5개 생성
const events = [];
for (let i = 1; i <= 5; i++) {
  const eventId = new ObjectId();
  events.push({
    _id: eventId.str,
    title: `이벤트${i}`,
    type: 'NORMAL',
    creatorId: null,
    updatedId: null,
    description: `이벤트${i} 설명`,
    endAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * i),
    conditions: [{ type: 'score', value: 10 * i }],
    status: 'ACTIVE',
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}
db.events.insertMany(events);

// 2. 리워드 5개 생성 (각 이벤트별 1개)
const rewards = [];
for (let i = 0; i < 5; i++) {
  rewards.push({
    eventId: events[i]._id,
    type: 'POINT',
    amount: 100 * (i + 1),
    units: ['POINT'],
    itemId: null,
    itemName: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}
db.rewards.insertMany(rewards);