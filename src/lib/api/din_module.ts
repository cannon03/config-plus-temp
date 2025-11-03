import { API_AUTH_HEADERS, API_BASE } from '$lib/constants/api';
import type { DinModuleResponse } from '$lib/types/din_module';

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
