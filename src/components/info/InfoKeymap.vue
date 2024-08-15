<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
// import ColumnGroup from 'primevue/columngroup';   // optional
// import Row from 'primevue/row';                   // optional

const rows = [
	[1, "CTRL + K", "Search in links"],
	[2, "CTRL + E", "Toggle view / edit modes"],
	[3, "Long press on item", "Switch to edit mode"],
	[4, "CTRL + A", "Add new item"],
	[5, "CTRL + R", "Exit current folder"],
	[6, "CTRL + D", "Go back to categories"],
];

const parsedRows = rows.map(r => {
	return {
		id: r[0],
		keys: r[1],
		desc: r[2],
	}
});

</script>

<template>
	<h2 class="text-center text-lg mb-8 font-bold text-slate-700">
		Keyboard shortcuts
	</h2>

	<div class="rounded-lg bg-white overflow-hidden p-2">
		<DataTable
			:value="parsedRows"
			tableStyle="min-width: 50rem"
			size="small"
		>
			<Column field="keys" header="Keys"></Column>
			<Column field="desc" header="Description"></Column>
		</DataTable>
	</div>
</template>
