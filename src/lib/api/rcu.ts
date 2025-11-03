import { API_AUTH_HEADERS, API_BASE } from '$lib/constants/api';
import type { RCUResponse } from '$lib/types/rcu';

const PATH = '/api/rcus/';

export async function fetchRCUs() {
	const response = await fetch(`${API_BASE}${PATH}`, {
		method: 'GET',
		headers: API_AUTH_HEADERS
	});

	const body = await response.json();
	if (response.ok) {
		return body as Array<RCUResponse>;
	}

	throw Error(`Unable to fetch rcus: ${body}`);
}
