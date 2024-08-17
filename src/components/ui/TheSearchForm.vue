<script setup>
import {computed, onMounted, ref} from "vue";
import {useMainStore} from "../../../store/main";
import LinkItem from "@/components/LinkItem.vue";

const $s = useMainStore();

const searchString = ref("");


onMounted(() => {
	console.log("/MOUNTED TheSearchForm.vue/", new Date().getTime())
	const inputRef = document.getElementById("input_search");
	inputRef.focus();
});

const results = computed(() => {
	if (searchString.value === "") return [];
	return $s.localData.link.filter(l => {
		return l.name.toLowerCase().includes(searchString.value.toLowerCase())
			|| l.url.toLowerCase().includes(searchString.value.toLowerCase())
	});
});

const getFullPath = link => {
	return ["category", "folder",]
		.map(el => $s.getItemNameById(el, link[el]))
		.join(" / ");
};

</script>


<template>

	<p class="text-center text-slate-600 mb-2">Search</p>

	<input
		v-model="searchString"
		id="input_search"
		type="text"
		autocomplete="off"
		class="block w-[80%] rounded-lg py-2 px-4 mb-4 mx-auto"
	>

	<ul class="h-[50vh] overflow-y-auto">

		<li
			v-for="l in results"
			:key="l.id"
		>
			<small class="text-xs text-slate-400">
				{{ getFullPath(l) }}
			</small>
			<LinkItem
				:link="l"
				class="mb-1"
			/>
		</li>

	</ul>
</template>
