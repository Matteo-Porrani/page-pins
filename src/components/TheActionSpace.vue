<script setup>
import {computed} from 'vue';
import {useMainStore} from "../../store/main";
import ActionReorder from "@/components/action-space/ActionReorder.vue";
import ActionTransfer from "@/components/action-space/ActionTransfer.vue";
import TheColorPicker from "@/components/ui/TheColorPicker.vue";

const $s = useMainStore();

const saveAndCloseActionModal = () => {
	if ($s.actionSpaceMode === "$reorder") {
		$s.updateOrder();
	} else if ($s.actionSpaceMode === "$transfer") {
		$s.executeTransfer();
	} else if ($s.actionSpaceMode === "$colorize") {
		$s.colorizeItem();
	}

	$s.boardMode = "$view";
	$s.showActionSpace = false;
	$s.actionSpaceMode = null;
};

const actionTitle = computed(() => {
	return {
		$reorder: "Reorder items",
		$transfer: "Move to",
		$colorize: "Pick color",
	}[$s.actionSpaceMode];
});
</script>

<template>
	<div class="relative the-reorder flex justify-center">

		<!--		<div class="debug absolute start-0 top-0 bg-white p-2">-->
		<!--			<pre>{{ $s.reorderData.currentOrder }}</pre>-->
		<!--			<pre>{{ $s.reorderData.itemsToReorder }}</pre>-->
		<!--		</div>-->

		<div class="bg-white w-1/2 h-[70vh] grid grid-rows-12 rounded-lg p-4">

			<h2 class="text-center text-xl">
				{{ actionTitle }}
			</h2>

			<div class="action-space-wrapper overflow-y-auto row-span-10 rounded-lg p-2">
				<!-- dynamic content -->
				<ActionReorder v-if="$s.actionSpaceMode === '$reorder'"/>
				<ActionTransfer v-if="$s.actionSpaceMode === '$transfer'"/>
				<TheColorPicker v-if="$s.actionSpaceMode === '$colorize'"/>
			</div>

			<div class="row-span-1 text-center">
				<button
					class="bg-slate-800 text-white rounded-lg min-w-24 py-2 px-6"
					@click="saveAndCloseActionModal"
				>
					OK
				</button>
			</div>
		</div>

	</div>
</template>

<style scoped></style>
