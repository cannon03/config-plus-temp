import { API_AUTH_HEADERS, API_BASE } from '$lib/constants/api';
import type { Project } from '$lib/types/project';

const PATH = '/api/projects';

export async function fetchProjects() {
	const response = await fetch(`${API_BASE}${PATH}`, {
		method: 'GET',
		headers: API_AUTH_HEADERS
	});
	const body = await response.json();
	if (response.ok) {
		return body as Array<Project>;
	}

	throw Error(`Unable to fetch projects : ${body}`);
}

export async function deleteProject(id: number) {}

export async function createProject(project: Project) {}
