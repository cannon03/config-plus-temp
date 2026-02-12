import type { KeypadKeyActionResponse } from "./key_action";

export interface KeyInput {
	id: number;
	name: string;
	input_type: string;
	key_index: number;
	mode: string;
	actions: Array<KeypadKeyActionResponse>;
}

export interface KeyInputNameRequest {
	id: number;
	name: string;
}