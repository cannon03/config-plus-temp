<script lang="ts">
	import KeypadCard from '$lib/components/composed/cards/KeypadCard.svelte';
	import AddKeypadForm from '$lib/components/composed/forms/AddKeypadForm.svelte';
	import Modal from '$lib/components/composed/modals/Modal.svelte';
	import { KEYPAD_ADDRESSES } from '$lib/constants/keypad';
	import { getDashboardContext } from '$lib/context/dashboard';
	import type { KeypadResponse } from '$lib/types/keypad';
	import type { RoomResponse } from '$lib/types/room';
	import { Plus } from 'lucide-svelte';

	let ctx = getDashboardContext();

	function getRoomOfKeypads(keypad: KeypadResponse) {
		return ctx.rooms.filter((room) => room.id === keypad.location_room);
	}

	const keypadsByRoom: Record<number, Array<RoomResponse>> = $derived.by(() =>
		Object.fromEntries(ctx.keypads.map((keypad) => [keypad.id, getRoomOfKeypads(keypad)]))
	);

	let showModal = $state(false);
	const availiableAddresses = $derived.by(() =>
		KEYPAD_ADDRESSES.filter((address) => !ctx.keypads.some((keypad) => keypad.address === address))
	);
</script>

{#key availiableAddresses || ctx.rooms}
	<Modal title="Add Keypad" bind:showModal>
		<AddKeypadForm bind:showModal addresses={availiableAddresses} rooms={ctx.rooms} />
	</Modal>
{/key}

<div class="flex h-full flex-col bg-gray-50">
	<!-- Header -->
	<div class="border-b border-gray-200 bg-white p-6">
		<div class="flex items-center justify-between">
			<div>
				<h1 class="text-2xl font-bold text-gray-900">Keypads</h1>
				<p class="mt-1 text-gray-600">Add keypads and program them visually with scenes</p>
			</div>
			<button
				class="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
				onclick={() => (showModal = true)}
			>
				<Plus class="h-4 w-4" />
				Add Keypad
			</button>
		</div>
	</div>

	<!-- Main Content -->
	<div class="flex-1 overflow-y-auto p-6">
		{#if ctx.keypads.length === 0}
			<!-- Empty State -->
			<div class="flex h-full flex-col items-center justify-center text-center">
				<div class="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
					<span class="text-4xl">🎛️</span>
				</div>
				<h3 class="mb-2 text-xl font-medium text-gray-900">No keypads installed</h3>
				<p class="mb-6 max-w-md text-gray-600">
					Start by adding your first keypad. Choose the room, select the keypad type, and begin
					programming scenes visually.
				</p>
				<button
					class="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
				>
					<Plus class="h-5 w-5" />
					Add Your First Keypad
				</button>
			</div>
		{:else}
			<!-- Keypads Grid -->
			<div class="flex flex-row flex-wrap justify-evenly gap-6">
				{#each ctx.keypads as keypad}
					<KeypadCard
						zones={ctx.zones}
						loads={ctx.loads}
						allKeypadKeys={ctx.keypadKeys}
						keyActions={ctx.keyActions}
						unit={ctx.unit}
						{keypad}
						rooms={ctx.rooms}
					/>
				{/each}
			</div>
		{/if}
	</div>
</div>
