<script setup>
import {onMounted} from "vue";

const $p = defineProps({
	color: {
		type: String,
		default: "zinc"
	}
});


const colorClass = "bg-" + $p.color + "-400";

onMounted(() => {
	console.log($p.color);
})
</script>

<template>
	<div class="pp-color-badge w-6 h-10 rounded-lg"
			 :class="colorClass"
	/>
</template>

<style scoped>

</style>