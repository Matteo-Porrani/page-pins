<script setup>

import {useMainStore} from "../../store/main";
import ItemToolbar from "@/components/ui/ItemToolbar.vue";
import ColorBadge from "@/components/ui/ColorBadge.vue";
import {onMounted} from "vue";
import TheSubSpace from "@/components/TheSubSpace.vue";

const $s = useMainStore();

onMounted(() => {
	console.log("%c/MOUNTED TheFolders.vue/", "background: teal");
	// initialize toggles to false
	$s.initFolderToggles();
});
</script>

<template>
<div class="the-folders grid gap-6 relative">

	<button
		class="absolute end-0 text-2xl p-2"
		@click="$s.activeCategId = null"
	>X</button>


	<section class="text-zinc-700">
		<!-- FOLDER BAR -->
		<article
			v-for="fol in $s.getChildren('folder', 'category', $s.activeCategId)"
			:key="fol.id"
			class="relative bg-white flex justify-between items-center rounded-lg text-center cursor-pointer hover:border-zinc-300 p-2 mb-4 transition duration-300"
			:class="{
							'translate-x-[-10rem] opacity-25' : (Object.values($s.folderToggles).some(v => v) && !$s.folderToggles[fol.id]),
						}"
			@click="$s.toggleFolder(fol.id)"
		>

			<ItemToolbar
				v-if="$s.editModeOn"
				entity="folder"
				:item="fol"
			/>

			<h3 class="font-bold text-sm">{{ fol.name }}</h3>

			<ColorBadge color="zinc"/>
		</article>
	</section>

	<TheSubSpace/>

</div>
</template>

<style scoped>
.the-folders {
	grid-template-columns: 1fr 5fr;
}
</style>
