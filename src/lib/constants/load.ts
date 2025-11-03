export const LOAD_TYPES = {
	phase_cut: { label: 'Dimmable LED/Incandescent', icon: 'lightbulb' },
	relay: { label: 'Switched Load (Non-Dim)', icon: 'power' },
	'1-10v': { label: '1-10V Dimmable', icon: 'sun' },
	curtain: { label: 'Curtains/Blinds', icon: 'blinds' },
	'dali-dt6': { label: 'Dali DT6', icon: 'dali-dt6' },
	'dali-dt8': { label: 'Dali DT8', icon: 'dali-dt8' }
};

export const DRIVER_TYPES = {
	constant_current: 'Constant Current',
	constant_voltage: 'Constant Voltage',
	dali: 'DALI'
};
