import { ref } from "vue";
import { computed } from "vue";
import { watch } from "vue";
import { useStore } from "vuex";

export function loadContent(fileName) {
  const store = useStore();
  const currentLanguage = computed(() => store.state.currentLanguage);

  const content = ref(null);
  watch(currentLanguage, () => {
    fetchData();
  });

  function fetchData() {
    content.value = null;
    fetch(`./languages/${currentLanguage.value["long"]}/${fileName}`)
      .then((response) => response.json())
      .then((data) => (content.value = data));
  }
  fetchData();

  return {
    content,
  };
}

export function getLanguagesList() {
  return {
    en: { short: "en", long: "English" },
    ru: { short: "ru", long: "Russian" },
    pl: { short: "pl", long: "Polish" },
  };
}

export function getLinks() {
  return {
    home: "/",
    services: "/services",
    experience: "/experience",
    certificates: "/certificates",
    contacts: "/contacts",
  };
}
