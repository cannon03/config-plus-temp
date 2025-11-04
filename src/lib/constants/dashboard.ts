import { Building2, ChartColumn, Cpu, Gamepad2, Lightbulb } from 'lucide-svelte';

export const TABS = [
	{ id: 'overview', title: 'Overview', path: '', icon: ChartColumn },
	{ id: 'Zones & Rooms', title: 'Zones & Rooms', path: 'zones', icon: Building2 },
	{ id: 'loads', title: 'Loads', path: 'loads', icon: Lightbulb },
	{ id: 'hardware', title: 'Hardware', path: 'hardware', icon: Cpu },
	{ id: 'keypads', title: 'Keypads', path: 'keypads', icon: Gamepad2 }
];

export const RELOAD_TARGETS = {
	LOADS: 'reload:loads',
	ZONES: 'reload:zones',
	ROOMS: 'reload:rooms',
	SCENES: 'reload:scenes',
	RCUS: 'reload:rcus',
	KEYPADS: 'reload:keypads',
	DIN_MODULES: 'reload:din_modules'
};
