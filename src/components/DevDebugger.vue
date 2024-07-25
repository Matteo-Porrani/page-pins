<script setup>
import {useMainStore} from "../../store/main";

const $s = useMainStore();
</script>

<template>
<div
	class="debug bg-amber-300 text-sm font-mono absolute bottom-10 right-10 rounded-lg p-2"
>
	<pre>boardMode: {{ $s.boardMode }}</pre>
	<pre>editModeOn: {{ $s.editModeOn }}</pre>
	<pre>displayStep: {{ $s.displayStep }}</pre>
	<pre>activeCateg: {{ $s.activeCateg }}</pre>
	<pre>activeFolder: {{ $s.activeFolder }}</pre>
	<pre>entityInFormDescription: {{ $s.entityInFormDescription }}</pre>
</div>
</template>

<style scoped>

</style>