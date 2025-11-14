import { getApiAuthHeaders, API_BASE } from '$lib/constants/api';
import { RELOAD_TARGETS } from '$lib/constants/dashboard';
import type { ZoneRequest, ZoneResponse } from '$lib/types/zone';

const PATH = '/api/zones/';

export async function fetchZones() {
	const response = await fetch(`${API_BASE}${PATH}`, {
		method: 'GET',
		headers: getApiAuthHeaders()
	});
	const body = await response.json();
	if (response.ok) {
		return body as Array<ZoneResponse>;
	}
	throw Error(`Unable to fetch zones: ${body}`);
}

export async function createZone(zoneRequest: ZoneRequest) {
	const response = await fetch(`${API_BASE}${PATH}`, {
		method: 'POST',
		headers: getApiAuthHeaders(),
		body: JSON.stringify(zoneRequest)
	});
	const body = await response.json();
	if (response.ok) {
		window.dispatchEvent(new Event(RELOAD_TARGETS.ZONES));

		return body as ZoneResponse;
	}
	throw Error(`Unable to create zone: ${body}`);
}

export async function deleteZone(id: number) {
	const response = await fetch(`${API_BASE}${PATH}${id}/`, {
		method: 'DELETE',
		headers: getApiAuthHeaders()
	});
	if (!response.ok) {
		throw Error(`Unable to delete zone: ${response.statusText}`);
	}
	window.dispatchEvent(new Event(RELOAD_TARGETS.ZONES));
}

export async function updateZone(id: number, zoneRequest: ZoneRequest) {
	const response = await fetch(`${API_BASE}${PATH}${id}/`, {
		method: 'PATCH',
		headers: getApiAuthHeaders(),
		body: JSON.stringify(zoneRequest)
	});
	const body = await response.json();
	if (response.ok) {
		window.dispatchEvent(new Event(RELOAD_TARGETS.ZONES));
		return body as ZoneResponse;
	}
	throw Error(`Unable to update zone: ${body}`);
}
