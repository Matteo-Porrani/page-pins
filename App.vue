<script setup>
import {useMainStore} from "./store/main";
import DevDebugger from "@/components/DevDebugger.vue";
const $s = useMainStore();
</script>

<template>

	<Teleport to="body">
<!--		<DevDebugger/>-->
	</Teleport>

<!--	<Teleport to="body">-->
<!--		<div-->
<!--			class="add-btn flex justify-center items-center text-sm font-mono absolute bottom-10 left-10"-->
<!--		>-->
<!--			<button-->
<!--				class="w-16 h-16 flex justify-center items-center bg-white border-2 border-transparent cursor-pointer hover:border-zinc-400 rounded-lg transition-all duration-300 ease-in p-2"-->
<!--				@click="$s.addItem()"-->
<!--			>-->
<!--				<box-icon name="plus" size="md" />-->
<!--			</button>-->
<!--		</div>-->
<!--	</Teleport>-->

	<router-view/>

	<!--
		LIST HERE DYNAMIC CLASSES :

		bg-yellow-100
		bg-yellow-200
		bg-yellow-300
		bg-yellow-400
		bg-yellow-500
		bg-yellow-600
		bg-yellow-700
		bg-yellow-800
		bg-yellow-900

		hover:bg-yellow-100
		hover:bg-yellow-200
		hover:bg-yellow-300
		hover:bg-yellow-400
		hover:bg-yellow-500
		hover:bg-yellow-600
		hover:bg-yellow-700
		hover:bg-yellow-800
		hover:bg-yellow-900

		bg-orange-100
		bg-orange-200
		bg-orange-300
		bg-orange-400
		bg-orange-500
		bg-orange-600
		bg-orange-700
		bg-orange-800
		bg-orange-900

		bg-red-100
		bg-red-200
		bg-red-300
		bg-red-400
		bg-red-500
		bg-red-600
		bg-red-700
		bg-red-800
		bg-red-900

		hover:bg-red-100
		hover:bg-red-200
		hover:bg-red-300
		hover:bg-red-400
		hover:bg-red-500
		hover:bg-red-600
		hover:bg-red-700
		hover:bg-red-800
		hover:bg-red-900

		bg-violet-100
		bg-violet-200
		bg-violet-300
		bg-violet-400
		bg-violet-500
		bg-violet-600
		bg-violet-700
		bg-violet-800
		bg-violet-900

		bg-purple-100
		bg-purple-200
		bg-purple-300
		bg-purple-400
		bg-purple-500
		bg-purple-600
		bg-purple-700
		bg-purple-800
		bg-purple-900

		bg-pink-100
		bg-pink-200
		bg-pink-300
		bg-pink-400
		bg-pink-500
		bg-pink-600
		bg-pink-700
		bg-pink-800
		bg-pink-900

		bg-sky-100
		bg-sky-200
		bg-sky-300
		bg-sky-400
		bg-sky-500
		bg-sky-600
		bg-sky-700
		bg-sky-800
		bg-sky-900

		hover:bg-sky-100
		hover:bg-sky-200
		hover:bg-sky-300
		hover:bg-sky-400
		hover:bg-sky-500
		hover:bg-sky-600
		hover:bg-sky-700
		hover:bg-sky-800
		hover:bg-sky-900

		bg-blue-100
		bg-blue-200
		bg-blue-300
		bg-blue-400
		bg-blue-500
		bg-blue-600
		bg-blue-700
		bg-blue-800
		bg-blue-900

		hover:bg-blue-100
		hover:bg-blue-200
		hover:bg-blue-300
		hover:bg-blue-400
		hover:bg-blue-500
		hover:bg-blue-600
		hover:bg-blue-700
		hover:bg-blue-800
		hover:bg-blue-900

		bg-teal-100
		bg-teal-200
		bg-teal-300
		bg-teal-400
		bg-teal-500
		bg-teal-600
		bg-teal-700
		bg-teal-800
		bg-teal-900

		bg-cyan-100
		bg-cyan-200
		bg-cyan-300
		bg-cyan-400
		bg-cyan-500
		bg-cyan-600
		bg-cyan-700
		bg-cyan-800
		bg-cyan-900

		bg-green-100
		bg-green-200
		bg-green-300
		bg-green-400
		bg-green-500
		bg-green-600
		bg-green-700
		bg-green-800
		bg-green-900

		bg-emerald-100
		bg-emerald-200
		bg-emerald-300
		bg-emerald-400
		bg-emerald-500
		bg-emerald-600
		bg-emerald-700
		bg-emerald-800
		bg-emerald-900

		hover:bg-emerald-100
		hover:bg-emerald-200
		hover:bg-emerald-300
		hover:bg-emerald-400
		hover:bg-emerald-500
		hover:bg-emerald-600
		hover:bg-emerald-700
		hover:bg-emerald-800
		hover:bg-emerald-900

		bg-lime-100
		bg-lime-200
		bg-lime-300
		bg-lime-400
		bg-lime-500
		bg-lime-600
		bg-lime-700
		bg-lime-800
		bg-lime-900

		bg-zinc-100
		bg-zinc-200
		bg-zinc-300
		bg-zinc-400
		bg-zinc-500
		bg-zinc-600
		bg-zinc-700
		bg-zinc-800
		bg-zinc-900

	-->

</template>


