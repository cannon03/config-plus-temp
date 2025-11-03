import { API_AUTH_HEADERS, API_BASE } from '$lib/constants/api';
import type { ZoneResponse } from '$lib/types/zone';

const PATH = '/api/zones/';

export async function fetchZones() {
	const response = await fetch(`${API_BASE}${PATH}`, {
		method: 'GET',
		headers: API_AUTH_HEADERS
	});
	const body = await response.json();
	if (response.ok) {
		return body as Array<ZoneResponse>;
	}
	throw Error(`Unable to fetch zones: ${body}`);
}
