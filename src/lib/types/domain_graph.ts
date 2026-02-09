import type { Unit } from './unit';
import type { ZoneResponse } from './zone';
import type { RCUResponse } from './rcu';

export interface LedTarget {
	address: number;
	key: number;
	state: 0 | 1;
}

export interface CustomLedMappingResponse {
	id: number;
	name: string;
	x_address: number;
	x_key: number;
	x_state: 0 | 1;
	led_targets: LedTarget[];
}

export interface CustomLedMappingRequest {
	unit: number;
	name: string;
	x_address: number;
	x_key: number;
	x_state: 0 | 1;
	led_targets: LedTarget[];
}

export interface LedSyncGroupMember {
	address: number;
	key: number;
}

export interface LedSyncGroupResponse {
	id: number;
	name: string;
	members: LedSyncGroupMember[];
}

export interface LedSyncGroupRequest {
	unit: number;
	name: string;
	members: LedSyncGroupMember[];
}

export interface UnitDomainGraphResponse {
	unit: Unit;
	layout: {
		zones: ZoneResponse[];
		custom_led_mappings: CustomLedMappingResponse[];
		led_sync_groups: LedSyncGroupResponse[];
	};
	hardware: {
		rcus: RCUResponse[];
	};
}

