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
<!--			<div class="drawer-header flex justify-between items-center mb-4">-->
<!--				<h2 class="text-2xl font-bold py-2">-->
<!--					<span v-if="$store.activeCateg">{{ $store.activeCateg.name }}</span>-->
<!--					<span v-if="$store.activeFolder"> &gt; {{ $store.activeFolder.name }}</span>-->
<!--				</h2>-->
<!--				<EditButton/>-->
<!--			</div>-->


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
.drawer-body {
	grid-template-columns: 1fr 3fr;
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
