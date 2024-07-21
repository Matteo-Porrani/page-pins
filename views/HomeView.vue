<script setup>
import {ref, computed, onMounted, reactive} from "vue";
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

const activeColor = computed(() => {

	const activeState = Object.values(toggles).some(v => v);
	if (activeState) {
		const activeId = Object.entries(toggles).filter(e => e[1])[0][0];
		console.log("activeId", activeId);
		return categories.find(cat => parseInt(cat.id) === parseInt(activeId)).color;
	}

	return "zinc";
})

const toggleCategory = id => {
	console.log("%c/toggleCategory/", "background: orange");
	console.log("click on", id);
	toggles[id] = !toggles[id];

	Object.keys(toggles)
		.filter(key => parseInt(key) !== parseInt(id))
		.forEach(key => toggles[key] = false);
}

</script>

<template>

	<ScreenLayout>
		<template #header>
			<h1 class="text-zinc-700 text-3xl font-bold flex gap-2 items-center">
				<!--				<box-icon-->
				<!--					type='solid'-->
				<!--					name='map-pin'-->
				<!--					size="md"-->
				<!--					color="#dc2626"-->
				<!--				/>-->
				<box-icon
					name='book-bookmark'
					size="md"
					color="#dc2626"
				/>
				<span>Page Pins</span>
			</h1>
		</template>

		<template #content>
			<div class="home-content-wrapper grid">
				<section class="categories text-zinc-700">
					<article
						v-for="cat in categories"
						:key="cat.id"
						class="max-w-64 bg-white flex justify-between items-center rounded-lg text-center cursor-pointer hover:border-zinc-300 p-2 my-4 transition duration-300"
						:class="{
						'translate-x-[-10rem] opacity-25' : (Object.values(toggles).some(v => v) && !toggles[cat.id]),
					}"
						@click="toggleCategory(cat.id)"
					>
						<h3 class="font-bold">{{ cat.name }}</h3>
						<ColorBadge :color="cat.color"/>
					</article>
				</section>

				<!-- CATEGORY CONTENT -->
				<section class="category-content grid grid-cols-1 grid-rows-1">

					<ul
						class="category-content-ul bg-white rounded-lg flex flex-col gap-4 transition duration-500 p-4"
						:class="{
							'opacity-0 translate-y-1/2' : Object.values(toggles).every(v => !v),
							'bg-white translate-y-0 opacity-1' : Object.values(toggles).some(v => v)
						}"
					>
						<ColorBadge
							class="absolute right-4 top-4"
							:color="activeColor"
						/>

						<li
							v-for="n in 5"
							:key="n"
						>

							<router-link
								:to="`/folder/${n}`"
								class="folder-wrapper bg-zinc-100 w-[50%] rounded-lg flex gap-4 items-center border-2 border-transparent cursor-pointer hover:border-zinc-300 transition-all duration-300 ease-in p-2"
							>
								<box-icon
									name="folder"
									color="#a1a1aa"
								/>

								<p>Folder {{ n }}</p>

								<box-icon
									class="ml-auto"
									name="chevron-right"
									color="#a1a1aa"
								/>
							</router-link>
						</li>
					</ul>

				</section>
			</div>

		</template>
	</ScreenLayout>

</template>

<style scoped>

.home-content-wrapper {
	grid-template-columns: 1fr 4fr;
}

/*.category-content-ul {
	transition-timing-function: cubic-bezier(0.4, 0, 0.39, 1.29);
}*/

</style>