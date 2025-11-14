import { fetchBillOfMaterials } from '$lib/api/bill_of_materials';
import { fetchElectricalLayout } from '$lib/api/electrical_layout';
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

export async function downloadRCUMappings(unitId: number, exportName: string) {
	const data = await fetchFirmwareMappings(unitId);
	downloadJSON(data, `${exportName}-rcu-mappings.json`);
}

export async function downloadBillOfMaterials(projectId: number, exportName: string) {
	const date = new Date();
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const formattedDate = `${day}-${month}-${year}`;
	const data = await fetchBillOfMaterials(projectId);
	downloadJSON(data, `${exportName}-bill-of-materials-${formattedDate}.xlsx`);
}
