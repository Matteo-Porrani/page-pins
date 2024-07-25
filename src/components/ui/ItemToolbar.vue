<script setup>

import {useMainStore} from "../../../store/main";

const $s = useMainStore();

const $p = defineProps({
	entity: {
		type: String,
		required: true,
	},
	item: {
		type: Object,
		required: true,
	},
});


const buttons = [
	{
		id: 1,
		label: "Edit",
		icon: "pencil",
		color: "yellow",
		callback: () => {
			// console.log("EDIT", $p.item);
			$s.editItem($p.entity, $p.item);
		}
	},
	{
		id: 2,
		label: "Del",
		icon: "trash-alt",
		color: "red",
		callback: () => {
			// console.log("DEL", $p.item);
			$s.deleteItem($p.entity, $p.item);
		}
	},
]
</script>

<template>
<div class="absolute -top-2 -right-2 w-24 grid grid-cols-2 gap-4 item-toolbar rounded-lg">

	<button
		v-for="b in buttons"
		:key="b.id"
		class="grid justify-center items-center rounded-xl shadow-lg py-2"
		:class="`bg-${b.color}-100 hover:bg-${b.color}-200`"
		@click="b.callback"
	>
		<box-icon
			:name="b.icon"
			color="#71717a"
		/>
	</button>

</div>
</template>

<style scoped>
svg {
	height: 12px !important;
	width: 12px !important;
}
</style>