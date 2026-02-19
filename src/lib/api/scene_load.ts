import { getApiAuthHeaders, API_BASE } from '$lib/constants/api';
import { RELOAD_TARGETS } from '$lib/constants/dashboard';
import type { SceneLoadRequest, SceneLoadResponse } from '$lib/types/scene_load';

const PATH = '/api/scene_loads/';

export async function fetchSceneLoads() {
	const response = await fetch(`${API_BASE}${PATH}`, {
		method: 'GET',
		headers: getApiAuthHeaders()
	});
	const body = await response.json();
	if (response.ok) {
		return body as Array<SceneLoadResponse>;
	}
	throw Error(`Unable to fetch scene loads: ${body}`);
}

export async function createSceneLoad(sceneLoadRequest: SceneLoadRequest) {
	const response = await fetch(`${API_BASE}${PATH}`, {
		method: 'POST',
		headers: getApiAuthHeaders(),
		body: JSON.stringify(sceneLoadRequest)
	});
	const body = await response.json();
	if (response.ok) {
		return body as SceneLoadResponse;
	}
	throw Error(`Unable to create scene load: ${body}`);
}

export async function createSceneLoads(sceneLoadRequests: Array<SceneLoadRequest>) {
	const responses: Array<SceneLoadResponse> = [];
	for (const sceneLoadRequest of sceneLoadRequests) {
		responses.push(await createSceneLoad(sceneLoadRequest));
	}
	window.dispatchEvent(new Event(RELOAD_TARGETS.SCENE_LOADS));

	return responses;
}

export async function updateSceneLoad(id: number, sceneLoadRequest: Partial<SceneLoadRequest>) {
	const response = await fetch(`${API_BASE}${PATH}${id}/`, {
		method: 'PATCH',
		headers: getApiAuthHeaders(),
		body: JSON.stringify(sceneLoadRequest)
	});
	const body = await response.json();
	if (response.ok) {
		window.dispatchEvent(new Event(RELOAD_TARGETS.SCENE_LOADS));
		return body as SceneLoadResponse;
	}
	throw Error(`Unable to update scene load: ${body}`);
}

export async function deleteSceneLoad(id: number) {
	const response = await fetch(`${API_BASE}${PATH}${id}/`, {
		method: 'DELETE',
		headers: getApiAuthHeaders()
	});
	if (!response.ok) {
		throw Error(`Unable to delete scene load: ${response.statusText}`);
	}
	window.dispatchEvent(new Event(RELOAD_TARGETS.SCENE_LOADS));
}
