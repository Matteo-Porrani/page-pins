<script setup>

import ScreenLayout from "@/components/layout/ScreenLayout.vue";

import {categories} from "@/mock/mock-categories";
import {useMainStore} from "../store/main";
import TheSpaceGrid from "@/components/TheSpaceGrid.vue";


const $s = useMainStore();

</script>

<template>
<ScreenLayout>

	<template #content>

		<TheSpaceGrid/>

	</template>

</ScreenLayout>
</template>

<style scoped>

</style>
