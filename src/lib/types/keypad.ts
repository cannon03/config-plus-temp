export type KeypadResponse = {
	id: number;
	location_room: number;
	address: number;
	num_keys: number;
	cat6_branch: number;
};

export type KeypadRequest = {
	location_room: number;
	address: number;
	num_keys: number;
	cat6_branch: number;
};
