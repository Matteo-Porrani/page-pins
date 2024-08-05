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

// listen to modifier press
const ctrlPressed = useKeyModifier("Control");

// handler on key stroke EDIT
onKeyStroke(["e", "E"], (e) => {
	if (!ctrlPressed.value) return;
	e.preventDefault();
	$s.boardMode = $s.editModeOn ? "$view" : "$edit";
});

// handler on key stroke ADD ITEM
onKeyStroke(["a", "A"], (e) => {
	if (!ctrlPressed.value) return;
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
				<TheEditForm/>
			</template>
		</TheModal>
	</Teleport>

	<header class="relative bg-slate-100 py-4">
		<slot name="header">

<!--			<h1 class="text-slate-700 text-2xl font-bold flex gap-2 items-center">-->
<!--				<span>Page</span>-->
<!--				<box-icon-->
<!--					type='solid'-->
<!--					name='map-pin'-->
<!--					size=""-->
<!--					color="#dc2626"-->
<!--				/>-->
<!--				<span>Pins</span>-->
<!--			</h1>-->


			<h1
				class="
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

		</slot>
	</header>



	<!-- TODO -->
	<!--			<Teleport to="body">-->
	<!--				<div-->
	<!--					class="debug bg-slate-300 text-sm font-mono absolute bottom-10 left-10 rounded-lg py-2 px-4 text-xs"-->
	<!--				>-->

	<!--					<label class="inline-flex items-center cursor-pointer">-->
	<!--						<input type="checkbox" v-model="showTodo" class="sr-only peer">-->
	<!--						<div class="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-slate-800"></div>-->
	<!--						<span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">TODO</span>-->
	<!--					</label>-->

	<!--					<div :class="{'hidden': !showTodo}">-->
	<!--						<pre>- color tags</pre>-->
	<!--						<pre>- import/export office .txt</pre>-->
	<!--						<pre>-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;</pre>-->
	<!--						<pre>- transfert to other parent</pre>-->
	<!--						<pre>- handle favorites</pre>-->
	<!--						<pre>- smaller icons</pre>-->
	<!--					</div>-->

	<!--				</div>-->
	<!--			</Teleport>-->

<!--	<div class="absolute z-10 end-4 top-4 rounded-lg bg-orange-400 p-4">-->
<!--		<pre>boardMode: {{ $s.boardMode }}</pre>-->
<!--		<pre>showIE: {{ $s.showIE }}</pre>-->
<!--		<pre>showActionSpace: {{ $s.showActionSpace }}</pre>-->
<!--	</div>-->

	<main class="relative">

		<ModeToggleBar
			v-if="!$s.showActionSpace"
		/>

		<div class="content grid grid-cols-1 grid-rows-1 bg-slate-100 pt-4 p-8 overflow-hidden">

			<!-- TOOLBAR -->
<!--						<div class="main-toolbar relative flex justify-center items-center pb-10">-->
<!--							<input-->
<!--								type="text"-->
<!--								v-model="searchString"-->
<!--								class="rounded-lg accent-zinc-300 w-1/3 p-2 mr-[-30px]"-->
<!--								placeholder="Search in page elements"-->
<!--							>-->
<!--							<box-icon-->
<!--								name="search-alt-2"-->
<!--								color="#a1a1aa"-->
<!--							/>-->

<!--							<button-->
<!--								class="absolute top-0 right-0 border-2 border-zinc-200 hover:border-zinc-200 hover:bg-slate-200 flex justify-center items-center rounded-lg p-2"-->
<!--								:class="TW.TRANS_1"-->
<!--							>-->
<!--								<box-icon-->
<!--									name="plus"-->
<!--									color="#3f3f46"-->
<!--								/>-->
<!--							</button>-->
<!--						</div>-->

			<slot name="content"></slot>
		</div>

<!--		<aside class="bg-slate-200">-->
<!--			<TheSidebar/>-->
<!--		</aside>-->

	</main>
</template>

<style scoped>
</style>
