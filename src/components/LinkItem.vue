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

const duplicateHandler = () => {
	console.log("DUPLICATE", $p.link);
	$s.addItem({...$p.link});
}

</script>

<template>
	<div class="link-wrapper grid grid-rows-1 gap-2 items-center">

		<component
			:is="$s.editModeOn || link.url === '' ? 'div' : 'a'"
			:href="link.url"
			target="_blank"
			class="
				relative group
				w-full rounded-lg
				bg-white border border-slate-300 hover:border-slate-500
				flex gap-4 items-center
				cursor-pointer
				hover:shadow-xl
				transition-all duration-200 ease-in
				h-14
				px-2
			"
			v-on-long-press="longPressHandler"
		>

			<DynaItemToolbar
				v-if="$s.editModeOn"
				entity="link"
				:item="link"
			/>

			<ColorTag
				:color="getColorName(link.color)"
				:neutral="link.color === 0"
			/>

			<div class="flex-grow">
				<p class="text-sm font-bold group-hover:text-red-600 transition duration-200">{{ link.name }}</p>
				<p class="url-paragraph font-mono text-xs text-slate-400 group-hover:underline">{{ link.url }}</p>
			</div>

			<box-icon
				class=""
				name="link-external"
				color="#a1a1aa"
			/>

		</component>

		<button
			v-tooltip.top="'Duplicate'" type="text"
			class="
				relative
				bg-slate-100 hover:bg-slate-200
				min-w-14 aspect-square rounded-lg
			"
			@click="duplicateHandler"
		>

			<box-icon
				class=""
				name="copy"
				color="#a1a1aa"
			/>
		</button>

		<button
			v-tooltip.top="'Copy URL'" type="text"
			class="
				relative
				bg-slate-100 hover:bg-slate-200
				min-w-14 aspect-square rounded-lg
			"
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
/*
a:hover .url-paragraph {
	text-decoration: underline;
}

.url-paragraph {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
*/
</style>
