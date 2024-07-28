<script setup>
import {computed} from "vue";
import {useMainStore} from "../../store/main";
import LinkItem from "@/components/LinkItem.vue";

const $s = useMainStore();


const orderedChildren = computed(() => {
	return $s.getOrderedChildren('link', 'folder', $s.activeFolderId);
});

</script>

<template>
	<!-- EXTERNAL WRAPPER -->
	<section class="the-subspace grid overflow-y-hidden grid-rows-1">

		<!-- DRAWER -->
		<div
			class="drawer relative grid grid-rows-1 bg-white-100 rounded-lg transition duration-500 p-4"
			:class="{
							'opacity-0 translate-y-1/2' : Object.values($s.folderToggles).every(v => !v),
							'bg-white translate-y-0 opacity-1' : Object.values($s.folderToggles).some(v => v)
						}"
		>

			<!-- message if no content -->
			<p
				v-if="!orderedChildren || orderedChildren.length < 1"
				class="absolute top-[50%] -translate-y-1/2 w-full text-center text-slate-400 text-xl"
			>
				CTRL + A to add the first link
			</p>

			<div class="drawer-body overflow-y-scroll">
				<!-- LINKS -->
				<ul class="flex flex-col gap-4 pt-2">
					<li
						v-for="l in $s.getOrderedChildren('link', 'folder', $s.activeFolderId)"
						:key="l.id"
					>
						<LinkItem :link="l" />
					</li>
				</ul>
			</div>

		</div>

	</section>
</template>

<style scoped>
.the-subspace {
	height: 88vh;
}

/*.drawer-body {
	border: 4px solid green;
	overflow-y: scroll;
}*/
</style>
