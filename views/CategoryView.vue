<script setup>

import ScreenLayout from "@/components/layout/ScreenLayout.vue";
</script>

<template>
<ScreenLayout>

	<template #header>
		<router-link
			to="/"
			class="rounded-lg flex items-center hover:bg-zinc-100 transition duration-100 ease-in mr-3"
		>
			<box-icon
				name="left-arrow-alt"
				size="lg"
				color="#a1a1aa"
			/>
		</router-link>
		<h2 class="text-2xl font-bold">Category</h2>
	</template>

	<template #content>
		<ul class="flex flex-col gap-2">
			<li
				v-for="n in 7"
				:key="n"
				class="bg-white w-[50%] rounded-lg p-4"
			>
				<p>Folder {{ n }}</p>
			</li>
		</ul>
	</template>

</ScreenLayout>
</template>

<style scoped>
</style>
