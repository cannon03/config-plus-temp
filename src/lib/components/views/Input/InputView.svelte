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

	const keypads: KeypadResponse[] = [
		{
			id: 1,
			location_room: 101,
			address: 1,
			num_keys: 4,
			cat6_branch: 1
		},
		{
			id: 2,
			location_room: 102,
			address: 2,
			num_keys: 6,
			cat6_branch: 1
		},
		{
			id: 3,
			location_room: 103,
			address: 3,
			num_keys: 2,
			cat6_branch: 2
		},
		{
			id: 4,
			location_room: 104,
			address: 4,
			num_keys: 6,
			cat6_branch: 2
		},
		{
			id: 5,
			location_room: 105,
			address: 5,
			num_keys: 1,
			cat6_branch: 3
		}
	];

	const keycards: KeyCardResponse[] = [
		{
			id: 1,
			location_room: 201,
			address: 1,
			num_keys: 1,
			cat6_branch: 1
		},
		{
			id: 2,
			location_room: 202,
			address: 2,
			num_keys: 1,
			cat6_branch: 1
		},
		{
			id: 3,
			location_room: 203,
			address: 3,
			num_keys: 1,
			cat6_branch: 2
		},
		{
			id: 4,
			location_room: 204,
			address: 4,
			num_keys: 1,
			cat6_branch: 2
		},
		{
			id: 5,
			location_room: 205,
			address: 5,
			num_keys: 1,
			cat6_branch: 3
		}
	];

	const logicboards: LogicBoardResponse[] = [
		{
			id: 1,
			location_room: 301,
			address: 1,
			num_keys: 1,
			cat6_branch: 1
		},
		{
			id: 2,
			location_room: 302,
			address: 2,
			num_keys: 2,
			cat6_branch: 1
		},
		{
			id: 3,
			location_room: 303,
			address: 3,
			num_keys: 3,
			cat6_branch: 2
		},
		{
			id: 4,
			location_room: 304,
			address: 4,
			num_keys: 4,
			cat6_branch: 2
		},
		{
			id: 5,
			location_room: 305,
			address: 5,
			num_keys: 2,
			cat6_branch: 3
		}
	];

	const ctx = getDashboardContext();
	let showModal = $state(false);
	let showLogicModal = $state(false);
	const availiableAddresses = $derived.by(() =>
		KEYPAD_ADDRESSES.filter((address) => !ctx.keypads.some((keypad) => keypad.address === address))
	);
</script>

{#key availiableAddresses || ctx.rooms}
	<Modal title="Add Keypad" bind:showModal>
		<AddKeypadForm bind:showModal addresses={availiableAddresses} rooms={ctx.rooms} />
	</Modal>
	<Modal title="Add Logicboard" bind:showModal={showLogicModal}>
		<AddLogicBoardForm
			bind:showModal={showLogicModal}
			addresses={availiableAddresses}
			rooms={ctx.rooms}
		/>
	</Modal>
{/key}

<div class="flex flex-col gap-4">
	<div class="flex h-full flex-col bg-gray-50">
		<!-- Header -->
		<div class="border-b border-gray-200 bg-white p-6">
			<div class="flex items-center justify-between">
				<div>
					<h1 class="text-2xl font-bold text-gray-900">Inputs</h1>
					<p class="mt-1 text-gray-600">Add inputs and program them visually with scenes</p>
				</div>
				<button
					class="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
					onclick={() => (showModal = true)}
				>
					<Plus class="h-4 w-4" />
					Add Keypad
				</button>
				<button
					class="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
					onclick={() => (showLogicModal = true)}
				>
					<Plus class="h-4 w-4" />
					Add LogicBoard
				</button>
			</div>
		</div>
	</div>
	<div class="flex flex-wrap gap-4">
		{#each ctx.keypads as keypad}
			<KeypadCard
				{keypad}
				unit={ctx.unit}
				zones={ctx.zones}
				loads={ctx.loads}
				keyActions={ctx.keyActions}
				allKeypadKeys={ctx.keypadInputs}
				rooms={ctx.rooms}
			/>
		{/each}
	</div>
	<div class="flex flex-wrap gap-4">
		{#each keycards as keycard}
			<div
				class="max-h-1: relative m-auto aspect-square w-80 rounded-2xl bg-gray-50 shadow-lg"
				style={`background-image:url('${KeycardImage}');
			background-size:contain;
			background-repeat:no-repeat;
			background-position:center;`}
			></div>
		{/each}
	</div>
	<div class="flex flex-wrap gap-4">
		{#each logicboards as logicboard}
			{@const type = LOGICBOARD_TYPES[`${logicboard.num_keys}key`]}
			<LogicBoardKeyCard {type} />
		{/each}
	</div>
</div>
