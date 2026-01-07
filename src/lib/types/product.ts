export type ProductResponse = {
	id: number;
	product_type: number;
	category_name: string;
	type_name: string;
	name: string;
	model_number: string;
	description: string;
	specifications: {
		depth: string;
		modules: number;
		material: string;
	};
	price: string;
	is_active: boolean;
	created_at: string;
	updated_at: string;
};

export type RoomProductResponse = {
	id: number;
	room: number;
	room_name: string;
	product: number;
	product_name: string;
	product_model: string;
	product_price: string;
	quantity: number;
	total_price: string;
	category_name: string;
	type_name: string;
	notes: string;
	created_at: string;
	updated_at: string;
};

export type RoomProductRequest = {
	room: number;
	product: number;
	quantity: number;
	notes: string;
};

export type ProductSearchResponse = {
	query: string;
	count: number;
	results: Array<ProductResponse>;
};
