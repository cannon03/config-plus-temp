import { Blinds, Cpu, Lightbulb, Power, Sun } from 'lucide-svelte';

export const LOAD_TYPES = {
	phase_cut: {
		key: 'phase_cut',
		label: 'Dimmable LED/Incandescent',
		icon: Lightbulb,
		control: 'percentage'
	},
	relay: { key: 'relay', label: 'Switched Load (Non-Dim)', icon: Power, control: 'toggle' },
	'1-10v': { key: '1-10v', label: '1-10V Dimmable', icon: Sun, control: 'percentage' },
	curtain: { key: 'curtain', label: 'Curtains/Blinds', icon: Blinds, control: 'toggle' },
	'dali-dt6': { key: 'dali-dt6', label: 'Dali DT6', icon: Cpu, control: 'percentage' },
	'dali-dt8': { key: 'dali-dt8', label: 'Dali DT8', icon: Cpu, control: 'percentage' }
} as const;

export const DRIVER_TYPES = {
	constant_current: 'Constant Current',
	constant_voltage: 'Constant Voltage',
	dali: 'DALI'
};

export const LOAD_MODAL_TYPES = {
	CREATE: 'CREATE A LOAD',
	EDIT: 'EDIT A LOAD'
};

export const LOAD_DRIVER_REQUIRED_OPTIONS = {
	Yes: true,
	No: false
};
