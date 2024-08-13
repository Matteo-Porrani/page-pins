<script setup>
import {ref} from 'vue';
import {useMainStore} from "../../store/main";

const $s = useMainStore();

const showContent = ref(false);
</script>

<template>
<div
	class="debug bg-slate-200 shadow-lg text-xs font-mono absolute bottom-10 right-10 max-h-50 rounded-lg py-2 px-4"
>
	<div
		:class="{'hidden': !showContent}"
	>
		<pre class="font-bold text-sm">PagePins 0.2.0

		</pre>
		<pre>CTRL + E
		toggle edit mode</pre>
		<pre>CTRL + A
		add item</pre>
		<pre>CTRL + K
		search</pre>
		<pre>CTRL + D
		return home</pre>
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
