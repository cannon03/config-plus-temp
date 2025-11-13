import { Moon, SunMedium } from 'lucide-svelte';

export const SCENE_FORM_TYPES = {
	CREATE: 'CREATE A SCENE',
	EDIT: 'EDIT A SCENE'
} as const;

export const SCENE_FORM_CONTROL_SCOPES = {
	ALL: { value: 'ALL', label: 'Everything', scope: 'unit' },
	ROOM: { value: 'ROOM', label: 'Room', scope: 'room' },
	ZONE: { value: 'ZONE', label: 'Zone', scope: 'zone' }
} as const;

export const SCENE_PRESETS = {
	all_on: {
		key: 'all_on',
		name: 'All On',
		description: 'Set all loads to maximum settings',
		icon: SunMedium,
		values: {
			phase_cut: 100,
			relay: 100,
			'1-10v': 100,
			curtain: 0,
			'dali-dt6': 100,
			'dali-dt8': 100
		}
	},
	all_off: {
		key: 'all_off',
		name: 'All Off',
		description: 'Set all loads to minimum settings',
		icon: Moon,
		values: {
			phase_cut: 0,
			relay: 0,
			'1-10v': 0,
			curtain: 1,
			'dali-dt6': 0,
			'dali-dt8': 0
		}
	}
} as const;

export const SCENE_PRIORITY = 1;
