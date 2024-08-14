<script setup>
import {ref} from "vue";
import { vOnLongPress } from '@vueuse/components';
import {useMainStore} from "../../store/main";
import {getColorName} from "../../data/baseColors";
import ItemToolbar from "@/components/ui/ItemToolbar.vue";
import ColorTag from "@/components/ui/ColorTag.vue";
import DynaItemToolbar from "@/components/ui/DynaItemToolbar.vue";

const $s = useMainStore();

const $p = defineProps({
	link: {
		type: Object,
		required: true,
	}
});

const longPressHandler = () => $s.boardMode = "$edit";

const copyConfirm = ref(false);

const copyHandler = async () => {
	try {
		await navigator.clipboard.writeText($p.link.url);
		console.log("Copied ✅");
		copyConfirm.value = true;

		setTimeout(() => copyConfirm.value = false, 600);
	} catch(err) {
		console.error(err);
	}
};

</script>

<template>
	<div class="link-wrapper grid grid-rows-1 gap-4 items-center">

		<component
			:is="$s.editModeOn || link.url === '' ? 'div' : 'a'"
			:href="link.url"
			target="_blank"
			class="relative w-full bg-white border border-zinc-300 rounded-lg flex gap-4 items-center cursor-pointer hover:border-zinc-500 hover:shadow-xl p-2 transition-all duration-200 ease-in"
			v-on-long-press="longPressHandler"
		>

			<DynaItemToolbar
				v-if="$s.editModeOn"
				entity="link"
				:item="link"
			/>

<!--			<ItemToolbar-->
<!--				v-if="$s.editModeOn"-->
<!--				:item="link"-->
<!--				entity="link"-->
<!--			/>-->

			<div class="flex-grow">
				<p class="text-sm font-bold">{{ link.name }}</p>
				<p class="url-paragraph font-mono text-xs text-purple-800">{{ link.url }}</p>
			</div>

			<ColorTag
				v-if="link.color > 0"
				:color="getColorName(link.color)"
			/>

			<box-icon
				class=""
				name="link-external"
				color="#a1a1aa"
			/>

		</component>

		<button
			class="relative bg-slate-100 hover:bg-slate-200 aspect-square rounded-lg"
			title="copy"
			@click="copyHandler"
		>

			<span
				class="
					absolute
					bg-slate-200 text-slate-400
					-left-[210%]
					rounded-md
					flex items-center gap-1
					opacity-0
					transform
					transition duration-200
					py-1 px-2
				"
				:class="{
					'opacity-100 scale-100' : copyConfirm,
					'hidden scale-75' : !copyConfirm
				}"
			>
				Copied
				<box-icon
					name="check"
					color="#94a3b8"
				/>
			</span>

			<box-icon
				class=""
				name="clipboard"
				color="#a1a1aa"
			/>
		</button>

	</div>
</template>

<style scoped>

.link-wrapper {
  grid-template-columns: 1fr auto auto;
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
