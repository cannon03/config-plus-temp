import { API_AUTH_HEADERS, API_BASE } from '$lib/constants/api';
import type { KeypadResponse } from '$lib/types/keypad';

const PATH = '/api/keypads/';

export async function fetchKeypads() {
	const response = await fetch(`${API_BASE}${PATH}`, {
		method: 'GET',
		headers: API_AUTH_HEADERS
	});
	const body = await response.json();
	if (response.ok) {
		return body as Array<KeypadResponse>;
	}
	throw Error(`Unable to fetch keypads: ${body}`);
}
