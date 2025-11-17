<script lang="ts">
	import { confirmUpload, getUploadUrl, uploadToS3 } from '$lib/api/project_files';
	import type { UploadURLRequest } from '$lib/types/project_file';

	let selectedFile: File | undefined = $state();

	let {
		projectId,
		showModal = $bindable(false),
		reloadFiles
	}: { projectId: number; showModal: boolean; reloadFiles: () => void } = $props();
	async function handleSubmit(e: Event) {
		const file = selectedFile;
		if (!file) return;
		const uploadData = await getUploadUrl({
			project: projectId,
			filename: file.name,
			content_type: file.type,
			size: file.size
		});
		await uploadToS3(file, uploadData.upload_url);

		await confirmUpload({
			project: projectId,
			filename: file.name,
			content_type: file.type,
			size: file.size,
			s3_key: uploadData.s3_key
		});
		showModal = false;
		reloadFiles();
	}

	async function handleChange(e: Event) {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0];
		if (!file) return;
		selectedFile = file;
	}
</script>

<form onsubmit={handleSubmit}>
	<h2 class="mb-4 text-lg font-semibold">Upload File</h2>

	<input
		type="file"
		onchange={handleChange}
		class="w-full rounded-md border border-gray-300 px-3 py-2 hover:cursor-pointer"
	/>

	<div class="mt-6 flex justify-end gap-2">
		<button
			class="rounded bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200"
			onclick={() => (showModal = false)}
		>
			Cancel
		</button>
		<button
			type="submit"
			class="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
		>
			Upload
		</button>
	</div>
</form>
