<script setup>
import {computed} from "vue";
import {useMainStore} from "../../store/main";
import { vOnLongPress } from '@vueuse/components';
import {getColorName} from "../../data/baseColors";
import ItemToolbar from "@/components/ui/ItemToolbar.vue";

const $p = defineProps({
	cat: {
		type: Object,
		required: true,
	}
});

const $s = useMainStore();

const bgClasses = computed(() => {
	if (!$p.cat) return "";
	return `hover:bg-${getColorName($p.cat.color)}-50`
})

const borderClasses = computed(() => {
	if (!$p.cat) return "";
	return `border-${getColorName($p.cat.color)}-400 hover:border-${getColorName($p.cat.color)}-500`
})

// const colorClasses = computed(() => `${bgClasses.value} ${borderClasses.value}`);
const colorClasses = computed(() => `${borderClasses.value}`);

const longPressHandler = () => $s.boardMode = "$edit";

const enterCategory = id => {
	if ($s.editModeOn) return;
	$s.activeCategId = id;
}
</script>

<template>
	<div
		v-on-long-press="longPressHandler"
		class="
      space
      relative
      group
      cursor-pointer
      grid
      place-content-center
      bg-white
      border-t-[8px]
      hover:shadow-lg
      rounded-md
      p-4
      transition duration-200
    "
		:class="colorClasses"
		@click="enterCategory(cat.id)"
	>
		<p
			class="
				text-lg
        group-hover:transform
        group-hover:scale-[1.2]
        transition duration-200
			">
			{{ cat.name }}
		</p>

		<span class="
        absolute end-0 bottom-0
        text-gray-400 text-sm
        p-2
      ">
			{{
				$s.getChildren('folder', 'category', cat.id).length > 0 ? $s.getChildren('folder', 'category', cat.id).length : ''
			}}
		</span>

		<ItemToolbar
			v-if="$s.editModeOn && $s.displayStep === 0"
			:item="cat"
			entity="category"
		/>
	</div>
</template>

<style scoped>

</style>