import {defineStore} from "pinia";
import {ref, computed, reactive} from 'vue';
import {useLocalStorage} from "@vueuse/core/index";
// data defaults and description
import {localDataDefaults} from "../data/localDataDefaults";
import {modelDesc} from "../const/modelDesc";
import {getLinkedEntityName} from "@/utils/utils";

export const useMainStore = defineStore('counter', () => {
	
	const localData = useLocalStorage(
		'pp_data',
		localDataDefaults
	);
	
	// inject uploaded data
	const injectData = newData => {
		// reset localData
		localData.value = null;
		// inject new data
		localData.value = newData;
	};
	
	// STATE #############################################################################################################
	
	// ----- UI state
	const boardMode = ref("$view");
	
	const showModal = ref(false);
	const showInfoModal = ref(false);
	const infoModalTheme = ref(null);
	
	// FIXME -- IE should have its own route / view
	const showIE = ref(false);
	
	const showActionSpace = ref(false);
	const actionSpaceMode = ref(null); // '$reorder' | '$transfer' | '$colorize'
	
	
	// ----- computational state
	const activeCategId = ref(null);
	// const folderToggles = reactive({});
	const activeFolderId = ref(null);
	const lastActiveFolderId = ref(null);
	
	const itemInForm = ref(null);
	const entityInFormDescription = ref(null);
	
	// reorder / transfer / colorize
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
	});
	
	const colorizeData = reactive({
		itemEntityName: null,
		itemToColorize: null,
		currColorId: null
	});
	
	
	// GETTERS ###########################################################################################################
	
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
	
	// returns boolean
	const editModeOn = computed(() => boardMode.value === "$edit");
	
	// returns active category object
	const activeCategory = computed(() => {
		return activeCategId.value
			? localData.value.category.find(cat => parseInt(cat.id) === parseInt(activeCategId.value))
			: null
		;
	});
	
	// returns active folder object (based on folderToggles)
	const activeFolder = computed(() => {
		return activeFolderId.value
			? localData.value.folder.find(fol => parseInt(fol.id) === parseInt(activeFolderId.value))
			: null
		;
	});
	
	// criteria to know what item we are creating
	const creationCriteria = computed(() => {
		return {
			categoryId: activeCategory.value ? activeCategory.value.id : null,
			folderId: activeFolder.value ? activeFolder.value.id : null,
		}
	});
	
	// data as tree nodes
	
	// UTILITY 1
	const makeNode = (keyPrefix, keyIdx, label, iconName, selectable, children = [], data = null) => {
		return {
			key: `${keyPrefix}-${keyIdx}`,
			label,
			icon: `pi pi-fw ${iconName}`,
			data: data ?? "",
			selectable,
			children,
		}
	};
	
	// UTILITY 2
	const parseChildren = (parentEntityName, parentId, innerChildren = []) => {
		
		const {tgt, prefix, icon, selectable} = {
			category: {tgt: "folder", prefix: "F", icon: "pi-folder", selectable: false},
			folder: {tgt: "link", prefix: "L", icon: "pi-link", selectable: true},
		}[parentEntityName];
		
		if (localData.value.orders[parentEntityName][parentId]) {
			return localData.value.orders[parentEntityName][parentId].map(id => {
				// recursive call to parse children for folders
				if (parentEntityName === "category") innerChildren = parseChildren("folder", id);
				return makeNode(prefix, id, getItemNameById(tgt, id), icon, selectable, innerChildren);
			});
		}
		
		return [];
	}
	
	// PARSE METHOD
	const getDataAsTreeNodes = computed(() => {
		if (localData.value.category) {
			return localData.value.category.map(c => makeNode(
				"C",
				c.id,
				c.name,
				"pi-inbox",
				false,
				parseChildren("category", c.id)
			));
		}
		
		return [];
	});
	
	

	
	
	// ACTIONS ###########################################################################################################
	
	const getItemNameById = (entityName, itemId) => {
		const el = localData.value[entityName].find(el => el.id === itemId);
		return el ? el.name : "";
	};
	
	// init the 'orders' key in localData if NEVER DONE BEFORE
	const initOrders = () => {
		// if 'orders' key already exists, no action
		if (localData.value.orders) return;
		
		const orders = {};
		
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
		
		localData.value.orders = orders;
	}
	
	const resetSelection = (category, folder) => {
		if (category) activeCategId.value = null;
		if (folder) activeFolderId.value = null;
	};
	
	const getChildren = (childEntityName, parentEntityName, parentItemId) => {
		return localData.value[childEntityName]
			.filter(child => parseInt(child[parentEntityName]) === parseInt(parentItemId));
	}
	
	const getOrderedChildren = (childEntityName, parentEntityName, parentItemId) => {
		if (!parentItemId) return;
		
		const childEntityItems = localData.value[childEntityName]
			.filter(child => parseInt(child[parentEntityName]) === parseInt(parentItemId));
		
		const currentOrder = [...localData.value.orders[parentEntityName][parentItemId]];
		childEntityItems.sort(function (a, b) {
			return currentOrder.indexOf(a.id) - currentOrder.indexOf(b.id);
		});
		
		return childEntityItems;
	}
	
	
	// ----- CRUD --------------------------------------------------------------------------------------------------------
	
	const addItem = (cloned = null) => {
		// console.log("%c/addItem/", "background: gold");
		
		// get entity name based on display step
		const entityName = {
			0: "category",
			1: "folder",
			2: "link",
		}[displayStep.value];
		
		// FIXME **** make incrementation global
		const maxId = localData.value[entityName].map(item => item.id).sort((a, b) => a - b).reverse()[0];
		const nextId = maxId + 1;
		
		// get entity description
		const entityDesc = modelDesc[entityName];
		
		entityInFormDescription.value = modelDesc[entityName];
		
		const extraProps = Object.keys(entityDesc)
			.filter(propName => !["id", "name", "color"].includes(propName));
		
		// create new item with base properties
		const newItem = {
			id: nextId,
			name: `${entityName}-${nextId}`,
			color: 0
		}
		
		// cloning is only for links so far
		if (cloned) newItem.name = cloned.name + " copy";
		
		// add default value to extra props
		if (extraProps.length > 0) {
			extraProps.forEach(propName => {
				if (cloned) {
					// cloning is only for links so far
					newItem[propName] = cloned[propName];
				} else {
					newItem[propName] = propName === "url" ? "?" : "";
				}
			});
		}
		
		// create 'category' key
		if (creationCriteria.value.categoryId) newItem.category = creationCriteria.value.categoryId;
		// create 'folder' key
		if (creationCriteria.value.folderId) newItem.folder = creationCriteria.value.folderId;
		
		// push new entity
		localData.value[entityName].push(newItem);
		
		// push new entity ID in the 'orders' prop of localData
		if (entityName === "category") {
			// we are creating a category
			// push id at root level
			localData.value.orders.root.push(newItem.id);
			// create order key for folders in this category
			localData.value.orders.category[newItem.id] = []; // no children so far
			
		} else if (entityName === "folder") {
			// we are adding a folder
			localData.value.orders.category[newItem.category].push(newItem.id);
			// create order key for links in this folder
			localData.value.orders.folder[newItem.id] = []; // no children so far
			
		} else if (entityName === "link") {
			// we are creating a link
			localData.value.orders.folder[newItem.folder].push(newItem.id);
		}
		
		itemInForm.value = newItem;
		// boardMode.value = "$edit";
		showModal.value = true;
	}
	
	const editItem = (entityName, item) => {
		entityInFormDescription.value = modelDesc[entityName];
		itemInForm.value = localData.value[entityName].find(el => parseInt(el.id) === parseInt(item.id));
		showModal.value = true;
	}
	
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
		}
		
		// get parent collection
		if (entityName === "category") {
			parentCollection = localData.value.orders[parentEntityName];
		} else {
			parentCollection = localData.value.orders[parentEntityName][item[parentEntityName]];
		}
		
		// REMOVAL OF ITEM ID FROM PARENT COLLECTION
		const idxToRemoveInOrders = parentCollection.findIndex(el => el === item.id);
		parentCollection.splice(idxToRemoveInOrders, 1);
		
		// REMOVAL OF ACTUAL ITEM OBJECT
		const idxToRemove = localData.value[entityName].findIndex(el => parseInt(el.id) === parseInt(item.id));
		localData.value[entityName].splice(idxToRemove, 1);
		
		// console.log(entityName, "with ID", item.id, "REMOVED");
		
		if (entityName === "link" && parentCollection.length < 1) {
			// exit current folder
			resetSelection(false, true);
			// go back to $view mode
			boardMode.value = "$view";
		}
	}
	
	// ----- REORDERING --------------------------------------------------------------------------------------------------
	
	const reorderTriggeredBy = (entityName, item) => {
		lastActiveFolderId.value = activeFolderId.value;
		
		const entities = [null, "category", "folder", "link"];
		const childEntityIdx = entities.findIndex(e => e === entityName);
		const parentEntityName = entities[childEntityIdx - 1];
		
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
		// console.log("%c/updateOrder/", "color: teal, font-weight: 900");
		// console.log(`updating for ${reorderData.parentEntityName} with ID ${reorderData.parentItemId}`);
		
		const newOrder = reorderData.itemsToReorder.map(it => it.id);
		
		if (reorderData.parentItemId) {
			// FOLDERS or LINKS
			localData.value.orders[reorderData.parentEntityName][reorderData.parentItemId] = [...newOrder];
		} else {
			// CATEGORY
			localData.value.orders.root = [...newOrder];
		}
	}
	
	// ----- TRANSFER ----------------------------------------------------------------------------------------------------
	
	const prepareTransfer = (entityName, item) => {
		// store active folder id to reopen it after operation
		lastActiveFolderId.value = activeFolderId.value;
		
		// get parent entity name
		const parentEntityName = getLinkedEntityName(entityName, "parent");
		
		// retrieve all items of parent entity
		let availableParents = [];
		
		if (parentEntityName === "folder") {
			// create composite name (full path)
			for (let f of localData.value[parentEntityName]) {
				const parentCategName = localData.value["category"].find(c => c.id === f.category).name;
				
				const o = {
					id: f.id,
					name: `${parentCategName} / ${f.name}`,
					category: f.category
				};
				availableParents.push(o);
			}
		} else {
			for (let c of localData.value.category) {
				availableParents.push(c);
			}
		}
		
		// sort parents by name ASC
		availableParents.sort((a, b) => a.name.localeCompare(b.name));
		
		transferData.parentEntityName = parentEntityName;
		transferData.availableParents = availableParents;
		
		transferData.startParentId = item[parentEntityName];
		transferData.currentParentId = item[parentEntityName];
		transferData.itemToTransfer = item;
	}
	
	
	const executeTransfer = () => {
		// ONLY FOR FOLDERS & LINKS
		
		const {
			parentEntityName,
			startParentId,
			currentParentId,
			itemToTransfer,
		} = transferData;
		
		// 1) remove item ID from startParent collection
		const startParentCollection = localData.value.orders[parentEntityName][startParentId];
		const idxToRemove = startParentCollection.findIndex(el => el === itemToTransfer.id);
		startParentCollection.splice(idxToRemove, 1);
		
		// 2) push item ID to currentParent collection
		const newParentCollection = localData.value.orders[parentEntityName][currentParentId];
		newParentCollection.push(itemToTransfer.id);
		
		// get entity to transfer name computed from parent entity name
		const entityToTransferName = getLinkedEntityName(parentEntityName, "child");
		
		// find the item that is being transferred
		const idxToUpdate = localData.value[entityToTransferName].findIndex(el => el.id === itemToTransfer.id);
		
		// 3) update the parent ID in the item object
		localData.value[entityToTransferName][idxToUpdate][parentEntityName] = currentParentId;
	}
	
	const prepareItemForColorize = (entityName, item) => {
		lastActiveFolderId.value = activeFolderId.value;
		
		colorizeData.itemEntityName = entityName;
		colorizeData.itemToColorize = item;
		colorizeData.currColorId = item.color;
	}
	
	const colorizeItem = () => {
		const {itemEntityName, itemToColorize, currColorId} = colorizeData;
		
		// update 'color' prop
		const idxToUpdate = localData.value[itemEntityName].findIndex(el => el.id === itemToColorize.id);
		localData.value[itemEntityName][idxToUpdate].color = currColorId;
		
		// reset
		Object.keys(colorizeData).forEach(k => colorizeData[k] = null);
	}
	
	return {
		localData,
		showModal,
		showInfoModal,
		infoModalTheme,
		showIE,
		showActionSpace,
		actionSpaceMode,
		reorderData,
		transferData,
		colorizeData,
		boardMode,
		// folderToggles,
		itemInForm,
		entityInFormDescription,
		
		activeCategId,
		activeFolderId,
		lastActiveFolderId,
		
		
		getDataAsTreeNodes,
		
		editModeOn,
		activeCategory, // computed
		activeFolder, // computed
		displayStep, // computed
		creationCriteria, // computed
		
		getItemNameById,
		
		injectData,
		initOrders,
		
		resetSelection,
		// initFolderToggles,
		// toggleFolder,
		getChildren,
		getOrderedChildren,
		
		addItem,
		editItem,
		removeItem,
		
		reorderTriggeredBy,
		updateOrder,
		prepareTransfer,
		executeTransfer,
		prepareItemForColorize,
		colorizeItem,
	}
});
