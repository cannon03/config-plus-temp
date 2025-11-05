import type { ChannelResponse } from '$lib/types/channel';
import type { DinModuleResponse } from '$lib/types/din_module';
import type { LoadResponse } from '$lib/types/load';
import type { RoomResponse } from '$lib/types/room';

export function getRoomLoads(loads: Array<LoadResponse>, roomId: number) {
	return loads.filter((load) => load.room == roomId);
}

export function getZoneRooms(zoneId: number, rooms: Array<RoomResponse>) {
	return rooms.filter((room) => room.zone == zoneId);
}

export function getDinModulesForRCU(rcuId: number, dinModules: Array<DinModuleResponse>) {
	return dinModules.filter((m) => m.rcu === rcuId);
}

export function getChannelsForRCU(rcuId: number, channels: Array<ChannelResponse>) {
	return channels.filter((c) => c.object_id === rcuId && c.content_type === 20);
}
export function findLoadName(loadId: number, loads: Array<LoadResponse>) {
	return (loads.find((l) => l.id === loadId) || { name: 'Unknown' }).name;
}

export function getChannelsForModule(moduleId: number, channels: Array<ChannelResponse>) {
	return channels.filter((c) => c.object_id === moduleId);
}
