import { API_AUTH_HEADERS, API_BASE } from '$lib/constants/api';
import { RELOAD_TARGETS } from '$lib/constants/dashboard';
import type { DinModuleRequest, DinModuleResponse } from '$lib/types/din_module';

const PATH = '/api/dinmodules/';

export async function fetchDinModules() {
	const response = await fetch(`${API_BASE}${PATH}`, {
		method: 'GET',
		headers: API_AUTH_HEADERS
	});
	const body = await response.json();
	if (response.ok) {
		return body as Array<DinModuleResponse>;
	}
	throw Error(`Unable to fetch din modules: ${body}`);
}

export async function createDinModule(dinModuleRequest: DinModuleRequest) {
	const response = await fetch(`${API_BASE}${PATH}`, {
		method: 'POST',
		headers: API_AUTH_HEADERS,
		body: JSON.stringify(dinModuleRequest)
	});
	const body = await response.json();
	if (response.ok) {
		window.dispatchEvent(new Event(RELOAD_TARGETS.DIN_MODULES));
		return body as DinModuleResponse;
	}
	throw Error(`Unable to create din module: ${body}`);
}

export async function deleteDinModule(id: number) {
	const response = await fetch(`${API_BASE}${PATH}${id}/`, {
		method: 'DELETE',
		headers: API_AUTH_HEADERS
	});
	if (!response.ok) {
		throw Error(`Unable to delete din module: ${response.statusText}`);
	}
	window.dispatchEvent(new Event(RELOAD_TARGETS.DIN_MODULES));
}

export async function updateDinModule(id: number, dinModuleRequest: DinModuleRequest) {
	const response = await fetch(`${API_BASE}${PATH}${id}/`, {
		method: 'PATCH',
		headers: API_AUTH_HEADERS,
		body: JSON.stringify(dinModuleRequest)
	});
	const body = await response.json();
	if (response.ok) {
		window.dispatchEvent(new Event(RELOAD_TARGETS.DIN_MODULES));
		return body as DinModuleResponse;
	}
	throw Error(`Unable to update din module: ${body}`);
}
