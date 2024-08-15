<script setup>
import {onMounted} from "vue";
import {useMainStore} from "../store/main";

import ScreenLayout from "@/components/layout/ScreenLayout.vue";
import TheSpaceGrid from "@/components/TheSpaceGrid.vue";
import TheFolders from "@/components/TheFolders.vue";
import TheActionSpace from "@/components/TheActionSpace.vue";
import DataDeck from "@/components/action-space/DataDeck.vue";


const $s = useMainStore();

onMounted(() => {
	$s.initOrders();
});

</script>


<template>
<ScreenLayout>

	<template #content>

		<Transition mode="out-in">
			<TheSpaceGrid v-if="!$s.showActionSpace && !$s.showIE && !$s.activeCategId"/>
			<TheFolders v-else-if="!$s.showActionSpace && !$s.showIE && $s.activeCategId"/>
			<TheActionSpace v-else-if="!$s.showIE && $s.showActionSpace"/>
			<DataDeck v-else-if="$s.showIE"/>
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
