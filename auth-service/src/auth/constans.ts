export const jwtConstants = {
    secret: process.env.JWT_SECRET || '8b6eb17d677e4168d398c224a9d87c3dfd27c5363459350b6345d0f864124c74fc86ee1a3cfcb7f723ac82394c6954fcaeaff259819ba7aaeb880a30a6a0d42b',
    accessTokenExpiresIn: '15m',
    refreshTokenExpiresIn: '3s',
};

export const redisKeys = {
    refreshToken: (uuid: string) => `refresh:${uuid}`,
};