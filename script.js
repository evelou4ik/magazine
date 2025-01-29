document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".main-nav");
  const body = document.querySelector("body");
  const editionModal = document.querySelector("#edition_modal");
  const editionBtn = document.querySelector("#edition_btn");
  const modal = document?.querySelectorAll(".modal");
  const editionLinks = document.querySelectorAll(".edition_modal__item_btn");
  const subscriptionButton = document.querySelector(".subscription__button");
  const subscribeModal = document.getElementById("subscribe_modal");

  // Burger menu
  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    menu.classList.toggle("active");

    if (menu.classList.contains("active")) {
      body.classList.add("scroll_disabled");
    } else {
      body.classList.remove("scroll_disabled");
    }
  });

  // Edition modal
  editionBtn.addEventListener("click", () => {
    editionModal.classList.toggle("active");
    body.classList.add("scroll_disabled");
  });

  // Close modal
  modal?.forEach((modal) => {
    const overlay = modal.querySelector(".overlay");
    const modalCloseBtn = modal.querySelector(".modal_content__close");

    overlay?.addEventListener("click", (e) => closeModalHandler(e));

    modalCloseBtn?.addEventListener("click", (e) => closeModalHandler(e));
  });

  document.addEventListener("keydown", closeModalHandler);

  editionLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const edition = e.currentTarget.closest(".edition_modal__item").dataset
        .edition;
      const currentUrl = window.location.href.split("?")[0];
      window.location.href = `${currentUrl}?ed=${edition.toLowerCase()}`;
    });
  });

  if (subscriptionButton && subscribeModal) {
    subscriptionButton.addEventListener("click", () => {
      subscribeModal.classList.add("active");
      body.classList.add("scroll_disabled");
    });
  }
});

// Close modal handler
function closeModalHandler(e) {
  const body = document.body;
  const modal = document.querySelector(".modal.active");

  if (e.type === "keydown" && e.key === "Escape" && modal) {
    body.classList.remove("scroll_disabled");
    modal.classList.remove("active");
  }

  if (e.type === "click") {
    const target = e.target;
    const clickedModal = target.closest(".modal");

    if (clickedModal && clickedModal.classList.contains("active")) {
      body.classList.remove("scroll_disabled");
      clickedModal.classList.remove("active");
    }
  }
}

// Gallery

const body = document.body;
const MOBILE_SIZE = 768;
const gallerySlider = document?.querySelector(".gallery__grid_slider");
const galleries = document?.querySelectorAll(".gallery__widget");
const galleryModal = document?.querySelector(".gallery_modal");
let bigImage, currentImageIndexEl;

if (galleryModal) {
  const imageRow = galleryModal?.querySelector(".gallery_modal__image_row");
  const galleryCount = document?.querySelector(".gallery_modal__count");
  const galleryTotalCount = galleryCount?.querySelector(".total_count");
  const prevGalleryBtns = document.querySelectorAll(
    ".gallery_modal__image_row_container .slider_btn__left, .gallery_modal__arrows .slider_btn:first-child"
  );
  const nextGalleryBtns = document.querySelectorAll(
    ".gallery_modal__image_row_container .slider_btn__right, .gallery_modal__arrows .slider_btn:last-child"
  );

  bigImage = galleryModal?.querySelector("#selectedImage");
  currentImageIndexEl = galleryCount?.querySelector(".current_index");

  let currentIndex = Number(bigImage.getAttribute("data-index"));
  let touchStartX = 0;

  const imagesArray = [
    {
      src: "./public/frame-2245@2x.png",
      srcMobile: "./public/frame-2245@2x.png",
      type: "Recent Editorial Story 1",
      title: "Travel for Two: Balancing Interests in Romantic Getaways 1",
      slug: "test-test",
    },
    {
      src: "./public/frame-2246@2x.png",
      srcMobile: "./public/frame-2246@2x.png",
      type: "Recent Editorial Story 2",
      title: "Travel for Two: Balancing Interests in Romantic Getaways 2",
      slug: "test-test",
    },
    {
      src: "./public/frame-2247@2x.png",
      srcMobile: "./public/frame-2247@2x.png",
      type: "Recent Editorial Story 3",
      title: "Travel for Two: Balancing Interests in Romantic Getaways 3",
      slug: "test-test",
    },
    {
      src: "./public/frame-2244@2x.png",
      srcMobile: "./public/frame-2244@2x.png",
      type: "Recent Editorial Story 4",
      title: "Travel for Two: Balancing Interests in Romantic Getaways 4",
      slug: "test-test",
    },
    {
      src: "./public/frame-2246-1@2x.png",
      srcMobile: "./public/frame-2246-1@2x.png",
      type: "Recent Editorial Story 5",
      title: "Travel for Two: Balancing Interests in Romantic Getaways 5",
      slug: "test-test",
    },
    {
      src: "./public/frame-2247-1@2x.png",
      srcMobile: "./public/frame-2247-1@2x.png",
      type: "Recent Editorial Story 6",
      title: "Travel for Two: Balancing Interests in Romantic Getaways 6",
      slug: "test-test",
    },
    {
      src: "./public/frame-2245-1@2x.png",
      srcMobile: "./public/frame-2245-1@2x.png",
      type: "Recent Editorial Story 7",
      title: "Travel for Two: Balancing Interests in Romantic Getaways 7",
      slug: "test-test",
    },
  ];

  const handleSwipe = (event) => {
    const touchEndX = event.changedTouches[0].clientX;

    if (touchStartX - touchEndX > 50) {
      nextImage(
        currentIndex,
        currentImageIndexEl,
        prevGalleryBtns,
        nextGalleryBtns,
        imagesArray
      );
      currentIndex = Number(bigImage.getAttribute("data-index"));
    } else if (touchEndX - touchStartX > 50) {
      prevImage(
        currentIndex,
        currentImageIndexEl,
        prevGalleryBtns,
        nextGalleryBtns,
        imagesArray
      );
      currentIndex = Number(bigImage.getAttribute("data-index"));
    }
  };

  prevGalleryBtns?.forEach((btn) => {
    btn.addEventListener("click", () => {
      prevImage(
        currentIndex,
        currentImageIndexEl,
        prevGalleryBtns,
        nextGalleryBtns,
        imagesArray
      );
      currentIndex = Number(bigImage.getAttribute("data-index"));
    });
  });

  nextGalleryBtns?.forEach((btn) => {
    btn.addEventListener("click", () => {
      nextImage(
        currentIndex,
        currentImageIndexEl,
        prevGalleryBtns,
        nextGalleryBtns,
        imagesArray
      );
      currentIndex = Number(bigImage.getAttribute("data-index"));
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      prevImage(
        currentIndex,
        currentImageIndexEl,
        prevGalleryBtns,
        nextGalleryBtns,
        imagesArray
      );
      currentIndex = Number(bigImage.getAttribute("data-index"));
    } else if (e.key === "ArrowRight") {
      nextImage(
        currentIndex,
        currentImageIndexEl,
        prevGalleryBtns,
        nextGalleryBtns,
        imagesArray
      );
      currentIndex = Number(bigImage.getAttribute("data-index"));
    }
  });

  bigImage?.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
  });

  bigImage?.addEventListener("touchend", handleSwipe);

  (function () {
    if (imagesArray.length > 0) {
      if (bigImage) {
        bigImage.src =
          window.innerWidth >= MOBILE_SIZE
            ? imagesArray[0].src
            : imagesArray[0].srcMobile;
        currentImageIndexEl.textContent = currentIndex + 1;
        galleryTotalCount.textContent = imagesArray.length;
      }

      imagesArray.forEach((image, index) => {
        const pictureElement = document.createElement("picture");
        const sourceElement = document.createElement("source");

        sourceElement.media = "(max-width: 767px)";
        sourceElement.srcset = image.srcMobile;

        const imgElement = document.createElement("img");

        imgElement.src = image.src;
        imgElement.alt = image.altText;

        pictureElement.appendChild(sourceElement);
        pictureElement.appendChild(imgElement);

        pictureElement.addEventListener("click", function () {
          if (index === 0 && prevGalleryBtns.length > 0) {
            prevGalleryBtns.forEach((btn) => btn.classList.add("invisible"));
          } else {
            prevGalleryBtns.forEach((btn) => btn.classList.remove("invisible"));
          }

          if (index === imagesArray.length - 1 && nextGalleryBtns.length > 0) {
            nextGalleryBtns.forEach((btn) => btn.classList.add("invisible"));
          } else {
            nextGalleryBtns.forEach((btn) => btn.classList.remove("invisible"));
          }

          currentImageIndexEl.textContent = index + 1;
          currentIndex = index;

          selectImage(imgElement, imagesArray[index]);
          updateSelectedImageIndex(index);
        });

        if (bigImage) {
          imageRow.appendChild(pictureElement);
        }

        const gallery = document.querySelector(".gallery");
        const galleryItems = gallery?.querySelectorAll(".gallery__widget_item");
        const allImages = document?.querySelectorAll(
          ".gallery_modal__image_row img"
        );

        const galleryGridBtn = gallery?.querySelector(".gallery__btn");

        galleryItems?.forEach((el, index) => {
          el.addEventListener("click", () => {
            body.classList.add("scroll_disabled");
            galleryModal.classList.add("active");

            if (index === 0 && prevGalleryBtns.length > 0) {
              prevGalleryBtns.forEach((btn) => btn.classList.add("invisible"));
            } else {
              prevGalleryBtns.forEach((btn) =>
                btn.classList.remove("invisible")
              );
            }

            if (
              index === imagesArray.length - 1 &&
              nextGalleryBtns.length > 0
            ) {
              nextGalleryBtns.forEach((btn) => btn.classList.add("invisible"));
            } else {
              nextGalleryBtns.forEach((btn) =>
                btn.classList.remove("invisible")
              );
            }

            selectImage(allImages[index], imagesArray[index]);
            currentImageIndexEl.textContent = index + 1;
            currentIndex = index;
            updateSelectedImageIndex(index);
          });
        });

        if (galleryItems.length < 6) {
          galleryGridBtn.classList.add("hidden");
        } else {
          galleryGridBtn?.addEventListener("click", (e) => {
            body.classList.add("scroll_disabled");
            galleryModal.classList.add("active");
          });
        }
      });
    }
  })();
}

function prevImage(
  currentIndex,
  currentImageIndexEl,
  prevBtns,
  nextBtns,
  imagesArray
) {
  const allImages = document?.querySelectorAll(".gallery_modal__image_row img");

  if (currentIndex > 0) {
    currentIndex -= 1;

    if (currentIndex === 0) {
      prevBtns.forEach((btn) => btn.classList.add("invisible"));
    } else {
      prevBtns.forEach((btn) => btn.classList.remove("invisible"));
    }

    if (currentIndex > 0 && nextBtns.length > 0) {
      nextBtns.forEach((btn) => btn.classList.remove("invisible"));
    }

    if (currentIndex < allImages.length) {
      selectImage(allImages[currentIndex], imagesArray[currentIndex]);
      currentImageIndexEl.textContent = currentIndex + 1;
      updateSelectedImageIndex(currentIndex);
    }
  }
}

function nextImage(
  currentIndex,
  currentImageIndexEl,
  prevBtns,
  nextBtns,
  imagesArray
) {
  const allImages = document?.querySelectorAll(".gallery_modal__image_row img");

  if (currentIndex < allImages.length - 1) {
    currentIndex += 1;

    if (currentIndex === 0) {
      prevBtns.forEach((btn) => btn.classList.add("invisible"));
    } else {
      prevBtns.forEach((btn) => btn.classList.remove("invisible"));
    }

    if (currentIndex === allImages.length - 1) {
      nextBtns.forEach((btn) => btn.classList.add("invisible"));
    } else {
      nextBtns.forEach((btn) => btn.classList.remove("invisible"));
    }

    if (currentIndex < allImages.length) {
      selectImage(allImages[currentIndex], imagesArray[currentIndex]);
      currentImageIndexEl.textContent = currentIndex + 1;
      updateSelectedImageIndex(currentIndex);
    }
  }
}

function updateSelectedImageIndex(index) {
  const mainGalleryImage = document.querySelector("#selectedImage");

  mainGalleryImage.setAttribute("data-index", index);
}

function selectImage(element, imageData) {
  const selectedImageSrc = element?.src;
  const bigImage = document?.getElementById("selectedImage");
  const allImages = document?.querySelectorAll(".gallery_modal__image_row img");
  const cardContainer = document?.querySelector(".gallery_modal__card");

  const cardTemplate = `
    <div class="gallery_modal__card_content">
      <span class="tag">${imageData.type}</span>
      <h3 class="gallery_modal__card_title">${imageData.title}</h3>
      <a href="/${imageData.slug}" class="view-more">View More</a>
    </div>
  `;

  if (cardContainer) {
    cardContainer.innerHTML = cardTemplate;
  }

  bigImage.src = selectedImageSrc;
  allImages?.forEach((img) => img.classList.remove("selected"));
  element?.classList.add("selected");

  bigImage.setAttribute("data-index", Array.from(allImages).indexOf(element));
}

// Subscribe

document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const subscribeBtns = document.querySelectorAll(".subscribe_btn");
  const subscribeModal = document.getElementById("subscribe_modal");
  const subscribeSuccessModal = document.getElementById(
    "subscribe_success_modal"
  );
  const modalForm = subscribeModal.querySelector("form");
  const submitForm = modalForm.querySelector(".btn[type=submit]");
  const formFields = modalForm.querySelectorAll(".form_field__wrapper");
  const subscribeSuccessModalBtn = subscribeSuccessModal.querySelector(".btn");

  subscribeSuccessModalBtn.addEventListener("click", (e) =>
    closeModalHandler(e)
  );

  if (formFields.length > 0) {
    formFields.forEach((el) => {
      const field = el.querySelector(".form_field");
      const fieldError = el.querySelector(".error-message");

      if (field.hasAttribute("required")) {
        field.addEventListener("blur", (e) => {
          const target = e.target;
          const value = field.value;
          const errorEmptyValue = target.getAttribute("data-empty");

          if (isFieldEmpty(target)) {
            showError(field, errorEmptyValue);
            fieldError.classList.remove("hidden");

            return;
          } else {
            hideError(field);
          }

          if (target.getAttribute("type") === "email") {
            if (!validateEmail(value)) {
              showError(
                field,
                "{|Subscribe_EmailFieldLabelValidationInvalidEmail|}"
              );
              fieldError.classList.remove("hidden");
            } else {
              hideError(field);
              fieldError.classList.add("hidden");
            }
          }
        });
      }
    });
  }

  submitForm.addEventListener("click", async function (e) {
    e.preventDefault();

    if (!validateRequiredFields(modalForm)) {
      return;
    }

    const formEmail = modalForm?.querySelector("[type=email]");
    const formTag = modalForm?.querySelector("[data-tag]");

    const requestBody = {
      payload: {
        email: null,
        tag: null,
        projectType: "Magazine",
      },
    };

    if (formEmail && formEmail.value) {
      requestBody.payload.email = formEmail.value;
    }

    if (formTag) {
      const checkbox = formTag.querySelector("[type=checkbox]");
      if (checkbox && checkbox.checked) {
        requestBody.payload.tag = formTag.getAttribute("data-tag");
      }
    }

    const response = await subscribeUser(requestBody);

    subscribeModal.classList.remove("active");
    subscribeSuccessModal.classList.add("active");
  });

  subscribeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (subscribeModal) {
        subscribeModal.classList.add("active");
        body.classList.add("scroll_disabled");
      }
    });
  });
});

async function subscribeUser(body) {
  const url = "https://front-end-qa.evendo.com/api/subscribe";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error during the request:", error);

    throw error;
  }
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showError(inputField, message, addMargin = false) {
  let errorMessage = inputField
    .closest(".form_field__wrapper")
    .querySelector(".error-message");

  if (!errorMessage || !errorMessage.classList.contains("error-message")) {
    errorMessage = document.createElement("div");
    errorMessage.className = "error-message";
    if (addMargin) {
      errorMessage.classList.add("error-message__gap");
    }
    inputField.insertAdjacentElement("afterend", errorMessage);
  }
  errorMessage.textContent = message;
  inputField.classList.add("error");
}

function hideError(inputField) {
  let errorMessage = inputField
    .closest(".form_field__wrapper")
    .querySelector(".error-message");
  if (errorMessage && errorMessage.classList.contains("error-message")) {
    errorMessage.textContent = "";
  }
  inputField.classList.remove("error");
}

function isFieldEmpty(field, errorMessage = "") {
  if (field.type === "checkbox") {
    return !field.checked;
  }

  const value = field.value.trim();
  return value.length === 0;
}

function validateRequiredFields(form) {
  const requiredFields = form.querySelectorAll("[required]");
  let isValid = true;

  for (let field of requiredFields) {
    if (field.type === "checkbox") {
      if (!field.checked) {
        const fieldError = field
          .closest(".form_field__wrapper")
          .querySelector(".error-message");
        const errorEmptyValue = field.getAttribute("data-empty");

        showError(field, errorEmptyValue);
        fieldError.classList.remove("hidden");

        isValid = false;
      }
    } else if (!field.value.trim()) {
      const fieldError = field.nextElementSibling;
      const errorEmptyValue = field.getAttribute("data-empty");

      showError(field, errorEmptyValue);
      fieldError.classList.remove("hidden");

      isValid = false;
    }
  }

  return isValid;
}

const _domain = "https://front-end-qa.evendo.com/";

function onRecaptchaLoadCallback() {
  var clientId = grecaptcha.render("inline-badge", {
    sitekey: "6LegHgEqAAAAALe68Wt_KYwxiSI6zz7PCfCHEyQb",
    badge: "inline",
    size: "invisible",
  });

  grecaptcha.ready(function () {
    grecaptcha
      .execute(clientId, { action: "forgotPassword" })
      .then(function (token) {
        verifyToken(token);
      });
  });
}

function verifyToken(token) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", `${_domain}verify-reCAPTCHA`, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onload = function () {
    if (xhr.status === 200) {
      var res = JSON.parse(xhr.responseText);
      document.getElementById("score").value = res.score;
    }
  };

  xhr.send("token=" + encodeURIComponent(token));
}
