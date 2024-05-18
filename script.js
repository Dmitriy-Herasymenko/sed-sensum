
let languageOptions;
let currentLanguaage; 

function changeLanguage(language) {
  loadTranslation(language);
  currentLanguaage = language;
// fetchReviews()
  languageOptions.forEach(option => {

    if (option.textContent.trim().toLowerCase() === language) {
    

      // fetchReviews();
      // option.classList.add('font-bold');
      option.classList.add('underline');
      option.classList.add('text-[#168D71]');
    } else {
      // option.classList.remove('font-bold');
      option.classList.remove('underline');
      option.classList.remove('text-[#168D71]');
    }
  });
}

const apiKey = 'AIzaSyDo2OlY6CXwLC6OZCiaGdYlLRO9KFCunYk';
const placeId = 'ChIJMxXAk0kXD0cR9hFDyIYkvxU'; // Ваш place_id
const language = currentLanguaage; // Код языка для украинского
console.log("currentLanguaage", currentLanguaage)
// async function fetchReviews() {
//   try {
//     // Формуємо URL запиту до Places Details API
//     const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&fields=reviews&language=${language}&key=${apiKey}`);
//     const data = await response.json();
//     console.log("response", response )
//     if (data.status === 'OK') {
//       const reviews = data.result.reviews; // Отримуємо масив відгуків
//       console.log('Відгуки про місце:', reviews);
//       return reviews;
//     } else {
//       console.error('Помилка при отриманні відгуків:', data.status);
//     }
//   } catch (error) {
//     console.error('Помилка при отриманні відгуків:', error);
//   }
// }

// // Виклик функції для отримання відгуків
// fetchReviews();




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

  const defaultLanguage = localStorage.getItem('language') || 'en';

  changeLanguage(defaultLanguage);
});

// document.addEventListener('DOMContentLoaded', function() {
//   document.addEventListener('click', function(event) {
//     if (event.target.classList.contains('read-more-btn')) {
//       const btn = event.target;
//       const hiddenText = document.querySelector(`p[data-key="${btn.id}"]`);
//       if (hiddenText) {
//         hiddenText.classList.toggle('hidden');
//         btn.textContent = hiddenText.classList.contains('hidden') ? 'Read more' : 'Hide';
//       }
//     }
//   });
// });

document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('read-more-btn')) {
      const btn = event.target;
      const hiddenText = document.querySelector(`p[data-key="${btn.id}"]`);
      if (hiddenText) {
        if (hiddenText.style.maxHeight && hiddenText.style.maxHeight !== '0px') {
          hiddenText.style.maxHeight = '0px';
          btn.textContent = 'Read more';
        } else {
          hiddenText.style.maxHeight = hiddenText.scrollHeight + 'px';
          btn.textContent = 'Hide';
        }
      }
    }
  });
});










