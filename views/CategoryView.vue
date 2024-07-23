<!--
DEPRECATED
-->


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
		<ul class="flex flex-col gap-8">
			<li
				v-for="n in 5"
				:key="n"
			>

				<router-link
					:to="`/folder/${n}`"
					class="folder-wrapper bg-white w-[50%] rounded-lg flex gap-4 items-center border-2 border-transparent cursor-pointer hover:border-zinc-300 transition-all duration-200 ease-in p-6"
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
	</template>

</ScreenLayout>
</template>

<style scoped>
</style>
