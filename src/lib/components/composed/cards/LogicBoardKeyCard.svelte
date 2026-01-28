<script lang="ts">
	import backgroundImage from '$lib/assets/logicboard_background.svg';
	import type { LOGICBOARD_TYPES } from '$lib/constants/logic_board';
	import LogicBoardKeyImage from '$lib/assets/logicboard_key.svg';
	import Modal from '../modals/Modal.svelte';
	import SceneForm from '../forms/SceneForm.svelte';
	import { SCENE_FORM_TYPES } from '$lib/constants/scene';
	import type { Unit } from '$lib/types/unit';
	import type { RoomResponse } from '$lib/types/room';
	import type { ZoneResponse } from '$lib/types/zone';
	import type { InputResponse } from '$lib/types/input';
	import type { KeyInput } from '$lib/types/key_input';
	import { Trash2 } from 'lucide-svelte';
	import { deleteLogicBoard } from '$lib/api/logicboard';

	let showModal = $state(false);
	let showModalKey = $state(0);
	const {
		unit,
		type,
		input,
		inputKeys,
		selectedRoom,
		selectedZone,
		allZones,
		allRooms
	}: {
		unit: Unit;
		type: (typeof LOGICBOARD_TYPES)[keyof typeof LOGICBOARD_TYPES];
		input: InputResponse;
		inputKeys: KeyInput[];
		selectedRoom: RoomResponse;
		selectedZone: ZoneResponse;
		allZones: ZoneResponse[];
		allRooms: RoomResponse[];
	} = $props();

	const { rows, cols, layout } = $derived.by(() => type);
	const keyMap = $derived.by(() => new Map(layout.map((k) => [`${k.row},${k.col}`, k])));
	const buttonSize = 35;

	const showSceneModal = () => {
		showModalKey++;
		showModal = true;
	};

	let showDelModal = $state(false);
	async function del(e: Event) {
		await deleteLogicBoard(input.id);
		showDelModal = false;
	}
</script>

<Modal title="Delete Logic Board" bind:showModal={showDelModal}>
	<div class="flex flex-col items-center gap-6 text-center">
		<p class="text-sm text-gray-600">
			Are you sure you want to delete this Logic Board? This action cannot be undone.
		</p>

		<div class="mt-4 flex gap-3">
			<button
				onclick={del}
				class="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
			>
				Yes, Delete
			</button>
			<button
				onclick={() => (showDelModal = false)}
				class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
			>
				Cancel
			</button>
		</div>
	</div>
</Modal>

<div
	class="w-96 rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
>
	<!-- Header -->
	<div class="mb-4 flex items-center justify-between">
		<div>
			<h3 class="font-semibold text-gray-900">Address {input.address}</h3>
			<h3 class="font-semibold text-gray-900">CAT-6 Branch: {input.cat6_branch}</h3>
			<p class="text-sm text-gray-600">{selectedRoom.name}</p>
			<p class="text-xs text-blue-600">Logic Board</p>
		</div>
		<button
			class="p-1 text-red-500 transition-colors hover:text-red-700"
			onclick={() => (showDelModal = true)}
			title="Delete Logic Board"
		>
			<Trash2 class="h-4 w-4" />
		</button>
	</div>

	<!-- Main keypad container -->
	<div
		class="relative m-auto aspect-square w-80 rounded-2xl bg-gray-50 shadow-lg"
		style={`background-image:url('${backgroundImage}');
			background-size:contain;
			background-repeat:no-repeat;
			background-position:center;`}
	>
		<!-- Grid overlay -->
		<div
			class="absolute inset-0 grid place-items-center gap-4 p-6"
			style={`grid-template-rows:repeat(${rows},1fr);
				grid-template-columns:repeat(${cols},1fr);`}
		>
			{#each Array(rows) as _, r}
				{#each Array(cols) as _, c}
					{@const map_obj = keyMap.get(`${r + 1},${c + 1}`)}
					{#if map_obj}
						{@const key_input = input.inputs.find((k) => k.key_index === map_obj.key_id)}
						{#if key_input}
							<button
								type="button"
								title="Configure key"
								style="width: {buttonSize}px; height: {buttonSize}px"
								class="group relative flex items-center justify-center rounded-xl shadow-md transition hover:scale-105 hover:cursor-pointer hover:shadow-lg"
								onclick={() => (showModal = true)}
							>
								<img
									src={LogicBoardKeyImage}
									alt="Switch"
									class="transition group-hover:brightness-75"
								/>
							</button>
							<Modal bind:showModal title={SCENE_FORM_TYPES.CREATE}>
								<SceneForm
									bind:showModal
									{unit}
									{input}
									inputKey={key_input}
									{allZones}
									{allRooms}
									room={selectedRoom}
									zone={selectedZone}
									loads={selectedRoom.loads}
								/>
							</Modal>
						{/if}
					{:else}
						<div style="width: {buttonSize}px; height: {buttonSize}px"></div>
					{/if}
				{/each}
			{/each}
		</div>
	</div>
</div>
