export type LoadResponse = {
	id: number;
	name: string;
	description: string;
	room: number;
	load_type: string;
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

type LoadRequestBase = {
	name: string;
	description: string;
	room: number;
	load_type: string;
	quantity: number;
	wattage_per_unit: number;
};

export type LoadRequestWithoutDriver = LoadRequestBase & {
	driver_required: false;
};

export type LoadRequestWithDriver = LoadRequestBase & {
	driver_required: true;
	driver_type: string;
	loads_per_driver: number;
	driver_model: string;
	supply_materials: boolean;
};

export type LoadRequest = LoadRequestWithDriver | LoadRequestWithoutDriver;
