import {useMainStore} from "../../store/main";
import { onKeyStroke, useKeyModifier } from '@vueuse/core';

export function useShortcuts() {
	
	const $s = useMainStore();
	
	// listen to modifier press
	const ctrlPressed = useKeyModifier("Control");
	
	// const toggleSearch = () => {
	// 	$s.boardMode = "$search";
	// 	$s.showModal = true;
	// }

// handler on ESC
	onKeyStroke(["Escape"], (e) => {
		e.preventDefault();
		$s.showModal = false;
		$s.boardMode = "$view";
	});

// handler on key stroke EDIT
	onKeyStroke(["k", "K"], (e) => {
		if (!ctrlPressed.value) return;
		e.preventDefault();
		$s.toggleSearchModal();
	});

// handler on key stroke EDIT
	onKeyStroke(["e", "E"], (e) => {
		if (!ctrlPressed.value) return;
		e.preventDefault();
		$s.boardMode = $s.editModeOn ? "$view" : "$edit";
	});

// handler on key stroke BACK HOME
	onKeyStroke(["d", "D"], (e) => {
		if (!ctrlPressed.value) return;
		e.preventDefault();
		$s.boardMode = "$view";
		$s.resetSelection(true, true);
	});

// handler on key stroke EXIT FOLDER
	onKeyStroke(["r", "R"], (e) => {
		if (!ctrlPressed.value) return;
		e.preventDefault();
		$s.boardMode = "$view";
		$s.resetSelection(false, true);
	});

// handler on key stroke ADD ITEM
	onKeyStroke(["a", "A"], (e) => {
		if (!ctrlPressed.value) return;
		if ($s.showModal) return;
		e.preventDefault();
		$s.addItem();
	});
	
}
