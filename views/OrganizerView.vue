<script setup>
import {ref} from "vue";
import ScreenLayout from "@/components/layout/ScreenLayout.vue";
import Button from "primevue/button";
import {useMainStore} from "../store/main";
import Tree from "primevue/tree";


const $s = useMainStore();

const treeSelection = ref(null);

const nodes = ref($s.getDataAsTreeNodes);
const expandedKeys = ref({});

const expandNode = (node) => {
	if (node.children && node.children.length) {
		expandedKeys.value[node.key] = true;

		for (let child of node.children) {
			expandNode(child);
		}
	}
};

const expandAll = () => {
	for (let node of nodes.value) {
		expandNode(node);
	}

	expandedKeys.value = { ...expandedKeys.value };
};

const collapseAll = () => {
	expandedKeys.value = {};
};
</script>

<template>
	<ScreenLayout>

		<template #content>

			<div class="wrapper grid rounded-md">


				<div class="return">
					<Button
						label="Back"
						size="small"
						icon="pi pi-angle-left"
						as="router-link"
						to="/"
						severity="secondary"
						text
						class="mb-4"
					/>
				</div>

				<div class="grid grid-cols-3 gap-8">

					<div class="col-span-2 max-h-[80vh] overflow-y-scroll">
						<Tree
							v-model:selectionKeys="treeSelection"
							v-model:expandedKeys="expandedKeys"
							:value="nodes"
							selectionMode="checkbox"
							class="rounded-md"
							filter
						></Tree>
					</div>


					<div class="mb-2 flex flex-col gap-2 items-start">
						<Button class="w-36" size="small" type="button" icon="pi pi-plus" label="Expand All" @click="expandAll" />
						<Button class="w-36" size="small" type="button" icon="pi pi-minus" label="Collapse All" @click="collapseAll" />


						<div style="font-size: 10px">
							<pre>SELECTION (links only)</pre>
							<pre>{{ treeSelection ? Object.entries(treeSelection).filter(e => e[0].startsWith("L")) : [] }}</pre>
						</div>

					</div>



				</div>

			</div>

		</template>
	</ScreenLayout>
</template>

<style scoped>
.wrapper {
	grid-template-rows: 50px 1fr;
}
</style>