import { API_BASE, getApiAuthHeaders } from '$lib/constants/api';
import type { RoomProductResponse } from '$lib/types/product';

const PATH = '/api/room_products/';

export async function fetchRoomProductById(roomId: number) {
	const response = await fetch(`${API_BASE}${PATH}by_room/?room_id=${roomId}`, {
		method: 'GET',
		headers: getApiAuthHeaders()
	});
	const body = await response.json();
	if (response.ok) {
		return body as Array<RoomProductResponse>;
	}
	throw Error(`Unable to fetch load: ${body}`);
}

export async function fetchRoomProducts() {
	const response = await fetch(`${API_BASE}${PATH}`, {
		method: 'POST',
		headers: getApiAuthHeaders()
	});
	const body = await response.json();
	if (response.ok) {
		return body as Array<RoomProductResponse>;
	}
	throw Error(`Unable to fetch load: ${body}`);
}
