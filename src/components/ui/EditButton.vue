<script setup>
import {useMainStore} from "../../../store/main";

const $s = useMainStore();
</script>

<template>
	<button
		class="w-12 aspect-square flex justify-center items-center border-2 border-transparent cursor-pointer hover:bg-slate-200 rounded-lg transition-all duration-300 ease-in "
		@click="$s.editEntity()"
	>
		<box-icon name="edit" size="md" />
	</button>
</template>

<style scoped>

</style>