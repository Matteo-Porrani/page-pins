<script setup>

import {useMainStore} from "../../../store/main";

const $s = useMainStore();

const items = [
	{
		id: 1,
		code: "$view",
		label: "View",
	},
	{
		id: 2,
		code: "$edit",
		label: "Edit",
	},
	{
		id: 3,
		code: "$ie",
		label: "I/E",
	},
];

const setMode = (code) => {
	$s.boardMode = code;
	$s.showIE = (code === "$ie");
}

</script>


<template>

	<div class="mode-toggle-bar z-10 fixed left-8 bottom-[4vh] flex gap-2">

		<!-- MODE BUTTONS -->
		<div class="w-60 grid grid-cols-3 gap-2 bg-slate-100 rounded-lg shadow-lg p-2">
			<button
				v-for="item in items"
				class="item text-center rounded-lg py-1 px-2 transition duration-300 ease-in"
				:class="{'bg-slate-800 text-white':item.code === $s.boardMode}"
				@click="setMode(item.code)"
			>
				{{ item.label }}
			</button>
		</div>

		<!-- ADD ITEM BUTTON -->
		<div
			v-if="!$s.showIE && $s.boardMode === '$view'"
			class="bg-slate-100 hover:bg-slate-200 rounded-lg shadow-lg transition duration-300 ease-in p-2"
		>
			<button
				class="flex justify-center items-center rounded-lg w-8 py-1 px-2"
				@click="$s.addItem()"
			>
				<box-icon
					name="plus"
				/>
			</button>
		</div>

	</div>

</template>


<style scoped>
/*
.mode-toggle-bar {
	left: 50%;
	transform: translateX(-50%);
	z-index: 999;
}
*/
</style>
