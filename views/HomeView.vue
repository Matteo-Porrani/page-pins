<script setup>
import {ref, computed, onMounted, reactive} from "vue";
import ScreenLayout from "@/components/layout/ScreenLayout.vue";
import {categories} from "@/mock/mock-categories";

const pinHtml = "&#128205;";

const toggles = reactive({})

onMounted(() => {
	categories.forEach(c => {
		toggles[c.id] = false;
	})
});

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

<!--			<pre>{{ toggles }}</pre>-->

			<section class="categories text-zinc-700">
				<article
					v-for="cat in categories"
					:key="cat.id"
					class="max-w-64 bg-white border border-zinc-400 rounded-lg text-center cursor-pointer hover:border-zinc-300 py-2 px-4 my-4 transition duration-300"
					:class="{
						'translate-x-[-10rem] opacity-25' : (Object.values(toggles).some(v => v) && !toggles[cat.id]),
					}"
					@click="toggleCategory(cat.id)"
				>
					<h3 class="font-bold">{{ cat.name }}</h3>
				</article>
			</section>

			<section
				class="folders p-4 rounded-lg transition duration-500"
				:class="{
					'opacity-0 translate-y-1/2' : Object.values(toggles).every(v => !v),
					'bg-white translate-y-0 opacity-1' : Object.values(toggles).some(v => v)
				}"
			>

				<ul class="flex flex-col gap-4">
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

		</template>
	</ScreenLayout>

</template>

<style scoped>

.folders {
	position: absolute;
	/* top right bottom left */
	inset: 15vh 8vw 5vh 20vw;
}
</style>