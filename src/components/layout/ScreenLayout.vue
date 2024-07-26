<script setup>
import {ref} from 'vue';
// import TheSidebar from "@/components/layout/TheSidebar.vue";
// import {TW} from "../../../const/twConst";
import TheModal from "@/components/ui/TheModal.vue";
import {useMainStore} from "../../../store/main";
import TheEditForm from "@/components/ui/TheEditForm.vue";

const $s = useMainStore();

const searchString = ref("");
const showTodo = ref(false);

import { onKeyStroke, useKeyModifier } from '@vueuse/core'
import ModeToggleBar from "@/components/ui/ModeToggleBar.vue";

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
			<template #header>Add</template>
			<template #body>
				<TheEditForm/>
			</template>
		</TheModal>
	</Teleport>

	<header class="bg-zinc-100 py-4 px-8">
		<slot name="header">

			<h1 class="text-zinc-700 text-3xl font-bold flex gap-2 items-center">
				<span>Page</span>
				<box-icon
					type='solid'
					name='map-pin'
					size="md"
					color="#dc2626"
				/>
				<span>Pins</span>
			</h1>

			<div
				class="ms-10"
			>
				<button
					v-if="$s.displayStep > 0"
					class="text-2xl aspect-square w-8 rounded-lg flex justify-center items-center p-1"
					@click="$s.activeCategId = null"
				>
					<box-icon
						name="grid-alt"
						color="#3f3f46"
					/>
				</button>
			</div>






			<!-- TODO -->
			<Teleport to="body">
				<div
					class="debug bg-slate-300 text-sm font-mono absolute bottom-10 left-10 rounded-lg py-2 px-4 text-xs"
				>

					<label class="inline-flex items-center cursor-pointer">
						<input type="checkbox" v-model="showTodo" class="sr-only peer">
						<div class="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-zinc-800"></div>
						<span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">TODO</span>
					</label>

					<div :class="{'hidden': !showTodo}">
						<pre>- prevent delete if children</pre>
						<pre>- transfert to other parent</pre>
						<pre>- handle favorites</pre>
						<pre>- reorder</pre>
						<pre>- smaller icons</pre>
						<pre>- import/export office .txt</pre>
						<pre>- tags</pre>
					</div>

				</div>
			</Teleport>

		</slot>
	</header>

	<main class="relative">

		<ModeToggleBar/>

		<div class="content grid grid-cols-1 grid-rows-1 bg-zinc-100 pt-4 p-8 overflow-hidden">

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
<!--								class="absolute top-0 right-0 border-2 border-zinc-200 hover:border-zinc-200 hover:bg-zinc-200 flex justify-center items-center rounded-lg p-2"-->
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

<!--		<aside class="bg-zinc-200">-->
<!--			<TheSidebar/>-->
<!--		</aside>-->

	</main>
</template>

<style scoped>
</style>
