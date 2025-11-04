import { API_AUTH_HEADERS, API_BASE } from '$lib/constants/api';
import { RELOAD_TARGETS } from '$lib/constants/dashboard';
import type { LoadRequest, LoadResponse } from '$lib/types/load';

const PATH = '/api/loads/';
export async function fetchLoads() {
	const response = await fetch(`${API_BASE}${PATH}`, {
		method: 'GET',
		headers: API_AUTH_HEADERS
	});
	const body = await response.json();
	if (response.ok) {
		return body as Array<LoadResponse>;
	}
	throw Error(`Unable to fetch load: ${body}`);
}

export async function createLoad(loadRequest: LoadRequest) {
	const response = await fetch(`${API_BASE}${PATH}`, {
		method: 'POST',
		headers: API_AUTH_HEADERS,
		body: JSON.stringify(loadRequest)
	});
	const body = await response.json();
	if (response.ok) {
		window.dispatchEvent(new Event(RELOAD_TARGETS.LOADS));
		return body as LoadResponse;
	}
	throw Error(`Unable to create load: ${body}`);
}

export async function deleteLoad(id: number) {
	const response = await fetch(`${API_BASE}${PATH}${id}/`, {
		method: 'DELETE',
		headers: API_AUTH_HEADERS
	});
	if (!response.ok) {
		throw Error(`Unable to delete load: ${response.statusText}`);
	}
	window.dispatchEvent(new Event(RELOAD_TARGETS.LOADS));
}

export async function updateLoad(id: number, loadrequest: LoadRequest) {
	const response = await fetch(`${API_BASE}${PATH}${id}/`, {
		method: 'PUT',
		headers: API_AUTH_HEADERS,
		body: JSON.stringify(loadrequest)
	});
	const body = await response.json();
	if (response.ok) {
		window.dispatchEvent(new Event(RELOAD_TARGETS.LOADS));
		return body as LoadResponse;
	}
	throw Error(`Unable to update load: ${body}`);
}
