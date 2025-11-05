import type { DIN_MODULE_TYPES } from '$lib/constants/din_module';

export type DinModuleResponse = {
	id: number;
	module_type: keyof typeof DIN_MODULE_TYPES;
	address: number;
	dali_bus_count: number | null;
	rcu: number;
};

export type DinModuleRequest = {
	rcu: number;
	module_type: keyof typeof DIN_MODULE_TYPES;
	address: number;
	dali_bus_count?: number;
};
