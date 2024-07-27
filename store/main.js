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
	const showReorder = ref(false);
	
	const reorderData = reactive({
		currentOrder: null,
		itemsToReorder: null,
		parentEntityName: null,
		parentItemId: null,
	});
	
	const boardMode = ref("$view");
	
	const categoryToggles = reactive({});
	
	const folderToggles = reactive({});
	
	const activeCategId = ref(null);
	// const activeFolderId = ref(null);
	
	const orders = reactive({});

	
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
	
	const activeFolderId = computed(() => {
		const entries = Object.entries(folderToggles);
		
		if (entries.length > 0) {
			const active = entries.filter(e => e[1]);
			
			if (active.length > 0) {
				return active[0][0];
			}
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
	
	// init the 'orders' key in localData if NEVER DONE BEFORE
	const initOrders = () => {
		
		if (localData.value.orders) return;
		
		// root
		orders.root = localData.value.category.map(c => c.id);
		// category
		orders.category = localData.value.category.reduce((a, c) => {
			const children = getChildren('folder', 'category', c.id);
			a[c.id] = children.map(c => c.id);
			return a;
		}, {});
		// folder
		orders.folder = localData.value.folder.reduce((a, f) => {
			const children = getChildren('link', 'folder', f.id);
			a[f.id] = children.map(c => c.id);
			return a;
		}, {});
		
		console.log("orders", orders);
		
		localData.value.orders = orders;
	}
	
	const initCategoryToggles = () => {
		localData.value.category.forEach(c => categoryToggles[c.id] = false);
		console.log(categoryToggles);
	};
	
	const initFolderToggles = () => {
		localData.value.folder.forEach(f => folderToggles[f.id] = false);
	};
	
	// const toggleCategory = id => {
	// 	// no action if edit mode
	// 	if (editModeOn.value) return;
	// 	console.log("%c/toggleCategory/", "background: crimson");
	// 	categoryToggles[id] = !categoryToggles[id];
	//
	// 	Object.keys(categoryToggles)
	// 		.filter(key => parseInt(key) !== parseInt(id))
	// 		.forEach(key => categoryToggles[key] = false);
	//
	// 	activeFolderId.value = null;
	// }
	
	const toggleFolder = id => {
		// no action if edit mode
		if (editModeOn.value) return;
		console.log("%c/toggleFolder/", "background: crimson");
		folderToggles[id] = !folderToggles[id];
		
		Object.keys(folderToggles)
			.filter(key => parseInt(key) !== parseInt(id))
			.forEach(key => categoryToggles[key] = false);
		
		// activeFolderId.value = id;
	}
	
	const getChildren = (childEntityName, parentEntityName, parentItemId) => {
		// console.log("%c/getChildren/", "background: teal;");
		// console.log({ childEntityName, parentEntityName, parentItemId })
		
		const childEntityItems = localData.value[childEntityName]
			.filter(child => parseInt(child[parentEntityName]) === parseInt(parentItemId));
		return childEntityItems;
	}
	
	
	const getOrderedChildren = (childEntityName, parentEntityName, parentItemId) => {
		// console.log("%c/getOrderedChildren/", "background: salmon;");
		// console.log({ childEntityName, parentEntityName, parentItemId })
		
		if (!parentItemId) {
			console.log("NO PARENT ID");
			return;
		}
		
		const childEntityItems = localData.value[childEntityName]
			.filter(child => parseInt(child[parentEntityName]) === parseInt(parentItemId));
		
		// console.log("🟠", localData.value.orders[parentEntityName][parentItemId])
		
		const currentOrder = [...localData.value.orders[parentEntityName][parentItemId]];
		console.log("currentOrder", currentOrder);
		
		childEntityItems.sort(function(a, b) {
			return currentOrder.indexOf(a.id) - currentOrder.indexOf(b.id);
		});
		
		return childEntityItems;
	}
	
	
	
	// const itemHasChildren = (entityName, itemId) => {
	// 	console.log("itemHasChildren");
	//
	// 	const childrenEntity = {
	// 		category: "folder",
	// 		folder: "link",
	// 		link: null,
	// 	}[entityName];
	//
	// 	if (!childrenEntity) return false;
	//
	// 	const children = getChildren(childrenEntity, entityName, itemId);
	// 	return children.length > 0;
	// }
	

	
	
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
		
		// push new entity id in the 'orders' prop of localData
		
		const entities = [null, "category", "folder", "link"];
		const childEntityIdx = entities.findIndex(e => e === entityName);
		const parentEntityName = entities[childEntityIdx - 1];
		
		if (entityName === "category") {
			// we are creating a category
			console.log("creating a CATEGORY");
			console.log("pushing ID", newItem.id);
			// push id at root level
			localData.value.orders.root.push(newItem.id);
			// create order key for folders in this category
			localData.value.orders.category[newItem.id] = []; // no children so far
			
		} else if (entityName === "folder") {
			// we are adding a folder
			console.log("creating a FOLDER");
			console.log("pushing ID", newItem.id);
			localData.value.orders.category[newItem.category].push(newItem.id);
			// create order key for links in this folder
			localData.value.orders.folder[newItem.id] = []; // no children so far
			
		} else if (entityName === "link") {
			// we are creating a link
			console.log("creating a LINK");
			console.log("pushing ID", newItem.id);
			localData.value.orders.folder[newItem.folder].push(newItem.id);
			
		}
		
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
		
		
		// removing corresponding orders key
		
		if (entityName === "category") {

			const parentCollection = localData.value.orders.root;
			console.log("DELETING category", "parent collection is", parentCollection);
			if (parentCollection) {
				const idxToRemove = parentCollection.findIndex(el => el.id === item.id);
				parentCollection.splice(idxToRemove, 1);
			}
			
			
		} else if (entityName === "folder") {
			// find parent key
			const parentCollection = localData.value.orders.category[item.category];
			console.log("DELETING folder", "parent collection is", parentCollection);
			if (parentCollection) {
				const idxToRemove = parentCollection.findIndex(el => el.id === item.id);
				parentCollection.splice(idxToRemove, 1);
			}
		
		} else if (entityName === "link") {
			// find parent key
			const parentCollection = localData.value.orders.folder[item.folder];
			console.log("DELETING link", "parent collection is", parentCollection);
			if (parentCollection) {
				const idxToRemove = parentCollection.findIndex(el => el.id === item.id);
				parentCollection.splice(idxToRemove, 1);
			}
		
		}
		
		
		const idxToRemove = localData.value[entityName].findIndex(el => parseInt(el.id) === parseInt(item.id));
		localData.value[entityName].splice(idxToRemove, 1);

		
		
		
		
		
		console.log("REMOVED")
	}
	
	
	const reorderTriggeredBy = (entityName, item) => {
		
		console.log("%c/reorderTriggeredBy/", "color: teal, font-weight: 900");
		console.log({entityName, item});
		
		const entities = [null, "category", "folder", "link"];
		const childEntityIdx = entities.findIndex(e => e === entityName);
		const parentEntityName = entities[childEntityIdx - 1];
		
		console.log("parentEntityName", parentEntityName);
		
		if (parentEntityName) {
			// FOLDERS or LINKS
			
			const parentItemId = item[parentEntityName];
			console.log("parentItemId", parentItemId);
			
			// find the current order
			const currentOrder = [...localData.value.orders[parentEntityName][parentItemId]]
			console.log("currentOrder", currentOrder);
			
			// find all the items
			const itemsToReorder = [...getChildren(entityName, parentEntityName, parentItemId)];
			console.log("itemsToReorder", itemsToReorder)
			
			// sort 'itemsToReorder' following currOrder
			itemsToReorder.sort(function(a, b) {
				return currentOrder.indexOf(a.id) - currentOrder.indexOf(b.id);
			});
			
			// prepare data for sorting
			reorderData.currentOrder = currentOrder;
			reorderData.itemsToReorder = itemsToReorder;
			reorderData.parentEntityName = parentEntityName;
			reorderData.parentItemId = parentItemId;
			
		} else {
			
			// find the current order
			const currentOrder = [...localData.value.orders.root];
			console.log("currentOrder", currentOrder);
			
			// find all the items
			const itemsToReorder = [...localData.value.category];
			console.log("itemsToReorder", itemsToReorder)
			
			// sort 'itemsToReorder' following currOrder
			itemsToReorder.sort(function(a, b) {
				return currentOrder.indexOf(a.id) - currentOrder.indexOf(b.id);
			});
			
			
			// prepare data for sorting
			reorderData.currentOrder = currentOrder;
			reorderData.itemsToReorder = itemsToReorder;
			reorderData.parentEntityName = parentEntityName;
			reorderData.parentItemId = null;
			
		}
		

		
		
		
		
	};
	
	const updateOrder = () => {
		console.log("%c/updateOrder/", "color: teal, font-weight: 900");
		console.log(`updating for ${reorderData.parentEntityName} with ID ${reorderData.parentItemId}`);
		
		const newOrder = reorderData.itemsToReorder.map(it => it.id);
		console.log("newOrder", newOrder);
		
		if (reorderData.parentItemId) {
			// FOLDERS or LINKS
			localData.value.orders[reorderData.parentEntityName][reorderData.parentItemId] = [...newOrder];
		} else {
			// CATEGORY
			localData.value.orders.root = [...newOrder];
		}
	}
	
	
	return {
		localData,
		showModal,
		showReorder,
		reorderData,
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
		initOrders,
		initCategoryToggles,
		initFolderToggles,
		// toggleCategory,
		toggleFolder,
		getChildren,
		getOrderedChildren,
		// itemHasChildren,
		addItem,
		// editEntity,
		editItem,
		deleteItem,
		reorderTriggeredBy,
		updateOrder,
	}
});
