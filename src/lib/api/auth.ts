import type { AuthRequest } from '$lib/types/auth';
import { API_BASE, API_HEADERS } from '../constants/api';

const PATH = '/api-token-auth/';
const credentialType = 'include';
const methodType = 'POST';

export async function login(request: AuthRequest) {
	const response = await fetch(`${API_BASE}${PATH}`, {
		method: methodType,
		credentials: credentialType,
		headers: API_HEADERS,
		body: JSON.stringify(request)
	});

	const body = await response.json();

	if (response.ok) {
		return body;
	}
	const errorMessage = `Unable to Login: ${JSON.stringify(body)}`;
	throw new Error(errorMessage);
}
