import { DALI_BUS_NUMBER } from '$lib/constants/channel';

export type ChannelResponse = {
	id: number;
	content_type: number;
	object_id: number;
	channel_number: number;
	bus_no: null;
	load: number;
};

export type ChannelRequest = {
	content_type: number;
	object_id: number;
	channel_number: number;
	bus_no?: typeof DALI_BUS_NUMBER;
	load: number;
};
