import type { LOAD_TYPE_KEY } from './load';

export type SceneLoadResponse = {
	id: number;
	scene_details: {
		id: number;
		project: {
			id: number;
			name: string;
		};
		name: string;
		priority: number;
		scope: string;
		scope_id: number;
		created_at: string;
		updated_at: string;
		unit: number;
	};
	value: number;
	brightness: null;
	ct: null;
	r: null;
	g: null;
	b: null;
	cw: null;
	ww: null;
	fade_ms: number;
	delay_ms: number;
	scene: number;
	load: number;
};

export type SceneLoadRequest = {
	scene: number;
	load: number;
	value: number;
	fade_ms: number;
	delay_ms: number;
};

export type SceneLoadData = {
	name: string;
	load_id: number;
	value: number;
	load_type: LOAD_TYPE_KEY;
};
