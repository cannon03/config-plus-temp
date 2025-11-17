export type UploadURLRequest = {
	project: number;
	filename: string;
	content_type: string;
	size: number;
};

export type UploadURLResponse = {
	upload_url: string;
	s3_key: string;
	bucket: string;
	region: string;
};

export type ConfirmUploadRequest = {
	project: number;
	filename: string;
	s3_key: string;
	size: number;
	content_type: string;
};

export type ConfirmUploadResponse = {
	id: number;
	filename: string;
	s3_key: string;
	size: number;
	content_type: string;
	uploaded_by: string;
	uploaded_at: string;
};

export type DownloadURLResponse = {
	download_url: string;
};

export type ProjectFile = {
	id: number;
	filename: string;
	s3_key: string;
	size: number;
	content_type: string;
	uploaded_by: string;
	uploaded_at: string;
};
