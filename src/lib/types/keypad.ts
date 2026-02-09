import type { InputResponse } from './input';
import type { KeypadInputResponse } from './keypadkey';

export interface KeypadResponse extends InputResponse {
	num_keys: 1 | 2 | 3 | 4 | 5 | 6;
	sub_type: string;
	inputs: Array<KeypadInputResponse>;
};

export type KeypadRequest = {
	location_room: number;
	address: number;
	num_keys: number;
	cat6_branch: number;
	sub_type: string;
};
