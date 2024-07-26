import {defineStore} from "pinia";
import {ref, computed, reactive} from 'vue';
import {useLocalStorage} from "@vueuse/core/index";
import {localDataDefaults} from "../data/localDataDefaults";
import {modelDesc} from "../const/modelDesc";

export const useMainStore = defineStore('counter', () => {
	
	// access to localStorage
	const localData = useLocalStorage(
		'storage_test_1',
		localDataDefaults //
	);
	
	
	// STATE
	const showModal = ref(false);
	
	const boardMode = ref("$view");
	
	const categoryToggles = reactive({});
	
	const folderToggles = reactive({});
	
	const activeCategId = ref(null);
	const activeFolderId = ref(null);
	
	
	const count = ref(10);
	const doubleCount = computed(() => count.value * 2);
	const increment = () => {
		count.value++;
	}
	
	
	const itemInForm = ref(null);
	
	
	// GETTERS
	
	const editModeOn = computed(() => boardMode.value === "$edit");
	
	const displayStep = computed(() => {
		if (activeCategId.value) {
			if (activeFolderId.value) {
				return 2;
			}
			return 1
		}
		return 0;
	});
	
	// const activeCateg = computed(() => {
	// 	if (Object.values(categoryToggles).some(v => v)) { // one category selected
	// 		const activeId = Object.entries(categoryToggles).filter(e => e[1])[0][0];
	// 		return localData.value.category.find(cat => parseInt(cat.id) === parseInt(activeId)); // return the whole category object
	// 	}
	// 	return null;
	// });
	
	const activeCateg = computed(() => {
		return activeCategId.value ?
			localData.value.category.find(fol => parseInt(fol.id) === parseInt(activeCategId.value))
			: null;
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
	
	const creationCriteria = computed(() => {
		return {
			categoryId: activeCateg.value ? activeCateg.value.id : null,
			folderId: activeFolder.value ? activeFolder.value.id : null,
		}
	});
	
	
	
	const entityInFormDescription = ref(null);
	
	// FIXME -- should be a computed !!!!!
	// const entityInFormDescription = computed(() => {
	// 	const entityName = {
	// 		0: "category",
	// 		1: "folder",
	// 		2: "link",
	// 	}[displayStep.value];
	//
	// 	return modelDesc[entityName];
	// });
	
	// ACTIONS
	
	
	const initCategoryToggles = () => {
		localData.value.category.forEach(c => categoryToggles[c.id] = false);
		console.log(categoryToggles);
	};
	
	const initFolderToggles = () => {
		localData.value.folder.forEach(f => folderToggles[f.id] = false);
	};
	
	const toggleCategory = id => {
		// no action if edit mode
		if (editModeOn.value) return;
		console.log("%c/toggleCategory/", "background: crimson");
		categoryToggles[id] = !categoryToggles[id];
		
		Object.keys(categoryToggles)
			.filter(key => parseInt(key) !== parseInt(id))
			.forEach(key => categoryToggles[key] = false);
		
		activeFolderId.value = null;
	}
	
	const toggleFolder = id => {
		// no action if edit mode
		if (editModeOn.value) return;
		console.log("%c/toggleFolder/", "background: crimson");
		folderToggles[id] = !folderToggles[id];
		
		Object.keys(folderToggles)
			.filter(key => parseInt(key) !== parseInt(id))
			.forEach(key => categoryToggles[key] = false);
		
		activeFolderId.value = id;
	}
	
	const getChildren = (childEntityName, parentEntityName, parentItemId) => {
		// console.log("%c/getChildren/", "background: teal;");
		// console.log({ childEntityName, parentEntityName, parentItemId })
		
		const childEntityItems = localData.value[childEntityName]
			.filter(child => parseInt(child[parentEntityName]) === parseInt(parentItemId));
		return childEntityItems;
	}
	
	
	const addItem = () => {
		console.log("%c/addItem/", "background: crimson;")
		const entityName = {
			0: "category",
			1: "folder",
			2: "link",
		}[displayStep.value];
		const maxId = localData.value[entityName].map(item => item.id).sort((a, b) => a - b).reverse()[0];
		const nextId = maxId + 1;
		const entityDesc = modelDesc[entityName];

		entityInFormDescription.value = modelDesc[entityName];
		
		const extraProps = Object.keys(entityDesc)
			.filter(propName => !["id", "name"].includes(propName));
		
		// create new item with base properties
		const newItem = {
			id: nextId,
			name: "new " + entityName + " " + nextId
		}
		
		// add default value to extra props
		if (extraProps.length > 0) {
			extraProps.forEach(propName => newItem[propName] = "");
		}
		
		if (creationCriteria.value.categoryId) newItem.category = creationCriteria.value.categoryId;
		if (creationCriteria.value.folderId) newItem.folder = creationCriteria.value.folderId;
		
		// push new entity
		localData.value[entityName].push(newItem);
		itemInForm.value = newItem;
		showModal.value = true;
	}
	
	// FIXME -- DEPRECATED
	// const editEntity = () => {
	// 	console.log("%c/editEntity/", "background: #916");
	//
	// 	const entityName = {
	// 		1: "category",
	// 		2: "folder",
	// 	}[displayStep.value];
	//
	// 	console.log("a", entityName);
	//
	// 	entityInFormDescription.value = modelDesc[entityName];
	//
	// 	const idToEdit = {
	// 		1: activeCateg.value ? activeCateg.value.id : null,
	// 		2: activeFolder.value ? activeFolder.value.id : null,
	// 	}[displayStep.value];
	//
	// 	console.log("b", idToEdit);
	//
	// 	const entityToEdit = localData.value[entityName].find(item => parseInt(item.id) === parseInt(idToEdit));
  //   itemInForm.value = entityToEdit;
  //   showModal.value = true;
	//
	// }
	
	const editItem = (entityName, item) => {
		console.log("%c/editItem/", "background: blue");
		console.log(entityName, item);
		
		entityInFormDescription.value = modelDesc[entityName];
		itemInForm.value = localData.value[entityName].find(el => parseInt(el.id) === parseInt(item.id));
		showModal.value = true;
	}
	
	const deleteItem = (entityName, item) => {
		console.log("%c/deleteItem/", "background: blue");
		console.log(entityName, item);
		
		const idxToRemove = localData.value[entityName].findIndex(el => parseInt(el.id) === parseInt(item.id));
		localData.value[entityName].splice(idxToRemove, 1);
		
		console.log("REMOVED")
	}
	
	
	return {
		localData,
		showModal,
		boardMode,
		categoryToggles,
		folderToggles,
		activeCategId,
		activeFolderId,
		count,
		itemInForm,
		
		doubleCount,
		editModeOn,
		activeCateg,
		activeFolder,
		displayStep,
		categoryContentItems,
		folderContentItems,
		creationCriteria,
		entityInFormDescription,
		
		increment,
		initCategoryToggles,
		initFolderToggles,
		toggleCategory,
		toggleFolder,
		getChildren,
		addItem,
		// editEntity,
		editItem,
		deleteItem,
	}
});
