import { getApiAuthHeaders, API_BASE } from '$lib/constants/api';
import { RELOAD_TARGETS } from '$lib/constants/dashboard';
import type { SceneRequest, SceneResponse } from '$lib/types/scene';

const PATH = '/api/scenes/';

export async function fetchScenes() {
	const response = await fetch(`${API_BASE}${PATH}`, {
		method: 'GET',
		headers: getApiAuthHeaders()
	});
	const body = await response.json();
	if (response.ok) {
		return body as Array<SceneResponse>;
	}
	throw Error(`Unable to fetch scenes: ${body}`);
}

export async function createScene(scnerequest: SceneRequest) {
	const response = await fetch(`${API_BASE}${PATH}`, {
		method: 'POST',
		headers: getApiAuthHeaders(),
		body: JSON.stringify(scnerequest)
	});
	const body = await response.json();
	if (response.ok) {
		window.dispatchEvent(new Event(RELOAD_TARGETS.SCENES));
		return body as SceneResponse;
	}
	throw Error(`Unable to create scene: ${body}`);
}

export async function updateScene(id: number, sceneRequest: Partial<SceneRequest>) {
	const response = await fetch(`${API_BASE}${PATH}${id}/`, {
		method: 'PATCH',
		headers: getApiAuthHeaders(),
		body: JSON.stringify(sceneRequest)
	});
	const body = await response.json();
	if (response.ok) {
		window.dispatchEvent(new Event(RELOAD_TARGETS.SCENES));
		return body as SceneResponse;
	}
	throw Error(`Unable to update scene: ${body}`);
}

export async function deleteScene(id: number) {
	const response = await fetch(`${API_BASE}${PATH}${id}/`, {
		method: 'DELETE',
		headers: getApiAuthHeaders()
	});
	if (!response.ok) {
		throw Error(`Unable to delete scene: ${response.statusText}`);
	}
	window.dispatchEvent(new Event(RELOAD_TARGETS.SCENES));
}
