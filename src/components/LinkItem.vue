<script setup>
import {useMainStore} from "../../store/main";
import ItemToolbar from "@/components/ui/ItemToolbar.vue";

const $s = useMainStore();

defineProps({
	link: {
		type: Object,
		required: true,
	}
})
</script>

<template>
	<component :is="$s.editModeOn ? 'div' : 'a'"
		:href="link.url"
		target="_blank"
		class="relative bg-white rounded-lg flex gap-4 items-center border border-zinc-200 cursor-pointer hover:border-zinc-500 hover:shadow-xl transition-all duration-200 ease-in py-2 px-4"
	>

		<ItemToolbar
			v-if="$s.editModeOn"
			:item="link"
			entity="link"
		/>

		<div class="w-full">
			<p class="text-sm font-bold mb-1">{{ link.name }}</p>
			<p class="url-paragraph font-mono text-xs text-purple-800">{{ link.url }}</p>
		</div>

		<box-icon
			class="ml-auto"
			name="link-external"
			color="#a1a1aa"
		/>
	</component>
</template>

<style scoped>
a:hover .url-paragraph {
	text-decoration: underline;
}
/*
.url-paragraph {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
*/
</style>
