<script lang="ts">
	import backgroundImage from '$lib/assets/logicboard_background.svg';
	import type { LOGICBOARD_TYPES } from '$lib/constants/logic_board';
	import LogicBoardKeyImage from '$lib/assets/logicboard_key.svg';
	import Modal from '../modals/Modal.svelte';
	import SceneForm from '../forms/SceneForm.svelte';
	import KeyInputNameForm from '../forms/KeyInputNameForm.svelte';
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

	let showNameModal = $state(false);
	let nameModalKeyInput = $state<KeyInput | null>(null);

	function showKeyNameModal(keyInput: KeyInput) {
		nameModalKeyInput = keyInput;
		showNameModal = true;
	}

	let showDelModal = $state(false);
	async function del(e: Event) {
		await deleteLogicBoard(input.id);
		showDelModal = false;
	}
</script>

<Modal title="Delete Logic Board" bind:showModal={showDelModal}>
	<div class="flex flex-col items-center gap-6 text-center">
		<p class="text-sm text-muted-foreground">
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
				class="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
			>
				Cancel
			</button>
		</div>
	</div>
</Modal>

{#if nameModalKeyInput}
	<Modal bind:showModal={showNameModal} title="Rename Key">
		<KeyInputNameForm bind:showModal={showNameModal} keyInput={nameModalKeyInput} />
	</Modal>
{/if}

<div
	class="w-96 rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
>
	<!-- Header -->
	<div class="mb-4 flex items-center justify-between">
		<div>
			<h3 class="font-semibold text-foreground">Address {input.address}</h3>
			<h3 class="font-semibold text-foreground">CAT-6 Branch: {input.cat6_branch}</h3>
			<p class="text-sm text-muted-foreground">{selectedRoom.name}</p>
			<p class="text-xs text-primary">Logic Board</p>
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
		class="relative m-auto aspect-square w-80 rounded-2xl bg-muted shadow-lg"
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
							<div class="flex flex-col items-center justify-center gap-3">
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
										class="m-4 transition group-hover:brightness-75"
									/>
									{#if key_input.actions && key_input.actions.length > 0}
										<div
											title={key_input.actions.map((a) => a.event_type).join(', ')}
											class="absolute -top-4 -right-4 h-4 w-4 rounded-full border border-white bg-green-500 shadow-md"
										></div>
									{/if}
								</button>
								<button
									onclick={() => showKeyNameModal(key_input)}
									class="mt-1 rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground shadow-sm hover:cursor-pointer hover:opacity-90"
								>
									{key_input.name ? key_input.name : 'Key ' + key_input.key_index}
								</button>
							</div>
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
