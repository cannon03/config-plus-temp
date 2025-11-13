import type { ChannelResponse } from './channel';
import type { DinModuleResponse } from './din_module';
import type { KeypadKeyActionResponse } from './key_action';
import type { KeypadResponse } from './keypad';
import type { KeypadKeyResponse } from './keypadkey';
import type { LoadResponse } from './load';
import type { RCUResponse } from './rcu';
import type { RoomResponse } from './room';
import type { SceneResponse } from './scene';
import type { SceneLoadResponse } from './scene_load';
import type { Unit } from './unit';
import type { ZoneResponse } from './zone';

export type DashboardContext = {
	unit: Unit;
	scenes: Array<SceneResponse>;
	rcus: Array<RCUResponse>;
	keypads: Array<KeypadResponse>;
	loads: Array<LoadResponse>;
	zones: Array<ZoneResponse>;
	rooms: Array<RoomResponse>;
	dinModules: Array<DinModuleResponse>;
	channels: Array<ChannelResponse>;
	keypadKeys: Array<KeypadKeyResponse>;
	keyActions: Array<KeypadKeyActionResponse>;
	sceneLoads: Array<SceneLoadResponse>;
};
