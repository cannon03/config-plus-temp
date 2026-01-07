import { getAccessToken } from '$lib/utils/storage';

export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const API_HEADERS = {
	'Content-Type': 'application/json'
};

export const getApiAuthHeaders = () => ({
	...API_HEADERS,
	Authorization: `Token ${getAccessToken()}`
});
