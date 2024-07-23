<script setup>

import {useMainStore} from "../../store/main";

const $store = useMainStore();

const $p = defineProps({
})

import FolderItem from "@/components/FolderItem.vue";
</script>

<template>
	<!-- CATEGORY CONTENT -->
	<section class="category-content grid grid-cols-1 grid-rows-1">

		<div
			class="category-content-drawer bg-white rounded-lg transition duration-500 p-4"
			:class="{
							'opacity-0 translate-y-1/2' : Object.values($store.categoryToggles).every(v => !v),
							'bg-white translate-y-0 opacity-1' : Object.values($store.categoryToggles).some(v => v)
						}"
		>

			<div class="category-content-drawer-header flex justify-between items-center mb-4">
				<h2 class="text-2xl font-bold py-2">{{ $store.activeCateg?.name }}</h2>
				<pre>{{ $store.activeFolderId }}</pre>
			</div>

			<ul class="flex flex-col gap-4 ">
				<li
					v-for="folder in $store.categoryContentItems"
					:key="folder.id"
				>
					<FolderItem :folder="folder"/>
				</li>
			</ul>

		</div>

	</section>
</template>

<style scoped>

</style>
