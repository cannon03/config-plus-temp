import { getApiAuthHeaders, API_BASE } from '$lib/constants/api';
import { RELOAD_TARGETS } from '$lib/constants/dashboard';
import type { RCURequest, RCUResponse } from '$lib/types/rcu';

const PATH = '/api/rcus/';

export async function fetchRCUs() {
	const response = await fetch(`${API_BASE}${PATH}`, {
		method: 'GET',
		headers: getApiAuthHeaders()
	});

	const body = await response.json();
	if (response.ok) {
		return body as Array<RCUResponse>;
	}

	throw Error(`Unable to fetch rcus: ${body}`);
}

export async function createRCU(rcuRequest: RCURequest) {
	const response = await fetch(`${API_BASE}${PATH}`, {
		method: 'POST',
		headers: getApiAuthHeaders(),
		body: JSON.stringify(rcuRequest)
	});
	const body = await response.json();
	if (response.ok) {
		window.dispatchEvent(new Event(RELOAD_TARGETS.RCUS));
		return body as RCUResponse;
	}
	throw Error(`Unable to create rcu: ${body}`);
}

export async function deleteRCU(id: number) {
	const response = await fetch(`${API_BASE}${PATH}${id}/`, {
		method: 'DELETE',
		headers: getApiAuthHeaders()
	});
	if (!response.ok) {
		throw Error(`Unable to delete rcu: ${response.statusText}`);
	}
	window.dispatchEvent(new Event(RELOAD_TARGETS.RCUS));
}

export async function updateRCU(id: number, rcuRequest: RCURequest) {
	const response = await fetch(`${API_BASE}${PATH}${id}/`, {
		method: 'PATCH',
		headers: getApiAuthHeaders(),
		body: JSON.stringify(rcuRequest)
	});
	const body = await response.json();
	if (response.ok) {
		window.dispatchEvent(new Event(RELOAD_TARGETS.RCUS));
		return body as RCUResponse;
	}
	throw Error(`Unable to update rcu: ${body}`);
}
