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

];

</script>

<template>


	<div class="mode-toggle-bar absolute bottom-12 flex gap-2">
		<div class="w-40 grid grid-cols-2 gap-2 bg-slate-100 rounded-lg shadow-lg p-2">

			<button
				v-for="item in items"
				class="item text-center rounded-lg py-1 px-2 transition duration-300 ease-in"
				:class="{'bg-slate-800 text-white':item.code === $s.boardMode}"
				@click="$s.boardMode=item.code"
			>
				{{ item.label }}
			</button>

		</div>

		<div class="bg-slate-100 hover:bg-slate-200 rounded-lg shadow-lg transition duration-300 ease-in p-2">

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
.mode-toggle-bar {
	left: 50%;
	transform: translateX(-50%);
	z-index: 999;


}
</style>