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
	<h3 class="text-sm font-semibold text-foreground">Control Scope</h3>

	<div class="rounded-lg border border-border bg-card p-4 shadow-sm">
		<div class="space-y-4">
			<!-- Scope Selection Tabs/Buttons -->
			<div class="grid grid-cols-2 gap-1 rounded-lg bg-muted p-1">
				{#each Object.values(SCENE_FORM_CONTROL_SCOPES) as scope}
					<button
						onclick={() => (controlScope = scope.value)}
						class={`rounded-md px-3 py-2 text-sm font-medium transition-all ${
							controlScope === scope.value
								? 'bg-card text-foreground shadow-sm'
								: 'text-muted-foreground hover:text-foreground'
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
							class="mb-1.5 block text-xs font-medium tracking-wide text-muted-foreground uppercase"
							>Select Room</label
						>
						<div class="relative">
							<select
								id="room-select"
								bind:value={selectedRoomId}
								class="block w-full rounded-lg border border-border bg-card py-2 pr-10 pl-3 text-foreground ring-1 ring-border focus:ring-2 focus:ring-ring sm:text-sm sm:leading-6"
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
							class="mb-1.5 block text-xs font-medium tracking-wide text-muted-foreground uppercase"
							>Select Zone</label
						>
						<div class="relative">
							<select
								id="zone-select"
								bind:value={selectedZoneId}
								class="block w-full rounded-lg border border-border bg-card py-2 pr-10 pl-3 text-foreground ring-1 ring-border focus:ring-2 focus:ring-ring sm:text-sm sm:leading-6"
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
					class="flex w-full items-center justify-center gap-2 rounded-lg border border-primary/20 bg-primary/10 px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
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
