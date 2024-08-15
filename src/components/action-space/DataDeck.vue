<script setup>
import {ref} from "vue";
import {useMainStore} from "../../../store/main";
import Button from "primevue/button";
import FileUpload from "primevue/fileupload";

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

const customUploader = async (event) => {
	const file = event.files[0];

	const reader = new FileReader();

	if (file) {
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

	reader.readAsText(file);

	// const reader = new FileReader();
	// let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url
	//
	// reader.readAsDataURL(blob);

	reader.onloadend = function () {
		console.log("end");
	};
};

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

				<div class="flex justify-center">
					<Button
						label="download"
						icon="pi pi-fw pi-download"
						@click="downloadJson"
					/>
				</div>

			</div>

			<div class="side-up bg-white rounded-md py-8">
				<h3 class="font-bold text-xl text-center mb-4">Upload</h3>
				<p class="w-1/2 text-center text-sm text-gray-500 mx-auto">
					Replace your current data with<br>JSON from a .txt file
				</p>

				<div class="spacer py-6"></div>

<!--				<FileUpload-->
<!--					v-if="!importDone"-->
<!--					mode="basic"-->
<!--					name="fileUpload"-->
<!--					accept=".txt"-->
<!--					customUpload-->
<!--					@uploader="customUploader"-->
<!--				/>-->

				<input
					v-if="!importDone"
					type="file"
					accept=".txt"
					class="
          block w-fit
          file:cursor-pointer
          text-sm text-gray-500
          file:mr-2 file:py-3 file:px-4
          file:rounded-md file:border-0
          file:text-sm
          file:bg-slate-500 file:text-white
          hover:file:bg-slate-600
          mx-auto
        "
					@change="uploadJson"
				/>

				<template v-else>
					<p class="w-fit text-emerald-700 bg-emerald-100 rounded-md py-1 px-4 mb-4 mx-auto">Import done !</p>

					<button
						class="block rounded-md bg-slate-500 text-white mx-auto hover:bg-slate-600 py-2 px-5"
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
