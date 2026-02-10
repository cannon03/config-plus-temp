import { getApiAuthHeaders, API_BASE } from '$lib/constants/api';

export async function fetchFirmwareMappings(unitId: number, exportType: string = 'v3') {
	const url = new URL(`${API_BASE}/api/units/${unitId}/download_firmware/`);
	url.searchParams.set('export_type', exportType);
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
