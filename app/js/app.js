// Shared app shell: header/nav, storage helpers, tabs, toast, "Add to trip".

const NAV = [
  { href: "index.html", label: "Home" },
  { href: "plan.html", label: "Plan Trips" },
  { href: "stories.html", label: "Stories" },
  { href: "explore.html", label: "Explore" },
  { href: "thiruvannamalai.html", label: "Thiruvannamalai" },
  { href: "profile.html", label: "Profile" },
  { href: "business.html", label: "Business" },
  { href: "admin.html", label: "Admin" },
];

function renderShell() {
  // Works with and without ".html" (Vercel cleanUrls serves /plan for plan.html)
  let current = location.pathname.split("/").pop() || "index.html";
  if (!current.endsWith(".html")) current += ".html";
  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `
    <nav class="nav">
      <a class="brand" href="index.html">Yaa<span>tra</span></a>
      <div class="nav-links">
        ${NAV.map(n => `<a href="${n.href}" class="${current === n.href || (current === "destination.html" && n.href === "explore.html") ? "active" : ""}">${n.label}</a>`).join("")}
      </div>
    </nav>`;
  document.body.prepend(header);

  const footer = document.createElement("footer");
  footer.textContent = "Yaatra prototype — mock data only. Temple timings and dates must be verified before release.";
  document.body.append(footer);

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.id = "toast";
  document.body.append(toast);
}

// localStorage wrapper — falls back to in-memory if storage is unavailable.
const memoryStore = {};
const store = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem("yaatra." + key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return key in memoryStore ? memoryStore[key] : fallback;
    }
  },
  set(key, value) {
    memoryStore[key] = value;
    try { localStorage.setItem("yaatra." + key, JSON.stringify(value)); } catch { /* ignore */ }
  },
};

function toast(msg) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove("show"), 2200);
}

function initTabs(root = document) {
  root.querySelectorAll(".tabs").forEach(tabs => {
    tabs.addEventListener("click", e => {
      const btn = e.target.closest(".tab");
      if (!btn) return;
      tabs.querySelectorAll(".tab").forEach(t => t.classList.toggle("active", t === btn));
      const scope = tabs.parentElement;
      scope.querySelectorAll(":scope > .tab-panel").forEach(p =>
        p.classList.toggle("active", p.id === btn.dataset.tab));
    });
  });
}

// ---- Trips (shared by plan.html and "Add to trip" buttons) ----
function getTrips() { return store.get("trips", []); }
function saveTrips(trips) { store.set("trips", trips); }
function uid() { return Math.random().toString(36).slice(2, 10); }

function createTrip({ title, destination, start, days, travelers = 1, budget = 0, itinerary = [] }) {
  const trip = {
    id: uid(), title, destination, start, travelers: Number(travelers), budget: Number(budget),
    status: "Planned", ideas: [],
    days: Array.from({ length: Number(days) || 1 }, (_, i) => ({ items: itinerary[i] || [] })),
  };
  const trips = getTrips();
  trips.unshift(trip);
  saveTrips(trips);
  store.set("activeTrip", trip.id);
  return trip;
}

// Adds an item to the active trip's "Ideas" bucket (creates a trip if none exists).
function addToTrip(item) {
  let trips = getTrips();
  let trip = trips.find(t => t.id === store.get("activeTrip")) || trips[0];
  if (!trip) {
    trip = createTrip({ title: "My next trip", destination: item.destination || "", start: "", days: 2 });
    trips = getTrips();
    trip = trips[0];
  }
  trip.ideas.push({ id: uid(), type: item.type || "place", name: item.name, time: "", cost: item.cost || 0, note: item.note || "" });
  saveTrips(trips);
  toast(`Added "${item.name}" to ${trip.title}`);
}

const ITEM_ICONS = { place: "📍", meal: "🍛", stay: "🏨", transport: "🚆", note: "📝", temple: "🛕" };

function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function fmtDate(iso, offsetDays = 0) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  d.setDate(d.getDate() + offsetDays);
  return d.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" });
}

function postCard(p) {
  return `
    <article class="card">
      <div class="post-head">
        <div class="avatar">${escapeHtml(p.author[0])}</div>
        <div><b>${escapeHtml(p.author)}</b><div class="muted">${escapeHtml(p.place)} · ${escapeHtml(p.when)}</div></div>
        ${p.type === "story" ? '<span class="chip" style="margin-left:auto">Trip Story</span>' : ""}
      </div>
      <div class="card-media">${p.emoji}</div>
      <h3>${escapeHtml(p.title)}</h3>
      <p>${escapeHtml(p.body)}</p>
      ${p.details ? `<div class="details-card">💰 ${escapeHtml(p.details.cost)} · ⏱ ${escapeHtml(p.details.duration)} · 👥 Crowd: ${escapeHtml(p.details.crowd)}</div>` : ""}
      <div class="post-actions">
        <button class="btn btn-ghost btn-sm" onclick="this.textContent='❤️ ${p.likes + 1}'">🤍 ${p.likes}</button>
        <button class="btn btn-ghost btn-sm">💬 ${p.comments}</button>
        <button class="btn btn-ghost btn-sm" onclick="toast('Saved to collection')">🔖 Save</button>
        <button class="btn btn-outline btn-sm" style="margin-left:auto" onclick='addToTrip(${JSON.stringify({ name: p.place, destination: p.destination }).replace(/'/g, "&#39;")})'>＋ Add to trip</button>
      </div>
    </article>`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderShell();
  initTabs();
});
