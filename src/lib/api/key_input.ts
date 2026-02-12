import { getApiAuthHeaders, API_BASE } from '$lib/constants/api';
import { RELOAD_TARGETS } from '$lib/constants/dashboard';
import type { KeyInput, KeyInputNameRequest } from '$lib/types/key_input';

const PATH = '/api/key_inputs/';

export async function updateKeyInputName(id: number, request: KeyInputNameRequest) {
    const response = await fetch(`${API_BASE}${PATH}${id}/`, {
        method: 'PATCH',
        headers: getApiAuthHeaders(),
        body: JSON.stringify(request)
    });
    const body = await response.json();
    if (response.ok) {
        window.dispatchEvent(new Event(RELOAD_TARGETS.KEYPAD_KEYS));
        return body as KeyInput;
    }
    throw Error(`Unable to update key input name: ${body}`);
}
