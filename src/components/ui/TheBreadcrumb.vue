<script setup>
import {useMainStore} from "../../../store/main";
const $s = useMainStore();
</script>

<template>
	<div
		v-if="$s.displayStep > 0"
		class="flex items-center gap-4 text-slate-500"
	>

		<!-- HOME BUTTON -->
		<button
			class="text-2xl aspect-square w-8 rounded-lg flex justify-center items-center p-1"
			@click="$s.resetSelection(true, true)"
		>
			<box-icon
				name="home-alt"
				color="#64748b"
			/>
		</button>

		<!-- CATEGORY -->
		<div
			v-if="$s.activeCategId"
			class="flex gap-4"
		>
<!--			<span> > </span>-->
			<box-icon
				name="chevron-right"
				color="#64748b"
			/>
			<span
				class="cursor-pointer"
				@click="$s.resetSelection(false, true)"
			>
				{{ $s.activeCategory.name }}
			</span>
		</div>

		<!-- FOLDER -->
		<div
			v-if="$s.activeFolderId"
			class="flex gap-4"
		>
<!--			<span> > </span>-->
			<box-icon
				name="chevron-right"
				color="#64748b"
			/>
			<span>{{ $s.activeFolder.name }}</span>
		</div>
	</div>
</template>

<style scoped></style>
