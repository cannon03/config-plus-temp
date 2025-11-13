import { API_AUTH_HEADERS, API_BASE } from '$lib/constants/api';
import { RELOAD_TARGETS } from '$lib/constants/dashboard';
import type { KeyActionRequest, KeypadKeyActionResponse } from '$lib/types/key_action';

const PATH = '/api/key_actions/';

export async function fetchKeypadKeyActions() {
	const response = await fetch(`${API_BASE}${PATH}`, {
		method: 'GET',
		headers: API_AUTH_HEADERS
	});
	const body = await response.json();
	if (response.ok) {
		return body as Array<KeypadKeyActionResponse>;
	}
	throw Error(`Unable to fetch keypad key actions: ${body}`);
}

export async function createKeyAction(keypadKeyActionRequest: KeyActionRequest) {
	const response = await fetch(`${API_BASE}${PATH}`, {
		method: 'POST',
		headers: API_AUTH_HEADERS,
		body: JSON.stringify(keypadKeyActionRequest)
	});
	const body = await response.json();
	if (response.ok) {
		window.dispatchEvent(new Event(RELOAD_TARGETS.KEY_ACTIONS));
		return body as KeypadKeyActionResponse;
	}
	throw Error(`Unable to create keypad key action: ${body}`);
}
