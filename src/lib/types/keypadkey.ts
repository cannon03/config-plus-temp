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

export type KeypadInputResponse = {
	keypad: number;
	id: number;
	name: string;
	input_type: string;
	key_index: number;
	mode: string;
};
