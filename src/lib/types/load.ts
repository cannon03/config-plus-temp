import type { LOAD_TYPES } from '$lib/constants/load';

export type LoadResponse = {
	id: number;
	name: string;
	description: string;
	room: number;
	load_type: LOAD_TYPE_KEY;
	quantity: number;
	wattage_per_unit: number;
	total_wattage: number;
	driver_required: boolean;
	driver_type: string;
	driver_model: string;
	driver_capacity_watt: number;
	loads_per_driver: number;
	driver_count: number;
	supply_materials: boolean;
};

export type LoadRequestWithoutDriver = {
	name: string;
	description: string;
	room: number;
	load_type: string;
	quantity: number;
	wattage_per_unit: number;
	driver_required: boolean;
};

export type DriverInfo = {
	driver_type: string;
	driver_model: string;
	loads_per_driver: number;
	supply_materials: boolean;
};

export type LoadRequest = LoadRequestWithoutDriver & Partial<DriverInfo>;

export type LOAD_TYPE_KEY = keyof typeof LOAD_TYPES;
