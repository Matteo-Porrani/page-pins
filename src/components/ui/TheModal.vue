<script setup>
import {defineProps, onMounted} from "vue";
import {useMainStore} from "../../../store/main";

const $s = useMainStore();

defineProps({
	show: Boolean,
	required: true
});

onMounted(() => {
	console.log("MODAL MOUNTED")
})

const closeModal = () => {
	$s.boardMode = ($s.boardMode === "$search") ? "$view" : $s.boardMode;
	$s.showModal = false;
}
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container bg-slate-100">

        <div class="modal-header">
          <slot name="header"></slot>
        </div>

        <div class="modal-body">
          <slot name="body">default body</slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">

						<button
							class="bg-slate-800 text-white rounded-lg min-w-24 py-2 px-6"
							@click="closeModal"
						>
							OK
						</button>

          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 60vw;
  margin: auto;
  padding: 20px 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header {
  //color: cornflowerblue;
  margin-top: 0;
  text-align: center;
}

.modal-body {
  margin: 20px 0;
}

.modal-footer {
  display: flex;
  justify-content: center;
}
/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>