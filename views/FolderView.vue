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
		<h2 class="text-2xl font-bold">Folder</h2>
	</template>

	<template #content>
		<ul class="flex flex-col gap-4">

			<li
				v-for="n in 6"
				:key="n"
			>

				<router-link
					to="/"
					class="folder-wrapper bg-white w-[30%] rounded-lg flex gap-4 items-center border-2 border-transparent cursor-pointer hover:border-zinc-300 transition-all duration-200 ease-in py-4 px-8"
				>
					<p class="text-sm">Culpa cupiditate delectus eligendi eum, impedit inventore laboriosam molestiae {{ n }}</p>

					<box-icon
						class="ml-auto"
						name="link-external"
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
