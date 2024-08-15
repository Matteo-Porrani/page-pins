<script setup>
import {ref} from 'vue';
import Button from 'primevue/button';
import Tree from 'primevue/tree';
import Menu from 'primevue/menu';


const nodes = [
	{
		key: '0',
		label: 'Category',
		data: 'Documents Folder',
		icon: 'pi pi-fw pi-inbox',
		children: [
			{
				key: '0-0',
				label: 'Work',
				data: 'Work Folder',
				icon: 'pi pi-fw pi-folder',
				children: [
					{ key: '0-0-0', label: 'Expenses.doc', icon: 'pi pi-fw pi-link', data: 'Expenses Document' },
					{ key: '0-0-1', label: 'Resume.doc', icon: 'pi pi-fw pi-link', data: 'Resume Document' }
				]
			},
			{
				key: '0-1',
				label: 'Home',
				data: 'Home Folder',
				icon: 'pi pi-fw pi-folder',
				children: [{ key: '0-1-0', label: 'Invoices.txt', icon: 'pi pi-fw pi-link', data: 'Invoices for this month' }]
			}
		]
	},
	{
		key: '1',
		label: 'Events',
		data: 'Events Folder',
		icon: 'pi pi-fw pi-calendar',
		children: [
			{ key: '1-0', label: 'Meeting', icon: 'pi pi-fw pi-calendar-plus', data: 'Meeting' },
			{ key: '1-1', label: 'Product Launch', icon: 'pi pi-fw pi-calendar-plus', data: 'Product Launch' },
			{ key: '1-2', label: 'Report Review', icon: 'pi pi-fw pi-calendar-plus', data: 'Report Review' }
		]
	},
	{
		key: '2',
		label: 'Movies',
		data: 'Movies Folder',
		icon: 'pi pi-fw pi-star-fill',
		children: [
			{
				key: '2-0',
				icon: 'pi pi-fw pi-star-fill',
				label: 'Al Pacino',
				data: 'Pacino Movies',
				children: [
					{ key: '2-0-0', label: 'Scarface', icon: 'pi pi-fw pi-video', data: 'Scarface Movie' },
					{ key: '2-0-1', label: 'Serpico', icon: 'pi pi-fw pi-video', data: 'Serpico Movie' }
				]
			},
			{
				key: '2-1',
				label: 'Robert De Niro',
				icon: 'pi pi-fw pi-star-fill',
				data: 'De Niro Movies',
				children: [
					{ key: '2-1-0', label: 'Goodfellas', icon: 'pi pi-fw pi-video', data: 'Goodfellas Movie' },
					{ key: '2-1-1', label: 'Untouchables', icon: 'pi pi-fw pi-video', data: 'Untouchables Movie' }
				]
			}
		]
	}
];


const selectedKey = ref(null);


const menu = ref();
const items = ref([
	{
		label: 'Options',
		items: [
			{
				label: 'Refresh',
				icon: 'pi pi-refresh',
				command: () => console.log("hello"),

			},
			{
				label: 'Export',
				icon: 'pi pi-upload'
			}
		]
	}
]);
const toggle = (event) => {
	menu.value.toggle(event);

	console.log(event)
};

</script>

<template>
<div class="p-8">

	<Button
		label="Back"
		size="small"
		icon="pi pi-angle-left"
		as="router-link"
		to="/"
	/>

	<Button
		label="Back"
		size="small"
		icon="pi pi-angle-left"
		as="router-link"
		to="/"
		severity="secondary"
		text
	/>

	<h1 class="text-3xl">AlphaView</h1>

	<div class="spacer py-8"></div>


	<hr>
	<h2 class="text-xl font-bold my-2">Button</h2>
	<div class="flex gap-4">

		<Button
			label="Hello"
		/>

		<Button icon="pi pi-home" aria-label="Save" />
		<Button label="Profile" icon="pi pi-user" />
		<Button label="Save" icon="pi pi-check" iconPos="right" />

		<Button type="button" label="Search" icon="pi pi-search" loading />
	</div>

	<div class="spacer py-8"></div>

	<div class="flex gap-4">
		<Button label="Primary" text />
		<Button label="Secondary" severity="secondary" text />
		<Button label="Success" severity="success" text />
		<Button label="Info" severity="info" text />
		<Button label="Warn" severity="warn" text />
		<Button label="Help" severity="help" text />
		<Button label="Danger" severity="danger" text />
		<Button label="Plain" plain text />
	</div>

	<hr>

	<div class="spacer py-8"></div>

	<Teleport to="body">
		<div class="debug absolute right-0 top-0 m-4 bg-orange-200 text-xs">
			<pre>{{ selectedKey }}</pre>
		</div>
	</Teleport>


	<div class="w-1/2 bg-slate-100 rounded-md p-4">
		<Tree
			v-model:selectionKeys="selectedKey"
			:value="nodes"
			selectionMode="checkbox"
			class="rounded-md"
		></Tree>
	</div>


	<button aria-haspopup="true" aria-controls="overlay_menu" @click="toggle">Toggle</button>


	<Button type="button" icon="pi pi-ellipsis-v" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
	<Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />







</div>
</template>

<style scoped>

</style>
