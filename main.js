import './assets/main.css';
import 'primeicons/primeicons.css'
import 'boxicons';



import {createApp} from "vue";
import {createPinia} from "pinia";
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import {definePreset} from "@primevue/themes";
// import Lara from '@primevue/themes/lara';
// import Nora from '@primevue/themes/nora';

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(pinia);

const MyPreset = definePreset(Aura, {
	semantic: {
		primary: {
			50: '{slate.50}',
			100: '{slate.100}',
			200: '{slate.200}',
			300: '{slate.300}',
			400: '{slate.400}',
			500: '{slate.500}',
			600: '{slate.600}',
			700: '{slate.700}',
			800: '{slate.800}',
			900: '{slate.900}',
		}
	}
})

app.use(PrimeVue, {
	// unstyled: true
	theme: {
		// preset: Aura,
		preset: MyPreset,
	}
});

app.mount("#app");
