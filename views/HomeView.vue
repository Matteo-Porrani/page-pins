<script setup>
import {ref, computed, onMounted, reactive} from "vue";
import {useLocalStorage} from "@vueuse/core/index";
import {localDataDefaults} from "../data/localDataDefaults";
import ScreenLayout from "@/components/layout/ScreenLayout.vue";
import {categories} from "@/mock/mock-categories";
import ColorBadge from "@/components/ui/ColorBadge.vue";

const pinHtml = "&#128205;";

const toggles = reactive({})

onMounted(() => {
	categories.forEach(c => {
		toggles[c.id] = false;
	})
});

// access to localStorage
const localData = useLocalStorage(
	'storage_test_1',
	localDataDefaults //
);

const activeColor = computed(() => {

	const activeState = Object.values(toggles).some(v => v);
	if (activeState) {
		const activeId = Object.entries(toggles).filter(e => e[1])[0][0];
		console.log("activeId", activeId);
		return categories.find(cat => parseInt(cat.id) === parseInt(activeId)).color;
	}

	return "zinc";
})

const activeCateg = computed(() => {

	if (Object.values(toggles).some(v => v)) { // one category selected
		const activeId = Object.entries(toggles).filter(e => e[1])[0][0];
		return localData.value.category.find(cat => parseInt(cat.id) === parseInt(activeId)); // return the whole category object
	}

	return null;
})

const getChildren = (childEntityName, parentEntityName, parentItemId) => {
	console.log("c%/getChildren/", "background: cyan; padding: 4px");

	const childEntityItems = localData.value[childEntityName].filter(child => parseInt(child[parentEntityName]) === parseInt(parentItemId));

	console.log(childEntityItems);
	return childEntityItems;
}


const toggleCategory = id => {
	console.log("%c/toggleCategory/", "background: orange");
	console.log("click on", id);
	toggles[id] = !toggles[id];

	Object.keys(toggles)
		.filter(key => parseInt(key) !== parseInt(id))
		.forEach(key => toggles[key] = false);
}

const categoryContentItems = computed(() => {
	if (activeCateg.value) return getChildren("folder", "category", activeCateg.value.id);
	return [];
});

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
					<article
						v-for="cat in localData.category"
						:key="cat.id"
						class="bg-white flex justify-between items-center rounded-lg text-center cursor-pointer hover:border-zinc-300 p-2 mb-4 transition duration-300"
						:class="{
						'translate-x-[-10rem] opacity-25' : (Object.values(toggles).some(v => v) && !toggles[cat.id]),
					}"
						@click="toggleCategory(cat.id)"
					>
						<h3 class="font-bold text-sm">{{ cat.name }}</h3>
						<ColorBadge color="red"/>
					</article>
				</section>

				<!-- CATEGORY CONTENT -->
				<section class="category-content grid grid-cols-1 grid-rows-1">

					<div
						class="category-content-drawer bg-white rounded-lg transition duration-500 p-4"
						:class="{
							'opacity-0 translate-y-1/2' : Object.values(toggles).every(v => !v),
							'bg-white translate-y-0 opacity-1' : Object.values(toggles).some(v => v)
						}"
					>

						<div class="category-content-drawer-header flex justify-between items-center mb-4">
							<h2 class="text-2xl font-bold py-2">{{ activeCateg?.name }}</h2>
							<ColorBadge color="red"/>
						</div>

						<ul class="flex flex-col gap-4 ">
							<li
								v-for="folder in categoryContentItems"
								:key="folder.id"
							>
								<router-link
									:to="`/folder/${folder.id}`"
									class="folder-wrapper bg-zinc-100 w-[50%] rounded-lg flex gap-4 items-center border-2 border-transparent cursor-pointer hover:border-zinc-300 transition-all duration-300 ease-in p-2"
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
								</router-link>
							</li>
						</ul>

					</div>

				</section>
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