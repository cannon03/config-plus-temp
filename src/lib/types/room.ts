import type { KeyCardResponse } from './key_card';
import type { KeypadResponse } from './keypad';
import type { LoadResponse } from './load';
import type { LogicBoardResponse } from './logic_board';

export type RoomResponse = {
	id: number;
	name: string;
	loads: Array<LoadResponse>;
	keypads: Array<KeypadResponse>;
	logic_boards: Array<LogicBoardResponse>;
	keycards: Array<KeyCardResponse>;
	zone: number;
};

export type RoomRequest = {
	name: string;
	zone: number;
	description?: string;
};
