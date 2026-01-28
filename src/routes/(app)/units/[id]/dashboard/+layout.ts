import { fetchUnit, fetchUnitDomainGraph } from '$lib/api/unit';
import { fetchScenes } from '$lib/api/scene';
import { fetchRCUs } from '$lib/api/rcu';
import { fetchKeypads } from '$lib/api/keypad';
import { fetchLoads } from '$lib/api/load';
import { fetchRooms } from '$lib/api/room';
import { fetchZones } from '$lib/api/zone';
import { fetchDinModules } from '$lib/api/din_module';
import type { LayoutLoad } from './$types';
import type { DashboardContext } from '$lib/types/dashboard';
import { fetchChannels } from '$lib/api/channel';
// import { fetchKeypadKeys } from '$lib/api/keypadkey';
import { fetchSceneLoads } from '$lib/api/scene_load';
import { fetchKeypadKeyActions } from '$lib/api/key_action';
import { fetchRoomProductById } from '$lib/api/room_product';
import type { RoomProductResponse } from '$lib/types/product';
import { fetchKeypadInputs } from '$lib/api/keypadkey';

export const load: LayoutLoad = async ({ params }) => {
	// const unit = await fetchUnit(Number(params.id));
	const unitId = Number(params.id);

	const domainGraph = await fetchUnitDomainGraph(unitId);

	// const allScenes = await fetchScenes();
	// const scenes = allScenes.filter((scene) => scene.unit == unitId);

	// const allRCUS = await fetchRCUs();
	// const rcus = allRCUS.filter((rcu) => rcu.unit == unitId);

	// const allZones = await fetchZones();
	// const zones = allZones.filter((zone) => zone.unit == unitId);

	// const allRooms = await fetchRooms();
	// const rooms = allRooms.filter((room) => zones.some((zone) => zone.id == room.zone));

	// const allKeypads = await fetchKeypads();
	// const keypads = allKeypads.filter((keypad) =>
	// 	rooms.some((room) => keypad.location_room == room.id)
	// );

	// const allKeypadInputs = await fetchKeypadInputs();

	// const allLoads = await fetchLoads();
	// const loads = allLoads.filter((load) => rooms.some((room) => load.room == room.id));

	// const allDinModules = await fetchDinModules();
	// const din_modules = allDinModules.filter((din_module) =>
	// 	rcus.some((rcu) => din_module.rcu == rcu.id)
	// );

	// const allChannels = await fetchChannels();
	// const channels = allChannels.filter((channel) => loads.some((load) => load.id == channel.load));

	// const allKeypadKeys: Array<KeypadKeyResponse> = [
	// 	{
	// 		id: 0,
	// 		keypad: 0,
	// 		key_number: 0,
	// 		mode: '',
	// 		name: null
	// 	}
	// ];
	// const keypadKeys = allKeypadKeys.filter((keypadKey) =>
	// 	keypads.some((keypad) => keypad.id == keypadKey.keypad)
	// );

	const allKeypadKeyActions = await fetchKeypadKeyActions();
	// const keypadKeyActions = allKeypadKeyActions.filter((keyAction) =>
	// 	keypadKeys.some((key) => key.id == keyAction.key)
	// );

	// const allSceneLoads = await fetchSceneLoads();
	// const sceneLoads = allSceneLoads.filter((sceneLoad) =>
	// 	scenes.some((scene) => scene.id == sceneLoad.scene)
	// );

	console.log('domain_graph', domainGraph);

	// async function fetchRoomProducts() {
	// 	let allRoomProducts: Array<RoomProductResponse> = [];
	// 	for (const room of rooms) {
	// 		const products = await fetchRoomProductById(room.id);
	// 		allRoomProducts = [...allRoomProducts, ...products];
	// 	}
	// 	return allRoomProducts;
	// }

	// const roomProducts = await fetchRoomProducts();
	const ctx = <DashboardContext>{
		// unit: unit,
		// scenes: scenes,
		// rcus: [],
		// keypads: [],
		// loads: [],
		// zones: [],
		// rooms: [],
		// dinModules: [],
		// channels: [],
		// // keypadKeys: keypadKeys,
		// keyActions: allKeypadKeyActions,
		// sceneLoads: sceneLoads,
		// roomProducts: [],
		// keypadInputs: allKeypadInputs,
		domainGraph: domainGraph
	};

	return ctx;
};
