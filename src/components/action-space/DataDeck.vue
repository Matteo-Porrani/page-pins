<script setup>
import {ref} from "vue";
import {useMainStore} from "../../../store/main";
import Button from "primevue/button";

const $s = useMainStore();

const importDone = ref(false);

const downloadJson = () => {
	console.log("%c/downloadJson/", "background: purple");
	// The JSON object to download
	const data = {...$s.localData};
	// console.log("EXPORTING data", data);

	// const str = JSON.stringify(data, null, 2);
	const str = JSON.stringify(data);

	// Create a blob object representing the data as a text file
	const blob = new Blob([str], { type: 'text/plain' });

	// Create a link element
	const link = document.createElement('a');

	// Set the href and download. When the user clicks this link, it will download the data
	link.href = URL.createObjectURL(blob);
	const now = new Date().getTime();
	link.download = "pagepins_backup_" + now + ".txt"; // the file name

	// Add the link to the DOM
	document.body.appendChild(link);

	// Simulate click to start the download process
	link.click();

	// Remove the link from the DOM
	document.body.removeChild(link);
}

const uploadJson = e => {
	console.log("%c/uploadJson/", "background: cyan");

	const file = e.target.files[0];

	if (file) {
		const reader = new FileReader();
		reader.onload = function (e) {
			try {
				const json = JSON.parse(e.target.result);

				console.log("IMPORTING data", json);
				$s.injectData(json);

				// show OK button
				importDone.value = true;

			} catch(e) {
				console.error(e);
			}
		};

		reader.readAsText(file);
	}
}

const navigateHome = () => {
	$s.boardMode = "$view";
	$s.showIE = false;
}

</script>

<template>

	<div class="w-2/3 mx-auto">

		<div class="return">
			<Button
				label="Back"
				size="small"
				icon="pi pi-angle-left"
				outlined
				class="mb-4"
				@click="() => {
					$s.showIE = false;
					$s.boardMode = '$view';
				}"
			/>
		</div>

		<div class="deck grid grid-cols-2 gap-8 rounded-md">

			<div class="side-down bg-white rounded-md py-8">
				<h3 class="font-bold text-xl text-center mb-4">Download</h3>
				<p class="w-1/2 text-center text-sm text-gray-500 mx-auto">
					Backup your current data<br>in JSON format
				</p>

				<div class="spacer py-6"></div>

				<button
					class="
            aspect-square
            flex justify-center items-center
            rounded-lg
            bg-gray-700
            hover:bg-gradient-to-r from-blue-950 to-indigo-500
            p-2
            mx-auto
            mb-4
          "
					@click="downloadJson"
				>
					<box-icon
						name="cloud-download"
						color="#fff"
						size="md"
					/>
				</button>

<!--				<button-->
<!--					class="-->
<!--            aspect-square-->
<!--            flex justify-center items-center-->
<!--            rounded-lg-->
<!--            bg-gray-100-->
<!--            hover:bg-gradient-to-l from-gray-100 to-indigo-400-->
<!--            p-2 mb-4 mx-auto-->
<!--          "-->
<!--					@click="downloadJson"-->
<!--				>-->
<!--					<box-icon-->
<!--						name="cloud-download"-->
<!--						color="#1f2937"-->
<!--						size="md"-->
<!--					/>-->
<!--				</button>-->

			</div>

			<div class="side-up bg-white rounded-md py-8">
				<h3 class="font-bold text-xl text-center mb-4">Upload</h3>
				<p class="w-1/2 text-center text-sm text-gray-500 mx-auto">
					Replace your current data with<br>JSON from a .txt file
				</p>

				<div class="spacer py-6"></div>

				<input
					v-if="!importDone"
					type="file"
					accept=".txt"
					class="
          block w-fit
          file:cursor-pointer
          text-sm text-gray-500
          file:mr-2 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm
          file:bg-gray-700 file:text-white
          hover:file:bg-gradient-to-r from-blue-950 to-indigo-500
          mx-auto
        "
					@change="uploadJson"
				/>

				<template v-else>
					<p class="w-fit text-emerald-700 bg-emerald-100 rounded-md py-1 px-4 mb-4 mx-auto">Import done !</p>

					<button
						class="block rounded-md bg-gray-700 text-white mx-auto hover:bg-gradient-to-r from-blue-950 to-indigo-500 py-2 px-5"
						@click="navigateHome"
					>
						OK
					</button>
				</template>

			</div>

		</div>
	</div>


</template>

<style scoped>
/*input::file-selector-button {*/
/*  background-image: linear-gradient(*/
/*      to right,*/
/*      #ff7a18,*/
/*      #af002d,*/
/*      #319197 100%,*/
/*      #319197 200%*/
/*  );*/
/*  background-position-x: 0%;*/
/*  background-size: 200%;*/
/*  border: 0;*/
/*  border-radius: 8px;*/
/*  color: #fff;*/
/*  padding: 1rem 1.25rem;*/
/*  text-shadow: 0 1px 1px #333;*/
/*  transition: all 0.25s;*/
/*}*/
/*input::file-selector-button:hover {*/
/*  background-position-x: 100%;*/
/*  transform: scale(1.1);*/
/*}*/
</style>
