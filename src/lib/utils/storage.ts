import { ACCESS_TOKEN_KEY, USERID_KEY, USERNAME_KEY } from '$lib/constants/storage';

export async function setUsername(username: string) {
	localStorage.setItem(USERNAME_KEY, username);
}

export async function setUserId(userId: number) {
	localStorage.setItem(USERID_KEY, userId);
}

export async function setAccessToken(accessToken: string) {
	localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

export const getUsername = () => localStorage.getItem(USERNAME_KEY);

export const getUserId = () => localStorage.getItem(USERID_KEY);

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);
