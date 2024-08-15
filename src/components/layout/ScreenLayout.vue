<script setup>
import {ref} from 'vue';
import {useMainStore} from "../../../store/main";
import { onKeyStroke, useKeyModifier } from '@vueuse/core'
import Menu from 'primevue/menu';
import Button from 'primevue/button';
import TheModal from "@/components/ui/TheModal.vue";
import TheEditForm from "@/components/ui/TheEditForm.vue";
import ModeToggleBar from "@/components/ui/ModeToggleBar.vue";
import TheBreadcrumb from "@/components/ui/TheBreadcrumb.vue";
import TheSearchForm from "@/components/ui/TheSearchForm.vue";
import {useRouter} from "vue-router";
import InfoKeymap from "@/components/info/InfoKeymap.vue";
import InfoAbout from "@/components/info/InfoAbout.vue";

const $router = useRouter();
const $s = useMainStore();

// -----------------------------------------------------------------------------

const menu = ref();
const menuActions = ref({
	openAlpha: () => $router.push("/alpha"),
	openBoard: () => {
		$s.resetSelection(true, true);
		$s.showIE = false;
		$s.boardMode = "$view";
		$router.push("/");
	},
	openOrganizer: () => $router.push("/organizer"),
	openIE: () => {
		console.log("open IE");
		$s.boardMode = "$ie";
		$s.showIE = true;
		$s.activeCategId = null;
		$s.initFolderToggles();
		$router.push("/");
	},
	showInfoShortcuts: () => {
		console.log("/showInfoShortcuts/");

		$s.showInfoModal = true;
		$s.infoModalTheme = "$keymap";
	},
	showInfoAbout: () => {
		console.log("/showInfoAbout/");

		$s.showInfoModal = true;
		$s.infoModalTheme = "$about";
	}
})
const menuItems = [
	[1, "Board", "pi-th-large", "openBoard"],
	[2, "Import / Export", "pi-file-export", "openIE"],
	// [3, "Organizer (Beta)", "pi-database", "openOrganizer"],
	[4, "Shortcuts", "pi-book", "showInfoShortcuts"],
	[10, "About", "pi-user", "showInfoAbout"],
	// [99, "Alpha", "pi-globe", "openAlpha"],
];

const menuOptions = menuItems.map(item => ({
	id: item[0],
	label: item[1],
	icon: `pi ${item[2]}`,
	command: menuActions.value[item[3]],
}));

const toggleMenu = (event) => {
	menu.value.toggle(event);
};

// -----------------------------------------------------------------------------

// listen to modifier press
const ctrlPressed = useKeyModifier("Control");

const toggleSearch = () => {
	$s.boardMode = "$search";
	$s.showModal = true;
}

// handler on ESC
onKeyStroke(["Escape"], (e) => {
	e.preventDefault();
	$s.showModal = false;
	$s.boardMode = "$view";
});

// handler on key stroke EDIT
onKeyStroke(["k", "K"], (e) => {
	if (!ctrlPressed.value) return;
	e.preventDefault();
	toggleSearch();
});

// handler on key stroke EDIT
onKeyStroke(["e", "E"], (e) => {
	if (!ctrlPressed.value) return;
	e.preventDefault();
	$s.boardMode = $s.editModeOn ? "$view" : "$edit";
});

// handler on key stroke BACK HOME
onKeyStroke(["d", "D"], (e) => {
	if (!ctrlPressed.value) return;
	e.preventDefault();
	$s.boardMode = "$view";
	$s.resetSelection(true, true);
});

// handler on key stroke EXIT FOLDER
onKeyStroke(["r", "R"], (e) => {
	if (!ctrlPressed.value) return;
	e.preventDefault();
	$s.boardMode = "$view";
	$s.resetSelection(false, true);
});

// handler on key stroke ADD ITEM
onKeyStroke(["a", "A"], (e) => {
	if (!ctrlPressed.value) return;
	if ($s.showModal) return;
	e.preventDefault();
	$s.addItem();
});

</script>

<template>

	<!-- INFO MODAL -->
	<Teleport to="body">
		<TheModal
			:show="$s.showInfoModal"
		>
			<template #header></template>

			<template #body>
				<div class="h-[60vh] overflow-y-auto">
					<InfoKeymap v-if="$s.infoModalTheme === '$keymap'"/>
					<InfoAbout v-if="$s.infoModalTheme === '$about'"/>
				</div>
			</template>

			<template #footer>
				<Button
					label="OK"
					@click="() => {
						$s.infoModalTheme = null;
						$s.showInfoModal = false;
					}"
				/>
			</template>
		</TheModal>
	</Teleport>


	<Teleport to="body">
		<TheModal
			:show="$s.showModal"
		>
			<template #header>
				<span></span><!--	EMPTY HEADER-->
			</template>
			<template #body>
				<TheSearchForm v-if="$s.boardMode === '$search'"/>
				<TheEditForm v-else/>
			</template>
		</TheModal>
	</Teleport>

	<header class="relative bg-slate-100 py-4">
		<slot name="header">

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
<!--				<span>Page</span>-->
<!--				<box-icon-->
<!--					type='solid'-->
<!--					name='map-pin'-->
<!--					size=""-->
<!--					color="#dc2626"-->
<!--				/>-->
<!--				<span>Pins</span>-->

				<box-icon
					type='solid'
					name='pin'
					size=""
					color="#fff"
					class="
						bg-gradient-to-r from-orange-500 to-red-600
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

			<!-- SEARCH BUTTON -->
			<div class="
				absolute
				top-4 end-24
			">
				<button
					class="flex gap-1 items-center bg-white rounded-md h-12 px-2"
					@click="toggleSearch"
				>
					<box-icon
						name='search'
						size=""
						color="#94a3b8"
					/>

					<span class="text-sm text-slate-400 me-8">Search</span>

<!--					<kbd class="border rounded-md py-1 px-2">⌘</kbd>-->
					<kbd class="border rounded-md text-xs text-slate-500 border-b-4 py-1 px-2">Ctrl</kbd>
					<span class="text-slate-400">+</span>
					<kbd class="border rounded-md text-xs text-slate-500 border-b-4 py-1 px-2">K</kbd>
				</button>
			</div>

			<!-- MENU -->
			<div class="
				absolute
				top-4 end-8
			">
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

		</slot>
	</header>

	<main class="relative">
		<ModeToggleBar
			v-if="!$s.showActionSpace"
		/>

		<div class="content grid grid-cols-1 grid-rows-1 bg-slate-100 pt-4 p-8 overflow-hidden">
			<slot name="content"></slot>
		</div>
	</main>

	<!-- FIXME *********** DEBUG	-->

	<!--	<div class="absolute text-xs z-10 end-4 bottom-4 rounded-lg bg-orange-400 p-4">-->
	<!--		<pre>displayStep: {{ $s.displayStep }}</pre>-->
	<!--		<pre>boardMode: {{ $s.boardMode }}</pre>-->
	<!--		<pre>showIE: {{ $s.showIE }}</pre>-->
	<!--		<pre>showActionSpace: {{ $s.showActionSpace }}</pre>-->
	<!--	</div>-->
</template>

<style>
#overlay_menu {
	transform: translateY(6px) !important;
}
</style>