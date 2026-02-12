export type Unit = {
	id: number;
	name: string;
	description: string;
	notes: string;
	created_at: string;
	updated_at: string;
	project: number;
};

export type UnitRequest = {
	name: string;
	description: string;
	notes: string;
	project: number;
};
