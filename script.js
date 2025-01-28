document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".main-nav");
  const body = document.querySelector("body");
  const editionModal = document.querySelector("#edition_modal");
  const editionBtn = document.querySelector("#edition_btn");
  const modal = document?.querySelectorAll(".modal");
  const editionLinks = document.querySelectorAll('.edition_modal__item_btn');


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

  editionLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const edition = e.currentTarget.closest('.edition_modal__item').dataset.edition;
      const currentUrl = window.location.href.split('?')[0];
      window.location.href = `${currentUrl}?ed=${edition.toLowerCase()}`;
    });
  });
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