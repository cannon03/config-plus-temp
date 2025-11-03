import { API_AUTH_HEADERS, API_BASE } from '$lib/constants/api';
import type { Unit } from '$lib/types/unit';

const PATH = '/api/units';

export async function fetchUnits() {
	const response = await fetch(`${API_BASE}${PATH}`, {
		method: 'GET',
		headers: API_AUTH_HEADERS
	});

	const body = await response.json();
	if (response.ok) {
		return body as Array<Unit>;
	}

	throw Error(`Unable to fetch units: ${body}`);
}

export async function fetchUnit(id: number) {
	const response = await fetch(`${API_BASE}${PATH}/${id}`, {
		method: 'GET',
		headers: API_AUTH_HEADERS
	});

	const body = await response.json();
	if (response.ok) {
		return body as Unit;
	}

	throw Error(`Unable to fetch unit: ${body}`);
}
