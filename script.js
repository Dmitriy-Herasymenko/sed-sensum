
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
  console.log('currentLanguaage', currentLanguaage)
  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('read-more-btn')) {
      const btn = event.target;
      const hiddenText = document.querySelector(`p[data-key="${btn.id}"]`);
      if (hiddenText) {
        if (hiddenText.style.maxHeight && hiddenText.style.maxHeight !== '0px') {
          hiddenText.style.maxHeight = '0px';
          btn.textContent = currentLanguaage === 'en' ? 'Read more' : 'czytaj więcej';
        } else {
          hiddenText.style.maxHeight = hiddenText.scrollHeight + 'px';
          btn.textContent = currentLanguaage === 'en' ?  'Hide' : 'Schowaj';
        }
      }
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const toggleButtons = document.querySelectorAll('.toggleButton');

  toggleButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetId = button.getAttribute('data-target');
      const hiddenText = document.getElementById(targetId);
      const toggleIcon = button.querySelector('.toggleIcon');

      if (hiddenText.style.maxHeight && hiddenText.style.maxHeight !== '0px') {
        hiddenText.style.maxHeight = '0px';
        toggleIcon.classList.remove('rotate-180');
      } else {
        hiddenText.style.maxHeight = hiddenText.scrollHeight + 'px';
        toggleIcon.classList.add('rotate-180');
      }
    });
  });
});


const mobileMenu = document.getElementById('mobileMenu');
  const burgerButton = document.getElementById('burgerButton');
  const [line1, line2, line3] = burgerButton.children;

  burgerButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    line1.classList.toggle('rotate-45');
    line1.classList.toggle('translate-y-2.5');
    line2.classList.toggle('opacity-0');
    line3.classList.toggle('-rotate-45');
    line3.classList.toggle('-translate-y-2.5');
  });


  











