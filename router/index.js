import { createRouter, createWebHashHistory } from "vue-router";
import BoardView from "../views/BoardView.vue";

const routes = [
	{
		path: "/",
		name: "home",
		component: BoardView
	},

	{
		path: "/category/:id",
		name: "category",
		component: () => import(/* webpackChunkName: "category" */ "../views/CategoryView.vue")
	},

	{
		path: "/folder/:id",
		name: "folder",
		component: () => import(/* webpackChunkName: "folder" */ "../views/FolderView.vue")
	},

	{
		path: "/edit/:entity",
		name: "edit",
		component: () => import(/* webpackChunkName: "edit" */ "../views/EditView.vue")
	},

	{
		path: "/entities",
		name: "entities",
		component: () => import(/* webpackChunkName: "entities" */ "../views/EditView.vue")
	},

];

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes
});

export default router;
