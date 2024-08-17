<script setup>
import {computed} from "vue";
const $p = defineProps({
	color: {
		type: String,
		required: true
	},
	neutral: {
		type: Boolean,
		default: false
	},
})

const colorClass = computed(() => {
	if (!$p.neutral) return `bg-${$p.color}-400`;
	return "bg-slate-100";
})
</script>

<template>
	<div
		class="sample h-10 w-2 rounded-md"
		:class="colorClass"
	></div>
</template>

<style scoped></style>
