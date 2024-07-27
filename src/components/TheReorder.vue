<script setup>
import {ref} from 'vue';
import draggable from "vuedraggable";


const mockItems = ref([
	{id: 1, name: "Matteo"},
	{id: 2, name: "Ignazio"},
	{id: 3, name: "Thomas"},
	{id: 4, name: "Julien"},
]);


</script>

<template>
	<div class="relative the-reorder flex justify-center bg-orange-100">

		<div class="debug absolute top-0 end-0 bg-white p-2">
			mockItems: <pre>{{ mockItems }}</pre>
		</div>

		<div class="bg-white w-1/2 h-[70vh] grid grid-rows-12 rounded-lg p-4">
			<h2 class="text-center">Reorder items</h2>

			<div class="row-span-11 border-2 border-emerald-200 rounded-lg p-2">

				<draggable
					v-model="mockItems"
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
							<p>{{ mock.name }}</p>
						</div>

					</template>
				</draggable>


			</div>
		</div>

	</div>
</template>

<style scoped>

</style>