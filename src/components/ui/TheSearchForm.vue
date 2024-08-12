<script setup>
import {computed, onMounted, ref} from "vue";
import {useMainStore} from "../../../store/main";
import LinkItem from "@/components/LinkItem.vue";

const $s = useMainStore();

const searchString = ref("");


onMounted(() => {
	const inputRef = document.getElementById("input_search");
	inputRef.focus();
});

const results = computed(() => {
	if (searchString.value === "") return [];
	return $s.localData.link.filter(l => l.name.includes(searchString.value) || l.url.includes(searchString.value));
});

</script>


<template>

	<p class="text-center text-slate-600 mb-2">Search</p>

	<input
		v-model="searchString"
		id="input_search"
		type="text"
		autocomplete="off"
		class="block w-full rounded-lg py-2 px-4 mb-4"
	>

	<div class="h-[50vh] overflow-y-auto">
		<LinkItem
			v-for="l in results"
			:key="l.id"
			:link="l"
			class="mb-1"
		/>
	</div>
</template>
