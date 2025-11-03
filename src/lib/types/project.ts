import type { Unit } from './unit';

export type Project = {
	id: number;
	name: string;
	location?: string;
	description: string;
	created_at: string;
	updated_at: string;
};

export class Project1 {
	units: Array<Unit>;
	id: number;
	name: string;
	location?: string;
	description: string;
	created_at: Date;
	updated_at: Date;

	constructor(
		id: number,
		name: string,
		description: string,
		created_at: Date,
		updated_at: Date,
		units: Array<Unit>,
		location?: string
	) {
		this.units = units;
		this.id = id;
		this.name = name;
		this.location = location;
		this.description = description;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}
}
