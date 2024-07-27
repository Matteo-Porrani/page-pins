<script setup>
import {ref} from 'vue';
import draggable from "vuedraggable";
import {useMainStore} from "../../store/main";

const $s = useMainStore();

const mockItems = ref([
	{id: 1, name: "Matteo"},
	{id: 2, name: "Ignazio"},
	{id: 3, name: "Thomas"},
	{id: 4, name: "Julien"},
]);


const saveAndCloseReorder = () => {
	$s.updateOrder();
	$s.boardMode = "$view";
	$s.showReorder = false;
}

</script>

<template>
	<div class="relative the-reorder flex justify-center bg-orange-100">

		<div class="debug absolute start-0 top-0 bg-white p-2">
			<pre>{{ $s.reorderData.currentOrder }}</pre>
			<pre>{{ $s.reorderData.itemsToReorder }}</pre>
		</div>

		<div class="bg-white w-1/2 h-[70vh] grid grid-rows-12 rounded-lg p-4">
			<h2 class="text-center">Reorder items</h2>

			<div class="row-span-10 border-2 border-emerald-200 rounded-lg p-2">

				<draggable
					v-model="$s.reorderData.itemsToReorder"
					group="reorder"
					:animation="150"
					item-key="id"
					class="flex flex-col gap-2"
				>

					<template #item="{element: mock}">
						<div
							:key="mock.id"
							class="border border-zinc-800 cursor-pointer bg-zinc-50 rounded-lg p-1"
						>
							<p>{{ mock.id }} - {{ mock.name }}</p>
						</div>

					</template>
				</draggable>


			</div>

			<div class="row-span-1 text-center">
				<button
					class="bg-zinc-800 text-white rounded-lg py-1 px-4"
					@click="saveAndCloseReorder"
				>
					OK
				</button>
			</div>
		</div>

	</div>
</template>

<style scoped>

</style>