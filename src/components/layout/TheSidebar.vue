<script setup>

import {TW} from "../../../const/twConst";



const icons = {
	1: "grid-alt",
	2: "search-alt-2",
	3: "list-ul",
}

</script>

<template>
<section class="the-sidebar flex flex-col justify-between py-4">


	<ul class="flex gap-4 flex-col justify-center items-center">

		<li
			v-for="i in Object.entries(icons)"
			:key="i[0]"
			class="p-2 hover:bg-slate-200 cursor-pointer flex justify-center items-center rounded-xl"
			:class="TW.TRANS_1"
		>

			<router-link to="/entities">
				<box-icon
					:name="i[1]"
					size="md"
					color="#71717a"
				/>
			</router-link>

		</li>

	</ul>

	<ul class="flex gap-4 flex-col justify-center items-center">
		<li
			class="p-2 hover:bg-slate-200 cursor-pointer flex justify-center items-center rounded-xl"
			:class="TW.TRANS_1"
		>
			<box-icon
				name="cog"
				size="md"
				color="#71717a"
			/>
		</li>
	</ul>





</section>
</template>

<style scoped>
section {
	z-index: 9999;
}
</style>