export type RoomResponse = {
	id: number;
	name: string;
	zone: number;
};

export type RoomRequest = {
	name: string;
	zone: number;
	description?: string;
};
