<script setup>
import { ref, computed } from "vue";
import {useLocalStorage} from "@vueuse/core/index";
import ScreenLayout from "@/components/layout/ScreenLayout.vue";
import {useRoute, useRouter} from "vue-router";
import {localDataDefaults} from "../data/localDataDefaults";
import {modelDesc, listMapper} from "../const/modelDesc";

const $route = useRoute();
const $router = useRouter();

const entityMapper = {
	1: "category",
	2: "folder",
	3: "link",
	4: "tag",
}

const currEntityValue = ref(1);
const currItemId = ref(0);
const objInForm = ref({});

// access to localStorage
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

const getEntityDescription = computed(() => modelDesc[currEntityName.value]);

const selectEntityName = () => {
	console.log("%c/selectEntityName/", "background: violet; padding: 4px");

	objInForm.value = {};
	currItemId.value = 0;

	console.log("currEntityName", currEntityName.value);
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
	const maxId = localData.value[currEntityName.value].map(item => item.id).sort().reverse()[0];
	const nextId = maxId + 1;

	const extraProps = Object.keys(getEntityDescription.value).filter(propName => !["id", "name"].includes(propName));
	console.log("extraProps", extraProps);

	// create new item with base properties
	const newItem = {
		id: nextId,
		name: "new " + currEntityName.value + " " + nextId
	}

	if (extraProps.length > 0) {
		extraProps.forEach(propName => newItem[propName] = "");
	}

	// push new entity
	localData.value[currEntityName.value].push(newItem);

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


// folder.category
const populateList = (entityAndField) => {

	// 1. get the entity name to populate list
	const [table, col] = entityAndField.split(".");
	// 2. retrieve items from localData
	return localData.value[col];
}

</script>


<template>
	<ScreenLayout>
		<template #header>
			<h1 class="text-zinc-700 text-3xl font-bold flex gap-2 items-center">
				<span>Page</span>
				<box-icon
					type='solid'
					name='map-pin'
					size="md"
					color="#dc2626"
				/>
				<span>Pins</span>
			</h1>
		</template>
		<template #content>

			<div class="screen-edit grid gap-4 grid-cols-2">


				<section class="left">
					<!-- ENTITY -->
					<select
						v-model="currEntityValue"
						class="block w-1/3 p-2 mb-5"
						@change="selectEntityName"
					>
						<option
							v-for="opt in Object.entries(entityMapper)"
							:key="opt[0]"
							:value="opt[0]"
						>
							{{ opt[1] }}
						</option>
					</select>

					<!-- ITEM -->
					<select
						v-model="currItemId"
						class="block w-1/3 p-2 mb-5"
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


					<form class="text-xl p-4">

						<label class="block mb-4">#{{ objInForm.id }}</label>

						<div
							v-for="([fieldName, type], i) in Object.entries(getEntityDescription)"
							:key="i"
						>

							<template v-if="type !== 'list'">
								<label class="block">{{ fieldName }}</label>
								<input
									:type="type"
									v-model="objInForm[fieldName]"
									class="block w-full rounded-lg py-2 px-4 mb-4"
								>
							</template>

							<template v-else>
								<label class="block">{{ fieldName }}</label>

								<select v-model="objInForm[fieldName]">
									<option
										v-for="opt in populateList(currEntityName + '.' + fieldName)"
										:key="opt.id"
										:value="opt.id"
									>
										{{ opt.id }} - {{ opt.name }}
									</option>
								</select>


							</template>


						</div>



					</form>

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


				</section>




				<div class="debug text-xs">
					<button
						class="block w-32 bg-yellow-400 rounded-lg p-2 mb-4"
						@click.prevent="downloadJson"
					>
						Download
					</button>

					<pre>currEntityName: {{ currEntityName }}</pre>
					<pre>getEntityDescription: {{ getEntityDescription }}</pre>
					<pre>currItemId: {{ currItemId }}</pre>
					<pre>objInForm: {{ objInForm }}</pre>


					DATA
<!--					<pre>{{ localData }}</pre>-->
				</div>

			</div>

		</template>
	</ScreenLayout>
</template>


<style scoped>

</style>
