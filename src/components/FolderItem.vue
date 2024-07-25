<script setup>

import {useMainStore} from "../../store/main";
import {computed} from "vue";
import ItemToolbar from "@/components/ui/ItemToolbar.vue";

const $store = useMainStore();

const $p = defineProps({
	folder: {
		type: Object,
		required: true,
	}
})


const isSelectedFolder = computed(() => $p.folder.id === $store.activeFolderId);

const enterFolder = id => {
	if ($store.editModeOn) return;

	$store.activeFolderId = id;
}
</script>

<template>
	<div
		class="folder-wrapper relative rounded-lg flex gap-2 items-center border-2 border-transparent cursor-pointer hover:border-zinc-300 transition-all duration-300 ease-in p-2"
		:class="{'bg-zinc-100 text-zinc-500' : !isSelectedFolder, 'bg-zinc-300 text-zinc-800' : isSelectedFolder, }"
		@click="enterFolder(folder.id)"
	>

		<ItemToolbar
			v-if="$store.editModeOn"
			entity="folder"
			:item="folder"
		/>

		<box-icon
			name="folder"
			color="#a1a1aa"
		/>

		<p class="text-sm">{{ folder.name }}</p>

		<box-icon
			class="ml-auto"
			name="chevron-right"
			color="#a1a1aa"
		/>
	</div>
</template>

<style scoped>

</style>