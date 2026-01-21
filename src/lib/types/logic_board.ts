export type LogicBoardResponse = {
	id: number;
	location_room: number;
	address: number;
	num_keys: 1 | 2 | 3 | 4;
	cat6_branch: number;
};

export type LogicBoardRequest = {
	location_room: number;
	address: number;
	num_keys: number;
	cat6_branch: number;
};
