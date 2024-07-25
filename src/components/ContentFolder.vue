<script setup>
import {useMainStore} from "../../store/main";

const $s = useMainStore();
import LinkItem from "@/components/LinkItem.vue";
</script>

<template>
	<ul class="flex flex-col gap-2">
		<li
			v-for="link in $s.folderContentItems"
			:key="link.id"
		>
			<LinkItem :link="link"/>
		</li>
	</ul>
</template>

<style scoped>
ul {
	/*border: 2px solid red;*/
	overflow-y: auto;
}
</style>
