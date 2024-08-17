import {ref} from "vue";
import {useRouter} from "vue-router";
import {useMainStore} from "../../store/main";


export function useAppMenu() {
	
	/**
	 * router & store must be defined INSIDE the function
	 */
	const $router = useRouter();
	const $s = useMainStore();
	
	const menu = ref();
	
	const menuActions = ref({
		openAlpha: () => $router.push("/alpha"),
		openBoard: () => {
			$s.resetSelection(true, true);
			$s.showIE = false;
			$s.boardMode = "$view";
			$router.push("/");
		},
		openOrganizer: () => $router.push("/organizer"),
		openIE: () => {
			console.log("open IE");
			$s.boardMode = "$ie";
			$s.showIE = true;
			$s.activeCategId = null;
			// $s.initFolderToggles();
			$s.activeFolderId = null;
			$router.push("/");
		},
		showInfoShortcuts: () => {
			$s.showInfoModal = true;
			$s.infoModalTheme = "$keymap";
		},
		showInfoAbout: () => {
			$s.showInfoModal = true;
			$s.infoModalTheme = "$about";
		}
	})
	const menuItems = [
		[1, "Board", "pi-th-large", "openBoard"],
		[2, "Import / Export", "pi-database", "openIE"],
		// [3, "Organizer (Beta)", "pi-database", "openOrganizer"],
		[4, "Shortcuts", "pi-book", "showInfoShortcuts"],
		[10, "About", "pi-user", "showInfoAbout"],
		// [99, "Alpha", "pi-globe", "openAlpha"],
	];
	
	const menuOptions = menuItems.map(item => ({
		id: item[0],
		label: item[1],
		icon: `pi ${item[2]}`,
		command: menuActions.value[item[3]],
	}));
	
	const toggleMenu = (event) => menu.value.toggle(event);
	
	return { menu, menuOptions, toggleMenu };
}

