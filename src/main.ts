import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createI18n } from "vue-i18n";
import "element-plus/dist/index.css";
// element-plus国际化
import enLocale from "element-plus/es/locale/lang/en";
import zhLocale from "element-plus/es/locale/lang/zh-cn";

const zh = {
  message: {
    api: {
      id: "ID",
      name: "Name",
      age: "Age",
    },
  },
};
const en = {
  message: {
    api: {
      id: "ID",
      name: "Name",
      age: "Age",
    },
  },
};

export const localesConfigs = {
  zh: {
    ...zh.message,
    ...zhLocale,
  },
  en: {
    ...en.message,
    ...enLocale,
  },
};

const i18n = createI18n({
  // something vue-i18n options here ...
  legacy: false,
  locale: "zh",
  fallbackLocale: "en",
  messages: localesConfigs,
});

createApp(App).use(i18n).mount("#app");
