import { API_AUTH_HEADERS, API_BASE } from '$lib/constants/api';
import type { RoomResponse } from '$lib/types/room';

const PATH = '/api/rooms';

export async function fetchRooms() {
	const response = await fetch(`${API_BASE}${PATH}`, {
		method: 'GET',
		headers: API_AUTH_HEADERS
	});
	const body = await response.json();
	if (response.ok) {
		return body as Array<RoomResponse>;
	}
	throw Error(`Unable to fetch rooms: ${body}`);
}
