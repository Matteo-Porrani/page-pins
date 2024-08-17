<script setup>
import {onMounted} from "vue";
import { vOnLongPress } from '@vueuse/components';
import {useMainStore} from "../../store/main";
import {getColorName} from "../../data/baseColors";

import TheDrawer from "@/components/TheDrawer.vue";
import ColorTag from "@/components/ui/ColorTag.vue";
import DynaItemToolbar from "@/components/ui/DynaItemToolbar.vue";

const $s = useMainStore();

onMounted(() => {
	if (!$s.lastActiveFolderId) {
		// initialize toggles to false
		$s.initFolderToggles();
	}
});

const longPressHandler = () => {
	if ($s.displayStep !== 1) return;
	$s.boardMode = "$edit";
};
</script>

<template>
<div class="relative grid grid-cols-4 gap-6">

	<!-- LEFT 1/6 -->
	<section class="col-span-1 text-slate-700">

		<p
			v-if="$s.getOrderedChildren('folder', 'category', $s.activeCategId).length < 1"
			class="absolute top-[50%] -translate-y-1/2 w-full text-center text-slate-400 text-xl"
		>
			CTRL + A to add the first folder
		</p>

		<!-- FOLDER ITEMS -->
		<article
			v-for="fol in $s.getOrderedChildren('folder', 'category', $s.activeCategId)"
			:key="fol.id"
			v-on-long-press="longPressHandler"
			class="
				relative
				cursor-pointer
				bg-white
				border-2 border-transparent
				h-14 rounded-lg
				flex gap-4 justify-between items-center
				p-2 mb-4
				transition duration-300
			"
			:class="{
							'border-slate-300' : (Object.values($s.folderToggles).some(v => v) && $s.folderToggles[fol.id]),
							'translate-x-[-10rem] opacity-25' : (Object.values($s.folderToggles).some(v => v) && !$s.folderToggles[fol.id]),
						}"
			@click="$s.toggleFolder(fol.id)"
		>

			<DynaItemToolbar
				v-if="$s.editModeOn && $s.displayStep === 1"
				entity="folder"
				:item="fol"
			/>

			<h3 class="font-bold text-xs lg:text-sm flex-grow flex items-center justify-between">
				<span>{{ fol.name }}</span>
				<span class="ms-3 font-normal text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
					{{ $s.getChildren('link', 'folder', fol.id).length }}
				</span>
			</h3>

			<ColorTag
				:color="getColorName(fol.color)"
				:neutral="fol.color === 0"
			/>
		</article>
	</section>

	<!-- RIGHT 5/6 -->
	<TheDrawer class="col-span-3"/>

</div>
</template>
