const menuOverlay = document.querySelector("[data-menu-close]")?.closest(".menu-overlay");
const menuOpenButton = document.querySelector("[data-menu-open]");
const menuCloseButton = document.querySelector("[data-menu-close]");

if (menuOverlay && menuOpenButton && menuCloseButton) {
  const openMenu = () => {
    menuOverlay.hidden = false;
    menuOverlay.setAttribute("aria-hidden", "false");
    menuOpenButton.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-overlay-open");

    requestAnimationFrame(() => {
      menuOverlay.classList.add("is-open");
      menuCloseButton.focus();
    });
  };

  const closeMenu = () => {
    menuOverlay.classList.remove("is-open");
    menuOverlay.setAttribute("aria-hidden", "true");
    menuOpenButton.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-overlay-open");
    menuOpenButton.focus();
  };

  menuOpenButton.addEventListener("click", openMenu);
  menuCloseButton.addEventListener("click", closeMenu);

  menuOverlay.addEventListener("click", (event) => {
    if (event.target === menuOverlay) {
      closeMenu();
    }
  });

  menuOverlay.addEventListener("transitionend", (event) => {
    if (event.target === menuOverlay && !menuOverlay.classList.contains("is-open")) {
      menuOverlay.hidden = true;
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuOverlay.classList.contains("is-open")) {
      closeMenu();
    }
  });
}

const orderOverlay = document.querySelector(".order-overlay");
const orderOpenButton = document.querySelector("[data-order-open]");
const orderCloseButton = document.querySelector("[data-order-close]");
const orderForm = orderOverlay?.querySelector("form");
const orderSuccess = orderOverlay?.querySelector("[data-order-success]");

if (orderOverlay && orderOpenButton && orderCloseButton && orderForm && orderSuccess) {
  const openOrder = () => {
    orderOverlay.hidden = false;
    orderOverlay.setAttribute("aria-hidden", "false");
    orderOverlay.setAttribute("aria-labelledby", "order-title");
    orderOverlay.classList.remove("is-complete");
    orderForm.hidden = false;
    orderSuccess.hidden = true;
    document.body.classList.add("menu-overlay-open");

    requestAnimationFrame(() => {
      orderOverlay.classList.add("is-open");
      orderForm.querySelector("input")?.focus();
    });
  };

  const closeOrder = () => {
    orderOverlay.classList.remove("is-open");
    orderOverlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-overlay-open");
    orderOpenButton.focus();
  };

  orderOpenButton.addEventListener("click", openOrder);
  orderCloseButton.addEventListener("click", closeOrder);

  orderOverlay.addEventListener("click", (event) => {
    if (event.target === orderOverlay && !orderOverlay.classList.contains("is-complete")) {
      closeOrder();
    }
  });

  orderOverlay.addEventListener("transitionend", (event) => {
    if (event.target === orderOverlay && !orderOverlay.classList.contains("is-open")) {
      orderOverlay.hidden = true;
    }
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      orderOverlay.classList.contains("is-open") &&
      !orderOverlay.classList.contains("is-complete")
    ) {
      closeOrder();
    }
  });

  orderForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    orderOverlay.classList.add("is-complete");
    orderOverlay.setAttribute("aria-labelledby", "order-success-title");
    orderForm.hidden = true;
    orderSuccess.hidden = false;
    orderOverlay.scrollTo({ top: 0, behavior: "smooth" });
    orderSuccess.querySelector("a")?.focus();
  });
}

const specialOrderForm = document.querySelector("[data-special-order-form]");
const specialOrderSuccessOverlay = document.querySelector("[data-special-order-success-overlay]");

if (specialOrderForm && specialOrderSuccessOverlay) {
  specialOrderForm.addEventListener("submit", (event) => {
    event.preventDefault();

    specialOrderSuccessOverlay.hidden = false;
    specialOrderSuccessOverlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-overlay-open");

    requestAnimationFrame(() => {
      specialOrderSuccessOverlay.classList.add("is-open", "is-complete");
      specialOrderSuccessOverlay.scrollTo({ top: 0, behavior: "smooth" });
      specialOrderSuccessOverlay.querySelector("a")?.focus();
    });
  });
}

document.querySelectorAll("[data-favorite]").forEach((button) => {
  if (!button.hasAttribute("aria-pressed")) {
    button.setAttribute("aria-pressed", "false");
  }

  button.addEventListener("click", () => {
    const active = button.getAttribute("aria-pressed") === "true";
    button.setAttribute("aria-pressed", String(!active));
  });
});

const cardCartButtons = [...document.querySelectorAll("[data-cart]")];
let activeCartButton = null;
let cartDialog = null;

if (cardCartButtons.length && !document.body.classList.contains("product-page")) {
  document.body.insertAdjacentHTML(
    "beforeend",
    `
      <dialog class="cart-config-dialog" aria-labelledby="cart-config-title">
        <form method="dialog">
          <header>
            <h2 id="cart-config-title">Товар</h2>
            <button type="button" aria-label="Закрыть выбор характеристик" data-cart-dialog-close>
              <img src="${location.pathname.includes("/pages/") ? "../" : ""}DesignEkran/svg/OverPlay_Krest.svg" alt="" width="35" height="33" aria-hidden="true" />
            </button>
          </header>

          <div class="product-option" data-custom-select>
            <label for="cart-color">Цвет</label>
            <select class="visually-hidden" id="cart-color" name="color" tabindex="-1">
              <option value="blue">Blue</option>
              <option value="black">Black</option>
              <option value="white">White</option>
              <option value="lavender">Lavender</option>
            </select>
            <button type="button" aria-haspopup="listbox" aria-expanded="false" data-select-button>
              <span>Blue</span>
            </button>
            <ul role="listbox" aria-label="Цвет" hidden>
              <li><button type="button" role="option" aria-selected="true" data-value="blue">Blue</button></li>
              <li><button type="button" role="option" aria-selected="false" data-value="black">Black</button></li>
              <li><button type="button" role="option" aria-selected="false" data-value="white">White</button></li>
              <li><button type="button" role="option" aria-selected="false" data-value="lavender">Lavender</button></li>
            </ul>
          </div>

          <div class="product-option" data-custom-select>
            <label for="cart-memory">Память</label>
            <select class="visually-hidden" id="cart-memory" name="memory" tabindex="-1">
              <option value="256">256GB</option>
              <option value="512">512GB</option>
              <option value="1024">1TB</option>
            </select>
            <button type="button" aria-haspopup="listbox" aria-expanded="false" data-select-button>
              <span>256GB</span>
            </button>
            <ul role="listbox" aria-label="Память" hidden>
              <li><button type="button" role="option" aria-selected="true" data-value="256">256GB</button></li>
              <li><button type="button" role="option" aria-selected="false" data-value="512">512GB</button></li>
              <li><button type="button" role="option" aria-selected="false" data-value="1024">1TB</button></li>
            </ul>
          </div>

          <div class="cart-dialog-actions">
            <strong data-cart-dialog-price>0 ₽</strong>
            <button type="submit" value="confirm" data-cart-dialog-confirm>В корзину</button>
          </div>
        </form>
      </dialog>
    `,
  );

  cartDialog = document.querySelector(".cart-config-dialog");
}

cardCartButtons.forEach((button) => {
  button.dataset.inCart = "false";

  button.addEventListener("click", () => {
    const active = button.dataset.inCart === "true";

    if (active || document.body.classList.contains("product-page")) {
      button.dataset.inCart = String(!active);
      button.querySelector("span").textContent = active ? "Добавить в корзину" : "Убрать из корзины";
      return;
    }

    const card = button.closest("article");
    const title = card?.querySelector("h3")?.textContent.trim() || "Товар";
    const price = card?.querySelector("h3 + p")?.textContent.trim().replace(/^от\s+/i, "") || "Цена по запросу";

    activeCartButton = button;
    cartDialog.querySelector("h2").textContent = title;
    cartDialog.querySelector("[data-cart-dialog-price]").textContent = price;
    cartDialog.showModal();
    document.body.classList.add("menu-overlay-open");
  });
});

if (cartDialog) {
  const closeButton = cartDialog.querySelector("[data-cart-dialog-close]");

  const closeCartDialog = () => {
    cartDialog.close();
    document.body.classList.remove("menu-overlay-open");
    activeCartButton?.focus();
  };

  closeButton.addEventListener("click", closeCartDialog);

  cartDialog.addEventListener("click", (event) => {
    if (event.target === cartDialog) closeCartDialog();
  });

  cartDialog.addEventListener("close", () => {
    document.body.classList.remove("menu-overlay-open");
  });

  cartDialog.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!activeCartButton) return;

    activeCartButton.dataset.inCart = "true";
    activeCartButton.querySelector("span").textContent = "Убрать из корзины";
    closeCartDialog();
  });
}

document.querySelectorAll("[data-card-link]").forEach((card) => {
  const href = card.dataset.cardLink;

  card.addEventListener("click", (event) => {
    if (!href) return;

    const target = event.target;
    if (!(target instanceof Element)) return;

    if (target.closest("button, a")) return;

    window.location.href = href;
  });
});

const customSelects = [...document.querySelectorAll("[data-custom-select]")];

customSelects.forEach((field) => {
  const select = field.querySelector("select");
  const button = field.querySelector("[data-select-button]");
  const buttonText = button?.querySelector("span");
  const list = field.querySelector("[role='listbox']");
  const options = [...field.querySelectorAll("[role='option']")];

  if (!select || !button || !buttonText || !list || !options.length) return;

  const close = () => {
    button.setAttribute("aria-expanded", "false");
    list.hidden = true;
    options.forEach((option) => {
      option.tabIndex = -1;
    });
  };

  const open = () => {
    customSelects.forEach((otherField) => {
      if (otherField === field) return;
      otherField.querySelector("[data-select-button]")?.setAttribute("aria-expanded", "false");
      const otherList = otherField.querySelector("[role='listbox']");
      if (otherList) otherList.hidden = true;
    });

    button.setAttribute("aria-expanded", "true");
    list.hidden = false;
    const selectedOption = options.find((option) => option.getAttribute("aria-selected") === "true");
    options.forEach((option) => {
      option.tabIndex = option === selectedOption ? 0 : -1;
    });
  };

  const choose = (option) => {
    options.forEach((item) => {
      item.setAttribute("aria-selected", String(item === option));
    });

    select.value = option.dataset.value;
    buttonText.textContent = option.textContent;
    select.dispatchEvent(new Event("change", { bubbles: true }));
    close();
    button.focus();
  };

  close();

  button.addEventListener("click", () => {
    if (list.hidden) {
      open();
    } else {
      close();
    }
  });

  button.addEventListener("keydown", (event) => {
    if (!["ArrowDown", "ArrowUp"].includes(event.key)) return;
    event.preventDefault();
    open();
    const selectedIndex = options.findIndex((option) => option.getAttribute("aria-selected") === "true");
    const direction = event.key === "ArrowDown" ? 1 : -1;
    options[(selectedIndex + direction + options.length) % options.length].focus();
  });

  options.forEach((option) => {
    option.tabIndex = -1;
    option.addEventListener("click", () => choose(option));

    option.addEventListener("keydown", (event) => {
      const currentIndex = options.indexOf(option);

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        choose(option);
      }

      if (event.key === "Escape") {
        event.preventDefault();
        close();
        button.focus();
      }

      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        const direction = event.key === "ArrowDown" ? 1 : -1;
        options[(currentIndex + direction + options.length) % options.length].focus();
      }
    });
  });
});

document.addEventListener("click", (event) => {
  customSelects.forEach((field) => {
    if (event.target instanceof Node && field.contains(event.target)) return;
    const button = field.querySelector("[data-select-button]");
    const list = field.querySelector("[role='listbox']");
    button?.setAttribute("aria-expanded", "false");
    if (list) list.hidden = true;
  });
});

const categoryTabs = document.querySelector("[data-category-tabs]");

if (categoryTabs) {
  const buttons = [...categoryTabs.querySelectorAll("[data-category]")];
  const panels = [...document.querySelectorAll("[data-category-panel]")];
  const categories = buttons.map((button) => button.dataset.category);
  const requestedCategory = new URLSearchParams(window.location.search).get("category");

  const selectCategory = (category) => {
    const selectedCategory = categories.includes(category) ? category : "iphone";

    buttons.forEach((button) => {
      const selected = button.dataset.category === selectedCategory;
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
    });

    panels.forEach((panel) => {
      panel.hidden = panel.dataset.categoryPanel !== selectedCategory;
    });

    const url = new URL(window.location.href);
    url.searchParams.set("category", selectedCategory);
    window.history.replaceState({}, "", url);
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => selectCategory(button.dataset.category));

    button.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;

      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const currentIndex = buttons.indexOf(button);
      const nextButton = buttons[(currentIndex + direction + buttons.length) % buttons.length];

      selectCategory(nextButton.dataset.category);
      nextButton.focus();
    });
  });

  selectCategory(requestedCategory || "iphone");
}
