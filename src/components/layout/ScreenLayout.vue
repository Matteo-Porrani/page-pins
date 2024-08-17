<script setup>
import {defineAsyncComponent} from 'vue';
import {useRoute} from "vue-router";
import {useMainStore} from "../../../store/main";

import Button from 'primevue/button';
import TheModal from "@/components/ui/TheModal.vue";
import ModeToggleBar from "@/components/ui/ModeToggleBar.vue";
import TheHeader from "@/components/layout/TheHeader.vue";

// -----------------------------------------------------------------------------
// async components

const TheSearchForm = defineAsyncComponent(() => import("@/components/ui/TheSearchForm.vue"));
const TheEditForm = defineAsyncComponent(() => import("@/components/ui/TheEditForm.vue"));
const InfoKeymap = defineAsyncComponent(() => import("@/components/info/InfoKeymap.vue"));
const InfoAbout = defineAsyncComponent(() => import("@/components/info/InfoAbout.vue"));

// -----------------------------------------------------------------------------
// routing & store

const $route = useRoute();
const $s = useMainStore();

</script>

<template>

	<!-- INFO MODAL -->
	<Teleport to="body">
		<TheModal :show="$s.showInfoModal">
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

	<!-- FORM MODAL -->
	<Teleport to="body">
		<TheModal :show="$s.showModal">
			<template #header>
				<span></span><!--	EMPTY HEADER-->
			</template>
			<template #body>
				<TheSearchForm v-if="$s.boardMode === '$search'"/>
				<TheEditForm v-else/>
			</template>
		</TheModal>
	</Teleport>

	<!-- HEADER -->
	<header class="relative py-5">
		<slot name="header">
			<TheHeader/>
		</slot>
	</header>

	<!-- MAIN -->
	<main class="relative">
		<ModeToggleBar v-if="$route.name === 'home' && !$s.showActionSpace && !$s.showIE"/>

		<div
			class="
				content
				grid grid-cols-1 grid-rows-1
				overflow-hidden
				pt-4 p-8
			"
		>
			<slot name="content">
				<!-- * -->
			</slot>
		</div>
	</main>

	<!-- FIXME *********** DEBUG	-->

<!--		<div class="absolute z-10 end-4 bottom-4 rounded-lg bg-orange-400 p-4">-->
<!--			<pre>activeCategId: {{ $s.activeCategId }}</pre>-->
<!--			<pre>activeFolderId: {{ $s.activeFolderId }}</pre>-->
<!--			<pre>displayStep: {{ $s.displayStep }}</pre>-->
<!--			<pre>boardMode: {{ $s.boardMode }}</pre>-->
<!--			<pre>showIE: {{ $s.showIE }}</pre>-->
<!--			<pre>showActionSpace: {{ $s.showActionSpace }}</pre>-->
<!--		</div>-->
</template>
