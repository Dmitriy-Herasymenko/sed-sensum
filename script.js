let languageOptions;
let currentLanguaage;

function changeLanguage(language) {
  loadTranslation(language);
  currentLanguaage = language;
  // fetchReviews()
  languageOptions.forEach((option) => {
    if (option.textContent.trim().toLowerCase() === language) {
      // fetchReviews();
      // option.classList.add('font-bold');
      option.classList.add("underline");
      option.classList.add("text-[#168D71]");
    } else {
      // option.classList.remove('font-bold');
      option.classList.remove("underline");
      option.classList.remove("text-[#168D71]");
    }
  });
  replacePlaceholders();
}

const apiKey = "AIzaSyDo2OlY6CXwLC6OZCiaGdYlLRO9KFCunYk";
const placeId = "ChIJMxXAk0kXD0cR9hFDyIYkvxU"; // Ваш place_id
const language = currentLanguaage; // Код языка для украинского
console.log("currentLanguaage", currentLanguaage);
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
  const elementsWithDataKey = document.querySelectorAll("[data-key]");
  elementsWithDataKey.forEach((element) => {
    const key = element.dataset.key;
    if (translations[key]) {
      element.innerText = translations[key];
    }
  });
}

function replacePlaceholders() {
  const nameInput = document.querySelector(".nameForm");
  const phoneInput = document.querySelector(".phoneForm");
  const messageForm = document.querySelector(".messageForm");

  if (nameInput) {
    nameInput.placeholder = currentLanguaage === "en" ? "name" : "imię";
  }

  if (phoneInput) {
    phoneInput.placeholder = currentLanguaage === "en" ? "number" : "numer";
  }
  if (messageForm) {
    messageForm.placeholder =
      currentLanguaage === "en" ? "message" : "wiadomość";
  }
}

replacePlaceholders();

document.addEventListener("DOMContentLoaded", function () {
  languageOptions = document.querySelectorAll(".language-option");

  const defaultLanguage = localStorage.getItem("language") || "pl";

  changeLanguage(defaultLanguage);
});

function changeIcon(element, language) {
  const enButton = document.getElementById("lang-en");
  const plButton = document.getElementById("lang-pl");
  const enButtonMob = document.getElementById("lang-en-mob");
  const plButtonMob = document.getElementById("lang-pl-mob");

  const enImg = enButton.querySelector("img");
  const plImg = plButton.querySelector("img");

  const enImgMob = enButtonMob.querySelector("img");
  const plImgMob = plButtonMob.querySelector("img");

  enImg.src = "./assets/icons/langageEn.svg";
  plImg.src = "./assets/icons/langagePl.svg";

  enImgMob.src = "./assets/icons/langageEn.svg";
  plImgMob.src = "./assets/icons/langagePl.svg";

  const img = element.querySelector("img");
  if (language === "en") {
    img.src = "./assets/icons/languageEnBorder.svg";
  } else if (language === "pl") {
    img.src = "./assets/icons/languagePlBorder.svg";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("currentLanguaage", currentLanguaage);
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("read-more-btn")) {
      const btn = event.target;
      const hiddenText = document.querySelector(`p[data-key="${btn.id}"]`);
      if (hiddenText) {
        if (
          hiddenText.style.maxHeight &&
          hiddenText.style.maxHeight !== "0px"
        ) {
          hiddenText.style.maxHeight = "0px";
          btn.textContent =
            currentLanguaage === "en" ? "Read more" : "czytaj więcej";
        } else {
          hiddenText.style.maxHeight = hiddenText.scrollHeight + "px";
          btn.textContent = currentLanguaage === "en" ? "Hide" : "Schowaj";
        }
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const toggleButtons = document.querySelectorAll(".toggleButton");

  toggleButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetId = button.getAttribute("data-target");
      const hiddenText = document.getElementById(targetId);
      const toggleIcon = button.querySelector(".toggleIcon");

      if (hiddenText.style.maxHeight && hiddenText.style.maxHeight !== "0px") {
        hiddenText.style.maxHeight = "0px";
        toggleIcon.classList.remove("rotate-180");
      } else {
        hiddenText.style.maxHeight = hiddenText.scrollHeight + "px";
        toggleIcon.classList.add("rotate-180");
      }
    });
  });
});

const mobileMenu = document.getElementById("mobileMenu");
const burgerButton = document.getElementById("burgerButton");
const [line1, line2, line3] = burgerButton.children;

burgerButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  line1.classList.toggle("rotate-45");
  line1.classList.toggle("translate-y-2.5");
  line2.classList.toggle("opacity-0");
  line3.classList.toggle("-rotate-45");
  line3.classList.toggle("-translate-y-2.5");
});

document.getElementById("form").addEventListener("submit", function (event) {
  const isNameValid = validateNameInput();
  const isPhoneValid = validatePhoneInput();
  const isEmailValid = validateEmailInput();
  const isMessageValid = validateMessageInput();

  if (!isNameValid || !isPhoneValid || !isEmailValid || !isMessageValid) {
    event.preventDefault();
    Swal.fire({
      icon: "error",
      title: "Validation Error",
      text: "Please check your input and try again.",
    });
    return;
  }
  event.preventDefault();
  Swal.fire({
    icon: "success",
    title: "Success!",
    text: "Form submitted successfully.",
    didClose: () => {
      // После закрытия SweetAlert отправляем форму
      this.submit();
    },
  });
});

function validateNameInput() {
  const nameInput = document.getElementById("name").value;
  const feedbackElement = document.getElementById("nameFeedback");
  const nameRegex = /^[A-Za-zА-Яа-яЁё\s]{2,50}$/;
  const minLength = 4;
  const maxLength = 50;

  if (nameInput.length < minLength || nameInput.length > maxLength) {
    feedbackElement.textContent =
      currentLanguaage === "en"
        ? `Name must be between ${minLength} and ${maxLength} characters.`
        : `Imię musi zawierać od  ${minLength} do ${maxLength} znaków`;
    feedbackElement.classList.remove("hidden");
    return false;
  } else if (!nameRegex.test(nameInput)) {
    feedbackElement.textContent =
      currentLanguaage === "en"
        ? "Please enter a valid name."
        : "Proszę wpisać poprawne imię";
    feedbackElement.classList.remove("hidden");
    return false;
  } else {
    feedbackElement.textContent = "";
    feedbackElement.classList.add("hidden");
    return true;
  }
}

function validatePhoneInput() {
    const phoneInput = document.getElementById("phone").value.trim();
    const feedbackElement = document.getElementById("phoneFeedback");

    try {
      const phoneNumber = libphonenumber.parsePhoneNumber(phoneInput);
      if (phoneNumber.isValid()) {
        feedbackElement.textContent = "";
        return true;
      } else {
        feedbackElement.textContent = "Invalid phone number";
        return false;
      }
    } catch (e) {
      feedbackElement.textContent = "Invalid phone number format";
      return false;
    }
  }
function validateEmailInput() {
  const emailInput = document.getElementById("email").value;
  const feedbackElement = document.getElementById("emailFeedback");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(emailInput)) {
    feedbackElement.textContent = "";
    return true;
  } else {
    feedbackElement.textContent =
      currentLanguaage === "en"
        ? "Please enter a valid email address."
        : "Proszę wpisać poprawny adres mailowy";
    return false;
  }
}
function validateMessageInput() {
  const messageInput = document.getElementById("message").value;
  const feedbackElement = document.getElementById("messageFeedback");
  const minLength = 20;
  const maxLength = 300;

  // Валидация длины сообщения
  if (messageInput.length < minLength || messageInput.length > maxLength) {
    feedbackElement.textContent =
      currentLanguaage === "en"
        ? `Message must be between ${minLength} and ${maxLength} characters.`
        : `Wiadomość musi zawierać od ${minLength} do ${maxLength} znaków`;
    feedbackElement.classList.remove("hidden");
    return false;
  } else {
    feedbackElement.textContent = "";
    feedbackElement.classList.add("hidden");
    return true;
  }
}
