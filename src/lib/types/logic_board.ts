import type { InputResponse } from "./input";
import type { KeyInput } from "./key_input";

export type LogicBoardResponse = InputResponse & {
	num_keys: 1 | 2 | 3 | 4;
};

export type LogicBoardRequest = {
	location_room: number;
	address: number;
	num_keys: number;
	cat6_branch: number;
};

export type LogicBoardKeyInputResponse = KeyInput & {
	logic_board: number;
};