import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
	{
		path: "/",
		name: "home",
		component: HomeView
	},
	{
		path: "/about",
		name: "about",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ "../views/AboutView.vue")
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

];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
});

export default router;
