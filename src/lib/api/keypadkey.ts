import { API_AUTH_HEADERS, API_BASE } from '$lib/constants/api';
import { RELOAD_TARGETS } from '$lib/constants/dashboard';
import type { KeypadKeyRequest, KeypadKeyResponse } from '$lib/types/keypadkey';

const PATH = '/api/keypadkeys/';

export async function fetchKeypadKeys() {
	const response = await fetch(`${API_BASE}${PATH}`, {
		method: 'GET',
		headers: API_AUTH_HEADERS
	});
	const body = await response.json();
	if (response.ok) {
		return body as Array<KeypadKeyResponse>;
	}
	throw Error(`Unable to fetch keypad keys: ${body}`);
}

export async function updateKeypadKey(id: number, keypadKeyRequest: KeypadKeyRequest) {
	const response = await fetch(`${API_BASE}${PATH}${id}/`, {
		method: 'PATCH',
		headers: API_AUTH_HEADERS,
		body: JSON.stringify(keypadKeyRequest)
	});
	const body = await response.json();
	if (response.ok) {
		window.dispatchEvent(new Event(RELOAD_TARGETS.KEYPAD_KEYS));
		return body as KeypadKeyResponse;
	}
	throw Error(`Unable to update keypad key: ${body}`);
}
