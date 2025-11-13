import type {
	KEY_ACTION_STATES,
	KEY_ACTION_TYPES,
	KEY_EVENT_TYPES
} from '$lib/constants/key_action';

export type KeypadKeyActionResponse = {
	id: number;
	event_type: string;
	state: string;
	action_type: string;
	action_target: number;
	action_subtype: string | null;
	brightness: number | null;
	ct: number | null;
	r: number | null;
	g: number | null;
	b: number | null;
	cw: number | null;
	ww: number | null;
	value: number | null;
	key: number;
};

export type KeyActionRequest = {
	key: number;
	event_type: keyof typeof KEY_EVENT_TYPES;
	action_type: (typeof KEY_ACTION_TYPES)[keyof typeof KEY_ACTION_TYPES];
	action_target: number;
	state: (typeof KEY_ACTION_STATES)[keyof typeof KEY_ACTION_STATES];
};

export type KEY_ACTIONE_TYPE_VALUE =
	(typeof KEY_EVENT_TYPES)[keyof typeof KEY_EVENT_TYPES]['value'];
