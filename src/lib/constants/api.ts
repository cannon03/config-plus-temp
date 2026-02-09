import { getAccessToken } from '$lib/utils/storage';

// export const API_BASE = 'https://configapi.toyamaworld.com';
// export const API_BASE = 'http://localhost:8000';
// export const API_BASE = "http://192.168.0.127:8000"
export const API_BASE = "http://157.245.101.133"

export const API_HEADERS = {
	'Content-Type': 'application/json'
};

export const getApiAuthHeaders = () => ({
	...API_HEADERS,
	Authorization: `Token ${getAccessToken()}`
});
