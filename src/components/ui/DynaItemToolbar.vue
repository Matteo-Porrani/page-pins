<script setup>
import {defineProps, ref, computed, onMounted, watch} from "vue";
import {useMainStore} from "../../../store/main";
import {baseColors} from "../../../data/baseColors";

const $s = useMainStore();

const $p = defineProps({
	entity: String,
	item: Object,
});

onMounted(() => {
	initToolbar();
});

// executed on mounted
const initToolbar = () => {
	// array of string identifiers for buttons : ["$edit", "$colorize", "$reorder"...]
	const elements = modes[step.value];

	// remove elements if needed
	if (elements.includes("$toggle1") && !itemIsDeletable.value) elements.splice(elements.indexOf("$toggle1"), 1); // remove "$toggle1"
	if (elements.includes("$transfer") && $p.entity === "category") elements.splice(elements.indexOf("$transfer"), 1); // remove "$transfer"

	// config is an array of btn config objects
	toolbarConfig.value = elements.map(el => {
		// retrieve properties from array
		const [id, icon, color] = btns[el];
		// return object config for button
		return {
			id,
			icon,
			color,
			action: actions[el]
		}
	});
}



// DISPLAY state ************************************************************
const step = ref("$E"); // "$E" | "$R" | "$C"

watch(
	step,
	() => {
		initToolbar();
	},
	{
		deep: true
	}
);

// deletable ?
const itemHasChildren = computed(() => {
	const childrenEntityName = {
		category: "folder",
		folder: "link",
		link: null,
	}[$p.entity];

	if (!childrenEntityName) return false;

	const children = $s.getChildren(childrenEntityName, $p.entity, $p.item.id);
	return children.length > 0;
});

const itemIsDeletable = computed(() => {
	// for link always true
	if ($p.entity === "link") return true;

	// for category | folder check if children exist
	return !itemHasChildren.value;
});

// common logic for action space
const openActionSpace = mode => {
	$s.actionSpaceMode = mode;
	$s.showActionSpace = true;
}

// CONFIG state *************************************************************
const toolbarConfig = ref([]);

const modes = {
	$E: ["$close", "$edit", "$colorize", "$reorder", "$transfer", "$toggle1"],
	$R: ["$remove", "$toggle2"],
	$C: ["$discard", "$confirm"],
	$P: [],
}

const btns = {
	$close: [1, "check", null],
	$edit: [2, "pencil", null],
	$colorize: [3, "purchase-tag", null],
	$reorder: [4, "list-ul", null],
	$transfer: [5, "arrow-to-right", null],
	$toggle1: [6, "dots-horizontal-rounded", null],

	$remove: [7, "trash", "red"],
	$toggle2: [8, "dots-horizontal-rounded", null],

	$discard: [9, "x", "red"],
	$confirm: [10, "check", "dark"],
}

const actions = {
	$close: () => {
		setTimeout(() => $s.boardMode = "$view", 100);
	},
	$edit: () => $s.editItem($p.entity, $p.item),
	$colorize: () => {
		$s.prepareItemForColorize($p.entity, {...$p.item});
		step.value = "$P";
	},
	$reorder: () => {
		$s.reorderTriggeredBy($p.entity, {...$p.item});
		openActionSpace("$reorder");
	},
	$transfer: () => {
		$s.prepareTransfer($p.entity, {...$p.item});
		openActionSpace("$transfer");
	},

	// display actions
	$toggle1: () => step.value = "$R", // go to $R mode

	$remove: () => step.value = "$C", // go to $C mode
	$toggle2: () => step.value = "$E", // go back to $E mode

	$discard: () => step.value = "$E", // discard remove & go back to $E mode

	// DELETE
	$confirm: () => $s.deleteItem($p.entity, $p.item), // confirm remove
};

const pickColor = id => {
	$s.colorizeData.currColorId = id;
	$s.colorizeItem();
	step.value = '$E';
}

</script>


<template>
	<div
		class="
			toolbar
			absolute -top-2 -right-2
			flex gap-1 justify-end items-center
			rounded-md
		"
	>
    <span
			v-if="step === '$C'"
			class="text-gray-600 text-sm pe-2"
		>
			Confirm ?
		</span>

		<div
			v-if="step === '$P'"
			class="z-50 border border-slate-300 bg-white shadow-md rounded-md p-1"
		>
			<div class="palette-wrapper grid gap-2 grid-cols-4 grid-rows-3">
				<button
					class="border border-slate-200 rounded-lg size-6 grid place-content-center"
					@click="pickColor(0)"
				>
					<i v-if="item.color === 0" class="pi pi-check"></i>
				</button>

				<button
					v-for="c in baseColors"
					:key="c.id"
					class="rounded-lg size-6 grid place-content-center"
					:class="`bg-${c.name}-400`"
					@click="pickColor(c.id)"
				>
					<i v-if="c.id === item.color" class="pi pi-check"></i>
				</button>


			</div>
		</div>

		<template v-if="step !== '$P'">
			<button
				v-for="b in toolbarConfig"
				:key="b.id"
				class="
          w-8
          flex justify-center items-center
          rounded-lg shadow-md
          border
          py-1
        "
				:class="{
          'transform -translate-y-2' : entity === 'category',
          'border-slate-300 bg-white hover:bg-slate-100' : b.color === null,
          'bg-red-100 hover:bg-red-200 border-red-300' : b.color === 'red',
          'bg-slate-200 hover:bg-slate-300 border-slate-300' : b.color === 'dark',
        }"
				@click="b.action"
			>
				<box-icon
					:name="b.icon"
					color="#6b7280"
					custom-size
					:class="{'transform -rotate-90' : b.icon === 'purchase-tag' }"
				/>
			</button>
		</template>


	</div>
</template>
