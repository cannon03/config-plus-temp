import { ACCESS_TOKEN_KEY, USERID_KEY, USERNAME_KEY } from '$lib/constants/storage';

export function signOut() {
	localStorage.removeItem(USERID_KEY);
	localStorage.removeItem(USERNAME_KEY);
	localStorage.removeItem(ACCESS_TOKEN_KEY);
}
