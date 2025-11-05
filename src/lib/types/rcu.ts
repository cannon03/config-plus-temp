export type RCUResponse = {
	id: number;
	name: string;
	channel_count: number;
	unit: number;
};

export type RCURequest = {
	name: string;
	channel_count: number;
	unit: number;
};
