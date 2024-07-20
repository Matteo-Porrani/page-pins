<script setup>

import ScreenLayout from "@/components/layout/ScreenLayout.vue";
</script>

<template>
<ScreenLayout>

	<template #header>
		<router-link to="/">
			<box-icon name='left-arrow-alt'></box-icon>
		</router-link>
		<h2>Category</h2>
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
