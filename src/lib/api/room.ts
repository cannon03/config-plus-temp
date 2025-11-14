import { getApiAuthHeaders, API_BASE } from '$lib/constants/api';
import { RELOAD_TARGETS } from '$lib/constants/dashboard';
import type { RoomRequest, RoomResponse } from '$lib/types/room';

const PATH = '/api/rooms/';

export async function fetchRooms() {
	const response = await fetch(`${API_BASE}${PATH}`, {
		method: 'GET',
		headers: getApiAuthHeaders()
	});
	const body = await response.json();
	if (response.ok) {
		return body as Array<RoomResponse>;
	}
	throw Error(`Unable to fetch rooms: ${body}`);
}

export async function createRoom(roomRequest: RoomRequest) {
	const response = await fetch(`${API_BASE}${PATH}`, {
		method: 'POST',
		headers: getApiAuthHeaders(),
		body: JSON.stringify(roomRequest)
	});
	const body = await response.json();
	if (response.ok) {
		window.dispatchEvent(new Event(RELOAD_TARGETS.ROOMS));
		return body as RoomResponse;
	}
	throw Error(`Unable to create room: ${body}`);
}

export async function deleteRoom(id: number) {
	const response = await fetch(`${API_BASE}${PATH}${id}/`, {
		method: 'DELETE',
		headers: getApiAuthHeaders()
	});
	if (!response.ok) {
		throw Error(`Unable to delete room: ${response.statusText}`);
	}
	window.dispatchEvent(new Event(RELOAD_TARGETS.ROOMS));
}

export async function updateRoom(id: number, roomRequest: RoomRequest) {
	const response = await fetch(`${API_BASE}${PATH}${id}/`, {
		method: 'PATCH',
		headers: getApiAuthHeaders(),
		body: JSON.stringify(roomRequest)
	});
	const body = await response.json();
	if (response.ok) {
		window.dispatchEvent(new Event(RELOAD_TARGETS.ROOMS));
		return body as RoomResponse;
	}
	throw Error(`Unable to update room: ${body}`);
}
