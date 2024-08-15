<script setup>
import Button from 'primevue/button';
</script>

<template>
<div class="p-8">

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





</div>
</template>

<style scoped>

</style>
