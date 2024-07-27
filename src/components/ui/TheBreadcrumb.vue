<script setup>

import {useMainStore} from "../../../store/main";

const $s = useMainStore();
</script>

<template>
	<div
		v-if="$s.displayStep > 0"
		class="ms-10 flex items-center gap-4 text-slate-500"
	>
		<button
			class="text-2xl aspect-square w-8 rounded-lg flex justify-center items-center p-1"
			@click="$s.activeCategId = null"
		>
			<box-icon
				name="home-alt"
				color="#64748b"
			/>
		</button>

		<div
			v-if="$s.activeCategId"
			class="flex gap-4"
		>
			<span> > </span>
			<span
				class="cursor-pointer"
				@click="$s.initFolderToggles()"
			>{{ $s.activeCateg.name }}</span>
		</div>

		<div
			v-if="$s.activeFolderId"
			class="flex gap-4"
		>
			<span> > </span>
			<span>{{ $s.activeFolder.name }}</span>
		</div>
	</div>
</template>

<style scoped>

</style>