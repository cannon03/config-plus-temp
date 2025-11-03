import { fetchUnit } from '$lib/api/unit';
import type { PageLoad } from './$types';
import { fetchScenes } from '$lib/api/scene';
import { fetchRCUs } from '$lib/api/rcu';
import { fetchKeypads } from '$lib/api/keypad';
import { fetchLoads } from '$lib/api/load';
import { fetchRooms } from '$lib/api/room';
import { fetchZones } from '$lib/api/zone';
import { fetchDinModules } from '$lib/api/din_module';

export const load: PageLoad = async ({ params }) => {
	const unit = await fetchUnit(Number(params.id));
	const unitId = unit.id;
	console.log('UNIT', unitId);

	const allScenes = await fetchScenes();
	const scenes = allScenes.filter((scene) => scene.unit == unitId);

	const allRCUS = await fetchRCUs();
	const rcus = allRCUS.filter((rcu) => rcu.unit == unitId);

	const allZones = await fetchZones();
	const zones = allZones.filter((zone) => zone.unit == unitId);
	console.log('ALL ZONES', allZones, 'ZONES', zones);

	const allRooms = await fetchRooms();
	const rooms = allRooms.filter((room) => zones.some((zone) => zone.id == room.zone));

	const allKeypads = await fetchKeypads();
	const keypads = allKeypads.filter((keypad) =>
		rooms.some((room) => keypad.location_room == room.id)
	);

	const allLoads = await fetchLoads();
	const loads = allLoads.filter((load) => rooms.some((room) => load.room == room.id));

	const allDinModules = await fetchDinModules();
	const din_modules = allDinModules.filter((din_module) =>
		rcus.some((rcu) => din_module.rcu == rcu.id)
	);

	return {
		unit: unit,
		scenes: scenes,
		rcus: rcus,
		keypads: keypads,
		loads: loads,
		zones: zones,
		rooms: rooms,
		din_modules: din_modules
	};
};
