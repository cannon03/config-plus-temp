import type { SCENE_FORM_CONTROL_SCOPES, SCENE_FORM_TYPES, SCENE_PRESETS } from '$lib/constants/scene';
import type { SceneLoadResponse } from './scene_load';

export type SceneResponse = {
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
	scene_loads: Array<SceneLoadResponse>;
};

export type SceneRequest = {
	unit: number;
	name: string;
	scope: string;
	scope_id: number;
	priority: number;
};

export type SceneFormControlScopeValue =
	(typeof SCENE_FORM_CONTROL_SCOPES)[keyof typeof SCENE_FORM_CONTROL_SCOPES]['value'];

export type ScenePreset = (typeof SCENE_PRESETS)[keyof typeof SCENE_PRESETS];

export type SceneFormType = keyof typeof SCENE_FORM_TYPES;
