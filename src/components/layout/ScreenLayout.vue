<script setup>
import {ref} from 'vue';
import TheSidebar from "@/components/layout/TheSidebar.vue";
import {TW} from "../../../const/twConst";
import TheModal from "@/components/ui/TheModal.vue";
import {useMainStore} from "../../../store/main";

const $s = useMainStore();

const searchString = ref("");
</script>

<template>

	<Teleport to="body">
		<TheModal
			:show="$s.showModal"
		/>
	</Teleport>

	<header class="py-4 px-12 bg-zinc-300">
		<slot name="header"></slot>
	</header>

	<main>

		<div class="content grid grid-cols-1 grid-rows-1 bg-zinc-100 p-8 overflow-hidden">

			<!-- TOOLBAR -->
<!--			<div class="main-toolbar relative flex justify-center items-center pb-10">-->
<!--				<input-->
<!--					type="text"-->
<!--					v-model="searchString"-->
<!--					class="rounded-lg accent-zinc-300 w-1/3 p-2 mr-[-30px]"-->
<!--					placeholder="Search in page elements"-->
<!--				>-->
<!--				<box-icon-->
<!--					name="search-alt-2"-->
<!--					color="#a1a1aa"-->
<!--				/>-->

<!--				<button-->
<!--					class="absolute top-0 right-0 border-2 border-zinc-200 hover:border-zinc-200 hover:bg-zinc-200 flex justify-center items-center rounded-lg p-2"-->
<!--					:class="TW.TRANS_1"-->
<!--				>-->
<!--					<box-icon-->
<!--						name="plus"-->
<!--						color="#3f3f46"-->
<!--					/>-->
<!--				</button>-->
<!--			</div>-->

			<slot name="content"></slot>
		</div>

		<aside class="bg-zinc-200">
			<TheSidebar/>
		</aside>

  </main>
</template>

<style scoped>
</style>
