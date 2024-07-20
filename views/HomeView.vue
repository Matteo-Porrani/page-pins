<script setup>
import {ref} from 'vue';
import ScreenLayout from "@/components/layout/ScreenLayout.vue";
import {categories} from "@/mock/mock-categories";

const pinHtml = "&#128205;";

const searchString = ref("");


console.log(categories)
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

			<div class="search flex justify-center pb-10">
				<input
					type="text"
					v-model="searchString"
					class="rounded-lg accent-zinc-300 w-1/3 p-2"
				>
			</div>

			<section class="grid grid-cols-4 gap-12">
				<router-link
					:to="`/category/${cat.id}`"
					v-for="cat in categories"
					:key="cat.id"
					class="bg-white rounded-lg border-2 border-transparent cursor-pointer hover:border-zinc-300 transition-all duration-200 ease-in p-4"
				>
					<article class="flex justify-between items-center py-6">

						<h3 class="text-xl text-zinc-700 font-bold">{{ cat.name }}</h3>
						<box-icon
							name="chevron-right"
							size="md"
							color="#a1a1aa"
						/>

					</article>
				</router-link>
			</section>

		</template>
	</ScreenLayout>

</template>

<style>
</style>