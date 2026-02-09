import { API_BASE, getApiAuthHeaders } from "$lib/constants/api";
import { RELOAD_TARGETS } from "$lib/constants/dashboard";
import type { KeyCardRequest } from "$lib/types/key_card";

const PATH = '/api/keycards/'

export async function createKeyCard(request: KeyCardRequest) {
    const response = await fetch(`${API_BASE}${PATH}`, {
        method: 'POST',
        headers: getApiAuthHeaders(),
        body: JSON.stringify(request)
    });
    const body = await response.json();
    if (response.ok) {
        window.dispatchEvent(new Event(RELOAD_TARGETS.UNIT_DOMAIN));
    } else {
        throw Error(`Unable to create keycard: ${body}`);
    }
}

export async function deleteKeyCard(id: number) {
    const response = await fetch(`${API_BASE}${PATH}${id}/`, {
        method: 'DELETE',
        headers: getApiAuthHeaders()
    });
    if (!response.ok) {
        throw Error(`Unable to delete keycard: ${response.statusText}`);
    }
    window.dispatchEvent(new Event(RELOAD_TARGETS.UNIT_DOMAIN));
}
