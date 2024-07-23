<script setup>
defineProps({
	link: {
		type: Object,
		required: true,
	}
})
</script>

<template>
	<a
		:href="link.url"
		target="_blank"
		class="folder-wrapper bg-white overflow-hidden rounded-lg flex gap-4 items-center border-2 border-zinc-200 cursor-pointer hover:border-zinc-500 transition-all duration-200 ease-in py-2 px-4"
	>
		<div class="w-full">
			<p class="text-md font-bold mb-1">{{ link.name }}</p>
			<p class="url-paragraph bg-zinc-100 font-mono text-xs text-purple-800 rounded-lg py-1 px-2">{{ link.url }}</p>
		</div>

		<box-icon
			class="ml-auto"
			name="link-external"
			color="#a1a1aa"
		/>
	</a>
</template>

<style scoped>
/*
.url-paragraph {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
*/
</style>
