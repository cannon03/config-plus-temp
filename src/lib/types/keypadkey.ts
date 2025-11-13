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
