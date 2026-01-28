<script lang="ts">
	import { SCENE_FORM_CONTROL_SCOPES } from '$lib/constants/scene';
	import type { RoomResponse } from '$lib/types/room';
	import type { SceneFormControlScopeValue } from '$lib/types/scene';
	import type { ZoneResponse } from '$lib/types/zone';
	import type { Unit } from '$lib/types/unit';
	import type { InputResponse } from '$lib/types/input';
	import type { LoadResponse } from '$lib/types/load';
	import type { SceneLoadData } from '$lib/types/scene_load';

	let {
		controlScope = $bindable(),
		selectedRoomId = $bindable(),
		selectedZoneId = $bindable(),
		sceneLoads = $bindable(),
		availiableLoads,
		input,
		allRooms,
		zones,
		unit
	}: {
		controlScope: SceneFormControlScopeValue;
		selectedRoomId: number;
		selectedZoneId: number;
		sceneLoads: Array<SceneLoadData>;
		availiableLoads: Array<LoadResponse>;
		input: InputResponse;
		allRooms: Array<RoomResponse>;
		zones: Array<ZoneResponse>;
		unit: Unit;
	} = $props();

	async function onScopeChange(e: Event) {
		const target = e.target as HTMLSelectElement;
		const value = Number(target.value);

		if (controlScope === SCENE_FORM_CONTROL_SCOPES.ROOM.value) {
			selectedRoomId = value;
			selectedZoneId = allRooms.find((r) => r.id === value)?.zone ?? selectedZoneId;
		} else if (controlScope === SCENE_FORM_CONTROL_SCOPES.ZONE.value) {
			selectedZoneId = value;
		} else if (controlScope === SCENE_FORM_CONTROL_SCOPES.ALL.value) {
			selectedRoomId = input.location_room;
			selectedZoneId = allRooms.find((r) => r.id === input.location_room)?.zone ?? selectedZoneId;
		}
	}

	async function addLoadsinScope() {
		for (const load of availiableLoads) {
			sceneLoads.push({
				name: load.name,
				load_id: load.id,
				value: 0,
				load_type: load.load_type
			});
		}
	}
</script>

<div>
	<div class="space-y-4">
		<label for="scope" class="text-sm font-medium text-gray-700">Control Scope</label>
		<div id="scope" class="flex w-full gap-2">
			{#each Object.values(SCENE_FORM_CONTROL_SCOPES) as scope}
				<button
					class={`flex-1 rounded-lg border px-4 py-2 text-sm font-medium transition
								${
									controlScope === scope.value
										? 'border-blue-600 bg-blue-600 text-white shadow-sm'
										: 'border-gray-300 text-gray-700 hover:bg-gray-100'
								}`}
					onclick={() => (controlScope = scope.value)}
				>
					{scope.label}
				</button>
			{/each}
		</div>

		<div class="space-y-2">
			<label for="scope-select" class="text-sm font-medium text-gray-700">Scope Selection</label>
			<select
				id="scope-select"
				onchange={onScopeChange}
				class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
			>
				{#if controlScope === SCENE_FORM_CONTROL_SCOPES.ROOM.value}
					{#each allRooms as room}
						<option value={room.id}>{room.name}</option>
					{/each}
				{:else if controlScope === SCENE_FORM_CONTROL_SCOPES.ZONE.value}
					{#each zones as zone}
						<option value={zone.id}>{zone.name}</option>
					{/each}
				{:else}
					<option value={unit.id}>{unit.name}</option>
				{/if}
			</select>
			<button
				onclick={addLoadsinScope}
				class="mt-1 rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
			>
				Add All Loads in Scope
			</button>
		</div>
	</div>
</div>
