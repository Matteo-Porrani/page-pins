<script setup>

import {useMainStore} from "../../../store/main";
import {computed} from "vue";

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

const itemHasChildren = computed(() => {
	const childrenEntity = {
		category: "folder",
		folder: "link",
		link: null,
	}[$p.entity];

	if (!childrenEntity) return false;

	const children = $s.getChildren(childrenEntity, $p.entity, $p.item.id);
	return children.length > 0;
});


const activeBtns = computed(() => {
	const btns = [
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
			id: 3,
			label: "Del",
			icon: "list-ul",
			color: "sky",
			callback: () => {
				console.log("REORDER", $p.entity,$p.item);

															// 'link'
				$s.reorderTriggeredBy($p.entity, {...$p.item});


				$s.showReorder = true;
			},
		},
	];

	if (!itemHasChildren.value) {
		btns.push({
			id: 2,
			label: "Del",
			icon: "trash-alt",
			color: "red",
			callback: () => {
				// console.log("DEL", $p.item);
				$s.deleteItem($p.entity, $p.item);
			},
		})
	}

	return btns;
});

</script>

<template>
	<div class="absolute -top-2 -right-2 w-36 grid grid-cols-3 gap-2 item-toolbar rounded-lg">

		<button
			v-for="b in activeBtns"
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