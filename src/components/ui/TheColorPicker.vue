<script setup>
import {onMounted, ref} from "vue";
import {baseColors} from "../../../data/baseColors";
import {useMainStore} from "../../../store/main";


const $s = useMainStore();

const choice = ref(3);

onMounted(() => {
	console.log("MOUNTED")
	console.log(baseColors);
	console.log($s.colorizeData);
});

</script>

<template>
	<ul class="w-1/3 flex flex-col gap-2 overflow-y-auto py-2 mx-auto">

		<!--	NONE OPTION	-->
		<li
			class="flex gap-4 items-center cursor-pointer"
			@click="$s.colorizeData.currColorId = 0"
		>
			<box-icon
				v-if="0 === $s.colorizeData.currColorId"
				name='checkbox-checked' type='solid'/>
			<box-icon
				v-else
				name='checkbox' />
			<div class="sample w-6 h-6 rounded-full bg-white-400 border border-slate-200"></div>
			<p
				class="w-[160px] rounded-lg py-1 px-3"
				:class="{
					'bg-slate-100' : 0 !== $s.colorizeData.currColorId,
					'bg-blue-100' : 0 === $s.colorizeData.currColorId,
				}"
			>
				none
			</p>
		</li>

		<!--	COLORS	-->
		<li
			v-for="c in baseColors"
			:key="c.id"
			class="flex gap-4 items-center cursor-pointer"
			@click="$s.colorizeData.currColorId = c.id"
		>
			<box-icon
				v-if="c.id === $s.colorizeData.currColorId"
				name='checkbox-checked' type='solid'/>
			<box-icon
				v-else
				name='checkbox' />

			<div
				class="sample w-6 h-6 rounded-full"
				:class="`bg-${c.name}-400`"
			></div>

			<p
				class="w-[160px] rounded-lg py-1 px-3"
				:class="{
					'bg-slate-100' : c.id !== $s.colorizeData.currColorId,
					'bg-blue-100' : c.id === $s.colorizeData.currColorId,
				}"
			>
				{{ c.name }}
			</p>

		</li>

	</ul>
</template>

<style scoped></style>
