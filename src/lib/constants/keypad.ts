import KeyImage1Key from '$lib/assets/T23_1-Key.svg';
import KeyImage2Key from '$lib/assets/T23_2-key.svg';
import KeyImage3Key from '$lib/assets/T23_3-key.svg';
import KeyImage4Key from '$lib/assets/T23_4-key.svg';
import KeyImage6Key from '$lib/assets/T23_6-key.svg';

export const KEYPAD_TYPES = {
	'1key': {
		key: '1key',
		type: 'standard',
		label: '1-Key Keypad',
		num_keys: 1,
		layout: [{ key_id: 1, row: 2, col: 2 }],
		rows: 3,
		cols: 3,
		image: KeyImage1Key
	},
	'2key': {
		key: '2key',
		type: 'standard',
		label: '2-Key Keypad',
		num_keys: 2,
		layout: [
			{ key_id: 1, row: 2, col: 1 },
			{ key_id: 2, row: 2, col: 3 }
		],
		rows: 3,
		cols: 3,
		image: KeyImage2Key
	},
	'3key': {
		key: '3key',
		type: 'standard',
		label: '3-Key Keypad',
		num_keys: 3,
		layout: [
			{ key_id: 1, row: 1, col: 2 },
			{ key_id: 2, row: 2, col: 1 },
			{ key_id: 3, row: 2, col: 3 }
		],
		rows: 2,
		cols: 3,
		image: KeyImage3Key
	},
	'4key': {
		key: '4key',
		type: 'standard',
		label: '4-Key Keypad',
		num_keys: 4,
		layout: [
			{ key_id: 1, row: 1, col: 1 },
			{ key_id: 2, row: 1, col: 2 },
			{ key_id: 3, row: 2, col: 1 },
			{ key_id: 4, row: 2, col: 2 }
		],
		rows: 2,
		cols: 2,
		image: KeyImage4Key
	},
	'6key': {
		key: '6key',
		type: 'standard',
		label: '6-Key Keypad',
		num_keys: 6,
		layout: [
			{ key_id: 1, row: 1, col: 1 },
			{ key_id: 2, row: 1, col: 2 },
			{ key_id: 3, row: 2, col: 1 },
			{ key_id: 4, row: 2, col: 2 },
			{ key_id: 5, row: 3, col: 1 },
			{ key_id: 6, row: 3, col: 2 }
		],
		rows: 3,
		cols: 2,
		image: KeyImage6Key
	}
} as const;

export const KEYPAD_CAT6_BRANCHES = [1, 3, 4, 5, 6, 7, 8] as const;

export const KEYPAD_ADDRESSES: readonly number[] = Array.from({ length: 64 }, (_, i) => i + 1);
