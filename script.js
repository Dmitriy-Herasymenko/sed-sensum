document.addEventListener("DOMContentLoaded", function () {
  const languageSelector = document.getElementById("language_selector");
  const elementsWithDataKey = document.querySelectorAll("[data-key]");

  languageSelector.addEventListener("change", function () {
    const selectedLanguage = languageSelector.value;
    loadTranslation(selectedLanguage);
  });

  function loadTranslation(language) {
    fetch(`locales/${language}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load translation file");
        }
        return response.json();
      })
      .then((data) => renderContent(data))
      .catch((error) => console.error("Error loading translation:", error));
  }

  function renderContent(translations) {
    elementsWithDataKey.forEach((element) => {
      const key = element.dataset.key;
      if (translations[key]) {
        element.innerText = translations[key];
      }
    });
  }

  loadTranslation("pl");
});
