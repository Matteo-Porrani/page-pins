<script setup>
defineProps({
	color: {
		type: String,
		required: true
	}
})
</script>

<template>
	<div
		class="sample w-6 h-6 rounded-full"
		:class="`bg-${color}-400`"
	></div>
</template>

<style scoped></style>
