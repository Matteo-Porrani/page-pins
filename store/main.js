import {defineStore} from "pinia";
import {ref, computed, reactive} from 'vue';
import {useLocalStorage} from "@vueuse/core/index";
import {localDataDefaults} from "../data/localDataDefaults";

export const useMainStore = defineStore('counter', () => {
	
	// access to localStorage
	const localData = useLocalStorage(
		'storage_test_1',
		localDataDefaults //
	);
	
	
	// STATE
	const showModal = ref(false);
	
	
	const categoryToggles = reactive({});
	
	const activeFolderId = ref(null);
	
	
	const count = ref(10);
	const doubleCount = computed(() => count.value * 2);
	const increment = () => {
		count.value++;
	}
	
	
	// GETTERS
	
	const displayStep = computed(() => {
		if (activeCateg.value) {
			if (activeFolderId.value) {
				return 2;
			}
			return 1
		}
		return 0;
	});
	
	const activeCateg = computed(() => {
		if (Object.values(categoryToggles).some(v => v)) { // one category selected
			const activeId = Object.entries(categoryToggles).filter(e => e[1])[0][0];
			return localData.value.category.find(cat => parseInt(cat.id) === parseInt(activeId)); // return the whole category object
		}
		return null;
	});
	
	const activeFolder = computed(() => {
		return activeFolderId.value ?
			localData.value.folder.find(fol => parseInt(fol.id) === parseInt(activeFolderId.value))
			: null;
	});
	
	const categoryContentItems = computed(() => {
		console.log("categoryContentItems", activeCateg.value);
		
		return activeCateg.value
			? getChildren("folder", "category", activeCateg.value.id)
			: []
		;
	});
	
	
	const folderContentItems = computed(() => {
		return activeFolder.value
			? getChildren("link", "folder", activeFolder.value.id)
			: []
		;
	});
	
	// ACTIONS
	
	
	const initCategoryToggles = () => {
		localData.value.category.forEach(c => categoryToggles[c.id] = false);
		console.log(categoryToggles);
	};
	
	const toggleCategory = id => {
		console.log("%c/toggleCategory/", "background: orange");
		categoryToggles[id] = !categoryToggles[id];
		
		Object.keys(categoryToggles)
			.filter(key => parseInt(key) !== parseInt(id))
			.forEach(key => categoryToggles[key] = false);
		
		activeFolderId.value = null;
	}
	
	const getChildren = (childEntityName, parentEntityName, parentItemId) => {
		console.log("%c/getChildren/", "background: lime;");
		
		console.log({ childEntityName, parentEntityName, parentItemId })
		
		const childEntityItems = localData.value[childEntityName]
			.filter(child => parseInt(child[parentEntityName]) === parseInt(parentItemId));
		return childEntityItems;
	}
	
	
	
	return {
		localData,
		showModal,
		categoryToggles,
		activeFolderId,
		count,
		
		doubleCount,
		activeCateg,
		activeFolder,
		displayStep,
		categoryContentItems,
		folderContentItems,
		
		increment,
		initCategoryToggles,
		toggleCategory,
		getChildren,
	}
});
