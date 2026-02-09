import { getApiAuthHeaders, API_BASE } from '$lib/constants/api';
import { RELOAD_TARGETS } from '$lib/constants/dashboard';
import type {
    CustomLedMappingRequest,
    CustomLedMappingResponse,
    LedSyncGroupRequest,
    LedSyncGroupResponse
} from '$lib/types/domain_graph';

// ============================================
// Custom LED Mappings
// ============================================

const CUSTOM_LED_MAPPINGS_PATH = '/api/custom_led_mappings/';

export async function createCustomLedMapping(request: CustomLedMappingRequest) {
    const response = await fetch(`${API_BASE}${CUSTOM_LED_MAPPINGS_PATH}`, {
        method: 'POST',
        headers: getApiAuthHeaders(),
        body: JSON.stringify(request)
    });
    const body = await response.json();
    if (response.ok) {
        window.dispatchEvent(new Event(RELOAD_TARGETS.UNIT_DOMAIN));
        return body as CustomLedMappingResponse;
    }
    throw Error(`Unable to create custom LED mapping: ${JSON.stringify(body)}`);
}

export async function deleteCustomLedMapping(id: number) {
    const response = await fetch(`${API_BASE}${CUSTOM_LED_MAPPINGS_PATH}${id}/`, {
        method: 'DELETE',
        headers: getApiAuthHeaders()
    });
    if (!response.ok) {
        throw Error(`Unable to delete custom LED mapping: ${response.statusText}`);
    }
    window.dispatchEvent(new Event(RELOAD_TARGETS.UNIT_DOMAIN));
}

// ============================================
// LED Sync Groups
// ============================================

const LED_SYNC_GROUPS_PATH = '/api/led_sync_groups/';

export async function createLedSyncGroup(request: LedSyncGroupRequest) {
    const response = await fetch(`${API_BASE}${LED_SYNC_GROUPS_PATH}`, {
        method: 'POST',
        headers: getApiAuthHeaders(),
        body: JSON.stringify(request)
    });
    const body = await response.json();
    if (response.ok) {
        window.dispatchEvent(new Event(RELOAD_TARGETS.UNIT_DOMAIN));
        return body as LedSyncGroupResponse;
    }
    throw Error(`Unable to create LED sync group: ${JSON.stringify(body)}`);
}

export async function deleteLedSyncGroup(id: number) {
    const response = await fetch(`${API_BASE}${LED_SYNC_GROUPS_PATH}${id}/`, {
        method: 'DELETE',
        headers: getApiAuthHeaders()
    });
    if (!response.ok) {
        throw Error(`Unable to delete LED sync group: ${response.statusText}`);
    }
    window.dispatchEvent(new Event(RELOAD_TARGETS.UNIT_DOMAIN));
}
