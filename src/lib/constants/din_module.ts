import type { LOAD_TYPE_KEY } from '$lib/types/load';
import { Blinds, Cpu, ToggleRight, Zap } from 'lucide-svelte';

export const DIN_MODULE_TYPES = {
	phase_cut: {
		key: 'phase_cut',
		accepted_loads: ['phase_cut'] as Array<LOAD_TYPE_KEY>,
		label: 'Phase Cut Dimmer',
		icon: Zap,
		channels: 4
	},
	relay: {
		key: 'relay',
		label: 'Relay Module',
		accepted_loads: ['relay'] as Array<LOAD_TYPE_KEY>,
		icon: ToggleRight,
		channels: 8
	},
	'1-10v': {
		key: '1-10v',
		label: '1-10V Dimmer',
		accepted_loads: ['1-10v'] as Array<LOAD_TYPE_KEY>,
		icon: Zap,
		channels: 4
	},
	curtain: {
		key: 'curtain',
		label: 'Curtain Controller',
		accepted_loads: ['curtain'] as Array<LOAD_TYPE_KEY>,
		icon: Blinds,
		channels: 4
	},
	dali_master: {
		key: 'dali_master',
		label: 'DALI Master',
		accepted_loads: ['dali-dt6', 'dali-dt8'] as Array<LOAD_TYPE_KEY>,
		icon: Cpu,
		channels: 4
	}
} as const;

export const DIN_MODULE_FORM_TYPES = {
	CREATE: 'CREATE A DIN MODULE',
	EDIT: 'EDIT A DIN MODULE'
} as const;
