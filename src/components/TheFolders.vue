<script setup>

import {useMainStore} from "../../store/main";
import ItemToolbar from "@/components/ui/ItemToolbar.vue";
import ColorBadge from "@/components/ui/ColorBadge.vue";
import {onMounted} from "vue";
import TheSubSpace from "@/components/TheSubSpace.vue";
import ColorTag from "@/components/ui/ColorTag.vue";
import {getColorName} from "../../data/baseColors";

const $s = useMainStore();

onMounted(() => {
	console.log("%c/MOUNTED TheFolders.vue/", "background: teal");

	if (!$s.activeFolderIdMemory) {
		// initialize toggles to false
		$s.initFolderToggles();
	}

});
</script>

<template>
<div class="the-folders relative grid gap-6">

	<!-- LEFT 1/6 -->
	<section class="text-slate-700">

		<p
			v-if="$s.getOrderedChildren('folder', 'category', $s.activeCategId).length < 1"
			class="absolute top-[50%] -translate-y-1/2 w-full text-center text-slate-400 text-xl"
		>CTRL + A to add the first folder</p>

		<!-- FOLDER BAR -->
		<article
			v-for="fol in $s.getOrderedChildren('folder', 'category', $s.activeCategId)"
			:key="fol.id"
			class="relative bg-white h-16 flex justify-between items-center rounded-lg text-center cursor-pointer hover:border-zinc-300 p-2 mb-4 transition duration-300"
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

			<h3 class="font-bold text-sm">
<!--				<span>{{ fol.id }} - </span>-->
				<span>{{ fol.name }}</span>
				<span class="ms-3 font-normal text-slate-400 bg-slate-100 px-2 py-1 rounded-full">{{ $s.getChildren('link', 'folder', fol.id).length }}</span>
			</h3>

			<ColorTag
				v-if="fol.color > 0"
				:color="getColorName(fol.color)"
			/>
		</article>
	</section>

	<!-- RIGHT 5/6 -->
	<TheSubSpace/>

</div>
</template>

<style scoped>
.the-folders {
	grid-template-columns: 1fr 5fr;
}
</style>
