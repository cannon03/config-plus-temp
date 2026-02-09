<script lang="ts">
	import { createKeyCard } from '$lib/api/key_card';
	import Button from '$lib/components/base/Button.svelte';
	import { KEYPAD_CAT6_BRANCHES } from '$lib/constants/keypad';
	import { KEY_CARD_TYPES } from '$lib/constants/key_card';
	import type { KeyCardRequest } from '$lib/types/key_card';
	import type { RoomResponse } from '$lib/types/room';
	import { Save } from 'lucide-svelte';

	let {
		rooms,
		addresses,
		showModal = $bindable(false)
	}: { rooms: Array<RoomResponse>; addresses: Array<number>; showModal?: boolean } = $props();

	let keyCardRequest = $state<KeyCardRequest>({
		id: 0,
		name: '',
		location_room: rooms[0]?.id ?? 0,
		// cat6_branch: KEYPAD_CAT6_BRANCHES[0],
		address: addresses[0] ?? 0
	});

	export async function handleSubmit(e: Event) {
		e.preventDefault();
		await createKeyCard(keyCardRequest);
	}
</script>

<form onsubmit={handleSubmit} class="flex flex-col gap-8 rounded-2xl bg-white p-2 transition-all">
	<!-- Name -->
	<div class="flex flex-col gap-2">
		<label for="kecard-name" class="text-sm font-medium text-gray-800">Name</label>
		<input
			id="kecard-name"
			name="kecard-name"
			type="text"
			bind:value={keyCardRequest.name}
			class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
		/>
	</div>
	<!-- Room -->
	<div class="flex flex-col gap-2">
		<label for="select-room" class="text-sm font-medium text-gray-800">Room</label>
		<select
			id="select-room"
			name="select-room"
			bind:value={keyCardRequest.location_room}
			class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
		>
			{#each rooms as room}
				<option value={room.id}>{room.name}</option>
			{/each}
		</select>
	</div>

	<!-- Cat6 Branch -->
	<!-- <div class="flex flex-col gap-2">
		<label for="cat6-branch" class="text-sm font-medium text-gray-800">Cat 6 Branch</label>
		<select
			id="cat6-branch"
			name="cat6-branch"
			bind:value={keyCardRequest.cat6_branch}
			class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
		>
			{#each KEYPAD_CAT6_BRANCHES as branch}
				<option value={branch}>{branch}</option>
			{/each}
		</select>
	</div> -->

	<!-- Address -->
	<div class="flex flex-col gap-2">
		<label for="address" class="text-sm font-medium text-gray-800">Address</label>
		<input
			type="number"
			id="address"
			name="address"
			min="1"
			max="64"
			list="available-addresses"
			bind:value={keyCardRequest.address}
			class="w-32 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
		/>
		<datalist id="available-addresses">
			{#each addresses as addr}
				<option value={addr}></option>
			{/each}
		</datalist>
	</div>

	<!-- Keypad Type -->
	<div class="flex flex-col gap-3">
		<label for="keypad-type" class="text-sm font-medium text-gray-800">Keypad Type</label>

		<div id="keypad-type" class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
			{#each Object.entries(KEY_CARD_TYPES) as [type, config]}
				<button
					type="button"
					class="group flex flex-col items-center gap-3 rounded-xl border border-blue-400 border-gray-200 bg-blue-50 bg-gray-50 p-4 text-sm font-medium text-gray-700 shadow-sm ring-2 ring-blue-400 transition-all hover:cursor-pointer hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm focus:outline-none"
				>
					<img
						src={config.image}
						alt={config.label}
						class="pointer-events-none h-16 w-auto object-contain transition-transform select-none group-hover:scale-105"
					/>
					<span>{config.label}</span>
				</button>
			{/each}
		</div>
	</div>

	<!-- Submit -->
	<div class="mt-2 flex justify-end">
		<Button type="submit" variant="saveform" class="flex items-center gap-2 px-5 py-2.5 text-sm">
			<Save class="h-4 w-4" />
			Add Keypad
		</Button>
	</div>
</form>
