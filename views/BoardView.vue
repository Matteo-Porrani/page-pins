<script setup>

import ScreenLayout from "@/components/layout/ScreenLayout.vue";

import {categories} from "@/mock/mock-categories";
import {useMainStore} from "../store/main";
import TheSpaceGrid from "@/components/TheSpaceGrid.vue";
import TheFolders from "@/components/TheFolders.vue";
import {onMounted} from "vue";
import TheActionSpace from "@/components/TheActionSpace.vue";
import FolderItem from "@/components/FolderItem.vue";


const $s = useMainStore();

onMounted(() => {
	$s.initOrders();
});


const colors = [
	"yellow",
	"orange",
	"red",
	"fuchsia",
	"purple",
	"blue",
	"sky",
	"teal",
	"green",
	"lime",
]



const f = {
	id: 19,
	name: "Hello",
	category: 1,
	color: 3,
}


</script>

<template>
<ScreenLayout>

	<template #content>


<!--		<div class="w-[500px] h-24 bg-white p-8">-->
<!--			<FolderItem :folder="f"/>-->
<!--		</div>-->

<!--		<div class="w-[30%] border border-zinc-800 flex flex-col gap-4 p-4">-->
<!--			<div-->
<!--				v-for="(c, i) in colors"-->
<!--				:key="i"-->
<!--				class="border w-[30%] mx-auto flex gap-4"-->
<!--			>-->
<!--				<div-->
<!--					class="sample w-6 h-6 rounded-full"-->
<!--					:class="`bg-${c}-400`"-->
<!--				></div>-->
<!--				<span class="text-slate-600">-->
<!--					({{ i+1 }}) {{ c }}-->
<!--				</span>-->
<!--			</div>-->
<!--		</div>-->



		<Transition mode="out-in">
			<TheSpaceGrid v-if="!$s.showActionSpace && !$s.activeCategId"/>
			<TheFolders v-else-if="!$s.showActionSpace && $s.activeCategId"/>
			<TheActionSpace v-else-if="$s.showActionSpace"/>
		</Transition>

	</template>

</ScreenLayout>
</template>


<style>
/*#icon {
	border: 2px solid red;
}*/
</style>

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
