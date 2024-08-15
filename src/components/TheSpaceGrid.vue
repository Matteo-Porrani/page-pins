<script setup>
import { computed } from "vue";
import { vOnLongPress } from '@vueuse/components';
import {useMainStore} from "../../store/main";
import ItemToolbar from "@/components/ui/ItemToolbar.vue";
import ColorTag from "@/components/ui/ColorTag.vue";
import {getColorName} from "../../data/baseColors";
import CategoryItem from "@/components/CategoryItem.vue";

const $s = useMainStore();

const enterCategory = id => {
	if ($s.editModeOn) return;
	$s.activeCategId = id;
}


const orderedCategories = computed(() => {
	if (!$s.localData) return [];

	return $s.localData.category.sort((a, b) => {
		return $s.localData.orders.root.indexOf(a.id) - $s.localData.orders.root.indexOf(b.id);
	})
});

const longPressHandler = () => $s.boardMode = "$edit";

</script>

<template>
	<div class="
		board-view
		grid gap-8
		grid-cols-3 grid-rows-4
		md:grid-cols-3 md:grid-rows-4
		lg:grid-cols-5 lg:grid-rows-6
	">
		<!-- Your content here -->

		<!-- CATEGORIES -->
		<CategoryItem
			v-for="c in orderedCategories"
			:key="c.id"
			:cat="c"
		/>

		<!-- ADD BUTTON -->
		<article
			class="flex justify-center items-center cursor-pointer p-4"
		>
			<button
				class="bg-white hover:bg-slate-200 flex justify-center items-center rounded-full p-2"
				@click="$s.addItem()"
			>
				<box-icon
					name="plus"
					size=""
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
