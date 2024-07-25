<script setup>
import {useMainStore} from "../../store/main";

const $store = useMainStore();

import FolderItem from "@/components/FolderItem.vue";
import LinkItem from "@/components/LinkItem.vue";
import EditButton from "@/components/ui/EditButton.vue";
import ContentFolder from "@/components/ContentFolder.vue";
</script>

<template>
	<!-- EXTERNAL WRAPPER -->
	<section class="category-content grid overflow-y-hidden grid-rows-1">

		<!-- DRAWER -->
		<div
			class="drawer grid grid-rows-1 bg-white-100 rounded-lg transition duration-500 p-4"
			:class="{
							'opacity-0 translate-y-1/2' : Object.values($store.categoryToggles).every(v => !v),
							'bg-white translate-y-0 opacity-1' : Object.values($store.categoryToggles).some(v => v)
						}"
		>

			<div class="drawer-body grid gap-4">

				<!-- FOLDERS -->
				<ul class="flex flex-col gap-4">
					<li
						v-for="folder in $store.categoryContentItems"
						:key="folder.id"
					>
						<FolderItem :folder="folder"/>
					</li>
				</ul>

				<!-- LINKS -->
				<Transition mode="out-in">
					<ContentFolder :key="$store.activeFolderId"/>
				</Transition>

			</div>

		</div>

	</section>
</template>

<style scoped>

.category-content {
	height: 88vh;
}

.drawer-body {
	/*border: 4px solid green;*/
	grid-template-columns: 1fr 3fr;
	grid-template-rows: 1fr;
}

.v-enter-active,
.v-leave-active {
	transition: opacity 0.2s ease-in;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>
