import { API_AUTH_HEADERS, API_BASE } from '$lib/constants/api';

const electricalPath = (id: number) => `${API_BASE}/units/${id}/electrical_connections/`;

export async function fetchElectricalLayout(unitId: number) {
	const response = await fetch(electricalPath(unitId), {
		headers: API_AUTH_HEADERS
	});

	if (!response.ok) {
		const body = await response.text(); // safer than json for errors
		throw new Error(`Unable to fetch electrical layout: ${body}`);
	}

	return response.json();
}
