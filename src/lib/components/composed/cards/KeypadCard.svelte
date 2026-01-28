<script lang="ts">
	import type { KeypadResponse } from '$lib/types/keypad';
	import type { RoomResponse } from '$lib/types/room';
	import { Trash2 } from 'lucide-svelte';
	import KeypadKeyCard from './KeypadKeyCard.svelte';
	import { KEYPAD_TYPES } from '$lib/constants/keypad';
	import { getDashboardContext } from '$lib/context/dashboard';
	import Modal from '../modals/Modal.svelte';

	import { deleteKeypad } from '$lib/api/keypad';
	import type { Unit } from '$lib/types/unit';
	import type { ZoneResponse } from '$lib/types/zone';
	import type { KeypadInputResponse, KeypadKeyResponse } from '$lib/types/keypadkey';
	import type { LoadResponse } from '$lib/types/load';
	import type { KeypadKeyActionResponse } from '$lib/types/key_action';

	const {
		keypad,
		keypadKeys,
		allZones,
		allRooms,
		selectedRoom,
		selectedZone,
		keyActions
	}: {
		keypadKeys: Array<KeypadInputResponse>;
		keypad: KeypadResponse;
		allZones: Array<ZoneResponse>;
		allRooms: Array<RoomResponse>;
		selectedRoom: RoomResponse;
		selectedZone: ZoneResponse;
		keyActions: Array<KeypadKeyActionResponse>;
	} = $props();

	// const keypadKeys = $derived.by(() => allKeypadKeys.filter((k) => k.keypad === keypad.id));
	const mappedKeys = $derived.by(() =>
		keypadKeys.filter((k) => keyActions.some((ka) => ka.key === k.id))
	);

	const keypadType = $derived.by(
		() => KEYPAD_TYPES[`${keypad.num_keys}key` as keyof typeof KEYPAD_TYPES]
	);

	let showDelModal = $state(false);
	async function del(e: Event) {
		await deleteKeypad(keypad.id);
		showDelModal = false;
	}
</script>

<Modal title="Delete Keypad" bind:showModal={showDelModal}>
	<div class="flex flex-col items-center gap-6 text-center">
		<p class="text-sm text-gray-600">
			Are you sure you want to delete this Keypad? This action cannot be undone.
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
	<!-- Keypad Header -->
	<div class="mb-4 flex items-center justify-between">
		<div>
			<h3 class="font-semibold text-gray-900">Address {keypad.address}</h3>
			<h3 class="font-semibold text-gray-900">CAT-6 Branch: {keypad.cat6_branch}</h3>

			<p class="text-sm text-gray-600">{selectedRoom.name}</p>

			<p class="text-xs text-blue-600">{keypad.num_keys}-key Keypad</p>
		</div>
		<button
			class="p-1 text-red-500 transition-colors hover:text-red-700"
			onclick={() => (showDelModal = true)}
			title="Delete keypad"
		>
			<Trash2 class="h-4 w-4" />
		</button>
	</div>

	<KeypadKeyCard
		{keypad}
		{keyActions}
		type={keypadType}
		{keypadKeys}
		{allZones}
		{allRooms}
		{selectedRoom}
		{selectedZone}
	/>

	<!-- Programming Status -->
	<div class="p-4 text-center">
		<div class="mb-2 text-sm text-gray-600">
			{mappedKeys.length}/{keypadKeys.length} buttons programmed
		</div>
		<div class="h-2 w-full rounded-full bg-gray-200">
			<div
				class="h-2 rounded-full bg-blue-600 transition-all duration-300"
				style="width: {(mappedKeys.length / keypadKeys.length) * 100}%"
			></div>
		</div>
	</div>
</div>
