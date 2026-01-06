import { API_BASE, getApiAuthHeaders } from '$lib/constants/api';
import type { ProductResponse } from '$lib/types/product';

const PATH = '/api/products/';

export async function fetchProducts() {
	const response = await fetch(`${API_BASE}${PATH}`, {
		method: 'GET',
		headers: getApiAuthHeaders()
	});
	if (!response.ok) {
		throw Error(`Unable to fetch products: ${response.statusText}`);
	}
	return response.json() as Promise<Array<ProductResponse>>;
}
