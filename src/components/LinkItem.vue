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
		<div class="">
			<p class="text-md font-bold">{{ link.name }}</p>
			<p class="test w-[90%] font-mono text-xs text-purple-800">{{ link.url }}</p>
		</div>

		<box-icon
			class="ml-auto"
			name="link-external"
			color="#a1a1aa"
		/>
	</a>
</template>

<style scoped>
.test {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
