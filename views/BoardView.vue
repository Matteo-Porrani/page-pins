<script setup>

import ScreenLayout from "@/components/layout/ScreenLayout.vue";

import {categories} from "@/mock/mock-categories";
import {useMainStore} from "../store/main";
import TheSpaceGrid from "@/components/TheSpaceGrid.vue";
import TheFolders from "@/components/TheFolders.vue";
import {onMounted} from "vue";
import TheActionSpace from "@/components/TheActionSpace.vue";


const $s = useMainStore();

onMounted(() => {
	$s.initOrders();
});

</script>

<template>
<ScreenLayout>

	<template #content>

		<Transition mode="out-in">
			<TheSpaceGrid v-if="!$s.showActionSpace && !$s.activeCategId"/>
			<TheFolders v-else-if="!$s.showActionSpace && $s.activeCategId"/>
			<TheActionSpace v-else-if="$s.showActionSpace"/>
		</Transition>

	</template>

</ScreenLayout>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
	transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>
