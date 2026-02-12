<script lang="ts">
	import { getDashboardContext } from '$lib/context/dashboard';
	import type { DomainGraphScene } from '$lib/types/domain_graph';
	import type { KeyInput } from '$lib/types/key_input';
	import type { KeypadKeyActionResponse } from '$lib/types/key_action';
	import {
		Layers,
		Lightbulb,
		Keyboard,
		CircuitBoard,
		CreditCard,
		Zap,
		ChevronDown,
		ChevronRight,
		SlidersHorizontal,
		Timer,
		Clock,
		Power,
		PowerOff
	} from 'lucide-svelte';

	const ctx = getDashboardContext();

	const scenes = $derived(ctx.domainGraph.layout.scenes);
	const zones = $derived(ctx.domainGraph.layout.zones);
	const rooms = $derived(zones.flatMap((z) => z.rooms));

	// Build a lookup: sceneId -> list of inputs that reference it
	type InputBinding = {
		inputType: 'keypad' | 'logicboard' | 'keycard';
		deviceId: number;
		deviceAddress: number;
		inputId: number;
		keyIndex: number;
		inputName: string;
		action: KeypadKeyActionResponse;
		roomName: string;
		zoneName: string;
	};

	const sceneBindings = $derived.by(() => {
		const map = new Map<number, InputBinding[]>();

		for (const zone of zones) {
			for (const room of zone.rooms) {
				const collectInputs = (
					devices: Array<{ id: number; address: number; inputs: Array<KeyInput> }>,
					type: 'keypad' | 'logicboard' | 'keycard'
				) => {
					for (const device of devices) {
						for (const input of device.inputs) {
							for (const action of input.actions) {
								if (action.action_type === 'scene' && action.action_target) {
									const existing = map.get(action.action_target) ?? [];
									existing.push({
										inputType: type,
										deviceId: device.id,
										deviceAddress: device.address,
										inputId: input.id,
										keyIndex: input.key_index,
										inputName: input.name || `Key ${input.key_index}`,
										action,
										roomName: room.name,
										zoneName: zone.name
									});
									map.set(action.action_target, existing);
								}
							}
						}
					}
				};

				collectInputs(room.keypads, 'keypad');
				collectInputs(room.logic_boards, 'logicboard');
				collectInputs(room.keycards, 'keycard');
			}
		}

		return map;
	});

	// Get room name from scope_id
	function getRoomName(scopeId: number): string {
		for (const room of rooms) {
			if (room.id === scopeId) return room.name;
		}
		return `Room #${scopeId}`;
	}

	// Group scenes by scope (room)
	const scenesByRoom = $derived.by(() => {
		const map = new Map<number, { roomName: string; scenes: DomainGraphScene[] }>();
		for (const scene of scenes) {
			const existing = map.get(scene.scope_id);
			if (existing) {
				existing.scenes.push(scene);
			} else {
				map.set(scene.scope_id, {
					roomName: getRoomName(scene.scope_id),
					scenes: [scene]
				});
			}
		}
		return map;
	});

	let expandedScenes = $state<Set<number>>(new Set());

	function toggleScene(id: number) {
		const next = new Set(expandedScenes);
		if (next.has(id)) {
			next.delete(id);
		} else {
			next.add(id);
		}
		expandedScenes = next;
	}

	function expandAll() {
		expandedScenes = new Set(scenes.map((s) => s.id));
	}

	function collapseAll() {
		expandedScenes = new Set();
	}

	function getInputIcon(type: string) {
		switch (type) {
			case 'keypad':
				return Keyboard;
			case 'logicboard':
				return CircuitBoard;
			case 'keycard':
				return CreditCard;
			default:
				return Zap;
		}
	}

	function getEventBadgeColor(eventType: string) {
		switch (eventType) {
			case 'on':
				return 'bg-emerald-100 text-emerald-700 border-emerald-200';
			case 'off':
				return 'bg-red-100 text-red-700 border-red-200';
			default:
				return 'bg-gray-100 text-gray-700 border-gray-200';
		}
	}

	function getValueColor(value: number) {
		if (value === 0) return 'bg-gray-200';
		if (value <= 25) return 'bg-amber-300';
		if (value <= 50) return 'bg-amber-400';
		if (value <= 75) return 'bg-yellow-400';
		return 'bg-yellow-300';
	}
</script>

<div class="space-y-6">
	<!-- Header -->
	<div class="flex items-center justify-between">
		<div>
			<h3 class="text-lg font-medium text-gray-900">Scene Configuration</h3>
			<p class="mt-1 text-sm text-gray-500">
				View how inputs trigger scenes and their load configurations
			</p>
		</div>
		<div class="flex items-center gap-2">
			<span
				class="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700"
			>
				{scenes.length} scene{scenes.length !== 1 ? 's' : ''}
			</span>
			<button
				onclick={expandAll}
				class="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
			>
				Expand All
			</button>
			<button
				onclick={collapseAll}
				class="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
			>
				Collapse All
			</button>
		</div>
	</div>

	<!-- No scenes state -->
	{#if scenes.length === 0}
		<div class="rounded-xl border border-dashed border-gray-300 py-16 text-center">
			<Layers class="mx-auto mb-4 h-12 w-12 text-gray-300" />
			<h5 class="mb-2 text-sm font-medium text-gray-900">No scenes configured</h5>
			<p class="text-sm text-gray-500">Scenes will appear here once they are created</p>
		</div>
	{:else}
		<!-- Scenes grouped by room -->
		{#each [...scenesByRoom.entries()] as [scopeId, group]}
			<div class="overflow-hidden rounded-xl border border-gray-200">
				<!-- Room Header -->
				<div
					class="flex items-center gap-3 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white px-5 py-3"
				>
					<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100">
						<Layers class="h-4 w-4 text-indigo-600" />
					</div>
					<div>
						<h4 class="text-sm font-semibold text-gray-900">{group.roomName}</h4>
						<p class="text-xs text-gray-500">
							{group.scenes.length} scene{group.scenes.length !== 1 ? 's' : ''}
						</p>
					</div>
				</div>

				<!-- Scenes in this room -->
				<div class="divide-y divide-gray-100">
					{#each group.scenes as scene (scene.id)}
						{@const isExpanded = expandedScenes.has(scene.id)}
						{@const bindings = sceneBindings.get(scene.id) ?? []}

						<div class="transition-colors {isExpanded ? 'bg-blue-50' : ''}">
							<!-- Scene Row (clickable) -->
							<button
								onclick={() => toggleScene(scene.id)}
								class="group flex w-full items-center gap-4 px-5 py-3.5 text-left transition-colors hover:bg-gray-50"
							>
								<!-- Expand icon -->
								<div
									class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-gray-100 transition-colors group-hover:bg-gray-200"
								>
									{#if isExpanded}
										<ChevronDown class="h-3.5 w-3.5 text-gray-600" />
									{:else}
										<ChevronRight class="h-3.5 w-3.5 text-gray-600" />
									{/if}
								</div>

								<!-- Scene info -->
								<div class="min-w-0 flex-1">
									<div class="flex items-center gap-2">
										<span class="text-sm font-medium text-gray-900">
											{scene.name}
										</span>
										<span
											class="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500"
										>
											ID: {scene.id}
										</span>
										<span
											class="inline-flex items-center rounded-full bg-violet-50 px-2 py-0.5 text-xs font-medium text-violet-600"
										>
											Priority {scene.priority}
										</span>
									</div>
								</div>

								<!-- Summary badges -->
								<div class="flex items-center gap-3">
									{#if bindings.length > 0}
										<span
											class="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"
										>
											<Zap class="h-3 w-3" />
											{bindings.length} trigger{bindings.length !== 1 ? 's' : ''}
										</span>
									{:else}
										<span
											class="inline-flex items-center gap-1 rounded-full bg-gray-50 px-2.5 py-1 text-xs text-gray-400"
										>
											No triggers
										</span>
									{/if}
									<span
										class="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700"
									>
										<Lightbulb class="h-3 w-3" />
										{scene.scene_loads.length} load{scene.scene_loads.length !== 1 ? 's' : ''}
									</span>
								</div>
							</button>

							<!-- Expanded detail -->
							{#if isExpanded}
								<div class="border-t border-gray-100 px-5 pt-4 pb-5">
									<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
										<!-- LEFT: Triggers (inputs bound to this scene) -->
										<div>
											<div class="mb-3 flex items-center gap-2">
												<Zap class="h-4 w-4 text-blue-500" />
												<h6 class="text-xs font-semibold tracking-wider text-gray-500 uppercase">
													Triggers
												</h6>
											</div>

											{#if bindings.length === 0}
												<div
													class="rounded-lg border border-dashed border-gray-200 px-4 py-6 text-center"
												>
													<p class="text-xs text-gray-400">No inputs are mapped to this scene</p>
												</div>
											{:else}
												<div class="space-y-2">
													{#each bindings as binding}
														{@const InputIcon = getInputIcon(binding.inputType)}
														<div
															class="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2.5 shadow-sm"
														>
															<!-- Input type icon -->
															<div
																class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
																class:bg-blue-100={binding.inputType === 'keypad'}
																class:text-blue-600={binding.inputType === 'keypad'}
																class:bg-amber-100={binding.inputType === 'logicboard'}
																class:text-amber-600={binding.inputType === 'logicboard'}
																class:bg-emerald-100={binding.inputType === 'keycard'}
																class:text-emerald-600={binding.inputType === 'keycard'}
															>
																<InputIcon class="h-4 w-4" />
															</div>

															<!-- Binding info -->
															<div class="min-w-0 flex-1">
																<div class="flex items-center gap-1.5">
																	<span class="text-xs font-medium text-gray-700 capitalize">
																		{binding.inputType}
																	</span>
																	<span class="text-xs text-gray-400">
																		Addr {binding.deviceAddress}
																	</span>
																	<span class="text-xs text-gray-400">·</span>
																	<span class="text-xs text-gray-600">
																		{binding.inputName}
																	</span>
																</div>
																<div class="mt-0.5 text-xs text-gray-400">
																	{binding.zoneName} → {binding.roomName}
																</div>
															</div>

															<!-- Event type badge -->
															<span
																class="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium {getEventBadgeColor(
																	binding.action.event_type
																)}"
															>
																{#if binding.action.event_type === 'on'}
																	<Power class="h-3 w-3" />
																{:else}
																	<PowerOff class="h-3 w-3" />
																{/if}
																{binding.action.event_type}
															</span>

															<!-- State badge -->
															<span
																class="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500"
															>
																{binding.action.state}
															</span>
														</div>
													{/each}
												</div>
											{/if}
										</div>

										<!-- RIGHT: Scene Loads -->
										<div>
											<div class="mb-3 flex items-center gap-2">
												<SlidersHorizontal class="h-4 w-4 text-amber-500" />
												<h6 class="text-xs font-semibold tracking-wider text-gray-500 uppercase">
													Scene Loads
												</h6>
											</div>

											{#if scene.scene_loads.length === 0}
												<div
													class="rounded-lg border border-dashed border-gray-200 px-4 py-6 text-center"
												>
													<p class="text-xs text-gray-400">No loads configured</p>
												</div>
											{:else}
												<div class="overflow-hidden rounded-lg border border-gray-200">
													<table class="w-full">
														<thead>
															<tr
																class="bg-gray-50 text-left text-xs tracking-wider text-gray-500 uppercase"
															>
																<th class="px-3 py-2 font-medium">Load</th>
																<th class="px-3 py-2 font-medium">Value</th>
																<th class="px-3 py-2 font-medium">
																	<span class="flex items-center gap-1">
																		<Timer class="h-3 w-3" />
																		Fade
																	</span>
																</th>
																<th class="px-3 py-2 font-medium">
																	<span class="flex items-center gap-1">
																		<Clock class="h-3 w-3" />
																		Delay
																	</span>
																</th>
															</tr>
														</thead>
														<tbody class="divide-y divide-gray-100">
															{#each scene.scene_loads as sl}
																<tr class="transition-colors hover:bg-gray-50">
																	<td class="px-3 py-2.5">
																		<div class="flex items-center gap-2">
																			<Lightbulb class="h-3.5 w-3.5 text-gray-400" />
																			<span class="text-sm font-medium text-gray-800">
																				{sl.load_name}
																			</span>
																		</div>
																	</td>
																	<td class="px-3 py-2.5">
																		<div class="flex items-center gap-2">
																			<div
																				class="h-2 w-16 overflow-hidden rounded-full bg-gray-200"
																			>
																				<div
																					class="h-full rounded-full transition-all {getValueColor(
																						sl.value
																					)}"
																					style="width: {sl.value}%"
																				></div>
																			</div>
																			<span
																				class="text-xs font-semibold tabular-nums"
																				class:text-gray-400={sl.value === 0}
																				class:text-gray-900={sl.value > 0}
																			>
																				{sl.value}%
																			</span>
																		</div>
																	</td>
																	<td class="px-3 py-2.5">
																		<span class="text-xs text-gray-600 tabular-nums">
																			{sl.fade_ms}ms
																		</span>
																	</td>
																	<td class="px-3 py-2.5">
																		<span class="text-xs text-gray-600 tabular-nums">
																			{sl.delay_ms}ms
																		</span>
																	</td>
																</tr>
															{/each}
														</tbody>
													</table>
												</div>
											{/if}
										</div>
									</div>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		{/each}
	{/if}
</div>
