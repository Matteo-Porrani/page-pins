<script setup>
import {onMounted, computed} from "vue";

const $p = defineProps({
	color: {
		type: String,
		default: "zinc"
	}
});

const colorClass = computed(() => {
	return "bg-" + $p.color + "-400";
});

onMounted(() => {
	console.log($p.color);
})
</script>

<template>
	<div class="pp-color-badge w-2 h-10 rounded-md"
			 :class="colorClass"
	/>
</template>

<style scoped>

</style>