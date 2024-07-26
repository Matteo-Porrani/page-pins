<script setup>
import {ref} from 'vue';
import {useMainStore} from "../../store/main";

const $s = useMainStore();

const showContent = ref(false);
</script>

<template>
<div
	class="debug bg-red-400 text-sm font-mono absolute bottom-10 right-10 rounded-lg p-2"
>

	<label class="inline-flex items-center cursor-pointer">
		<input type="checkbox" v-model="showContent" class="sr-only peer">
		<div class="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-zinc-800"></div>
		<span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">DEBUG</span>
	</label>

	<div
		:class="{'hidden': !showContent}"
	>
		<pre>activeFolderId: {{ $s.activeFolderId }}</pre>
		<pre>displayStep: {{ $s.displayStep }}</pre>
		<pre>activeCateg: {{ $s.activeCateg }}</pre>
		<pre>activeFolder: {{ $s.activeFolder }}</pre>
		<pre>entityInFormDescription: {{ $s.entityInFormDescription }}</pre>
	</div>
</div>
</template>

<style scoped>

</style>
