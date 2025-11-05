import { API_AUTH_HEADERS, API_BASE } from '$lib/constants/api';
import { RELOAD_TARGETS } from '$lib/constants/dashboard';
import type { ChannelRequest, ChannelResponse } from '$lib/types/channel';

const PATH = '/api/channels/';

export async function fetchChannels() {
	const response = await fetch(`${API_BASE}${PATH}`, {
		method: 'GET',
		headers: API_AUTH_HEADERS
	});
	const body = await response.json();
	if (response.ok) {
		return body as Array<ChannelResponse>;
	}
	throw Error(`Unable to fetch channels: ${body}`);
}

export async function createChannel(channelRequest: ChannelRequest) {
	const response = await fetch(`${API_BASE}${PATH}`, {
		method: 'POST',
		headers: API_AUTH_HEADERS,
		body: JSON.stringify(channelRequest)
	});
	const body = await response.json();
	if (response.ok) {
		window.dispatchEvent(new Event(RELOAD_TARGETS.CHANNELS));

		return body as ChannelResponse;
	}
	throw Error(`Unable to create channel: ${body}`);
}

export async function deleteChannel(id: number) {
	const response = await fetch(`${API_BASE}${PATH}${id}/`, {
		method: 'DELETE',
		headers: API_AUTH_HEADERS
	});
	if (!response.ok) {
		throw Error(`Unable to delete channel: ${response.statusText}`);
	}
	window.dispatchEvent(new Event(RELOAD_TARGETS.CHANNELS));
}
