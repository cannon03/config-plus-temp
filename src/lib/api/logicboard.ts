import { API_BASE, getApiAuthHeaders } from "$lib/constants/api";
import { RELOAD_TARGETS } from "$lib/constants/dashboard";
import type { LogicBoardRequest } from "$lib/types/logic_board";

const PATH = '/api/logicboards/'

export async function createLogicBoard(logicBoardRequest: LogicBoardRequest) {
    const response = await fetch(`${API_BASE}${PATH}`, {
        method: 'POST',
        headers: getApiAuthHeaders(),
        body: JSON.stringify(logicBoardRequest)
    });
    const body = await response.json();
    if (response.ok) {
        window.dispatchEvent(new Event(RELOAD_TARGETS.LOGIC_BOARDS));
    }
    throw Error(`Unable to create logicboard: ${body}`);
}

export async function deleteLogicBoard(id: number) {
    const response = await fetch(`${API_BASE}${PATH}${id}/`, {
        method: 'DELETE',
        headers: getApiAuthHeaders()
    });
    if (!response.ok) {
        throw Error(`Unable to delete logicboard: ${response.statusText}`);

    }
    window.dispatchEvent(new Event(RELOAD_TARGETS.LOGIC_BOARDS));
}