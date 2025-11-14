import { getApiAuthHeaders, API_BASE } from '$lib/constants/api';
import { RELOAD_TARGETS } from '$lib/constants/dashboard';
import type { KeypadRequest, KeypadResponse } from '$lib/types/keypad';

const PATH = '/api/keypads/';

export async function fetchKeypads() {
	const response = await fetch(`${API_BASE}${PATH}`, {
		method: 'GET',
		headers: getApiAuthHeaders()
	});
	const body = await response.json();
	if (response.ok) {
		return body as Array<KeypadResponse>;
	}
	throw Error(`Unable to fetch keypads: ${body}`);
}

export async function createKeypad(keypadRequest: KeypadRequest) {
	const response = await fetch(`${API_BASE}${PATH}`, {
		method: 'POST',
		headers: getApiAuthHeaders(),
		body: JSON.stringify(keypadRequest)
	});
	const body = await response.json();
	if (response.ok) {
		window.dispatchEvent(new Event(RELOAD_TARGETS.KEYPADS));
		return body as KeypadResponse;
	}
	throw Error(`Unable to create keypad: ${body}`);
}

export async function deleteKeypad(id: number) {
	const response = await fetch(`${API_BASE}${PATH}${id}/`, {
		method: 'DELETE',
		headers: getApiAuthHeaders()
	});
	if (!response.ok) {
		throw Error(`Unable to delete keypad: ${response.statusText}`);
	}
	window.dispatchEvent(new Event(RELOAD_TARGETS.KEYPADS));
}
