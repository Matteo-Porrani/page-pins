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


	<div class="link-wrapper grid grid-rows-1 gap-4 items-center">

		<component :is="$s.editModeOn || link.url === '' ? 'div' : 'a'"
							 :href="link.url"
							 target="_blank"
							 class="relative w-full border border-zinc-300 rounded-lg flex gap-4 items-center cursor-pointer hover:border-zinc-500 hover:shadow-xl p-2 transition-all duration-200 ease-in"
		>

			<ItemToolbar
				v-if="$s.editModeOn"
				:item="link"
				entity="link"
			/>

			<div class="w-full ">
				<p class="text-sm font-bold">{{ link.name }}</p>
				<p class="url-paragraph font-mono text-xs text-purple-800">{{ link.url }}</p>
			</div>

			<box-icon
				class=""
				name="link-external"
				color="#a1a1aa"
			/>

		</component>

		<button class="bg-zinc-100 hover:bg-zinc-200 aspect-square rounded-lg">
			<box-icon
				class=""
				name="copy"
				color="#a1a1aa"
			/>
		</button>

	</div>






</template>

<style scoped>

.link-wrapper {
  grid-template-columns: 1fr auto;
	align-items: stretch
}

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
