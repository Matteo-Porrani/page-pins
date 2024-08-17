<script setup>
import {useShortcuts} from "@/composables/shortcuts";

// all keyboard shortcuts defined in composable & available globally
useShortcuts();

</script>

<template>

	<router-view/>

	<!--
		LIST HERE DYNAMIC CLASSES :

		*** ZINC

		bg-zinc-100
		bg-zinc-200
		bg-zinc-300
		bg-zinc-400
		bg-zinc-500
		bg-zinc-600
		bg-zinc-700
		bg-zinc-800
		bg-zinc-900


		*** SLATE

		bg-slate-50
		bg-slate-100
		bg-slate-200
		bg-slate-300
		bg-slate-400
		bg-slate-500
		bg-slate-600
		bg-slate-700
		bg-slate-800
		bg-slate-900

		hover:bg-slate-50
		hover:bg-slate-100
		hover:bg-slate-200
		hover:bg-slate-300
		hover:bg-slate-400
		hover:bg-slate-500
		hover:bg-slate-600
		hover:bg-slate-700
		hover:bg-slate-800
		hover:bg-slate-900

		border-slate-50
		border-slate-100
		border-slate-200
		border-slate-300
		border-slate-400
		border-slate-500
		border-slate-600
		border-slate-700
		border-slate-800
		border-slate-900

		hover:border-slate-50
		hover:border-slate-100
		hover:border-slate-200
		hover:border-slate-300
		hover:border-slate-400
		hover:border-slate-500
		hover:border-slate-600
		hover:border-slate-700
		hover:border-slate-800
		hover:border-slate-900

		*** YELLOW

		border-yellow-50
		border-yellow-100
		border-yellow-200
		border-yellow-300
		border-yellow-400
		border-yellow-500
		border-yellow-600
		border-yellow-700
		border-yellow-800
		border-yellow-900

		hover:border-yellow-50
		hover:border-yellow-100
		hover:border-yellow-200
		hover:border-yellow-300
		hover:border-yellow-400
		hover:border-yellow-500
		hover:border-yellow-600
		hover:border-yellow-700
		hover:border-yellow-800
		hover:border-yellow-900

		bg-yellow-50
		bg-yellow-100
		bg-yellow-200
		bg-yellow-300
		bg-yellow-400
		bg-yellow-500
		bg-yellow-600
		bg-yellow-700
		bg-yellow-800
		bg-yellow-900

		hover:bg-yellow-50
		hover:bg-yellow-100
		hover:bg-yellow-200
		hover:bg-yellow-300
		hover:bg-yellow-400
		hover:bg-yellow-500
		hover:bg-yellow-600
		hover:bg-yellow-700
		hover:bg-yellow-800
		hover:bg-yellow-900

		*** ORANGE

		bg-orange-50
		bg-orange-100
		bg-orange-200
		bg-orange-300
		bg-orange-400
		bg-orange-500
		bg-orange-600
		bg-orange-700
		bg-orange-800
		bg-orange-900

		hover:bg-orange-50
		hover:bg-orange-100
		hover:bg-orange-200
		hover:bg-orange-300
		hover:bg-orange-400
		hover:bg-orange-500
		hover:bg-orange-600
		hover:bg-orange-700
		hover:bg-orange-800
		hover:bg-orange-900

		border-orange-50
		border-orange-100
		border-orange-200
		border-orange-300
		border-orange-400
		border-orange-500
		border-orange-600
		border-orange-700
		border-orange-800
		border-orange-900

		hover:border-orange-50
		hover:border-orange-100
		hover:border-orange-200
		hover:border-orange-300
		hover:border-orange-400
		hover:border-orange-500
		hover:border-orange-600
		hover:border-orange-700
		hover:border-orange-800
		hover:border-orange-900

		*** RED

		bg-red-50
		bg-red-100
		bg-red-200
		bg-red-300
		bg-red-400
		bg-red-500
		bg-red-600
		bg-red-700
		bg-red-800
		bg-red-900

		hover:bg-red-50
		hover:bg-red-100
		hover:bg-red-200
		hover:bg-red-300
		hover:bg-red-400
		hover:bg-red-500
		hover:bg-red-600
		hover:bg-red-700
		hover:bg-red-800
		hover:bg-red-900

		border-red-50
		border-red-100
		border-red-200
		border-red-300
		border-red-400
		border-red-500
		border-red-600
		border-red-700
		border-red-800
		border-red-900

		hover:border-red-50
		hover:border-red-100
		hover:border-red-200
		hover:border-red-300
		hover:border-red-400
		hover:border-red-500
		hover:border-red-600
		hover:border-red-700
		hover:border-red-800
		hover:border-red-900

		*** VIOLET

		bg-violet-50
		bg-violet-100
		bg-violet-200
		bg-violet-300
		bg-violet-400
		bg-violet-500
		bg-violet-600
		bg-violet-700
		bg-violet-800
		bg-violet-900

		hover:bg-violet-50
		hover:bg-violet-100
		hover:bg-violet-200
		hover:bg-violet-300
		hover:bg-violet-400
		hover:bg-violet-500
		hover:bg-violet-600
		hover:bg-violet-700
		hover:bg-violet-800
		hover:bg-violet-900

		border-violet-50
		border-violet-100
		border-violet-200
		border-violet-300
		border-violet-400
		border-violet-500
		border-violet-600
		border-violet-700
		border-violet-800
		border-violet-900

		hover:border-violet-50
		hover:border-violet-100
		hover:border-violet-200
		hover:border-violet-300
		hover:border-violet-400
		hover:border-violet-500
		hover:border-violet-600
		hover:border-violet-700
		hover:border-violet-800
		hover:border-violet-900

		*** FUCHSIA

		bg-fuchsia-50
		bg-fuchsia-100
		bg-fuchsia-200
		bg-fuchsia-300
		bg-fuchsia-400
		bg-fuchsia-500
		bg-fuchsia-600
		bg-fuchsia-700
		bg-fuchsia-800
		bg-fuchsia-900

		hover:bg-fuchsia-50
		hover:bg-fuchsia-100
		hover:bg-fuchsia-200
		hover:bg-fuchsia-300
		hover:bg-fuchsia-400
		hover:bg-fuchsia-500
		hover:bg-fuchsia-600
		hover:bg-fuchsia-700
		hover:bg-fuchsia-800
		hover:bg-fuchsia-900

		border-fuchsia-50
		border-fuchsia-100
		border-fuchsia-200
		border-fuchsia-300
		border-fuchsia-400
		border-fuchsia-500
		border-fuchsia-600
		border-fuchsia-700
		border-fuchsia-800
		border-fuchsia-900

		hover:border-fuchsia-50
		hover:border-fuchsia-100
		hover:border-fuchsia-200
		hover:border-fuchsia-300
		hover:border-fuchsia-400
		hover:border-fuchsia-500
		hover:border-fuchsia-600
		hover:border-fuchsia-700
		hover:border-fuchsia-800
		hover:border-fuchsia-900

		*** PURPLE

		bg-purple-50
		bg-purple-100
		bg-purple-200
		bg-purple-300
		bg-purple-400
		bg-purple-500
		bg-purple-600
		bg-purple-700
		bg-purple-800
		bg-purple-900

		hover:bg-purple-50
		hover:bg-purple-100
		hover:bg-purple-200
		hover:bg-purple-300
		hover:bg-purple-400
		hover:bg-purple-500
		hover:bg-purple-600
		hover:bg-purple-700
		hover:bg-purple-800
		hover:bg-purple-900

		border-purple-50
		border-purple-100
		border-purple-200
		border-purple-300
		border-purple-400
		border-purple-500
		border-purple-600
		border-purple-700
		border-purple-800
		border-purple-900

		hover:border-purple-50
		hover:border-purple-100
		hover:border-purple-200
		hover:border-purple-300
		hover:border-purple-400
		hover:border-purple-500
		hover:border-purple-600
		hover:border-purple-700
		hover:border-purple-800
		hover:border-purple-900

		*** PINK

		bg-pink-100
		bg-pink-200
		bg-pink-300
		bg-pink-400
		bg-pink-500
		bg-pink-600
		bg-pink-700
		bg-pink-800
		bg-pink-900


		*** SKY

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

		border-sky-100
		border-sky-200
		border-sky-300
		border-sky-400
		border-sky-500
		border-sky-600
		border-sky-700
		border-sky-800
		border-sky-900

		hover:border-sky-100
		hover:border-sky-200
		hover:border-sky-300
		hover:border-sky-400
		hover:border-sky-500
		hover:border-sky-600
		hover:border-sky-700
		hover:border-sky-800
		hover:border-sky-900

		*** BLUE

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

		border-blue-100
		border-blue-200
		border-blue-300
		border-blue-400
		border-blue-500
		border-blue-600
		border-blue-700
		border-blue-800
		border-blue-900

		hover:border-blue-100
		hover:border-blue-200
		hover:border-blue-300
		hover:border-blue-400
		hover:border-blue-500
		hover:border-blue-600
		hover:border-blue-700
		hover:border-blue-800
		hover:border-blue-900


		*** TEAL

		bg-teal-50
		bg-teal-100
		bg-teal-200
		bg-teal-300
		bg-teal-400
		bg-teal-500
		bg-teal-600
		bg-teal-700
		bg-teal-800
		bg-teal-900

		hover:bg-teal-50
		hover:bg-teal-100
		hover:bg-teal-200
		hover:bg-teal-300
		hover:bg-teal-400
		hover:bg-teal-500
		hover:bg-teal-600
		hover:bg-teal-700
		hover:bg-teal-800
		hover:bg-teal-900

		border-teal-50
		border-teal-100
		border-teal-200
		border-teal-300
		border-teal-400
		border-teal-500
		border-teal-600
		border-teal-700
		border-teal-800
		border-teal-900

		hover:border-teal-50
		hover:border-teal-100
		hover:border-teal-200
		hover:border-teal-300
		hover:border-teal-400
		hover:border-teal-500
		hover:border-teal-600
		hover:border-teal-700
		hover:border-teal-800
		hover:border-teal-900

		*** CYAN

		bg-cyan-100
		bg-cyan-200
		bg-cyan-300
		bg-cyan-400
		bg-cyan-500
		bg-cyan-600
		bg-cyan-700
		bg-cyan-800
		bg-cyan-900

		*** GREEN

		bg-green-50
		bg-green-100
		bg-green-200
		bg-green-300
		bg-green-400
		bg-green-500
		bg-green-600
		bg-green-700
		bg-green-800
		bg-green-900

		hover:bg-green-50
		hover:bg-green-100
		hover:bg-green-200
		hover:bg-green-300
		hover:bg-green-400
		hover:bg-green-500
		hover:bg-green-600
		hover:bg-green-700
		hover:bg-green-800
		hover:bg-green-900

		border-green-50
		border-green-100
		border-green-200
		border-green-300
		border-green-400
		border-green-500
		border-green-600
		border-green-700
		border-green-800
		border-green-900

		hover:border-green-50
		hover:border-green-100
		hover:border-green-200
		hover:border-green-300
		hover:border-green-400
		hover:border-green-500
		hover:border-green-600
		hover:border-green-700
		hover:border-green-800
		hover:border-green-900

		*** EMERALD

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

		*** LIME

		bg-lime-50
		bg-lime-100
		bg-lime-200
		bg-lime-300
		bg-lime-400
		bg-lime-500
		bg-lime-600
		bg-lime-700
		bg-lime-800
		bg-lime-900

		hover:bg-lime-50
		hover:bg-lime-100
		hover:bg-lime-200
		hover:bg-lime-300
		hover:bg-lime-400
		hover:bg-lime-500
		hover:bg-lime-600
		hover:bg-lime-700
		hover:bg-lime-800
		hover:bg-lime-900

		border-lime-50
		border-lime-100
		border-lime-200
		border-lime-300
		border-lime-400
		border-lime-500
		border-lime-600
		border-lime-700
		border-lime-800
		border-lime-900

		hover:border-lime-50
		hover:border-lime-100
		hover:border-lime-200
		hover:border-lime-300
		hover:border-lime-400
		hover:border-lime-500
		hover:border-lime-600
		hover:border-lime-700
		hover:border-lime-800
		hover:border-lime-900

	-->

</template>


<style>
body {
	/*@apply bg-marine; CUSTOM COLOR in tailwind.config.js */
	@apply bg-gradient-to-b from-slate-100 to-slate-300;

/*
	background:
		linear-gradient(45deg,#0000 18.75%,#e2e8f0 0 31.25%,#0000 0),
		repeating-linear-gradient(-45deg,#e2e8f0 -6.25% 6.25%,#f1f5f9 0 18.75%);
	background-size: 32px 32px;
	*/
}
</style>