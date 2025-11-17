export type Project = {
	id: number;
	name: string;
	location?: string;
	description: string;
	created_at: string;
	updated_at: string;
};

export type ProjectRequest = {
	name: string;
	description: string;
};
