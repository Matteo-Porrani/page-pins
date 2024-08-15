<script setup>
import {ref} from 'vue';
// import TheSidebar from "@/components/layout/TheSidebar.vue";
// import {TW} from "../../../const/twConst";
import TheModal from "@/components/ui/TheModal.vue";
import {useMainStore} from "../../../store/main";
import TheEditForm from "@/components/ui/TheEditForm.vue";

const $s = useMainStore();

const searchString = ref("");
const showTodo = ref(true);

import { onKeyStroke, useKeyModifier } from '@vueuse/core'
import ModeToggleBar from "@/components/ui/ModeToggleBar.vue";
import TheBreadcrumb from "@/components/ui/TheBreadcrumb.vue";
import TheSearchForm from "@/components/ui/TheSearchForm.vue";

// listen to modifier press
const ctrlPressed = useKeyModifier("Control");

const toggleSearch = () => {
	$s.boardMode = "$search";
	$s.showModal = true;
}

// handler on ESC
onKeyStroke(["Escape"], (e) => {
	e.preventDefault();
	$s.showModal = false;
	$s.boardMode = "$view";
});

// handler on key stroke EDIT
onKeyStroke(["k", "K"], (e) => {
	if (!ctrlPressed.value) return;
	e.preventDefault();
	toggleSearch();
});

// handler on key stroke EDIT
onKeyStroke(["e", "E"], (e) => {
	if (!ctrlPressed.value) return;
	e.preventDefault();
	$s.boardMode = $s.editModeOn ? "$view" : "$edit";
});

// handler on key stroke BACK HOME
onKeyStroke(["d", "D"], (e) => {
	if (!ctrlPressed.value) return;
	e.preventDefault();
	$s.boardMode = "$view";
	$s.resetSelection(true, true);
});

// handler on key stroke EXIT FOLDER
onKeyStroke(["r", "R"], (e) => {
	if (!ctrlPressed.value) return;
	e.preventDefault();
	$s.boardMode = "$view";
	$s.resetSelection(false, true);
});

// handler on key stroke ADD ITEM
onKeyStroke(["a", "A"], (e) => {
	if (!ctrlPressed.value) return;
	if ($s.showModal) return;
	e.preventDefault();
	$s.addItem();
});

</script>

<template>

	<Teleport to="body">
		<TheModal
			:show="$s.showModal"
		>
			<template #header>
				<span></span><!--	EMPTY HEADER-->
			</template>
			<template #body>
				<TheSearchForm v-if="$s.boardMode === '$search'"/>
				<TheEditForm v-else/>
			</template>
		</TheModal>
	</Teleport>

	<header class="relative bg-slate-100 py-4">
		<slot name="header">

			<!-- HERO TITLE -->
			<h1
				class="
					flex gap-2 items-center
          text-2xl font-bold w-fit
          ps-8
          transition duration-300 ease-in
        "
				:class="{'transform -translate-x-[100%]' : $s.displayStep > 0}"
			>
				<span>Page</span>
				<box-icon
					type='solid'
					name='map-pin'
					size=""
					color="#dc2626"
				/>
				<span>Pins</span>
			</h1>

			<!-- BREADCRUMB -->
			<div
				class="
          absolute start-0
          w-fit
          ps-8
          transform
          transition duration-300 ease-in
          flex items-center gap-4 text-slate-500
        "
				:class="{
          'translate-x-[100%]' : $s.displayStep === 0,
          'translate-x-[0] opacity-1' : $s.displayStep > 0,
          'opacity-0' : $s.displayStep === 0,
        }"
			>
				<TheBreadcrumb/>
			</div>

			<!-- SEARCH BUTTON -->
			<div class="
				absolute
				top-4 end-4
				bg-red-100
			">
				<button
					class="flex gap-1 items-center bg-white rounded-md h-12 px-2"
					@click="toggleSearch"
				>
					<box-icon
						name='search'
						size=""
						color="#94a3b8"
					/>

					<span class="text-sm text-slate-400 me-8">Search</span>

<!--					<kbd class="border rounded-md py-1 px-2">⌘</kbd>-->
					<kbd class="border rounded-md text-xs text-slate-500 border-b-4 py-1 px-2">Ctrl</kbd>
					<span class="text-slate-400">+</span>
					<kbd class="border rounded-md text-xs text-slate-500 border-b-4 py-1 px-2">K</kbd>
				</button>
			</div>

		</slot>
	</header>

<!-- FIXME *********** DEBUG	-->

<!--	<div class="absolute text-xs z-10 end-4 bottom-4 rounded-lg bg-orange-400 p-4">-->
<!--		<pre>displayStep: {{ $s.displayStep }}</pre>-->
<!--		<pre>boardMode: {{ $s.boardMode }}</pre>-->
<!--		<pre>showIE: {{ $s.showIE }}</pre>-->
<!--		<pre>showActionSpace: {{ $s.showActionSpace }}</pre>-->
<!--	</div>-->

	<main class="relative">

		<ModeToggleBar
			v-if="!$s.showActionSpace"
		/>

		<div class="content grid grid-cols-1 grid-rows-1 bg-slate-100 pt-4 p-8 overflow-hidden">
			<slot name="content"></slot>
		</div>

<!--		<aside class="bg-slate-200">-->
<!--			<TheSidebar/>-->
<!--		</aside>-->

	</main>
</template>
