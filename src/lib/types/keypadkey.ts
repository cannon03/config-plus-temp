import type { KeyInput } from "./key_input";

export type KeypadKeyResponse = {
	id: number;
	name: string | null;
	key_number: number;
	keypad: number;
	mode: string;
};

export type KeypadKeyRequest = {
	name: string;
};

export interface KeypadInputResponse extends KeyInput {
	keypad: number;
};
