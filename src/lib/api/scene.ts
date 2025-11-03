import { API_AUTH_HEADERS, API_BASE } from '$lib/constants/api';
import type { SceneResponse } from '$lib/types/scene';

const PATH = '/api/scenes/';

export async function fetchScenes() {
	const response = await fetch(`${API_BASE}${PATH}`, {
		method: 'GET',
		headers: API_AUTH_HEADERS
	});
	const body = await response.json();
	if (response.ok) {
		return body as Array<SceneResponse>;
	}
	throw Error(`Unable to fetch scenes: ${body}`);
}
