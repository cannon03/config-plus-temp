import { getAccessToken } from '$lib/utils/storage';

export const API_BASE = 'https://configapi.toyamaworld.com';

export const API_HEADERS = {
	'Content-Type': 'application/json'
};

export const API_AUTH_HEADERS = {
	...API_HEADERS,
	Authorization: `Token ${getAccessToken()}`
};
