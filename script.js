// Данные каталога.
// Чтобы показать настоящее фото, добавьте поле photo: "images/camry.jpg"
const cars = [
  { id: 1, brand: "Toyota",        model: "Camry",    year: 2021, mileage: 42000,  fuel: "Бензин",  gearbox: "АКПП", price: 24500, color: "#c9ced1", type: "sedan" },
  { id: 2, brand: "Honda",         model: "CR-V",     year: 2019, mileage: 68000,  fuel: "Бензин",  gearbox: "АКПП", price: 21800, color: "#2f5d8a", type: "suv" },
  { id: 3, brand: "Hyundai",       model: "Tucson",   year: 2022, mileage: 18000,  fuel: "Дизель",  gearbox: "АКПП", price: 27900, color: "#a63d2f", type: "suv" },
  { id: 4, brand: "Kia",           model: "Rio",      year: 2020, mileage: 55000,  fuel: "Бензин",  gearbox: "МКПП", price: 11200, color: "#e4e7e9", type: "hatch" },
  { id: 5, brand: "BMW",           model: "320i",     year: 2018, mileage: 83000,  fuel: "Бензин",  gearbox: "АКПП", price: 23400, color: "#1c2730", type: "sedan" },
  { id: 6, brand: "Mercedes-Benz", model: "E 200",    year: 2020, mileage: 47000,  fuel: "Бензин",  gearbox: "АКПП", price: 36800, color: "#6f7a80", type: "sedan" },
  { id: 7, brand: "Lexus",         model: "RX 350",   year: 2017, mileage: 96000,  fuel: "Бензин",  gearbox: "АКПП", price: 31500, color: "#d9d2c5", type: "suv" },
  { id: 8, brand: "Volkswagen",    model: "Golf",     year: 2023, mileage: 9000,   fuel: "Бензин",  gearbox: "Робот", price: 22900, color: "#3d7a5a", type: "hatch" }
];

const fmt = n => "$" + n.toLocaleString("ru-RU");
const $ = id => document.getElementById(id);

// Осветление / затемнение цвета (amt от -100 до 100)
function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const f = v => Math.max(0, Math.min(255, Math.round(v + (amt / 100) * (amt > 0 ? 255 - v : v))));
  return "#" + [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(f).map(v => v.toString(16).padStart(2, "0")).join("");
}

// Реалистичная SVG-иллюстрация: объём, стёкла, блики, фары, диски
function carSVG(c) {
  const k = "c" + c.id;
  const body = {
    sedan: ["M14 82 L14 70 Q14 64 24 62 L58 56 Q74 40 100 38 L142 38 Q166 40 178 56 L212 62 Q226 64 226 74 L226 82 Z",
            "M68 55 Q80 43 102 41 L120 41 L120 56 Z M126 41 L142 41 Q160 43 171 56 L126 56 Z"],
    suv:   ["M14 84 L14 66 Q14 60 24 58 L48 54 L56 38 Q60 32 72 32 L158 32 Q172 32 178 42 L188 56 L214 62 Q228 64 228 76 L228 84 Z",
            "M62 54 L67 37 Q68 35 72 35 L118 35 L118 54 Z M124 35 L156 35 Q165 36 170 44 L178 54 L124 54 Z"],
    hatch: ["M14 82 L14 68 Q14 62 24 60 L50 56 Q58 40 80 38 L150 38 Q170 40 180 58 L214 62 Q226 64 226 76 L226 82 Z",
            "M60 55 Q68 42 84 41 L118 41 L118 55 Z M124 41 L148 41 Q162 43 172 55 L124 55 Z"]
  }[c.type];

  const wheel = x => `
    <circle cx="${x}" cy="84" r="19" fill="#05080a"/>
    <circle cx="${x}" cy="84" r="16" fill="#151a1d"/>
    <circle cx="${x}" cy="84" r="10.5" fill="url(#rim${k})"/>
    <g stroke="#5b666c" stroke-width="2" stroke-linecap="round">
      ${[0, 72, 144, 216, 288].map(a => { const r = a * Math.PI / 180;
        return `<line x1="${x}" y1="84" x2="${(x + 9.5 * Math.cos(r)).toFixed(1)}" y2="${(84 + 9.5 * Math.sin(r)).toFixed(1)}"/>`; }).join("")}
    </g>
    <circle cx="${x}" cy="84" r="3" fill="#2b3338"/>`;

  return `<svg viewBox="0 0 240 112" role="img" aria-label="${c.brand} ${c.model}">
    <defs>
      <linearGradient id="body${k}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${shade(c.color, 42)}"/>
        <stop offset=".45" stop-color="${c.color}"/>
        <stop offset="1" stop-color="${shade(c.color, -55)}"/>
      </linearGradient>
      <linearGradient id="glass${k}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#a8cfe0"/><stop offset=".5" stop-color="#3a5666"/><stop offset="1" stop-color="#121c22"/>
      </linearGradient>
      <radialGradient id="rim${k}"><stop offset="0" stop-color="#d9dfe2"/><stop offset="1" stop-color="#6d787e"/></radialGradient>
      <radialGradient id="shadow${k}"><stop offset="0" stop-color="#000" stop-opacity=".85"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
      <radialGradient id="lamp${k}"><stop offset="0" stop-color="#fffbe0"/><stop offset=".4" stop-color="#ffe58a" stop-opacity=".8"/><stop offset="1" stop-color="#ffe58a" stop-opacity="0"/></radialGradient>
    </defs>
    <ellipse cx="120" cy="100" rx="112" ry="9" fill="url(#shadow${k})"/>
    <path d="${body[0]}" fill="url(#body${k})" stroke="rgba(0,0,0,.5)" stroke-width="1.2"/>
    <path d="${body[1]}" fill="url(#glass${k})" stroke="rgba(0,0,0,.45)" stroke-width="1"/>
    <path d="M30 66 Q120 58 214 66" stroke="#fff" stroke-opacity=".28" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M24 74 L216 74" stroke="#000" stroke-opacity=".28" stroke-width="1.2"/>
    <line x1="121" y1="${c.type === "suv" ? 36 : 42}" x2="121" y2="76" stroke="#000" stroke-opacity=".35" stroke-width="1"/>
    <rect x="130" y="65" width="9" height="2.4" rx="1.2" fill="#000" fill-opacity=".45"/>
    <rect x="13" y="65" width="5" height="9" rx="2" fill="#d6372b"/>
    <circle cx="219" cy="68" r="14" fill="url(#lamp${k})"/>
    <ellipse cx="219" cy="68" rx="5" ry="3" fill="#fffbe0"/>
    <rect x="216" y="76" width="12" height="3" rx="1.5" fill="#000" fill-opacity=".5"/>
    ${wheel(56)}${wheel(178)}
  </svg>`;
}

// Состояние
let cart = [];

// Каталог
function renderCatalog() {
  const q = $("search").value.trim().toLowerCase();
  const brand = $("brand").value;
  const sort = $("sort").value;

  let list = cars.filter(c =>
    (!brand || c.brand === brand) &&
    (`${c.brand} ${c.model}`.toLowerCase().includes(q))
  );

  const sorters = {
    "price-asc":   (a, b) => a.price - b.price,
    "price-desc":  (a, b) => b.price - a.price,
    "year-desc":   (a, b) => b.year - a.year,
    "mileage-asc": (a, b) => a.mileage - b.mileage
  };
  if (sorters[sort]) list.sort(sorters[sort]);

  $("grid").innerHTML = list.map(c => {
    const inCart = cart.includes(c.id);
    return `<article class="card">
      <div class="card-img">${c.photo ? `<img src="${c.photo}" alt="${c.brand} ${c.model}" loading="lazy">` : carSVG(c)}</div>
      <div class="card-body">
        <h3>${c.brand} ${c.model}</h3>
        <p class="specs">${c.year} г. · ${c.mileage.toLocaleString("ru-RU")} км<br>${c.fuel}, ${c.gearbox}</p>
        <div class="price">${fmt(c.price)}</div>
        <button class="btn ${inCart ? "added" : ""}" data-id="${c.id}">${inCart ? "В корзине" : "В корзину"}</button>
      </div>
    </article>`;
  }).join("");

  $("empty").hidden = list.length > 0;
}

function fillBrands() {
  const brands = [...new Set(cars.map(c => c.brand))].sort();
  $("brand").insertAdjacentHTML("beforeend", brands.map(b => `<option>${b}</option>`).join(""));
}

// Корзина
function renderCart() {
  const items = cart.map(id => cars.find(c => c.id === id));
  $("cartCount").textContent = items.length;
  $("cartTotal").textContent = fmt(items.reduce((s, c) => s + c.price, 0));
  $("cartEmpty").hidden = items.length > 0;
  $("checkout").disabled = items.length === 0;
  $("cartList").innerHTML = items.map(c => `
    <li>
      <div>${c.brand} ${c.model}<small>${c.year} г. · ${fmt(c.price)}</small></div>
      <button data-remove="${c.id}">Убрать</button>
    </li>`).join("");
}

function toggleCart(id) {
  cart = cart.includes(id) ? cart.filter(x => x !== id) : [...cart, id];
  renderCart();
  renderCatalog();
}

function openDrawer(open) {
  $("drawer").classList.toggle("open", open);
  $("drawer").setAttribute("aria-hidden", String(!open));
  $("overlay").hidden = !open;
  if (open) $("cartClose").focus(); else $("cartOpen").focus();
}

// События
$("grid").addEventListener("click", e => {
  const btn = e.target.closest("[data-id]");
  if (btn) toggleCart(Number(btn.dataset.id));
});
$("cartList").addEventListener("click", e => {
  const btn = e.target.closest("[data-remove]");
  if (btn) toggleCart(Number(btn.dataset.remove));
});
["search", "brand", "sort"].forEach(id => $(id).addEventListener("input", renderCatalog));

$("cartOpen").addEventListener("click", () => openDrawer(true));
$("cartClose").addEventListener("click", () => openDrawer(false));
$("overlay").addEventListener("click", () => openDrawer(false));
document.addEventListener("keydown", e => { if (e.key === "Escape") openDrawer(false); });

$("checkout").addEventListener("click", () => {
  const msg = $("cartMsg");
  msg.className = "form-msg ok";
  msg.textContent = "Заявка отправлена. Менеджер позвонит вам в течение 15 минут.";
  cart = [];
  renderCart();
  renderCatalog();
});

$("testForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = $("fName").value.trim();
  const phone = $("fPhone").value.trim();
  const msg = $("formMsg");
  if (name.length < 2 || phone.replace(/\D/g, "").length < 9) {
    msg.className = "form-msg error";
    msg.textContent = "Введите имя и телефон не короче 9 цифр.";
    return;
  }
  msg.className = "form-msg ok";
  msg.textContent = `Спасибо, ${name}! Мы перезвоним, чтобы выбрать время.`;
  e.target.reset();
});

// Запуск
$("statCars").textContent = cars.length;
fillBrands();
renderCart();
renderCatalog();
