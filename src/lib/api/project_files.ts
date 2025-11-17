import { API_BASE, getApiAuthHeaders } from '$lib/constants/api';
import type {
	ConfirmUploadRequest,
	ConfirmUploadResponse,
	DownloadURLResponse,
	UploadURLRequest,
	UploadURLResponse
} from '$lib/types/project_file';

const PATH = '/api/project_files/';

export async function getUploadUrl(request: UploadURLRequest) {
	const response = await fetch(`${API_BASE}${PATH}get_upload_url/`, {
		method: 'POST',
		credentials: 'include',
		headers: getApiAuthHeaders(),
		body: JSON.stringify(request)
	});

	const body = await response.json();

	if (response.ok) {
		return body as UploadURLResponse;
	}
	const errorMessage = `Unable to get upload url: ${JSON.stringify(body)}`;
	throw new Error(errorMessage);
}

export async function uploadToS3(file: File, url: string) {
	const response = await fetch(url, {
		method: 'PUT',
		headers: {
			'Content-Type': file.type
		},
		body: file
	});
	if (!response.ok) {
		throw new Error(`Unable to upload file to s3: ${response.statusText}`);
	}
}

export async function confirmUpload(request: ConfirmUploadRequest) {
	const response = await fetch(`${API_BASE}${PATH}confirm_upload/`, {
		method: 'POST',
		credentials: 'include',
		headers: getApiAuthHeaders(),
		body: JSON.stringify(request)
	});

	if (response.ok) {
		const body = await response.json();

		return body as ConfirmUploadResponse;
	}
	const errorMessage = `Unable to get upload url: ${response.statusText}`;
	throw new Error(errorMessage);
}

export async function fetchProjectFiles(projectId: number) {
	const url = new URL(`${API_BASE}${PATH}`);
	url.searchParams.set('project', projectId.toString());
	const response = await fetch(url, {
		method: 'GET',
		headers: getApiAuthHeaders()
	});
	if (!response.ok) {
		throw Error(`Unable to fetch project files: ${response.statusText}`);
	}
	return response.json();
}

export async function deleteFile(id: number) {
	const response = await fetch(`${API_BASE}${PATH}${id}/`, {
		method: 'DELETE',
		headers: getApiAuthHeaders()
	});
	if (!response.ok) {
		throw Error(`Unable to delete file: ${response.statusText}`);
	}
}

export async function getDownloadURL(id: number): Promise<DownloadURLResponse> {
	const response = await fetch(`${API_BASE}${PATH}${id}/download_url/`, {
		method: 'GET',
		headers: getApiAuthHeaders()
	});
	if (!response.ok) {
		throw Error(`Unable to get download url: ${response.statusText}`);
	}
	return response.json() as Promise<DownloadURLResponse>;
}
