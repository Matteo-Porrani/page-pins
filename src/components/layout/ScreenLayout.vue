<script setup>

</script>

<template>
	<header class="p-4 bg-zinc-300">
		<slot name="header"></slot>
	</header>

	<main class="">

		<div class="content bg-zinc-100 p-12">
			<slot name="content"></slot>
		</div>

		<aside class="bg-zinc-200"></aside>

  </main>
</template>

<style scoped>

</style>
