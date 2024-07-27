<script setup>
import {useMainStore} from "../../../store/main";

const $s = useMainStore();

// const mockParents = [
// 	{id: 1, name: "Movies"},
// 	{id: 2, name: "Bikes"},
// 	{id: 3, name: "Dev"},
// ]
//
// const choice = ref(2);

</script>

<template>
	<ul class="flex flex-col gap-2 overflow-y-auto py-2">

		<li
			v-for="p in $s.transferData.availableParents"
			:key="p.id"
			class="flex items-center"
			@click="$s.transferData.currentParentId = p.id"
		>
			<box-icon
				v-if="p.id === $s.transferData.currentParentId"
				name='checkbox-checked' type='solid'/>
			<box-icon
				v-else
				name='checkbox' />

			<p
				class="flex-grow rounded-lg cursor-pointer py-1 px-3"
				:class="{
					'bg-slate-100' : p.id !== $s.transferData.currentParentId,
					'bg-blue-100' : p.id === $s.transferData.currentParentId,
				}"
			>
				{{ p.name }}
			</p>

		</li>
	</ul>
</template>

<style scoped></style>
