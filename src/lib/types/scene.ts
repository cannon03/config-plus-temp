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
};
