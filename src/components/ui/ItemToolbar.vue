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
				$s.editItem($p.entity, $p.item);
			}
		},
		{
			id: 3,
			label: "Reorder",
			icon: "list-ul",
			color: "sky",
			callback: () => {
				$s.reorderTriggeredBy($p.entity, {...$p.item});
				$s.actionSpaceMode = "$reorder";
				$s.showActionSpace = true;
			},
		},
		{
			id: 5,
			label: "Colorize",
			icon: "purchase-tag",
			color: "fuchsia",
			callback: () => {
				$s.prepareItemForColorize($p.entity, {...$p.item});
				$s.actionSpaceMode = "$colorize";
				$s.showActionSpace = true;
			},
		},
	];

	if (!itemHasChildren.value) {
		btns.unshift({
			id: 2,
			label: "Del",
			icon: "trash-alt",
			color: "red",
			callback: () => {
				$s.removeItem($p.entity, $p.item);
			},
		})
	}

	if (["folder", "link"].includes($p.entity)) {
		btns.push({
			id: 4,
			label: "Transfer",
			icon: "arrow-to-right",
			color: "emerald",
			callback: () => {
				$s.prepareTransfer($p.entity, {...$p.item});
				$s.actionSpaceMode = "$transfer";
				$s.showActionSpace = true;
			},
		});
	}

	return btns;
});

</script>

<template>
	<div class="toolbar absolute -top-1 -right-1 flex gap-2 item-toolbar rounded-lg">

		<button
			v-for="b in activeBtns"
			:key="b.id"
			class="w-8 flex justify-center items-center rounded-lg shadow-lg border border-slate-400 py-1"
			:class="`bg-${b.color}-100 hover:bg-${b.color}-200`"
			@click="b.callback"
		>
			<box-icon
				:name="b.icon"
				color="#71717a"
				custom-size
			/>
		</button>

	</div>
</template>

<style scoped>
:deep(svg) {
	height: 12px !important;
	width: 12px !important;
}

:deep([custom-size]) {
	width: 20px;
	height: 20px;
}
</style>