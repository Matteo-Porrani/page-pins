<script setup>
import { ref, computed } from "vue";
import {useLocalStorage} from "@vueuse/core/index";
import ScreenLayout from "@/components/layout/ScreenLayout.vue";
import {useRoute, useRouter} from "vue-router";
import {localDataDefaults} from "../data/localDataDefaults";

const $route = useRoute();
const $router = useRouter();

const currEntityId = ref(0);
const objInForm = ref({});

// persist state in localStorage
const localData = useLocalStorage(
	'storage_test_1',
	localDataDefaults //
);

const entitySelectOptions = computed(() => {
	return localData.value[$route.params.entity].map(e => ({ id: e.id, name: e.name }));
});

const putEntityInForm = () => {
	console.log("%c/putEntityInForm/", "background: gold; padding: 4px")
	objInForm.value = localData.value[$route.params.entity]
		.find(obj => parseInt(obj.id) === parseInt(currEntityId.value));
}

const saveEntity = () => {
	console.log("%c/saveEntity/", "background: skyblue; padding: 4px")
	$router.push("/");
}

const addEntity = () => {
	console.log("%c/addEntity/", "background: lime; padding: 4px")
	const nextId = localData.value[$route.params.entity].length + 1;

	// push new entity
	localData.value[$route.params.entity].push({
		id: nextId,
		name: "new entity " + nextId
	});

	currEntityId.value = nextId;
	putEntityInForm();
}

const removeEntity = () => {
	console.log("%c/removeEntity/", "background: lime; padding: 4px")
	// console.log("...removing ID", objInForm.value.id);
	const idx = localData.value[$route.params.entity].findIndex(obj => parseInt(obj.id) === parseInt(objInForm.value.id));
	// console.log("...located at INDEX", idx);

	localData.value[$route.params.entity].splice(idx, 1);
	// reset
	currEntityId.value = 0;
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

				<form class="text-2xl p-4">

					<select
						v-model="currEntityId"
						class="block w-full mb-5"
						@change="putEntityInForm"
					>
						<option value="0">Select an object</option>
						<option
							v-for="opt in entitySelectOptions"
							:value="opt.id"
						>
							{{ opt.name }}
						</option>
					</select>


					<label for="">Name</label>
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
					<pre>currEntityId: {{ currEntityId }}</pre>
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