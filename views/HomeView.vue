<script setup>
import {ref, computed, onMounted, reactive} from "vue";
import ScreenLayout from "@/components/layout/ScreenLayout.vue";
import {categories} from "@/mock/mock-categories";
import ColorBadge from "@/components/ui/ColorBadge.vue";
import {useMainStore} from "../store/main";
import ContentCategory from "@/components/ContentCategory.vue";

const $store = useMainStore();

const pinHtml = "&#128205;";

// state : selection of category
const toggles = reactive({});

onMounted(() => {
	console.log("%c/MOUNTED HomeView.vue/", "background: lime");
	// initialize toggles to false
	// $store.localData.category.forEach(c => toggles[c.id] = false);
	$store.initCategoryToggles();
});


const activeColor = computed(() => {

	const activeState = Object.values(toggles).some(v => v);
	if (activeState) {
		const activeId = Object.entries(toggles).filter(e => e[1])[0][0];
		console.log("activeId", activeId);
		return categories.find(cat => parseInt(cat.id) === parseInt(activeId)).color;
	}

	return "zinc";
})

</script>

<template>

	<ScreenLayout>
		<template #header>
			<h1 class="text-zinc-700 text-3xl font-bold flex gap-2 items-center">
				<span>Page</span>
				<box-icon
					type='solid'
					name='map-pin'
					size="md"
					color="#dc2626"
				/>
				<span>Pins</span>
			</h1>
		</template>

		<template #content>
			<div class="home-content-wrapper grid gap-4">
				<section class="categories text-zinc-700">

					<!-- CATEGORY BAR -->
					<article
						v-for="cat in $store.localData.category"
						:key="cat.id"
						class="bg-white flex justify-between items-center rounded-lg text-center cursor-pointer hover:border-zinc-300 p-2 mb-4 transition duration-300"
						:class="{
							'translate-x-[-10rem] opacity-25' : (Object.values($store.categoryToggles).some(v => v) && !$store.categoryToggles[cat.id]),
						}"
						@click="$store.toggleCategory(cat.id)"
					>
						<h3 class="font-bold text-sm">{{ cat.name }}</h3>
						<ColorBadge color="zinc"/>
					</article>
				</section>

				<ContentCategory/>

			</div>

		</template>
	</ScreenLayout>

</template>

<style scoped>

.home-content-wrapper {
	grid-template-columns: 1fr 4fr;
}

/*.category-content-drawer {
	transition-timing-function: cubic-bezier(0.4, 0, 0.39, 1.29);
}*/

</style>