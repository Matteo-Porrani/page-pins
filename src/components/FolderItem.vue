<script setup>

import {useMainStore} from "../../store/main";

const $store = useMainStore();

defineProps({
	folder: {
		type: Object,
		required: true,
	}
})
</script>

<template>
	<div
		class="folder-wrapper bg-zinc-100 rounded-lg flex gap-4 items-center border-2 border-transparent cursor-pointer hover:border-zinc-300 transition-all duration-300 ease-in p-2"
		@click="$store.activeFolderId=folder.id"
	>
		<box-icon
			name="folder"
			color="#a1a1aa"
		/>

		<p>{{ folder.name }}</p>

		<box-icon
			class="ml-auto"
			name="chevron-right"
			color="#a1a1aa"
		/>
	</div>
</template>

<style scoped>

</style>