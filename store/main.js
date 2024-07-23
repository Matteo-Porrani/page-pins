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
	
	const categoryToggles = reactive({});
	
	const activeFolderId = ref(null);
	
	
	const count = ref(10);
	const doubleCount = computed(() => count.value * 2);
	const increment = () => {
		count.value++;
	}
	
	
	// GETTERS
	
	const activeCateg = computed(() => {
		if (Object.values(categoryToggles).some(v => v)) { // one category selected
			const activeId = Object.entries(categoryToggles).filter(e => e[1])[0][0];
			return localData.value.category.find(cat => parseInt(cat.id) === parseInt(activeId)); // return the whole category object
		}
		return null;
	})
	
	const categoryContentItems = computed(() => {
		console.log("categoryContentItems", activeCateg.value);
		
		return activeCateg.value
			? getChildren("folder", "category", activeCateg.value.id)
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
		categoryToggles,
		activeFolderId,
		count,
		
		doubleCount,
		activeCateg,
		categoryContentItems,
		
		increment,
		initCategoryToggles,
		toggleCategory,
		getChildren,
	}
});
