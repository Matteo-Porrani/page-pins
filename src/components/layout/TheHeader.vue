<script setup>
import {useMainStore} from "../../../store/main";
import {useAppMenu} from "@/composables/appMenu";

import TheBreadcrumb from "@/components/ui/TheBreadcrumb.vue";
import Menu from "primevue/menu";
import Button from "primevue/button";

const $s = useMainStore();

// all menu state & logic moved to composable
const {menu, menuOptions, toggleMenu} = useAppMenu();
</script>

<template>
	<!-- HERO TITLE -->
	<h1
		class="
			flex gap-2 items-center
			text-xl font-bold w-fit
			ps-8
			transition duration-300 ease-in
		"
		:class="{'transform -translate-x-[100%]' : $s.displayStep > 0}"
	>
		<box-icon
			type='solid'
			name='pin'
			color="#fff"
			class="
				bg-gradient-to-r from-sky-400 to-purple-600
				size-8 rounded-md
				transform rotate-45
				py-1
			"
		/>
		<span>PagePins</span>
	</h1>

	<!-- BREADCRUMB -->
	<div
		class="
			absolute start-0
			w-fit
			ps-8
			transform
			transition duration-300 ease-in
			flex items-center gap-4 text-slate-500
		"
		:class="{
			'translate-x-[100%]' : $s.displayStep === 0,
			'translate-x-[0] opacity-1' : $s.displayStep > 0,
			'opacity-0' : $s.displayStep === 0,
		}"
	>
		<TheBreadcrumb/>
	</div>

	<!-- SEARCH INPUT -->
	<div class="absolute top-3 end-24">
		<button
			class="flex gap-1 items-center bg-white rounded-md h-12 px-2"
			@click="$s.toggleSearchModal"
		>
			<box-icon
				name='search'
				color="#94a3b8"
			/>

			<span class="text-sm text-slate-400 me-8">Search</span>

			<kbd class="border rounded-md text-xs text-slate-500 border-b-4 py-1 px-2">Ctrl</kbd>
			<span class="text-slate-400">+</span>
			<kbd class="border rounded-md text-xs text-slate-500 border-b-4 py-1 px-2">K</kbd>
		</button>
	</div>

	<!-- MENU -->
	<div class="absolute top-3 end-8">
		<button
			class="
				hover:bg-slate-200
				rounded-md
				size-12
				grid
				place-content-center
				transition duration-300
				px-2
			"
			@click="toggleMenu"
		>
			<box-icon
				name='menu'
				color="#94a3b8"
			/>
		</button>
		<Menu
			ref="menu"
			id="overlay_menu"
			:model="menuOptions"
			:popup="true"
		/>
	</div>
</template>
