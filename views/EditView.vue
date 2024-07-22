<script setup>
import { ref, computed } from "vue";
import {useLocalStorage} from "@vueuse/core/index";
import ScreenLayout from "@/components/layout/ScreenLayout.vue";
import {useRoute, useRouter} from "vue-router";
import {localDataDefaults} from "../data/localDataDefaults";

const $route = useRoute();
const $router = useRouter();

const entityMapper = {
	1: "category",
	2: "folder",
}

const currEntityValue = ref(1);
const currItemId = ref(0);
const objInForm = ref({});

// persist state in localStorage
const localData = useLocalStorage(
	'storage_test_1',
	localDataDefaults //
);

const currEntityName = computed(() => {
	return entityMapper[currEntityValue.value];
});
const entitySelectOptions = computed(() => {


	console.log("currEntityName", currEntityName.value)

	return localData.value[currEntityName.value].map(e => ({ id: e.id, name: e.name }));
});

const selectEntityName = () => {
	console.log("%c/selectEntityName/", "background: violet; padding: 4px");
	console.log("currEntityName", selectEntityName);
}

const putEntityInForm = () => {
	console.log("%c/putEntityInForm/", "background: gold; padding: 4px")
	objInForm.value = localData.value[currEntityName.value]
		.find(obj => parseInt(obj.id) === parseInt(currItemId.value));
}

const saveEntity = () => {
	console.log("%c/saveEntity/", "background: skyblue; padding: 4px")
	$router.push("/");
}

const addEntity = () => {
	console.log("%c/addEntity/", "background: lime; padding: 4px")
	const nextId = localData.value[currEntityName.value].length + 1;

	// push new entity
	localData.value[currEntityName.value].push({
		id: nextId,
		name: "new " + currEntityName.value + " " + nextId
	});

	currItemId.value = nextId;
	putEntityInForm();
}

const removeEntity = () => {
	console.log("%c/removeEntity/", "background: lime; padding: 4px")
	console.log("...removing ID", objInForm.value.id);

	if (!objInForm.value.id) return;

	const idx = localData.value[currEntityName.value].findIndex(obj => parseInt(obj.id) === parseInt(objInForm.value.id));
	console.log("...located at INDEX", idx);

	localData.value[currEntityName.value].splice(idx, 1);
	// reset
	currItemId.value = 0;
	objInForm.value = {};
}

const downloadJson = () => {
	// The JSON object to download
	// const data = { id: 'download1', lat: 999, long: 13 };
	const data = { ...localData.value };

	const str = JSON.stringify(data, null, 2);

	// Create a blob object representing the data as a text file
	const blob = new Blob([str], { type: 'text/plain' });

	// Create a link element
	const link = document.createElement('a');

	// Set the href and download. When the user clicks this link, it will download the data
	link.href = URL.createObjectURL(blob);
	const now = new Date().getTime();
	link.download = "data_backup_" + now + ".txt"; // the file name

	// Add the link to the DOM
	document.body.appendChild(link);

	// Simulate click to start the download process
	link.click();

	// Remove the link from the DOM
	document.body.removeChild(link);
}



</script>


<template>
	<ScreenLayout>
		<template #header>
			<h1>Edit screen</h1>
		</template>
		<template #content>

			<div class="screen-edit grid grid-cols-2">

				<form class="text-xl p-4">

					<!-- ENTITY -->
					<select
						v-model="currEntityValue"
						class="block w-full p-2 mb-5"
						@change="selectEntityName"
					>
						<option value="1">Category</option>
						<option value="2">Folder</option>
					</select>

					<!-- ITEM -->
					<select
						v-model="currItemId"
						class="block w-full p-2 mb-5"
						@change="putEntityInForm"
					>
						<option value="0">Select an item</option>
						<option
							v-for="opt in entitySelectOptions"
							:value="opt.id"
						>
							{{ opt.name }}
						</option>
					</select>


					<label class="block">id {{ objInForm.id }}</label>

					<label>name</label>
					<br>
					<input
						type="text"
						v-model="objInForm.name"
						class="rounded-lg py-2 px-4"
					>

					<div class="grid grid-cols-2 gap-4">
						<button
							class="block bg-emerald-400 rounded-lg p-4 mt-10"
							@click.prevent="addEntity"
						>
							Add
						</button>

						<button
							class="block bg-red-400 rounded-lg p-4 mt-10"
							@click.prevent="removeEntity"
						>
							Remove
						</button>
					</div>

					<!-- SAVE & GO BACK -->
					<button
						class="block w-full bg-emerald-400 rounded-lg p-4 mt-10"
						@click.prevent="saveEntity"
					>
						OK
					</button>

					<button
						class="block w-full bg-yellow-400 rounded-lg p-4 mt-10"
						@click.prevent="downloadJson"
					>
						Download
					</button>


				</form>


				<div class="debug p-4">
					<pre>currEntityName: {{ currEntityName }}</pre>
					<pre>currItemId: {{ currItemId }}</pre>
					<pre>objInForm: {{ objInForm }}</pre>


					DATA
					<pre>{{ localData }}</pre>
				</div>

			</div>

		</template>
	</ScreenLayout>
</template>


<style scoped>

</style>
