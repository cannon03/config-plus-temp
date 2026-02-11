<script lang="ts">
	import type { KeypadResponse } from '$lib/types/keypad';
	import type { KeyCardResponse } from '$lib/types/key_card';
	import type { LogicBoardResponse } from '$lib/types/logic_board';
	import KeypadBackground from '$lib/assets/keypad_background.svg';
	import KeycardImage from '$lib/assets/key-card.svg';
	import LogicBoardBackground from '$lib/assets/logicboard_background.svg';
	import { getDashboardContext } from '$lib/context/dashboard';
	import KeypadCard from '$lib/components/composed/cards/KeypadCard.svelte';
	import Modal from '$lib/components/composed/modals/Modal.svelte';
	import { KEYPAD_ADDRESSES } from '$lib/constants/keypad';
	import AddKeypadForm from '$lib/components/composed/forms/AddKeypadForm.svelte';
	import { Plus } from 'lucide-svelte';
	import { LOGICBOARD_TYPES } from '$lib/constants/logic_board';
	import LogicBoardKeyCard from '$lib/components/composed/cards/LogicBoardKeyCard.svelte';
	import AddLogicBoardForm from '$lib/components/composed/forms/AddLogicBoardForm.svelte';
	import AddKeyCardForm from '$lib/components/composed/forms/AddKeyCardForm.svelte';
	import KeyCardLayout from '$lib/components/composed/cards/KeyCardLayout.svelte';
	import { KEY_CARD_TYPES } from '$lib/constants/key_card';
	const ctx = getDashboardContext();
	let showModal = $state(false);
	let showLogicModal = $state(false);
	let showKeycardModal = $state(false);

	const keypads = $derived.by(() =>
		ctx.domainGraph.layout.zones.flatMap((z) => z.rooms.flatMap((r) => r.keypads))
	);

	const logicboards = $derived.by(() =>
		ctx.domainGraph.layout.zones.flatMap((z) => z.rooms.flatMap((r) => r.logic_boards))
	);

	const keycards = $derived.by(() =>
		ctx.domainGraph.layout.zones.flatMap((z) => z.rooms.flatMap((r) => r.keycards))
	);
	const availiableAddresses = $derived.by(() =>
		KEYPAD_ADDRESSES.filter((address) => !keypads.some((keypad) => keypad.address === address))
	);

	$effect(() => console.log($state.snapshot(availiableAddresses)));

	const rooms = $derived.by(() => ctx.domainGraph.layout.zones.flatMap((z) => z.rooms));
	const loads = $derived.by(() => rooms.flatMap((r) => r.loads));
</script>

{#key availiableAddresses || rooms}
	<Modal title="Add Keypad" bind:showModal>
		<AddKeypadForm bind:showModal addresses={availiableAddresses} {rooms} />
	</Modal>
	<Modal title="Add Logicboard" bind:showModal={showLogicModal}>
		<AddLogicBoardForm bind:showModal={showLogicModal} addresses={availiableAddresses} {rooms} />
	</Modal>
	<Modal title="Add Keycard" bind:showModal={showKeycardModal}>
		<AddKeyCardForm bind:showModal={showKeycardModal} addresses={availiableAddresses} {rooms} />
	</Modal>
{/key}

<div class="space-y-6">
	<!-- Main Container -->
	<div class="rounded-lg bg-white p-4">
		<!-- Header -->
		<div class="mb-6 flex items-center justify-between">
			<div>
				<h3 class="text-lg font-medium text-gray-900">Input Configuration</h3>
				<p class="mt-1 text-sm text-gray-500">
					Add keypads, keycards, and logic boards to control your scenes
				</p>
			</div>
			<div class="flex items-center gap-2">
				<button
					class="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:cursor-pointer hover:bg-gray-50"
					onclick={() => (showModal = true)}
				>
					<Plus class="mr-1.5 h-4 w-4 text-gray-500" />
					Keypad
				</button>
				<button
					class="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:cursor-pointer hover:bg-gray-50"
					onclick={() => (showLogicModal = true)}
				>
					<Plus class="mr-1.5 h-4 w-4 text-gray-500" />
					Logic Board
				</button>
				<button
					class="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:cursor-pointer hover:bg-gray-50"
					onclick={() => (showKeycardModal = true)}
				>
					<Plus class="mr-1.5 h-4 w-4 text-gray-500" />
					Keycard
				</button>
			</div>
		</div>

		<!-- Zones Loop -->
		{#if ctx.domainGraph.layout.zones.length > 0}
			<div class="space-y-6">
				{#each ctx.domainGraph.layout.zones as zone}
					{@const zoneRooms = zone.rooms}
					<div class="rounded-lg border border-gray-200">
						<!-- Zone Header -->
						<div
							class="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3"
						>
							<div class="flex items-center gap-2">
								<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100">
									<span class="text-sm font-semibold text-indigo-600"
										>{zone.name.charAt(0).toUpperCase()}</span
									>
								</div>
								<div>
									<h4 class="font-medium text-gray-900">{zone.name}</h4>
									<p class="text-xs text-gray-500">
										{zoneRooms.length} room{zoneRooms.length !== 1 ? 's' : ''}
									</p>
								</div>
							</div>
						</div>

						<!-- Rooms -->
						<div class="divide-y divide-gray-100">
							{#each rooms as room}
								<div class="p-4">
									<!-- Room Header -->
									<div class="mb-4 flex items-center gap-2">
										<div class="flex h-6 w-6 items-center justify-center rounded bg-gray-100">
											<span class="text-xs font-medium text-gray-600"
												>{room.name.charAt(0).toUpperCase()}</span
											>
										</div>
										<h5 class="font-medium text-gray-800">{room.name}</h5>
									</div>

									<!-- Keypads Section -->
									{#if room.keypads.length > 0}
										<div class="mb-5">
											<div class="mb-3 flex items-center gap-2">
												<span
													class="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700"
												>
													Keypads
												</span>
												<span class="text-xs text-gray-400">{room.keypads.length}</span>
											</div>
											<div class="flex flex-wrap gap-4">
												{#each room.keypads as keypad}
													<KeypadCard
														{keypad}
														keyActions={[]}
														keypadKeys={keypad.inputs}
														selectedRoom={room}
														selectedZone={zone}
														allZones={ctx.domainGraph.layout.zones}
														allRooms={rooms}
													/>
												{/each}
											</div>
										</div>
									{/if}

									<!-- Keycards Section -->
									{#if room.keycards.length > 0}
										<div class="mb-5">
											<div class="mb-3 flex items-center gap-2">
												<span
													class="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700"
												>
													Keycards
												</span>
												<span class="text-xs text-gray-400">{room.keycards.length}</span>
											</div>
											<div class="flex flex-wrap gap-4">
												{#each room.keycards as keycard}
													{@const type = KEY_CARD_TYPES[`${keycard.num_keys}key`]}
													<KeyCardLayout {type} {keycard} selectedRoom={room} />
												{/each}
											</div>
										</div>
									{/if}

									<!-- Logic Boards Section -->
									{#if room.logic_boards.length > 0}
										<div>
											<div class="mb-3 flex items-center gap-2">
												<span
													class="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700"
												>
													Logic Boards
												</span>
												<span class="text-xs text-gray-400">{room.logic_boards.length}</span>
											</div>
											<div class="flex flex-wrap gap-4">
												{#each room.logic_boards as logicboard}
													{@const type = LOGICBOARD_TYPES[`${logicboard.num_keys}key`]}
													<LogicBoardKeyCard
														unit={ctx.domainGraph.unit}
														{type}
														input={logicboard}
														inputKeys={logicboard.inputs}
														selectedRoom={room}
														selectedZone={zone}
														allZones={ctx.domainGraph.layout.zones}
														allRooms={rooms}
													/>
												{/each}
											</div>
										</div>
									{/if}

									<!-- Empty State for Room -->
									{#if room.keypads.length === 0 && room.keycards.length === 0 && room.logic_boards.length === 0}
										<div
											class="flex items-center gap-3 rounded-lg border border-dashed border-gray-200 bg-gray-50 p-4"
										>
											<div
												class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100"
											>
												<Plus class="h-5 w-5 text-gray-400" />
											</div>
											<div>
												<p class="text-sm font-medium text-gray-600">No inputs configured</p>
												<p class="text-xs text-gray-400">
													Add keypads, keycards, or logic boards to this room
												</p>
											</div>
										</div>
									{/if}
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<!-- Empty State for No Zones -->
			<div class="py-12 text-center">
				<div
					class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100"
				>
					<Plus class="h-6 w-6 text-gray-400" />
				</div>
				<h5 class="mb-2 text-sm font-medium text-gray-900">No zones available</h5>
				<p class="text-sm text-gray-500">Create zones and rooms first to add input devices</p>
			</div>
		{/if}
	</div>
</div>
