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

	$effect(() => {
		if (controlScope === SCENE_FORM_CONTROL_SCOPES.ROOM.value) {
			selectedZoneId = allRooms.find((r) => r.id === selectedRoomId)?.zone ?? selectedZoneId;
		}
	});

	async function addLoadsinScope() {
		const newLoads = availiableLoads
			.filter((load) => !sceneLoads.some((sl) => sl.load_id === load.id))
			.map((load) => ({
				name: load.name,
				load_id: load.id,
				value: 0,
				load_type: load.load_type
			}));
		sceneLoads = [...sceneLoads, ...newLoads];
	}
</script>

<section class="space-y-3">
	<h3 class="text-sm font-semibold text-gray-900">Control Scope</h3>

	<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
		<div class="space-y-4">
			<!-- Scope Selection Tabs/Buttons -->
			<div class="grid grid-cols-2 gap-1 rounded-lg bg-gray-100 p-1">
				{#each Object.values(SCENE_FORM_CONTROL_SCOPES) as scope}
					<button
						onclick={() => (controlScope = scope.value)}
						class={`rounded-md px-3 py-2 text-sm font-medium transition-all ${
							controlScope === scope.value
								? 'bg-white text-gray-900 shadow-sm'
								: 'text-gray-500 hover:text-gray-900'
						}`}
					>
						{scope.label}
					</button>
				{/each}
			</div>

			<!-- Dynamic Dropdowns based on Scope -->
			<div class="space-y-4">
				{#if controlScope === SCENE_FORM_CONTROL_SCOPES.ROOM.value}
					<div>
						<label
							for="room-select"
							class="mb-1.5 block text-xs font-medium tracking-wide text-gray-500 uppercase"
							>Select Room</label
						>
						<div class="relative">
							<select
								id="room-select"
								bind:value={selectedRoomId}
								class="block w-full rounded-md border-0 py-2 pr-10 pl-3 text-gray-900 ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
							>
								{#each allRooms as room}
									<option value={room.id}>{room.name}</option>
								{/each}
							</select>
						</div>
					</div>
				{/if}

				{#if controlScope === SCENE_FORM_CONTROL_SCOPES.ZONE.value}
					<div>
						<label
							for="zone-select"
							class="mb-1.5 block text-xs font-medium tracking-wide text-gray-500 uppercase"
							>Select Zone</label
						>
						<div class="relative">
							<select
								id="zone-select"
								bind:value={selectedZoneId}
								class="block w-full rounded-md border-0 py-2 pr-10 pl-3 text-gray-900 ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
							>
								{#each zones as zone}
									<option value={zone.id}>{zone.name}</option>
								{/each}
							</select>
						</div>
					</div>
				{/if}

				<!-- Action Button -->
				<button
					onclick={addLoadsinScope}
					class="flex w-full items-center justify-center gap-2 rounded-md border border-blue-100 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-100"
				>
					<span
						>Import Loads from {controlScope === SCENE_FORM_CONTROL_SCOPES.ROOM.value
							? 'Room'
							: 'Zone'}</span
					>
				</button>
			</div>
		</div>
	</div>
</section>
