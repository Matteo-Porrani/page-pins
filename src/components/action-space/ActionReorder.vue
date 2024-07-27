<script setup>
import {useMainStore} from "../../../store/main";
import draggable from "vuedraggable";

const $s = useMainStore();
</script>

<template>
	<draggable
		v-model="$s.reorderData.itemsToReorder"
		group="reorder"
		:animation="150"
		item-key="id"
		class="flex flex-col gap-2 overflow-y-auto"
	>

		<template #item="{element: item}">
			<div
				:key="item.id"
				class="w-full border border-slate-100 bg-slate-100 rounded-lg cursor-pointer py-1 px-3"
			>
				<p>{{ item.name }}</p>
			</div>
		</template>

	</draggable>
</template>

<style scoped></style>
