<script setup>
import {useMainStore} from "../../../store/main";

const $s = useMainStore();


</script>

<template>
	<form class="text-xl p-4">

		<label class="block mb-4">#{{ $s.itemInForm.id }}</label>

		<div
			v-for="([fieldName, type], i) in Object.entries($s.entityInFormDescription)"
			:key="i"
		>

			<template v-if="type !== 'list'">
				<label class="block">{{ fieldName }}</label>
				<input
					:type="type"
					v-model="$s.itemInForm[fieldName]"
					class="block w-full rounded-lg py-2 px-4 mb-4"
				>
			</template>

			<!--	HIDDEN FOR NOW		-->
<!--			<template v-else>-->
<!--				<label class="block">{{ fieldName }}</label>-->

<!--				<select v-model="$s.itemInForm[fieldName]">-->
<!--					<option-->
<!--						v-for="opt in populateList(currEntityName + '.' + fieldName)"-->
<!--						:key="opt.id"-->
<!--						:value="opt.id"-->
<!--					>-->
<!--						{{ opt.id }} - {{ opt.name }}-->
<!--					</option>-->
<!--				</select>-->
<!--			</template>-->

		</div>



	</form>
</template>

<style scoped>

</style>