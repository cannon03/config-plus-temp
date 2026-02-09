import type { ChannelResponse } from './channel';
import type { DinModuleResponse } from './din_module';

export type RCUResponse = {
	id: number;
	name: string;
	channel_count: number;
	channels: Array<ChannelResponse>;
	din_modules: Array<DinModuleResponse>;
};

export type RCURequest = {
	name: string;
	channel_count: number;
	unit: number;
};
