<script setup>
import {categories} from "@/mock/mock-categories";
import {useMainStore} from "../../store/main";


const $s = useMainStore();

const enterCategory = id => {
	$s.activeCategId = id;
}
</script>

<template>
	<div class="board-view grid grid-cols-3 grid-rows-4 gap-10">
		<!-- Your content here -->

		<!-- SPACES -->
		<article
			v-for="c in categories"
			:key="c.id"
			class="bg-white hover:bg-zinc-800 hover:text-zinc-100 text-lg hover:text-2xl rounded-2xl flex justify-center items-center cursor-pointer transition duration-300 p-4"
			@click="enterCategory(c.id)"
		>
			<p class="">{{ c.name }}</p>
		</article>

		<!-- ADD BUTTON -->
		<article
			class="flex justify-center items-center cursor-pointer p-4"
		>
			<button
				class="bg-white flex justify-center items-center rounded-full p-2"
				@click="$s.addItem()"
			>
				<box-icon
					name="plus"
					size="md"
					color="#71717a"
				/>
			</button>
		</article>
	</div>
</template>

<style scoped>

</style>