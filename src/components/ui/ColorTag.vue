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
		class="sample size-5 rounded-md"
		:class="`bg-${color}-400`"
	></div>
</template>

<style scoped></style>
