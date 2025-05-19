import axios from 'axios';

export const gatewayAxios = axios.create({
    headers: {
        'x-gateway-key': process.env.GATEWAY_SECRET,
    },
});
