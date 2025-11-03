import type { LoadResponse } from '$lib/types/load';

export function getRoomLoads(loads: Array<LoadResponse>, roomId: number) {
	return loads.filter((load) => load.room == roomId);
}
