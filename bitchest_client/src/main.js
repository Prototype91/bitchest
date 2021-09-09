import { dom, library } from "@fortawesome/fontawesome-svg-core";
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import 'bootstrap/dist/css/bootstrap.css';
import 'chartkick/chart.js';
import { createApp } from 'vue';
import VueChartkick from 'vue-chartkick';
import App from './App.vue';
import router from './router';

// Fontawesome
library.add(fas);
library.add(fab);
library.add(far);
dom.watch();

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

createApp(App).use(router).use(VueChartkick).mount('#app')
