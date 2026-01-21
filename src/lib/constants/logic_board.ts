import Logicboard1keyImage from '$lib/assets/logicboard_1key.svg';
import Logicboard2keyImage from '$lib/assets/logicboard_2key.svg';
import Logicboard3keyImage from '$lib/assets/logicboard_3key.svg';
import Logicboard4keyImage from '$lib/assets/logicboard_4key.svg';

export const LOGICBOARD_TYPES = {
	'1key': {
		key: '1key',
		type: 'standard',
		label: '1-Key Keypad',
		num_keys: 1,
		layout: [{ key_id: 1, row: 2, col: 2 }],
		rows: 3,
		cols: 3,
		image: Logicboard1keyImage
	},
	'2key': {
		key: '2key',
		type: 'standard',
		label: '2-Key Keypad',
		num_keys: 2,
		layout: [
			{ key_id: 1, row: 2, col: 2 },
			{ key_id: 2, row: 2, col: 3 }
		],
		rows: 3,
		cols: 4,
		image: Logicboard2keyImage
	},
	'3key': {
		key: '3key',
		type: 'standard',
		label: '3-Key Keypad',
		num_keys: 3,
		layout: [
			{ key_id: 1, row: 2, col: 1 },
			{ key_id: 2, row: 2, col: 2 },
			{ key_id: 3, row: 2, col: 3 }
		],
		rows: 3,
		cols: 3,
		image: Logicboard3keyImage
	},
	'4key': {
		key: '4key',
		type: 'standard',
		label: '4-Key Keypad',
		num_keys: 4,
		layout: [
			{ key_id: 1, row: 2, col: 1 },
			{ key_id: 2, row: 2, col: 2 },
			{ key_id: 3, row: 2, col: 3 },
			{ key_id: 4, row: 2, col: 4 }
		],
		rows: 3,
		cols: 4,
		image: Logicboard4keyImage
	}
} as const;
