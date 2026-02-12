import { getApiAuthHeaders, API_BASE } from '$lib/constants/api';
import { RELOAD_TARGETS } from '$lib/constants/dashboard';
import type { UnitDomainGraphResponse } from '$lib/types/domain_graph';
import type { Unit, UnitRequest } from '$lib/types/unit';

const PATH = '/api/units/';

export async function fetchUnits() {
	const response = await fetch(`${API_BASE}${PATH}`, {
		method: 'GET',
		headers: getApiAuthHeaders()
	});

	const body = await response.json();
	if (response.ok) {
		return body as Array<Unit>;
	}

	throw Error(`Unable to fetch units: ${body}`);
}

export async function fetchUnit(id: number) {
	const response = await fetch(`${API_BASE}${PATH}${id}`, {
		method: 'GET',
		headers: getApiAuthHeaders()
	});

	const body = await response.json();
	if (response.ok) {
		return body as Unit;
	}

	throw Error(`Unable to fetch unit: ${body}`);
}

export async function createUnit(unit: UnitRequest) {
	const response = await fetch(`${API_BASE}${PATH}`, {
		method: 'POST',
		headers: getApiAuthHeaders(),
		body: JSON.stringify(unit)
	});
	const body = await response.json();
	if (response.ok) {
		window.dispatchEvent(new Event(RELOAD_TARGETS.UNITS));
		return body as Unit;
	}
	throw Error(`Unable to create unit: ${body}`);
}

export async function updateUnit(id: number, unit: UnitRequest) {
	const response = await fetch(`${API_BASE}${PATH}${id}/`, {
		method: 'PATCH',
		headers: getApiAuthHeaders(),
		body: JSON.stringify(unit)
	});
	const body = await response.json();
	if (response.ok) {
		window.dispatchEvent(new Event(RELOAD_TARGETS.UNITS));
		return body as Unit;
	}
	throw Error(`Unable to update unit: ${body}`);
}

export async function deleteUnit(unitId: number) {
	const response = await fetch(`${API_BASE}${PATH}${unitId}/`, {
		method: 'DELETE',
		headers: getApiAuthHeaders()
	});
	// const body = await response.json();
	if (response.ok) {
		window.dispatchEvent(new Event(RELOAD_TARGETS.UNITS));
		return;
	}
	throw Error(`Unable to delete unit: ${response.statusText}`);
}

export async function fetchUnitDomainGraph(unitId: number) {
	const response = await fetch(`${API_BASE}${PATH}${unitId}/domain_graph/`, {
		method: 'GET',
		headers: getApiAuthHeaders()
	});
	const body = await response.json();
	if (response.ok) {
		return body as UnitDomainGraphResponse;
	}
	throw Error(`Unable to fetch unit: ${body}`);
}
