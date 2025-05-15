export const jwtConstants = {
    secret: process.env.JWT_SECRET || 'your_default_jwt_secret',
    accessTokenExpiresIn: '15m',
    refreshTokenExpiresIn: '1s',
};

export const redisKeys = {
    refreshToken: (userId: string) => `refresh:${userId}`,
};