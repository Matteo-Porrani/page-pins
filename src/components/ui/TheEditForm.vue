<script setup>
import {useMainStore} from "../../../store/main";
import {onMounted} from "vue";

const $s = useMainStore();

onMounted(() => {
	const inputRef = document.getElementById("input_name");
	inputRef.focus();
});
</script>

<template>
	<form class="text-xl p-4">

<!--		<label class="block mb-4">#{{ $s.itemInForm.id }}</label>-->

		<div
			v-for="([fieldName, type], i) in Object.entries($s.entityInFormDescription)"
			:key="i"
		>

			<template
				v-if="type !== 'list' && fieldName !== 'color'"
			>
				<label
					class="block text-sm text-slate-500 mb-2"
				>
					{{ fieldName }}
				</label>
				<input
					:type="type"
					:id="`input_${fieldName}`"
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

<style scoped></style>
