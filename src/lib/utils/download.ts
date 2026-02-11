import { fetchBillOfMaterials } from '$lib/api/bill_of_materials';
import { fetchElectricalLayout } from '$lib/api/electrical_layout';
import { getDownloadURL } from '$lib/api/project_files';
import { fetchFirmwareMappings } from '$lib/api/rcu_mappings';

function downloadJSON(data: unknown, filename: string) {
	const blob = new Blob([JSON.stringify(data, null, 2)], {
		type: 'application/json'
	});

	const url = URL.createObjectURL(blob);

	const a = document.createElement('a');
	a.href = url;
	a.download = filename;
	a.click();

	URL.revokeObjectURL(url);
}

export async function downloadElectricalLayout(unitId: number, exportName: string) {
	const data = await fetchElectricalLayout(unitId);
	downloadJSON(data, `${exportName}-electrical-layout.json`);
}

function downloadBlob(blob: Blob, filename: string) {
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}

export async function downloadRCUMappings(unitId: number, exportName: string, exportType: string = 'v3') {
	const response = await fetchFirmwareMappings(unitId, exportType);

	if (exportType === 'v3') {
		const data = await response.json();
		downloadJSON(data, `${exportName}-rcu-mappings.json`);
	} else if (exportType === 'v2_json') {
		const text = await response.text();
		const blob = new Blob([text], { type: 'text/plain' });
		downloadBlob(blob, `${exportName}-rcu-mappings.txt`);
	} else if (exportType === 'v2_header') {
		const text = await response.text();
		const blob = new Blob([text], { type: 'text/plain' });
		downloadBlob(blob, `${exportName}-rcu-mappings.h`);
	} else if (exportType === 'all') {
		const blob = await response.blob();
		downloadBlob(blob, `${exportName}-rcu-mappings.zip`);
	}
}

export async function downloadBillOfMaterials(projectId: number, exportName: string) {
	const date = new Date();
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const formattedDate = `${day}-${month}-${year}`;
	const blob = await fetchBillOfMaterials(projectId);

	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = `${exportName}-bill-of-materials-${formattedDate}.xlsx`;
	a.click();
	URL.revokeObjectURL(url);
}

export async function downloadProjectFile(fileId: number) {
	const response = await getDownloadURL(fileId);
	const downloadUrl = response.download_url;
	const a = document.createElement('a');
	a.href = downloadUrl;
	a.download = ''; // let server filename be used
	a.style.display = 'none';

	document.body.appendChild(a);
	a.click();
	a.remove();
}
