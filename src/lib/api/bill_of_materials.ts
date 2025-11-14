import { getApiAuthHeaders, API_BASE } from '$lib/constants/api';

const PATH = '/api/bom/project_bom_xlsx/';

export async function fetchBillOfMaterials(projectId: number) {
	const url = new URL(`${API_BASE}${PATH}`);
	url.searchParams.set('project_id', projectId.toString());
	const response = await fetch(url, {
		method: 'GET',
		headers: getApiAuthHeaders()
	});
	if (!response.ok) {
		throw Error(`Unable to fetch bill of materials: ${response.statusText}`);
	}
	return response.blob();
}
