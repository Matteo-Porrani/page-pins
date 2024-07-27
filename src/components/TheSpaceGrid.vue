<script setup>
import { computed } from "vue";
import {categories} from "@/mock/mock-categories";
import {useMainStore} from "../../store/main";
import ItemToolbar from "@/components/ui/ItemToolbar.vue";
import ColorTag from "@/components/ui/ColorTag.vue";
import {getColorName} from "../../data/baseColors";


const $s = useMainStore();

const enterCategory = id => {
	if ($s.editModeOn) return;
	$s.activeCategId = id;
}


const orderedCategories = computed(() => {
	return $s.localData.category.sort((a, b) => {
		return $s.localData.orders.root.indexOf(a.id) - $s.localData.orders.root.indexOf(b.id);
	})
})


</script>

<template>
	<div class="board-view grid grid-cols-5 grid-rows-5 gap-10">
		<!-- Your content here -->

		<!-- SPACES -->
		<article
			v-for="c in orderedCategories"
			:key="c.id"
			class="relative bg-white hover:bg-slate-500 rounded-xl text-lg flex justify-center items-center cursor-pointer transition duration-300 py-4 px-10"
			@click="enterCategory(c.id)"
		>
			<div class="absolute text-sm text-slate-400 top-0 left-0 py-2 px-3">
				<ColorTag
					v-if="c.color > 0"
					:color="getColorName(c.color)"
				/>
			</div>

			<p class="absolute text-sm text-slate-400 bottom-0 right-0 py-2 px-3">
				{{ $s.getChildren('folder', 'category', c.id).length > 0 ? $s.getChildren('folder', 'category', c.id).length : '' }}
			</p>

			<ItemToolbar
				v-if="$s.editModeOn"
				:item="c"
				entity="category"
			/>

			<p class="transition duration-200">{{ c.name }}</p>
		</article>

		<!-- ADD BUTTON -->
		<article
			class="flex justify-center items-center cursor-pointer p-4"
		>
			<button
				class="bg-white flex justify-center items-center rounded-full p-2"
				@click="$s.addItem()"
			>
				<box-icon
					name="plus"
					size="md"
					color="#71717a"
				/>
			</button>
		</article>
	</div>
</template>

<style scoped>
article:hover p {
	transform: scale(1.1) rotate(-5deg);
	color: white;
}
</style>
