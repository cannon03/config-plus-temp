import type { InputResponse } from "./input";
import type { KeyInput } from "./key_input";

export type KeyCardResponse = InputResponse & {
	num_keys: 1;
};


export type KeyCardRequest = {
	id: number;
	name: string;
	location_room: number;
	address: number;
	// cat6_branch: number;
}

export type KeyCardInputResponse = KeyInput & {
	key_card: number;
};
