<!--
DEPRECATED
-->



<script setup>
import {computed} from "vue";
import {useRoute} from "vue-router";
import {useLocalStorage} from "@vueuse/core/index";
import {localDataDefaults} from "../data/localDataDefaults";
import ScreenLayout from "@/components/layout/ScreenLayout.vue";

const $route = useRoute();


// access to localStorage
const localData = useLocalStorage(
	'storage_test_1',
	localDataDefaults //
);


const getChildren = (childEntityName, parentEntityName, parentItemId) => {
	console.log("%c/getChildren/", "background: cyan; padding: 4px");

	const childEntityItems = localData.value[childEntityName].filter(child => parseInt(child[parentEntityName]) === parseInt(parentItemId));

	console.log(childEntityItems);
	return childEntityItems;
}


const linksInFolder = computed(() => {
	console.log("route param id", $route.params.id);
	return getChildren("link", "folder", $route.params.id);
});

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
				v-for="link in linksInFolder"
				:key="link.id"
			>

				<a
					:href="link.url"
					target="_blank"
					class="folder-wrapper bg-white max-w-[80vw] overflow-hidden rounded-lg flex gap-4 items-center border-2 border-transparent cursor-pointer hover:border-zinc-300 transition-all duration-200 ease-in py-4 px-8"
				>
					<div class="max-w-full">
						<p class="text-md font-bold">{{ link.name }}</p>
						<p class="test font-mono border text-sm text-purple-800">{{ link.url }}</p>
					</div>

					<box-icon
						class="ml-auto"
						name="link-external"
						color="#a1a1aa"
					/>
				</a>
			</li>
		</ul>
	</template>

</ScreenLayout>
</template>

<style scoped>
.test {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
