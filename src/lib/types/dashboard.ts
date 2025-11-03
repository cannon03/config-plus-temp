import type { DinModuleResponse } from './din_module';
import type { KeypadResponse } from './keypad';
import type { LoadResponse } from './load';
import type { RCUResponse } from './rcu';
import type { RoomResponse } from './room';
import type { SceneResponse } from './scene';
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
	din_modules: Array<DinModuleResponse>;
};
