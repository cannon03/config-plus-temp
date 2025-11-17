import { getApiAuthHeaders, API_BASE } from '$lib/constants/api';
import type { Project, ProjectRequest } from '$lib/types/project';

const PATH = '/api/projects/';

export async function fetchProjects() {
	const response = await fetch(`${API_BASE}${PATH}`, {
		method: 'GET',
		headers: getApiAuthHeaders()
	});
	const body = await response.json();
	if (response.ok) {
		return body as Array<Project>;
	}

	throw Error(`Unable to fetch projects : ${body}`);
}

export async function deleteProject(id: number) {
	const response = await fetch(`${API_BASE}${PATH}${id}/`, {
		method: 'DELETE',
		headers: getApiAuthHeaders()
	});
	if (response.ok) {
		return;
	}
	throw Error(`Unable to delete project: ${response.statusText}`);
}

export async function createProject(ProjectRequest: ProjectRequest) {
	const response = await fetch(`${API_BASE}${PATH}`, {
		method: 'POST',
		headers: getApiAuthHeaders(),
		body: JSON.stringify(ProjectRequest)
	});
	const body = await response.json();
	if (response.ok) {
		return body as Project;
	}
	throw Error(`Unable to create project: ${body}`);
}
