import { API_AUTH_HEADERS, API_BASE } from '$lib/constants/api';
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
		return body as LoadResponse;
	}
	throw Error(`Unable to create load: ${body}`);
}
