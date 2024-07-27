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
	
	// STATE #############################################################################################################
	
	// initialization of localData.orders
	const orders = reactive({});
	
	const showModal = ref(false);
	const showActionSpace = ref(false);
	const actionSpaceMode = ref(null); // can be '$reorder' or '$transfer'
	const reorderData = reactive({
		currentOrder: null,
		itemsToReorder: null,
		parentEntityName: null,
		parentItemId: null,
	});
	const transferData = reactive({
		parentEntityName: null,
		availableParents: null,
		startParentId: null,
		currentParentId: null,
		itemToTransfer: null,
		entityToTransferName: null
	});
	const boardMode = ref("$view");
	// const categoryToggles = reactive({});
	const activeCategId = ref(null);
	const folderToggles = reactive({});
	
	const itemInForm = ref(null);
	
	
	// GETTERS ###########################################################################################################
	
	// returns boolean
	const editModeOn = computed(() => boardMode.value === "$edit");
	
	// returns 0, 1, 2
	const displayStep = computed(() => {
		if (activeCategId.value) {
			if (activeFolderId.value) {
				return 2;
			}
			return 1
		}
		return 0;
	});
	
	// returns active category object
	const activeCateg = computed(() => {
		return activeCategId.value ?
			localData.value.category.find(fol => parseInt(fol.id) === parseInt(activeCategId.value))
			: null;
	});
	
	// returns active folder id
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
	// returns active folder object (based on folderToggles)
	const activeFolder = computed(() => {
		return activeFolderId.value ?
			localData.value.folder.find(fol => parseInt(fol.id) === parseInt(activeFolderId.value))
			: null;
	});
	
	// criteria to know what item we are creating
	const creationCriteria = computed(() => {
		return {
			categoryId: activeCateg.value ? activeCateg.value.id : null,
			folderId: activeFolder.value ? activeFolder.value.id : null,
		}
	});
	
	// FIXME ????
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
	
	// get description of item
	const entityInFormDescription = ref(null);
	
	
	// ACTIONS ###########################################################################################################
	
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
	
	// const initCategoryToggles = () => {
	// 	localData.value.category.forEach(c => categoryToggles[c.id] = false);
	// 	console.log(categoryToggles);
	// };
	
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
	
	const initFolderToggles = () => {
		localData.value.folder.forEach(f => folderToggles[f.id] = false);
	};
	
	const toggleFolder = id => {
		// no action if edit mode
		if (editModeOn.value) return;
		console.log("%c/toggleFolder/", "background: crimson");
		folderToggles[id] = !folderToggles[id];
		
		Object.keys(folderToggles)
			.filter(key => parseInt(key) !== parseInt(id))
			.forEach(key => folderToggles[key] = false);
		
		// activeFolderId.value = id;
	}
	
	const getChildren = (childEntityName, parentEntityName, parentItemId) => {
		// console.log("%c/getChildren/", "background: teal;");
		// console.log({ childEntityName, parentEntityName, parentItemId })
		
		return localData.value[childEntityName]
			.filter(child => parseInt(child[parentEntityName]) === parseInt(parentItemId));
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
		childEntityItems.sort(function (a, b) {
			return currentOrder.indexOf(a.id) - currentOrder.indexOf(b.id);
		});
		
		return childEntityItems;
	}
	
	
	// ----- CRUD --------------------------------------------------------------------------------------------------------
	
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
			extraProps.forEach(propName => newItem[propName] = propName === "url" ? "?" : "");
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
			console.log("DELETING category");
			
			// delete from orders.category
			console.log("DELETING localData.value.orders.category[", item.id, "]");
			delete localData.value.orders.category[item.id];
			
			// delete from orders.root
			const parentCollection = localData.value.orders.root;
			if (parentCollection) {
				console.log("parent collection", parentCollection);
				
				const idxToRemove = parentCollection.findIndex(el => el === item.id);
				console.log("idx to remove =", idxToRemove);
				
				parentCollection.splice(idxToRemove, 1);
				console.log("parent collection AFTER DELETE", parentCollection);
			}
			
		} else if (entityName === "folder") {
			console.log("DELETING folder ID", item.id);
			// delete from orders.folder
			console.log("DELETING localData.value.orders.folder[", item.id, "]");
			delete localData.value.orders.folder[item.id];
			
			// delete from orders.category
			const parentCollection = localData.value.orders.category[item.category];
			console.log("parent collection is", parentCollection);
			if (parentCollection) {
				const idxToRemove = parentCollection.findIndex(el => el === item.id);
				console.log("idx to remove =", idxToRemove);
				parentCollection.splice(idxToRemove, 1);
			}
			
		} else if (entityName === "link") {
			console.log("DELETING link ID", item.id);
			
			// find parent key
			const parentCollection = localData.value.orders.folder[item.folder];
			console.log("parent collection is", parentCollection);
			if (parentCollection) {
				const idxToRemove = parentCollection.findIndex(el => el === item.id);
				console.log("idx to remove =", idxToRemove);
				parentCollection.splice(idxToRemove, 1);
			}
			
		}
		
		// DELETION OF ACTUAL ITEM OBJECT
		const idxToRemove = localData.value[entityName].findIndex(el => parseInt(el.id) === parseInt(item.id));
		localData.value[entityName].splice(idxToRemove, 1);
		
		console.log(entityName, "with ID", item.id, "REMOVED")
	}
	
	// FIXME -- same as deleteItem() mais more DRY
	const removeItem = (entityName, item) => {
		// get parent entity name
		const entities = ["root", "category", "folder", "link"];
		const childIdx = entities.findIndex(el => el === entityName);
		const parentEntityName = entities[childIdx - 1];
		let parentCollection;
		
		// DELETION IN 'orders'
		if (["category", "folder"].includes(entityName)) {
			// additional step
			delete localData.value.orders[entityName][item.id];
			// 						'category'
			// 						'folder'
		}
		
		// get parent collection
		if (entityName === "category") {
			parentCollection = localData.value.orders[parentEntityName];
		} else {
			parentCollection = localData.value.orders[parentEntityName][item[parentEntityName]];
		}
		
		// remove item id from parent collection
		const idxToRemoveInOrders = parentCollection.findIndex(el => el === item.id);
		parentCollection.splice(idxToRemoveInOrders, 1);
		
		// DELETION OF ACTUAL ITEM OBJECT
		const idxToRemove = localData.value[entityName].findIndex(el => parseInt(el.id) === parseInt(item.id));
		localData.value[entityName].splice(idxToRemove, 1);
		
		console.log(entityName, "with ID", item.id, "REMOVED")
	}
	
	// ----- REORDERING --------------------------------------------------------------------------------------------------
	
	const reorderTriggeredBy = (entityName, item) => {
		console.log("%c/reorderTriggeredBy/", "background: hotpink");
		console.log({entityName, item});
		
		const entities = [null, "category", "folder", "link"];
		const childEntityIdx = entities.findIndex(e => e === entityName);
		const parentEntityName = entities[childEntityIdx - 1];
		
		console.log("parentEntityName", parentEntityName);
		
		if (parentEntityName) {
			// FOLDERS or LINKS
			const parentItemId = item[parentEntityName];
			// find the current order
			const currentOrder = [...localData.value.orders[parentEntityName][parentItemId]]
			// find all the items
			const itemsToReorder = [...getChildren(entityName, parentEntityName, parentItemId)];
			// sort 'itemsToReorder' following currOrder
			itemsToReorder.sort(function (a, b) {
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
			// find all the items
			const itemsToReorder = [...localData.value.category];
			// sort 'itemsToReorder' following currOrder
			itemsToReorder.sort(function (a, b) {
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
	
	// ----- TRANSFERT ---------------------------------------------------------------------------------------------------
	
	const transferTriggeredBy = (entityName, item) => {
		console.log("%c/transferTriggeredBy/", "background: purple");
		
		const entities = [null, "category", "folder", "link"];
		const childEntityIdx = entities.findIndex(e => e === entityName);
		const parentEntityName = entities[childEntityIdx - 1];
		
		console.log("parentEntityName", parentEntityName);
		
		// retrieve all items of parent entity
		const availableParents = [...localData.value[parentEntityName]];
		availableParents.sort((a, b) => a.name - b.name);
		
		transferData.availableParents = availableParents;
		transferData.startParentId = item[parentEntityName];
		transferData.currentParentId = item[parentEntityName];
		transferData.parentEntityName = parentEntityName;
		transferData.itemToTransfer = item;
		transferData.entityToTransferName = entityName;
		
	}
	
	
	const executeTransfer = () => {
		// ONLY FOR FOLDERS & LINKS
		console.log("%c/executeTransfer/", "background: crimson");
		
		const {startParentId, currentParentId, parentEntityName, itemToTransfer, entityToTransferName} = transferData;
		
		console.log({startParentId, currentParentId, parentEntityName, itemToTransfer, entityToTransferName});
		
		// remove id from startParent collection
		const startParentCollection = localData.value.orders[parentEntityName][startParentId];
		const idxToRemove = startParentCollection.findIndex(el => el === itemToTransfer.id);
		console.log("idxToRemove", idxToRemove);
		startParentCollection.splice(idxToRemove, 1);
		
		// push id to currentParent collection
		const newParentCollection = localData.value.orders[parentEntityName][currentParentId];
		newParentCollection.push(itemToTransfer.id);
		
		// change item ref to parent
		const idxToUpdate = localData.value[entityToTransferName].findIndex(el => el.id === itemToTransfer.id);
		
		localData.value[entityToTransferName][idxToUpdate][parentEntityName] = currentParentId;
		
		console.log("updated object", localData.value[entityToTransferName][idxToUpdate]);
		
		console.log("...transfer DONE");
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
	
	
	return {
		localData,
		showModal,
		showActionSpace,
		actionSpaceMode,
		reorderData,
		transferData,
		boardMode,
		// categoryToggles,
		folderToggles,
		activeCategId,
		activeFolderId,
		itemInForm,
		
		editModeOn,
		activeCateg,
		activeFolder,
		displayStep,
		categoryContentItems,
		folderContentItems,
		creationCriteria,
		entityInFormDescription,
		
		initOrders,
		// initCategoryToggles,
		// toggleCategory,
		initFolderToggles,
		toggleFolder,
		getChildren,
		getOrderedChildren,
		
		addItem,
		editItem,
		deleteItem,
		
		reorderTriggeredBy,
		updateOrder,
		transferTriggeredBy,
		executeTransfer,
	}
});
