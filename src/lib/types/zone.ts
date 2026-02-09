import type { RoomResponse } from './room';

export type ZoneResponse = {
	id: number;
	name: string;
	rooms: Array<RoomResponse>;
};

export type ZoneRequest = {
	name: string;
	unit: number;
};
