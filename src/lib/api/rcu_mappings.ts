import { getApiAuthHeaders, API_BASE } from '$lib/constants/api';

const PATH = `/api/firmware_mappings_export/`;

export async function fetchFirmwareMappings(unitId: number) {
	const url = new URL(`${API_BASE}${PATH}`);
	url.searchParams.set('unit', unitId.toString());
	const response = await fetch(url, {
		method: 'GET',
		headers: getApiAuthHeaders()
	});

	if (!response.ok) {
		const body = await response.text(); // safer than json for errors
		throw new Error(`Unable to fetch electrical layout: ${body}`);
	}
	return response.json();
}
