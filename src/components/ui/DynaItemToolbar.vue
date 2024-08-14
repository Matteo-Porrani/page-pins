<script setup>
import {defineProps, ref, computed, onMounted, watch} from "vue";
import {useMainStore} from "../../../store/main";

// mock store
// let $s = {
// 	actionSpaceMode: null,
// 	showActionSpace: false,
//
// 	getChildren: (childrenEntity, parentEntity, itemId) => {
// 		console.log("/getChildren/", {childrenEntity, parentEntity, itemId})
// 		if (parentEntity === "link") return true;
// 		if (itemId === 1) return [1];
// 		if (itemId === 31) return [];
// 		if (itemId === 2) return [];
// 	},
//
// 	editItem: (entity, item) => {
// 		console.log("/EDIT/", entity, item);
// 	},
//
// 	prepareItemForColorize: (entity, item) => {
// 		console.log("/PREPARE COLORIZE/", entity, item);
// 	},
//
// 	reorderTriggeredBy: (entity, item) => {
// 		console.log("/REORDER TRIGGERED/", entity, item);
// 	},
//
// 	prepareTransfer: (entity, item) => {
// 		console.log("/PREPARE TRANSFER/", entity, item);
// 	},
//
// 	deleteItem: (entity, item) => {
// 		console.log("/DELETE/", entity, item);
// 	},
// };

const $s = useMainStore();

// props
const $p = defineProps({
	entity: String,
	item: Object,
});

onMounted(() => {
	console.log("/MOUNTED/")
	console.log($p);

	initToolbar();
});

// executed on mounted
const initToolbar = () => {
	// array of string identifiers for buttons : ["$edit", "$colorize", "$reorder"...]
	const elements = modes[step.value];

	// remove elements if needed
	if (elements.includes("$toggle1") && !itemIsDeletable.value) elements.splice(4, 1); // remove "$toggle1"
	if (elements.includes("$transfer") && $p.entity === "category") elements.splice(3, 1); // remove "$transfer"

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

	// console.log("toolbarConfig.value", toolbarConfig.value);
}



// DISPLAY state ************************************************************
const step = ref("$E"); // "$E" | "$R" | "$C"

watch(
	step,
	(newVal) => {
		console.log("WATCH", newVal);
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
	$E: ["$edit", "$colorize", "$reorder", "$transfer", "$toggle1"],
	$R: ["$remove", "$toggle2"],
	$C: ["$discard", "$confirm"],
}

const btns = {
	$edit: [1, "pencil", null],
	$colorize: [2, "purchase-tag", null],
	$reorder: [3, "list-ul", null],
	$transfer: [4, "arrow-to-right", null],
	$toggle1: [5, "dots-horizontal-rounded", null],

	$remove: [6, "trash", "red"],
	$toggle2: [7, "dots-horizontal-rounded", null],

	$discard: [8, "x", "red"],
	$confirm: [9, "check", "green"],
}

const actions = {
	// OK
	$edit: () => $s.editItem($p.entity, $p.item),
	// OK
	$colorize: () => {
		$s.prepareItemForColorize($p.entity, {...$p.item});
		openActionSpace("$colorize");
	},
	// OK
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
	$confirm: () => $s.deleteItem($p.entity, $p.item), // confirm remove
}

</script>


<template>

	<div
		class="
			toolbar
			absolute -top-4 -right-2
			flex gap-1 justify-end items-center
			rounded-md
		"
	>

    <span
			v-if="step === '$C'"
			class="text-gray-600 text-sm pe-2"
		>Confirm ?</span>

		<button
			v-for="b in toolbarConfig"
			:key="b.id"
			class="
          w-8 flex justify-center items-center
          rounded-lg shadow-md
          bg-white hover:bg-gray-100
          border
          py-1
        "
			:class="{
          'border-gray-300' : b.color === null,
          'bg-red-100 hover:bg-red-200 border-red-300' : b.color === 'red',
          'bg-green-100 hover:bg-green-200 border-green-300' : b.color === 'green',
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
	</div>

	<!-- DEBUG -->
	<!--  <div class="bg-sky-100 mt-8">-->
	<!--    <pre>{{ step }}</pre>-->
	<!--  </div>-->

</template>
