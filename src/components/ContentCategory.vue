<script setup>

import {useMainStore} from "../../store/main";

const $store = useMainStore();

const $p = defineProps({
})

import FolderItem from "@/components/FolderItem.vue";
import LinkItem from "@/components/LinkItem.vue";
import EditButton from "@/components/ui/EditButton.vue";
</script>

<template>
	<!-- EXTERNAL WRAPPER -->
	<section class="category-content grid grid-cols-1 grid-rows-1">

		<!-- DRAWER -->
		<div
			class="drawer bg-white rounded-lg transition duration-500 p-4"
			:class="{
							'opacity-0 translate-y-1/2' : Object.values($store.categoryToggles).every(v => !v),
							'bg-white translate-y-0 opacity-1' : Object.values($store.categoryToggles).some(v => v)
						}"
		>

			<!-- HEADER -->
			<div class="drawer-header flex justify-between items-center mb-4">
				<h2 class="text-2xl font-bold py-2">
					<span v-if="$store.activeCateg">{{ $store.activeCateg.name }}</span>
					<span v-if="$store.activeFolder"> &gt; {{ $store.activeFolder.name }}</span>
				</h2>
				<EditButton/>
			</div>


			<div class="drawer-body grid gap-4">

				<ul class="flex flex-col gap-4">
					<li
						v-for="folder in $store.categoryContentItems"
						:key="folder.id"
					>
						<FolderItem :folder="folder"/>
					</li>
				</ul>

				<div>
					<ul class="flex flex-col gap-4">
						<li
							v-for="link in $store.folderContentItems"
							:key="link.id"
						>
							<LinkItem :link="link"/>
						</li>
					</ul>
				</div>

			</div>

		</div>

	</section>
</template>

<style scoped>
/*.drawer {
	border: 2px solid cornflowerblue;
}
.drawer-header {
	border: 2px solid crimson;
}
.drawer-body > * {
	border: 1px solid gold;
}*/
.drawer-body {
	grid-template-columns: 1fr 3fr;
}
</style>
