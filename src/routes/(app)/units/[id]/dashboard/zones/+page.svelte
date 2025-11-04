<script lang="ts">
	import { Plus, Edit3, Trash2, Layers, Building2, MapPin, Eye, Pencil } from 'lucide-svelte';
	import type { ZoneResponse } from '$lib/types/zone';
	import type { RoomResponse } from '$lib/types/room';
	import { getDashboardContext } from '$lib/context/dashboard';

	// Dummy data
	let zones: ZoneResponse[] = [
		{ id: 1, name: 'First Floor', unit: 101 },
		{ id: 2, name: 'Second Floor', unit: 101 }
	];

	let rooms: RoomResponse[] = [
		{ id: 1, name: 'Living Room', zone: 1 },
		{ id: 2, name: 'Kitchen', zone: 1 },
		{ id: 3, name: 'Bedroom', zone: 2 }
	];

	const ctx = getDashboardContext();

	const getRoomsForZone = (zoneId: number) => rooms.filter((r) => r.zone === zoneId);
</script>

<div class="rounded-lg bg-white p-6">
	<!-- Header -->
	<div class="mb-6 flex items-end justify-end">
		<button
			class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
		>
			<Plus class="mr-2 h-4 w-4" />
			Add Zone
		</button>
	</div>

	<!-- Zones List -->
	<div class="space-y-4">
		{#if zones.length > 0}
			{#each zones as zone}
				{@const zoneRooms = getRoomsForZone(zone.id)}
				<div class="rounded-lg border border-gray-200">
					<!-- Zone Header -->
					<div class="flex items-center justify-between border-b border-gray-200 bg-gray-50 p-4">
						<div class="flex items-center space-x-3">
							<Layers class="h-5 w-5 text-blue-600" />
							<div>
								<h5 class="font-medium text-gray-900">{zone.name}</h5>
								<p class="text-sm text-gray-500">Unit {zone.unit}</p>
							</div>
						</div>
						<div class="flex items-center space-x-2">
							<button
								class="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
								title="Edit zone"
							>
								<Pencil class="h-4 w-4" />
							</button>
							<button
								class="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600"
								title="Delete zone"
							>
								<Trash2 class="h-4 w-4" />
							</button>
						</div>
					</div>

					<!-- Zone Content -->
					<div class="p-4">
						<!-- Add Room Button -->
						<div class="mb-4 flex items-center justify-between">
							<h6 class="text-sm font-medium text-gray-700">Rooms</h6>
							<button
								class="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
							>
								<Plus class="mr-1 h-3 w-3" />
								Add Room
							</button>
						</div>

						<!-- Rooms List -->
						{#if zoneRooms.length > 0}
							<div class="space-y-2">
								{#each zoneRooms as room}
									<div
										class="flex items-center justify-between rounded-lg border border-gray-200 p-3 hover:bg-gray-50"
									>
										<div class="flex items-center space-x-3">
											<MapPin class="h-4 w-4 text-gray-400" />
											<p class="text-sm font-medium text-gray-900">{room.name}</p>
										</div>
										<div class="flex items-center space-x-1">
											<button
												class="rounded p-1 text-gray-400 hover:text-gray-600"
												title="View details"
											>
												<Eye class="h-3 w-3" />
											</button>
											<button
												class="rounded p-1 text-gray-400 hover:text-gray-600"
												title="Edit room"
											>
												<Edit3 class="h-3 w-3" />
											</button>
											<button
												class="rounded p-1 text-gray-400 hover:text-red-600"
												title="Delete room"
											>
												<Trash2 class="h-3 w-3" />
											</button>
										</div>
									</div>
								{/each}
							</div>
						{:else}
							<div class="py-4 text-center text-gray-500">
								<MapPin class="mx-auto mb-2 h-8 w-8 text-gray-300" />
								<p class="text-sm">No rooms in this zone</p>
								<button class="mt-2 text-xs text-blue-600 hover:text-blue-800">
									Add first room
								</button>
							</div>
						{/if}
					</div>
				</div>
			{/each}
		{:else}
			<div class="py-8 text-center">
				<Building2 class="mx-auto mb-4 h-12 w-12 text-gray-300" />
				<h5 class="mb-2 text-sm font-medium text-gray-900">No zones created</h5>
				<p class="mb-4 text-sm text-gray-500">
					Create your first zone to start building the structure
				</p>
				<button
					class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
				>
					<Plus class="mr-2 h-4 w-4" />
					Create Zone
				</button>
			</div>
		{/if}
	</div>
</div>
