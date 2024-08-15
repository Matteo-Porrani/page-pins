import './assets/main.css';
import 'primeicons/primeicons.css'
import 'boxicons';



import {createApp} from "vue";
import {createPinia} from "pinia";
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
// import Lara from '@primevue/themes/lara';
// import Nora from '@primevue/themes/nora';

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(pinia);
app.use(PrimeVue, {
	// unstyled: true
	theme: {
		preset: Aura,
	}
});

app.mount("#app");
