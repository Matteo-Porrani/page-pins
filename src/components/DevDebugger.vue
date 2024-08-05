<script setup>
import {ref} from 'vue';
import {useMainStore} from "../../store/main";

const $s = useMainStore();

const showContent = ref(false);
</script>

<template>
<div
	class="debug bg-indigo-100 shadow-lg text-xs font-mono absolute bottom-10 right-10 max-h-50 rounded-lg py-2 px-4"
>
	<div
		:class="{'hidden': !showContent}"
	>
		<pre>CTRL + E
		toggle edit mode</pre>
		<pre>CTRL + A
		add item</pre>

<!--		<pre>showActionSpace: {{ $s.showActionSpace }}</pre>-->
<!--		<pre>actionSpaceMode: {{ $s.actionSpaceMode }}</pre>-->
<!--		<pre>currentOrder: {{ $s.reorderData.currentOrder }}</pre>-->
<!--		<pre v-if="$s.reorderData.itemsToReorder">currentOrder: {{ $s.reorderData.itemsToReorder.map(i => i.name) }}</pre>-->
<!--		<pre>activeFolderId: {{ $s.activeFolderId }}</pre>-->
<!--		<pre>displayStep: {{ $s.displayStep }}</pre>-->
<!--		<pre>activeCategory: {{ $s.activeCategory }}</pre>-->
<!--		<pre>activeFolder: {{ $s.activeFolder }}</pre>-->
<!--		<pre>entityInFormDescription: {{ $s.entityInFormDescription }}</pre>-->
	</div>

	<div class="flex justify-end">

		<!--	SWITCH	-->
		<label class="flex items-center cursor-pointer">
			<span class="me-2">
				<box-icon
					name="info-circle"
					color="#334155"
					class="pt-1"
				/>
			</span>
			<input
				type="checkbox"
				v-model="showContent"
				class="sr-only peer"
			>
			<div
				class="
					relative w-11 h-6
					bg-slate-300 rounded-full peer
					peer-checked:after:translate-x-full
					rtl:peer-checked:after:-translate-x-full
					peer-checked:after:border-white after:content-['']
					after:absolute after:top-[2px] after:start-[2px]
					after:bg-white after:rounded-full after:h-5 after:w-5
					after:transition-all
					peer-checked:bg-slate-700"></div>
		</label>
	</div>


</div>
</template>

<style scoped></style>
