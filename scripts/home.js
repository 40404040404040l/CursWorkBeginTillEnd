const normalizedPath = location.pathname.endsWith("/") ? location.pathname : `${location.pathname}/`;
const isNestedPage =
  location.pathname.includes("/pages/") ||
  /\/(?:catalog|favorites|cart|product|special-order|about)(?:\/|$)/.test(normalizedPath);
const pathPrefix = isNestedPage ? "../" : "";
const apiBase = `${pathPrefix}api`;
const productPagePath = isNestedPage ? "../catalog/" : "catalog/";

const cardOutlinePath =
  "M39 -14 C22 -12, 8 -6, 3 12 C-1 31, 4 48, 2 67 C0 93, 6 111, 4 139 C2 168, 1 196, 4 224 C7 255, 2 282, 6 309 C9 334, 4 363, 8 389 C11 420, 7 440, 17 456 C27 472, 43 475, 62 473 C92 471, 116 476, 148 474 C181 472, 208 477, 239 472 C257 469, 267 455, 269 434 C272 407, 266 387, 268 357 C270 329, 264 300, 267 270 C270 236, 264 210, 266 180 C268 160, 267 146, 269 139 C267 111, 273 93, 271 67 C269 48, 274 31, 270 12 C265 -6, 251 -12, 234 -14 C198 -18, 160 -12, 122 -13 C91 -16, 66 -18, 39 -14Z";
const heartPath =
  "M14.4 7.6 C15.2 8.3 16.1 9.6 16.9 11.2 C17.2 11.8 17.4 12.5 17.6 13.2 C17.9 12.1 18.3 10.9 18.8 9.7 C19.4 8.2 20.2 6.8 21.0 6.0 C22.0 5.0 23.2 4.5 24.5 4.6 C25.7 4.7 26.9 5.1 28.0 5.8 C29.0 6.5 29.6 7.5 30.0 8.8 C30.4 10.1 30.4 11.4 30.1 12.7 C29.8 14.0 29.3 15.3 28.6 16.4 C27.9 17.5 27.0 18.5 26.0 19.4 C25.2 20.2 24.5 21.0 23.9 21.9 C23.1 23.1 22.0 24.3 20.8 25.4 C19.5 26.5 18.1 27.4 16.7 28.1 C15.4 27.4 14.0 26.5 12.7 25.5 C11.3 24.5 10.0 23.3 8.9 22.0 C7.9 20.8 7.1 19.6 6.5 18.3 C5.9 17.0 5.5 15.6 5.1 14.3 C4.8 13.1 4.7 11.9 4.7 10.8 C4.7 9.6 5.0 8.5 5.6 7.6 C6.2 6.7 7.1 6.0 8.3 5.5 C9.7 4.9 11.2 5.1 12.7 5.9 C13.3 6.2 13.9 6.6 14.4 7.0 C14.6 7.2 14.7 7.4 14.4 7.6 Z";
const buttonOutlinePath =
  "M25.3 3.6 C19.0 3.2 13.1 4.9 9.3 7.8 C5.5 10.6 4.0 14.2 3.7 18.2 C3.4 20.9 3.1 23.6 3.6 26.8 C4.3 31.0 6.4 35.0 10.6 38.1 C14.7 41.2 20.3 42.9 27.5 42.6 C32.2 42.4 37.0 42.8 41.6 42.3 C46.1 41.8 50.7 42.7 55.2 42.2 C60.0 41.6 64.8 42.5 69.5 42.1 C74.2 41.7 79.0 42.6 83.8 42.2 C88.6 41.8 93.4 42.7 98.2 42.2 C103.0 41.7 107.8 42.6 112.6 42.1 C117.4 41.6 122.2 42.5 127.0 42.0 C131.8 41.5 136.6 42.4 141.4 42.1 C146.2 41.8 151.0 42.6 155.8 42.2 C160.6 41.9 165.4 42.7 170.2 42.3 C174.8 41.9 179.4 42.5 183.8 41.8 C189.8 40.9 194.8 39.0 198.6 35.9 C202.4 32.8 203.8 28.9 203.6 24.8 C203.4 22.0 203.6 19.2 203.1 16.4 C202.4 12.2 200.5 8.6 196.6 6.1 C192.6 3.6 186.8 2.9 180.2 3.5 C175.4 3.9 170.6 3.1 165.8 3.6 C161.0 4.1 156.2 3.2 151.4 3.7 C146.6 4.2 141.8 3.3 137.0 3.8 C132.2 4.3 127.4 3.4 122.6 3.9 C117.8 4.4 113.0 3.5 108.2 4.0 C103.4 4.5 98.6 3.6 93.8 4.1 C89.0 4.6 84.2 3.7 79.4 4.2 C74.6 4.7 69.8 3.8 65.0 4.3 C60.2 4.8 55.4 3.9 50.6 4.4 C45.8 4.9 41.0 4.0 36.2 4.5 C32.0 4.9 28.0 3.9 25.3 3.6 Z";
const quantityOutlinePath =
  "M24 3 C16 4, 8 8, 5 17 C2 26, 4 38, 9 47 C14 57, 25 61, 39 60 C55 59, 66 62, 80 60 C96 58, 111 61, 126 59 C139 57, 146 48, 147 36 C148 25, 145 14, 137 8 C128 1, 115 4, 101 3 C84 2, 67 5, 49 4 C39 3, 31 2, 24 3Z";

const optionLabels = {
  color: "Цвет",
  memory: "Память",
  sim: "SIM",
  noiseCancellation: "Шумоподавление",
  chip: "Чип",
  storage: "Накопитель",
  connection: "Версия",
};
const optionOrder = ["color", "memory", "storage", "chip", "sim", "connection", "noiseCancellation"];
const productCache = new Map();
let favoriteProductIds = new Set();
let activeCartButton = null;
let cartDialog = null;
let cartDialogProduct = null;
let cartDialogVariant = null;
let currentProduct = null;
let currentVariant = null;
let cartCount = 0;

const escapeHtml = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const applyTypography = (value) => {
  const glueWords = "а|в|и|к|о|с|у|во|да|до|за|из|ко|на|не|ни|но|об|от|по|со|без|для|над|под|при|про|как|что|или";
  const gluePattern = new RegExp(`(^|[\\s([{«„"'])(${glueWords})[ \\t\\r\\n]+`, "giu");
  let text = String(value ?? "");

  for (let pass = 0; pass < 4; pass += 1) {
    const nextText = text.replace(gluePattern, (_, prefix, word) => `${prefix}${word}\u00a0`);
    if (nextText === text) break;
    text = nextText;
  }

  return text;
};

const formatPrice = (price) => {
  if (!Number.isFinite(Number(price))) return "Цена по запросу";
  return `${Number(price).toLocaleString("ru-RU")} ₽`;
};

const fetchJson = async (url, options = {}) => {
  const response = await fetch(url, {
    credentials: "same-origin",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const payload = await response.json();

  if (!response.ok || !payload.ok) {
    throw new Error(payload?.error?.message || "Ошибка API");
  }

  return payload.data;
};

const resolveAsset = (path) => {
  if (!path || /^(https?:)?\/\//.test(path) || path.startsWith("/")) return path;
  return `${pathPrefix}${path}`;
};

const densityValue = (density) => Number(String(density || "1x").replace("x", "")) || 1;

const sourceSet = (entries = []) =>
  [...entries]
    .sort((left, right) => densityValue(left.density) - densityValue(right.density))
    .map((entry) => `${escapeHtml(resolveAsset(entry.path))} ${escapeHtml(entry.density)}`)
    .join(", ");

const renderResponsivePicture = (image, alt, width, height, loading = "lazy") => {
  const imagePath = typeof image === "string" ? image : image?.imagePath || image?.path || "";
  const sources = typeof image === "string" ? {} : image?.sources || image?.mainImageSources || {};
  const webpSrcset = sourceSet(sources.webp || []);
  const fallbackEntries = sources.png || sources.jpg || sources.jpeg || [];
  const fallbackSrcset = sourceSet(fallbackEntries);

  return `
    <picture>
      ${webpSrcset ? `<source type="image/webp" srcset="${webpSrcset}" />` : ""}
      <img src="${escapeHtml(resolveAsset(imagePath))}"${fallbackSrcset ? ` srcset="${fallbackSrcset}"` : ""} alt="${escapeHtml(alt)}" width="${width}" height="${height}"${loading ? ` loading="${loading}"` : ""} />
    </picture>
  `;
};

const normalizeImageText = (value) =>
  String(value ?? "")
    .toLowerCase()
    .replaceAll("ё", "е")
    .replace(/[^a-z0-9а-я]+/g, "");

const imageMatchesColor = (image, color) => {
  const normalizedColor = normalizeImageText(color);
  if (!normalizedColor) return false;

  const searchableText = normalizeImageText(`${image?.alt || ""} ${image?.imagePath || ""}`);
  if (searchableText.includes(normalizedColor)) return true;

  return String(color)
    .split(/\s+/)
    .map(normalizeImageText)
    .filter((word) => word.length > 2)
    .some((word) => searchableText.includes(word));
};

const imageForVariant = (product, variant) => {
  const color = variant?.parameters?.color;
  const colorImage = color && product?.images?.find((image) => imageMatchesColor(image, color));

  return colorImage || { imagePath: product?.mainImage, sources: product?.mainImageSources };
};

const isFavoritesPage = () =>
  document.body.classList.contains("favorites-page") &&
  !document.body.classList.contains("catalog-page") &&
  !document.body.classList.contains("cart-page") &&
  !document.body.classList.contains("product-page") &&
  !document.body.classList.contains("special-order-page");

const setFavoriteButtonState = (button, isFavorite, productName = "товар") => {
  if (!(button instanceof HTMLButtonElement)) return;

  button.setAttribute("aria-pressed", String(isFavorite));
  button.setAttribute(
    "aria-label",
    `${isFavorite ? "Убрать" : "Добавить"} ${productName} ${isFavorite ? "из избранного" : "в избранное"}`,
  );
};

const renderProductImage = (product, variant, width, height, loading = "lazy") =>
  renderResponsivePicture(imageForVariant(product, variant), product?.name || "Товар", width, height, loading);

const productHref = (product) => `${productPagePath}${encodeURIComponent(product.slug || "")}/`;

const normalizeProductSlug = (slug) =>
  String(slug || "")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/_/g, "-")
    .toLowerCase();

const sortOptionKeys = (keys) =>
  [...keys].sort((left, right) => {
    const leftIndex = optionOrder.indexOf(left);
    const rightIndex = optionOrder.indexOf(right);
    return (leftIndex === -1 ? 100 : leftIndex) - (rightIndex === -1 ? 100 : rightIndex);
  });

const optionId = (prefix, key) => `${prefix}-${key.replace(/[^a-z0-9_-]/gi, "-")}`;

const parametersText = (params) =>
  sortOptionKeys(Object.keys(params || {}))
    .map((key) => params[key])
    .filter(Boolean)
    .join(" / ");

const getSelectedParameters = (root) => {
  const params = {};
  root.querySelectorAll("[data-option-key]").forEach((field) => {
    const key = field.dataset.optionKey;
    const value = field.querySelector("select")?.value;
    if (key && value) params[key] = value;
  });
  return params;
};

const isExactVariant = (variant, params) =>
  Object.entries(params).every(([key, value]) => String(variant.parameters?.[key]) === String(value));

const scoreVariant = (variant, params) =>
  Object.entries(params).reduce(
    (score, [key, value]) => score + (String(variant.parameters?.[key]) === String(value) ? 1 : 0),
    0,
  );

const findMatchingVariant = (product, params, preferredKey = "") => {
  const variants = product?.variants || [];
  const exactVariant = variants.find((variant) => isExactVariant(variant, params));

  if (exactVariant) return exactVariant;

  const preferredValue = preferredKey ? params[preferredKey] : null;
  const preferredVariants = preferredValue
    ? variants.filter((variant) => String(variant.parameters?.[preferredKey]) === String(preferredValue))
    : [];
  const candidates = preferredVariants.length ? preferredVariants : variants;

  return (
    [...candidates].sort((left, right) => {
      const scoreDiff = scoreVariant(right, params) - scoreVariant(left, params);
      if (scoreDiff !== 0) return scoreDiff;
      return Number(left.price) - Number(right.price);
    })[0] ||
    product?.defaultVariant ||
    variants[0] ||
    null
  );
};

const applyVariantParameters = (root, variant) => {
  if (!root || !variant?.parameters) return;

  root.querySelectorAll("[data-option-key]").forEach((field) => {
    const key = field.dataset.optionKey;
    const value = variant.parameters[key];
    const select = field.querySelector("select");
    const buttonText = field.querySelector("[data-select-button] span");

    if (!key || value === undefined || !select) return;

    select.value = String(value);
    field.querySelectorAll("[role='option']").forEach((option) => {
      const selected = String(option.dataset.value) === String(value);
      option.setAttribute("aria-selected", String(selected));
      if (selected && buttonText) buttonText.textContent = option.textContent.trim();
    });
  });
};

const renderVariantFields = (product, prefix) => {
  const entries = sortOptionKeys(Object.keys(product.options || {}))
    .map((key) => [key, product.options[key]])
    .filter(([, values]) => Array.isArray(values) && values.length);
  const defaultParams = product.defaultVariant?.parameters || {};

  return entries
    .map(([key, values]) => {
      const selectedValue = String(defaultParams[key] ?? values[0]);
      const id = optionId(prefix, key);
      const label = optionLabels[key] || key;

      return `
        <div class="product-option" data-custom-select data-option-key="${escapeHtml(key)}">
          <label for="${id}">${escapeHtml(label)}</label>
          <select class="visually-hidden" id="${id}" name="${escapeHtml(key)}" tabindex="-1">
            ${values
              .map((value) => {
                const text = String(value);
                return `<option value="${escapeHtml(text)}"${text === selectedValue ? " selected" : ""}>${escapeHtml(text)}</option>`;
              })
              .join("")}
          </select>
          <button type="button" aria-haspopup="listbox" aria-expanded="false" data-select-button>
            <span>${escapeHtml(selectedValue)}</span>
          </button>
          <ul role="listbox" aria-label="${escapeHtml(label)}" hidden>
            ${values
              .map((value) => {
                const text = String(value);
                return `
                  <li>
                    <button type="button" role="option" aria-selected="${text === selectedValue}" data-value="${escapeHtml(text)}">
                      ${escapeHtml(text)}
                    </button>
                  </li>
                `;
              })
              .join("")}
          </ul>
        </div>
      `;
    })
    .join("");
};

const loadFavoriteIds = async () => {
  try {
    const products = await fetchJson(`${apiBase}/favorites.php`);
    favoriteProductIds = new Set(products.map((product) => String(product.id)));
  } catch (error) {
    console.warn(error);
  }
};

const loadProductBySlug = async (slug) => {
  if (productCache.has(slug)) return productCache.get(slug);
  const product = await fetchJson(`${apiBase}/product.php?slug=${encodeURIComponent(slug)}`);
  productCache.set(slug, product);
  return product;
};

const renderProductCard = (product) => {
  const href = productHref(product);
  const isFavorite = favoriteProductIds.has(String(product.id));
  const badges = [product.isNew ? "<span>NEW</span>" : "", product.isHit ? "<span>ХИТ</span>" : ""].join("");

  return `
    <li>
      <article data-card-link="${href}" data-product-id="${product.id}" data-product-slug="${escapeHtml(product.slug)}">
        <svg viewBox="0 0 273 456" aria-hidden="true">
          <path d="${cardOutlinePath}"/>
        </svg>
        <div>
          <header>
            <p>${badges}</p>
            <button type="button" aria-label="${isFavorite ? "Убрать" : "Добавить"} ${escapeHtml(product.name)} ${isFavorite ? "из избранного" : "в избранное"}" aria-pressed="${isFavorite}" data-favorite>
              <svg viewBox="0 0 35 32" aria-hidden="true">
                <path d="${heartPath}"/>
              </svg>
            </button>
          </header>
          <figure>
            ${renderResponsivePicture({ imagePath: product.mainImage, sources: product.mainImageSources }, product.name, 189, 234, "lazy")}
          </figure>
          <div>
            <h3><a href="${href}">${escapeHtml(product.name)}</a></h3>
            <p>от ${formatPrice(product.minPrice)}</p>
            <p>В наличии</p>
          </div>
          <button type="button" data-cart>
            <svg viewBox="3 3 201 40" aria-hidden="true">
              <path d="${buttonOutlinePath}"/>
              <path d="${buttonOutlinePath}"/>
            </svg>
            <span>В корзину</span>
          </button>
        </div>
      </article>
    </li>
  `;
};

const renderProducts = (list, products) => {
  if (!list) return;

  if (!products.length) {
    list.innerHTML = `<li class="products-empty"><p>Товары скоро появятся</p></li>`;
    return;
  }

  list.innerHTML = products.map(renderProductCard).join("");
};

const setButtonLoading = (button, loading) => {
  if (!button) return;
  button.disabled = loading;
  button.setAttribute("aria-busy", String(loading));
};

const addVariantToCart = async (product, variant, quantity = 1) => {
  if (!product?.id || !variant?.id) throw new Error("Не выбран вариант товара");

  const cart = await fetchJson(`${apiBase}/cart.php`, {
    method: "POST",
    body: JSON.stringify({
      productId: Number(product.id),
      variantId: Number(variant.id),
      quantity,
    }),
  });

  updateCartBadge(cart.count);
  return cart;
};

const cartTargets = () => [
  ...document.querySelectorAll('header a[href$="cart/"], header a[href$="cart.html"], header .header-current-icon'),
].filter((target) => target.matches('a[href$="cart/"], a[href$="cart.html"]') || Boolean(target.querySelector('img[src*="Korzina"]')));

const ensureCartBadge = (target) => {
  let badge = target.querySelector("[data-cart-count]");

  if (!badge) {
    badge = document.createElement("span");
    badge.dataset.cartCount = "";
    badge.setAttribute("aria-hidden", "true");
    target.append(badge);
  }

  return badge;
};

const updateCartBadge = (count = cartCount) => {
  cartCount = Number(count) || 0;

  cartTargets().forEach((target) => {
    const badge = ensureCartBadge(target);
    badge.textContent = cartCount > 99 ? "99+" : String(cartCount);
    badge.hidden = cartCount <= 0;
    target.setAttribute("data-cart-count-value", String(cartCount));
  });
};

const loadCartSummary = async () => {
  try {
    const cart = await fetchJson(`${apiBase}/cart.php`);
    updateCartBadge(cart.count);
    return cart;
  } catch (error) {
    console.warn(error);
    updateCartBadge(0);
    return null;
  }
};

const closeCartDialog = () => {
  if (!cartDialog?.open) return;
  cartDialog.close();
  document.body.classList.remove("menu-overlay-open");
  activeCartButton?.focus();
};

const syncCartDialogVariant = () => {
  if (!cartDialog || !cartDialogProduct) return;
  cartDialogVariant = findMatchingVariant(cartDialogProduct, getSelectedParameters(cartDialog), cartDialog.dataset.lastChangedKey);
  applyVariantParameters(cartDialog, cartDialogVariant);
  cartDialog.querySelector("[data-cart-dialog-price]").textContent = formatPrice(cartDialogVariant?.price);
};

const openCartDialog = (product, opener) => {
  if (!cartDialog) createCartDialog();

  cartDialogProduct = product;
  cartDialogVariant = product.defaultVariant || product.variants?.[0] || null;
  activeCartButton = opener;

  cartDialog.querySelector("h2").textContent = product.name;
  cartDialog.querySelector("[data-cart-dialog-options]").innerHTML = renderVariantFields(product, "cart");
  syncCartDialogVariant();
  initCustomSelects(cartDialog);

  cartDialog.querySelectorAll("select").forEach((select) => {
    select.addEventListener("change", () => {
      cartDialog.dataset.lastChangedKey = select.name;
      syncCartDialogVariant();
    });
  });

  cartDialog.showModal();
  document.body.classList.add("menu-overlay-open");
};

const createCartDialog = () => {
  document.body.insertAdjacentHTML(
    "beforeend",
    `
      <dialog class="cart-config-dialog" aria-labelledby="cart-config-title">
        <form method="dialog">
          <header>
            <h2 id="cart-config-title">Товар</h2>
            <button type="button" aria-label="Закрыть выбор характеристик" data-cart-dialog-close>
              <img src="${pathPrefix}DesignEkran/svg/OverPlay_Krest.svg" alt="" width="35" height="33" aria-hidden="true" />
            </button>
          </header>
          <div data-cart-dialog-options></div>
          <div class="cart-dialog-actions">
            <strong data-cart-dialog-price>0 ₽</strong>
            <button type="submit" value="confirm" data-cart-dialog-confirm>В корзину</button>
          </div>
        </form>
      </dialog>
    `,
  );

  cartDialog = document.querySelector(".cart-config-dialog");
  cartDialog.querySelector("[data-cart-dialog-close]").addEventListener("click", closeCartDialog);
  cartDialog.addEventListener("click", (event) => {
    if (event.target === cartDialog) closeCartDialog();
  });
  cartDialog.addEventListener("close", () => {
    document.body.classList.remove("menu-overlay-open");
  });
  cartDialog.addEventListener("submit", async (event) => {
    event.preventDefault();
    const confirmButton = cartDialog.querySelector("[data-cart-dialog-confirm]");

    try {
      setButtonLoading(confirmButton, true);
      await addVariantToCart(cartDialogProduct, cartDialogVariant, 1);
      if (document.body.classList.contains("cart-page")) await loadCartPage();
      closeCartDialog();
    } catch (error) {
      console.warn(error);
    } finally {
      setButtonLoading(confirmButton, false);
    }
  });
};

const initializedSelects = new WeakSet();

const closeCustomSelect = (field) => {
  const button = field.querySelector("[data-select-button]");
  const list = field.querySelector("[role='listbox']");
  button?.setAttribute("aria-expanded", "false");
  if (list) list.hidden = true;
  field.querySelectorAll("[role='option']").forEach((option) => {
    option.tabIndex = -1;
  });
};

function initCustomSelects(root = document) {
  root.querySelectorAll("[data-custom-select]").forEach((field) => {
    if (initializedSelects.has(field)) return;

    const select = field.querySelector("select");
    const button = field.querySelector("[data-select-button]");
    const buttonText = button?.querySelector("span");
    const list = field.querySelector("[role='listbox']");
    const options = [...field.querySelectorAll("[role='option']")];

    if (!select || !button || !buttonText || !list || !options.length) return;
    initializedSelects.add(field);

    const open = () => {
      document.querySelectorAll("[data-custom-select]").forEach((otherField) => {
        if (otherField !== field) closeCustomSelect(otherField);
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
      buttonText.textContent = option.textContent.trim();
      select.dispatchEvent(new Event("change", { bubbles: true }));
      closeCustomSelect(field);
      button.focus();
    };

    closeCustomSelect(field);

    button.addEventListener("click", () => {
      if (list.hidden) open();
      else closeCustomSelect(field);
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
          closeCustomSelect(field);
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
}

const initMenuOverlay = () => {
  const menuOverlay = document.querySelector("[data-menu-close]")?.closest(".menu-overlay");
  const menuOpenButton = document.querySelector("[data-menu-open]");
  const menuCloseButton = document.querySelector("[data-menu-close]");

  if (!menuOverlay || !menuOpenButton || !menuCloseButton) return;

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
    if (event.target === menuOverlay) closeMenu();
  });
  menuOverlay.addEventListener("transitionend", (event) => {
    if (event.target === menuOverlay && !menuOverlay.classList.contains("is-open")) menuOverlay.hidden = true;
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuOverlay.classList.contains("is-open")) closeMenu();
  });
};

const initOrderOverlay = () => {
  const orderOverlay = document.querySelector(".order-overlay");
  const orderOpenButton = document.querySelector("[data-order-open]");
  const orderCloseButton = document.querySelector("[data-order-close]");
  const orderForm = orderOverlay?.querySelector("form");
  const orderSuccess = orderOverlay?.querySelector("[data-order-success]");

  if (!orderOverlay || !orderOpenButton || !orderCloseButton || !orderForm || !orderSuccess) return;

  orderForm.querySelector("[name='name']")?.setAttribute("required", "");
  orderForm.querySelector("[name='phone']")?.setAttribute("required", "");

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
    if (event.target === orderOverlay && !orderOverlay.classList.contains("is-complete")) closeOrder();
  });
  orderOverlay.addEventListener("transitionend", (event) => {
    if (event.target === orderOverlay && !orderOverlay.classList.contains("is-open")) orderOverlay.hidden = true;
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

  orderForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(orderForm);
    const submitButton = orderForm.querySelector("button[type='submit']");

    try {
      setButtonLoading(submitButton, true);
      await fetchJson(`${apiBase}/orders.php`, {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          telegram: formData.get("telegram"),
          city: formData.get("city"),
          address: formData.get("address"),
          postalCode: formData.get("postal-code"),
          delivery: formData.get("delivery"),
        }),
      });
      await loadCartPage();
      orderOverlay.classList.add("is-complete");
      orderOverlay.setAttribute("aria-labelledby", "order-success-title");
      orderForm.hidden = true;
      orderSuccess.hidden = false;
      orderOverlay.scrollTo({ top: 0, behavior: "smooth" });
      orderSuccess.querySelector("a")?.focus();
    } catch (error) {
      console.warn(error);
    } finally {
      setButtonLoading(submitButton, false);
    }
  });
};

const initSpecialOrderForm = () => {
  const specialOrderForm = document.querySelector("[data-special-order-form]");
  const successOverlay = document.querySelector("[data-special-order-success-overlay]");

  if (!specialOrderForm || !successOverlay) return;

  specialOrderForm.querySelector("[name='name']")?.setAttribute("required", "");
  specialOrderForm.querySelector("[name='phone']")?.setAttribute("required", "");
  specialOrderForm.querySelector("[name='request']")?.setAttribute("required", "");

  specialOrderForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(specialOrderForm);
    const submitButton = specialOrderForm.querySelector("button[type='submit']");

    try {
      setButtonLoading(submitButton, true);
      await fetchJson(`${apiBase}/special-orders.php`, {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          telegram: formData.get("telegram"),
          request: formData.get("request"),
        }),
      });

      successOverlay.hidden = false;
      successOverlay.setAttribute("aria-hidden", "false");
      document.body.classList.add("menu-overlay-open");
      requestAnimationFrame(() => {
        successOverlay.classList.add("is-open", "is-complete");
        successOverlay.scrollTo({ top: 0, behavior: "smooth" });
        successOverlay.querySelector("a")?.focus();
      });
    } catch (error) {
      console.warn(error);
    } finally {
      setButtonLoading(submitButton, false);
    }
  });
};

const loadHomeProducts = async () => {
  const list = document.querySelector("body:not(.catalog-page):not(.favorites-page):not(.cart-page):not(.product-page) #products > ul");
  if (!list) return;

  try {
    const products = await fetchJson(`${apiBase}/products/popular.php`);
    renderProducts(list, products);
  } catch (error) {
    console.warn(error);
  }
};

const initCatalogPage = () => {
  const categoryTabs = document.querySelector("[data-category-tabs]");
  if (!categoryTabs) return;

  const buttons = [...categoryTabs.querySelectorAll("[data-category]")];
  const panels = [...document.querySelectorAll("[data-category-panel]")];
  const categories = buttons.map((button) => button.dataset.category);
  const requestedCategory = new URLSearchParams(window.location.search).get("category");
  const productPanel = document.querySelector("#products[data-category-panel]");
  const productList = productPanel?.querySelector("ul");
  const productTitle = productPanel?.querySelector("h2");
  const categoryTitles = {
    airpods: "Наушники AirPods",
    iphone: "Смартфоны iPhone",
    macbook: "Ноутбуки MacBook",
    ipad: "Планшеты iPad",
  };

  const loadCatalogCategory = async (category) => {
    if (!productList) return;

    try {
      const products = await fetchJson(`${apiBase}/products.php?category=${encodeURIComponent(category)}`);
      renderProducts(productList, products);
    } catch (error) {
      console.warn(error);
      renderProducts(productList, []);
    }
  };

  const selectCategory = (category) => {
    const selectedCategory = categories.includes(category) ? category : "iphone";

    buttons.forEach((button) => {
      const selected = button.dataset.category === selectedCategory;
      button.setAttribute("aria-controls", "products");
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
    });

    panels.forEach((panel) => {
      panel.hidden = panel !== productPanel;
    });

    if (productPanel) {
      productPanel.dataset.categoryPanel = selectedCategory;
      productPanel.setAttribute("aria-labelledby", `${selectedCategory}-tab`);
    }

    if (productTitle) productTitle.textContent = categoryTitles[selectedCategory] || "Товары каталога";

    const url = new URL(window.location.href);
    url.searchParams.set("category", selectedCategory);
    window.history.replaceState({}, "", url);
    loadCatalogCategory(selectedCategory);
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
};

const loadFavoritesPage = async () => {
  if (!isFavoritesPage()) return;

  const list = document.querySelector("#products > ul");
  if (!list) return;

  try {
    const products = await fetchJson(`${apiBase}/favorites.php`);
    favoriteProductIds = new Set(products.map((product) => String(product.id)));
    renderProducts(list, products);
  } catch (error) {
    console.warn(error);
    renderProducts(list, []);
  }
};

const updateProductImage = () => {
  const figure = document.querySelector("body.product-page .product figure");
  if (!figure || !currentProduct) return;

  figure.innerHTML = renderProductImage(currentProduct, currentVariant, 520, 610, "eager");
};

const syncProductVariant = () => {
  const productForm = document.querySelector("body.product-page .product form");
  const priceElement = document.querySelector("body.product-page .product > section > p:nth-of-type(3)");
  const stockElement = document.querySelector("body.product-page .product > section > p:nth-of-type(2)");

  if (!productForm || !currentProduct) return;
  currentVariant = findMatchingVariant(currentProduct, getSelectedParameters(productForm), productForm.dataset.lastChangedKey);
  applyVariantParameters(productForm, currentVariant);
  if (priceElement) priceElement.textContent = formatPrice(currentVariant?.price);
  if (stockElement) stockElement.textContent = currentVariant?.stock > 0 ? "В наличии" : "Под заказ";
  updateProductImage();
};

const loadProductPage = async () => {
  const productArticle = document.querySelector("body.product-page .product");
  if (!productArticle) return;

  const pathSlug = decodeURIComponent(location.pathname.match(/\/catalog\/([^/?#]+)\/?$/)?.[1] || "");
  const slug = normalizeProductSlug(new URLSearchParams(window.location.search).get("slug") || pathSlug || "iphone-air");

  try {
    currentProduct = await loadProductBySlug(slug);
    currentVariant = currentProduct.defaultVariant || currentProduct.variants?.[0] || null;

    productArticle.dataset.productId = currentProduct.id;
    productArticle.dataset.productSlug = currentProduct.slug;

    document.title = `${currentProduct.name} | THEOSK STORE`;

    const title = document.querySelector("#product-title");
    const favoriteButton = productArticle.querySelector("[data-favorite]");
    const description = productArticle.querySelector("section > p:first-of-type");
    const stock = productArticle.querySelector("section > p:nth-of-type(2)");
    const price = productArticle.querySelector("section > p:nth-of-type(3)");
    const form = productArticle.querySelector("form");
    const advantagesSection = document.querySelector(".product-description");
    const advantagesTitle = document.querySelector("#advantages-title");

    if (title) title.textContent = currentProduct.name;
    if (favoriteButton) {
      const isFavorite = favoriteProductIds.has(String(currentProduct.id));
      favoriteButton.setAttribute("aria-pressed", String(isFavorite));
      favoriteButton.setAttribute(
        "aria-label",
        `${isFavorite ? "Убрать" : "Добавить"} ${currentProduct.name} ${isFavorite ? "из избранного" : "в избранное"}`,
      );
    }
    updateProductImage();
    if (description) description.textContent = currentProduct.description || "Новое, запакованное устройство с гарантией";
    if (stock) stock.textContent = currentVariant?.stock > 0 ? "В наличии" : "Под заказ";
    if (price) price.textContent = formatPrice(currentVariant?.price);

    if (form) {
      form.innerHTML = `
        ${renderVariantFields(currentProduct, "product")}
        <button type="button" data-cart>
          <span>В корзину</span>
        </button>
      `;
      initCustomSelects(form);
      form.querySelectorAll("select").forEach((select) => {
        select.addEventListener("change", () => {
          form.dataset.lastChangedKey = select.name;
          syncProductVariant();
        });
      });
    }

    if (advantagesTitle) advantagesTitle.textContent = "Преимущества устройства";
    if (advantagesSection) {
      const advantages = Array.isArray(currentProduct.advantages) ? currentProduct.advantages : [];
      const lead = advantagesSection.querySelector("p");
      const list = advantagesSection.querySelector("ul");
      if (lead) lead.textContent = applyTypography(currentProduct.description || "");
      if (list) {
        list.innerHTML = advantages.length
          ? advantages.map((item) => `<li>${escapeHtml(applyTypography(item))}</li>`).join("")
          : `<li>Оригинальное устройство с проверенной комплектацией.</li>`;
      }
    }
  } catch (error) {
    console.warn(error);
  }
};

const renderCartItem = (item) => {
  const product = item.product || {
    id: item.productId,
    name: item.productName,
    slug: item.productSlug,
    mainImage: item.mainImage,
    mainImageSources: item.mainImageSources,
  };
  const isFavorite = favoriteProductIds.has(String(item.productId));
  const params = parametersText(item.selectedParameters);

  return `
    <li>
      <article data-cart-item-id="${item.id}" data-product-id="${item.productId}" data-product-slug="${escapeHtml(product.slug || "")}">
        <button type="button" aria-label="${isFavorite ? "Убрать" : "Добавить"} ${escapeHtml(product.name || "товар")} ${isFavorite ? "из избранного" : "в избранное"}" aria-pressed="${isFavorite}" data-favorite>
          <svg viewBox="0 0 35 32" aria-hidden="true">
            <path d="${heartPath}"/>
          </svg>
        </button>
        <figure>
          ${renderResponsivePicture({ imagePath: product.mainImage, sources: product.mainImageSources }, product.name || "Товар", 189, 234, "lazy")}
        </figure>
        <div>
          <h3><a href="${productHref(product)}">${escapeHtml(product.name || "Товар")}</a></h3>
          <p>${escapeHtml(params || "Выбранная конфигурация")}</p>
          <p>${formatPrice(item.fixedPrice)}</p>
        </div>
        <form aria-label="Количество ${escapeHtml(product.name || "товара")}">
          <svg viewBox="0 0 150 64" aria-hidden="true">
            <path d="${quantityOutlinePath}"/>
          </svg>
          <button type="button" aria-label="Уменьшить количество" data-cart-quantity="decrease">
            <img src="${pathPrefix}DesignEkran/svg/Minus.svg" alt="" width="27" height="5" />
          </button>
          <output>${item.quantity}</output>
          <button type="button" aria-label="Увеличить количество" data-cart-quantity="increase">
            <img src="${pathPrefix}DesignEkran/svg/Plus.svg" alt="" width="27" height="27" />
          </button>
        </form>
        <button type="button" aria-label="Удалить ${escapeHtml(product.name || "товар")} из корзины" data-cart-remove>
          <svg viewBox="0 0 64 64" aria-hidden="true">
            <path d="M31 3 C19 4, 9 11, 5 22 C1 34, 4 47, 14 56 C24 65, 39 63, 50 56 C60 49, 64 36, 60 24 C56 12, 45 2, 31 3Z"/>
          </svg>
          <img src="${pathPrefix}DesignEkran/svg/Mini-Krestik.svg" alt="" width="20" height="20" />
        </button>
      </article>
    </li>
  `;
};

async function loadCartPage() {
  const cartSection = document.querySelector("body.cart-page #cart");
  if (!cartSection) return;

  const list = cartSection.querySelector("ul");
  const total = cartSection.querySelector("p strong");
  const titleCount = document.querySelector("#cart-title span");
  const orderButton = document.querySelector("[data-order-open]");

  try {
    const cart = (await loadCartSummary()) || { items: [], total: 0, count: 0 };
    const items = cart.items || [];
    const count = items.reduce((sum, item) => sum + Number(item.quantity || 0), 0);

    if (list) {
      list.innerHTML = items.length
        ? items.map(renderCartItem).join("")
        : `<li class="cart-empty"><p>Корзина пока пустая</p></li>`;
    }
    if (titleCount) titleCount.textContent = String(count);
    if (total) total.textContent = formatPrice(cart.total || 0);
    if (orderButton) orderButton.disabled = items.length === 0;
  } catch (error) {
    console.warn(error);
  }
}

const updateCartQuantity = async (article, action) => {
  const itemId = article?.dataset.cartItemId;
  const output = article?.querySelector("output");
  const currentQuantity = Number(output?.textContent || 1);
  const quantity = action === "increase" ? currentQuantity + 1 : Math.max(1, currentQuantity - 1);

  if (!itemId || quantity === currentQuantity) return;

  await fetchJson(`${apiBase}/cart.php`, {
    method: "POST",
    body: JSON.stringify({ action: "update", itemId: Number(itemId), quantity }),
  });
  await loadCartPage();
};

const removeCartItem = async (article) => {
  const itemId = article?.dataset.cartItemId;
  if (!itemId) return;

  await fetchJson(`${apiBase}/cart.php`, {
    method: "POST",
    body: JSON.stringify({ action: "delete", itemId: Number(itemId) }),
  });
  await loadCartPage();
};

document.addEventListener("click", async (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const selectField = target.closest("[data-custom-select]");
  if (!selectField) {
    document.querySelectorAll("[data-custom-select]").forEach(closeCustomSelect);
  }

  const quantityButton = target.closest("[data-cart-quantity]");
  if (quantityButton instanceof HTMLButtonElement) {
    try {
      setButtonLoading(quantityButton, true);
      await updateCartQuantity(quantityButton.closest("article"), quantityButton.dataset.cartQuantity);
    } catch (error) {
      console.warn(error);
    } finally {
      setButtonLoading(quantityButton, false);
    }
    return;
  }

  const removeButton = target.closest("[data-cart-remove]");
  if (removeButton instanceof HTMLButtonElement) {
    try {
      setButtonLoading(removeButton, true);
      await removeCartItem(removeButton.closest("article"));
    } catch (error) {
      console.warn(error);
      setButtonLoading(removeButton, false);
    }
    return;
  }

  const favoriteButton = target.closest("[data-favorite]");
  if (favoriteButton instanceof HTMLButtonElement) {
    const article = favoriteButton.closest("article");
    const productId = article?.dataset.productId;
    const productName =
      article?.querySelector("h3, #product-title")?.textContent?.trim() ||
      favoriteButton.getAttribute("aria-label")?.replace(/^(Добавить|Убрать)\s+/, "").replace(/\s+(в|из)\s+избранное$/, "") ||
      "товар";
    const active = favoriteButton.getAttribute("aria-pressed") === "true";

    if (!productId) return;

    setButtonLoading(favoriteButton, true);
    setFavoriteButtonState(favoriteButton, !active, productName);
    try {
      await fetchJson(`${apiBase}/favorites.php`, {
        method: "POST",
        body: JSON.stringify({
          action: active ? "delete" : "add",
          productId: Number(productId),
        }),
      });
      if (active) favoriteProductIds.delete(String(productId));
      else favoriteProductIds.add(String(productId));
      if (isFavoritesPage()) await loadFavoritesPage();
      if (document.body.classList.contains("cart-page")) await loadCartPage();
    } catch (error) {
      console.warn(error);
      setFavoriteButtonState(favoriteButton, active, productName);
    } finally {
      setButtonLoading(favoriteButton, false);
    }
    return;
  }

  const cartButton = target.closest("[data-cart]");
  if (cartButton instanceof HTMLButtonElement) {
    const card = cartButton.closest("article");

    if (document.body.classList.contains("product-page")) {
      try {
        setButtonLoading(cartButton, true);
        await addVariantToCart(currentProduct, currentVariant, 1);
      } catch (error) {
        console.warn(error);
      } finally {
        setButtonLoading(cartButton, false);
      }
      return;
    }

    const slug = card?.dataset.productSlug;
    if (!slug) return;

    try {
      setButtonLoading(cartButton, true);
      const product = await loadProductBySlug(slug);
      openCartDialog(product, cartButton);
    } catch (error) {
      console.warn(error);
    } finally {
      setButtonLoading(cartButton, false);
    }
    return;
  }

  const card = target.closest("[data-card-link]");
  if (card instanceof HTMLElement) {
    if (target.closest("button, a")) return;
    if (card.dataset.cardLink) window.location.href = card.dataset.cardLink;
  }
});

const initStorePages = async () => {
  await loadFavoriteIds();
  await loadCartSummary();
  await loadHomeProducts();
  initCatalogPage();
  await loadFavoritesPage();
  await loadProductPage();
  await loadCartPage();
};

initMenuOverlay();
initOrderOverlay();
initSpecialOrderForm();
initCustomSelects();
initStorePages();
