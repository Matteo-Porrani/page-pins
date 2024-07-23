<script setup>
import {useMainStore} from "../../../store/main";

const $s = useMainStore();
</script>

<template>
	<button
		class="bg-white border-2 border-transparent cursor-pointer hover:border-zinc-400 rounded-lg transition-all duration-300 ease-in p-2"
		@click="$s.editEntity()"
	>
		<box-icon name="edit" size="md" />
	</button>
</template>

<style scoped>

</style>