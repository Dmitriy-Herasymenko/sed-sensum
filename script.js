
let languageOptions;

function changeLanguage(language) {
  loadTranslation(language);

  languageOptions.forEach(option => {
    if (option.textContent.trim() === language) {
      // option.classList.add('font-bold');
      option.classList.add('underline');
    } else {
      // option.classList.remove('font-bold');
      option.classList.remove('underline');
    }
  });
}

function loadTranslation(language) {
  fetch(`locales/${language}.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load translation file');
      }
      return response.json();
    })
    .then(data => renderContent(data))
    .catch(error => console.error('Error loading translation:', error));
}

function renderContent(translations) {
  const elementsWithDataKey = document.querySelectorAll('[data-key]');
  elementsWithDataKey.forEach(element => {
    const key = element.dataset.key;
    if (translations[key]) {
      element.innerText = translations[key];
    }
  });
}

document.addEventListener("DOMContentLoaded", function() {
  languageOptions = document.querySelectorAll('.language-option');

  const defaultLanguage = localStorage.getItem('language') || 'pl';

  changeLanguage(defaultLanguage);
});
