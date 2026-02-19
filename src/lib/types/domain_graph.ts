import type { Unit } from './unit';
import type { ZoneResponse } from './zone';
import type { RCUResponse } from './rcu';
import type { SceneResponse } from './scene';

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

export interface DomainGraphSceneLoad {
	id: number;
	load_id: number;
	load_name: string;
	value: number;
	brightness: number | null;
	ct: number | null;
	r: number | null;
	g: number | null;
	b: number | null;
	cw: number | null;
	ww: number | null;
	fade_ms: number;
	delay_ms: number;
}

export interface DomainGraphScene {
	id: number;
	name: string;
	priority: number;
	scope: string;
	scope_id: number;
	scene_loads: DomainGraphSceneLoad[];
}

export interface UnitDomainGraphResponse {
	unit: Unit;
	layout: {
		zones: ZoneResponse[];
		scenes: SceneResponse[];
		custom_led_mappings: CustomLedMappingResponse[];
		led_sync_groups: LedSyncGroupResponse[];
	};
	hardware: {
		rcus: RCUResponse[];
	};
}

