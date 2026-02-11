import { API_BASE, getApiAuthHeaders } from '$lib/constants/api';
import type { ProductResponse, ProductSearchResponse, ProductTypeRequest, ProductTypeResponse, CategoryResponse, CategoryRequest } from '$lib/types/product';

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

export async function fuzzySearchProducts(query: string) {
	const response = await fetch(`${API_BASE}${PATH}fuzzy_search/?q=${query}`, {
		method: 'GET',
		headers: getApiAuthHeaders()
	});
	console.log(response);
	if (!response.ok) {
		throw Error(`Unable to fetch products: ${response.statusText}`);
	}
	return response.json() as Promise<ProductSearchResponse>;
}

export async function createProduct(product: any) {
	const response = await fetch(`${API_BASE}${PATH}`, {
		method: 'POST',
		headers: getApiAuthHeaders(),
		body: JSON.stringify(product)
	});

	if (!response.ok) {
		throw Error(`Unable to create product: ${response.statusText}`);
	}
	return response.json() as Promise<ProductResponse>;
}

export async function fetchProductTypes() {
	const response = await fetch(`${API_BASE}/api/product_types/`, {
		method: 'GET',
		headers: getApiAuthHeaders()
	});

	if (!response.ok) {
		throw Error(`Unable to fetch product types: ${response.statusText}`);
	}
	return response.json() as Promise<Array<{ id: number; name: string; key: string }>>;
}

export async function createProductType(productType: ProductTypeRequest): Promise<ProductTypeResponse> {
	const response = await fetch(`${API_BASE}/api/product_types/`, {
		method: 'POST',
		headers: getApiAuthHeaders(),
		body: JSON.stringify(productType)
	});

	if (!response.ok) {
		throw Error(`Unable to create product type: ${response.statusText}`);
	}
	return response.json() as Promise<ProductTypeResponse>;
}

export async function fetchCategories(): Promise<Array<CategoryResponse>> {
	const response = await fetch(`${API_BASE}/api/product_categories/`, {
		method: 'GET',
		headers: getApiAuthHeaders()
	});

	if (!response.ok) {
		throw Error(`Unable to fetch categories: ${response.statusText}`);
	}
	return response.json() as Promise<Array<CategoryResponse>>;
}

export async function createCategory(category: CategoryRequest): Promise<CategoryResponse> {
	const response = await fetch(`${API_BASE}/api/product_categories/`, {
		method: 'POST',
		headers: getApiAuthHeaders(),
		body: JSON.stringify(category)
	});

	if (!response.ok) {
		throw Error(`Unable to create category: ${response.statusText}`);
	}
	return response.json() as Promise<CategoryResponse>;
}
