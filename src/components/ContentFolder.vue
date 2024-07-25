<script setup>
import {useMainStore} from "../../store/main";

const $s = useMainStore();
import LinkItem from "@/components/LinkItem.vue";
</script>

<template>
	<div class="">
		<ul class="flex flex-col gap-2">
			<li
				v-for="link in $s.folderContentItems"
				:key="link.id"
			>
				<LinkItem :link="link"/>
			</li>
		</ul>
	</div>
</template>

<style scoped>

</style>
