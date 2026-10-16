// Mock data for the prototype. Replace with API calls (see spec §8).
// Thiruvannamalai facts are indicative and must be verified (spec §4.5).

const CURRENT_USER = {
  name: "Priya Raman", handle: "@priya.travels", city: "Bengaluru",
  bio: "Weekend explorer · temples, food trails and hill walks",
  interests: ["Temples", "Food", "Heritage", "Trekking"], diet: "Vegetarian",
  stats: { countries: 3, states: 11, cities: 42, trips: 18 },
  badges: ["🔥 Pancha Bhoota Sthalam Pilgrim", "🌕 Girivalam ×5", "🍛 Food Trail Explorer"],
};

const POSTS = [
  {
    id: "p1", type: "story", author: "Arjun K", place: "Arunachaleswarar Temple", destination: "Thiruvannamalai",
    when: "2 days ago", emoji: "🛕", title: "2 days in Thiruvannamalai on Pournami",
    body: "Early morning darshan, evening Girivalam under the full moon and a quiet morning at Ramanasramam. Here's the exact plan we followed.",
    details: { cost: "₹4,500 per person", duration: "2 days", crowd: "Very high at night" }, likes: 312, comments: 41,
  },
  {
    id: "p2", type: "post", author: "Lakshmi S", place: "Sri Ramanasramam", destination: "Thiruvannamalai",
    when: "5 days ago", emoji: "🧘", title: "Silence at the old meditation hall",
    body: "Peaceful even on a busy weekend. Elderly-friendly paths and clean facilities.",
    details: { cost: "Free", duration: "2 hours", crowd: "Low" }, likes: 128, comments: 9,
  },
  {
    id: "p3", type: "post", author: "Emma W", place: "Promenade Beach", destination: "Puducherry",
    when: "1 week ago", emoji: "🌊", title: "Sunrise walk in Puducherry",
    body: "Combined Puducherry with Thiruvannamalai — perfect long weekend from Chennai.",
    details: { cost: "₹0", duration: "1 hour", crowd: "Medium" }, likes: 204, comments: 17,
  },
  {
    id: "p4", type: "post", author: "Ravi M", place: "Gingee Fort", destination: "Thiruvannamalai",
    when: "2 weeks ago", emoji: "🏰", title: "Climbing Rajagiri at Gingee",
    body: "Start before 8 am to beat the heat. Carry water, there are few shops at the top.",
    details: { cost: "Entry ticket", duration: "4 hours", crowd: "Low" }, likes: 97, comments: 6,
  },
];

const DESTINATIONS = [
  {
    id: "thiruvannamalai", name: "Thiruvannamalai", region: "Tamil Nadu", emoji: "🛕",
    summary: "Temple town at the foot of the sacred Arunachala hill, home to the Arunachaleswarar Temple.",
    bestSeason: "Nov – Feb", tags: ["Temples", "Spiritual", "Heritage"], guide: "thiruvannamalai.html",
  },
  {
    id: "puducherry", name: "Puducherry", region: "Puducherry", emoji: "🌊",
    summary: "French-quarter streets, seaside promenade and cafés.", bestSeason: "Oct – Mar", tags: ["Beach", "Food", "Heritage"],
  },
  {
    id: "madurai", name: "Madurai", region: "Tamil Nadu", emoji: "🏯",
    summary: "Ancient city of the Meenakshi Amman Temple and legendary street food.", bestSeason: "Oct – Mar", tags: ["Temples", "Food"],
  },
  {
    id: "ooty", name: "Ooty", region: "Tamil Nadu", emoji: "⛰️",
    summary: "Nilgiri hill station with tea estates and a heritage toy train.", bestSeason: "Mar – Jun", tags: ["Hills", "Nature"],
  },
];

// Places per destination: hotels, food, sights, transport. Names are placeholders.
const PLACES = {
  thiruvannamalai: {
    hotels: [
      { name: "Temple View Residency", type: "Hotel", price: "₹2,500/night", rating: 4.3, distance: "0.4 km from temple", tags: ["Pure veg", "Family rooms"] },
      { name: "Girivalam Path Inn", type: "Hotel", price: "₹1,800/night", rating: 4.1, distance: "On Girivalam path", tags: ["Parking", "Lift"] },
      { name: "Ashram guest houses", type: "Ashram stay", price: "By application", rating: 4.7, distance: "Near Ramanasramam", tags: ["Simple", "Quiet"] },
      { name: "Arunachala Budget Lodge", type: "Lodge", price: "₹900/night", rating: 3.8, distance: "1.2 km from temple", tags: ["Budget"] },
    ],
    food: [
      { name: "Temple Street Tiffin Centre", cuisine: "South Indian", veg: true, price: "₹200 for two", rating: 4.4, mustTry: "Ghee pongal, filter coffee" },
      { name: "Girivalam Meals Hall", cuisine: "Meals / Thali", veg: true, price: "₹300 for two", rating: 4.2, mustTry: "Banana-leaf meals" },
      { name: "Ashram Road Café", cuisine: "Café / Continental", veg: true, price: "₹600 for two", rating: 4.3, mustTry: "Fresh juices, millet bowls" },
    ],
    sights: [
      { name: "Arunachaleswarar Temple", type: "Temple", hours: "Morning & evening (verify)", time: "2–3 h", fee: "Free / special darshan tickets", emoji: "🛕" },
      { name: "Sri Ramanasramam", type: "Ashram", hours: "Daytime", time: "1–2 h", fee: "Free", emoji: "🧘" },
      { name: "Virupaksha Cave & Skandashram", type: "Hill caves", hours: "Daytime", time: "2–3 h", fee: "Free", emoji: "⛰️" },
      { name: "Sathanur Dam", type: "Dam & park", hours: "Daytime", time: "Half day", fee: "Small entry fee", emoji: "💧" },
      { name: "Gingee Fort", type: "Fort", hours: "Daytime", time: "Half day", fee: "Entry ticket", emoji: "🏰" },
    ],
    transport: [
      { from: "Chennai", mode: "Bus", duration: "~4 h", cost: "₹200–₹600", freq: "Frequent" },
      { from: "Chennai", mode: "Train", duration: "~4–5 h", cost: "₹150–₹800", freq: "Limited" },
      { from: "Chennai", mode: "Car", duration: "~3.5–4 h", cost: "₹3,500–₹5,000 cab", freq: "Anytime" },
      { from: "Bengaluru", mode: "Bus", duration: "~4.5–5 h", cost: "₹300–₹900", freq: "Frequent" },
      { from: "Puducherry", mode: "Bus", duration: "~2.5–3 h", cost: "₹120–₹300", freq: "Frequent" },
    ],
  },
  puducherry: {
    hotels: [{ name: "Seaside Heritage Villa", type: "Boutique", price: "₹4,200/night", rating: 4.5, distance: "French Quarter", tags: ["Breakfast"] }],
    food: [{ name: "Rue Café", cuisine: "French / Café", veg: false, price: "₹900 for two", rating: 4.4, mustTry: "Croissants" }],
    sights: [{ name: "Promenade Beach", type: "Beach", hours: "All day", time: "1–2 h", fee: "Free", emoji: "🌊" }],
    transport: [{ from: "Chennai", mode: "Car (ECR)", duration: "~3 h", cost: "₹3,000 cab", freq: "Anytime" }],
  },
  madurai: { hotels: [], food: [], sights: [{ name: "Meenakshi Amman Temple", type: "Temple", hours: "Morning & evening", time: "2–3 h", fee: "Free", emoji: "🏯" }], transport: [] },
  ooty: { hotels: [], food: [], sights: [{ name: "Nilgiri Mountain Railway", type: "Heritage train", hours: "Scheduled", time: "Half day", fee: "Ticket", emoji: "🚂" }], transport: [] },
};

const QA = [
  { q: "Is Girivalam safe at night for families?", a: "Yes, very crowded and well lit on Pournami. Keep kids close and agree a meeting point.", votes: 34 },
  { q: "Can we keep phones inside the temple?", a: "Phones are generally allowed but photography inside the sanctum is not. Check current rules at the entrance.", votes: 21 },
];

// Thiruvannamalai guide content (spec §4.5)
const TVM = {
  timings: [
    { slot: "Morning darshan", time: "~5:30 AM – 12:30 PM" },
    { slot: "Afternoon break", time: "~12:30 PM – 3:30 PM" },
    { slot: "Evening darshan", time: "~3:30 PM – 9:30 PM" },
  ],
  history: [
    { period: "Legend", text: "Shiva appears as an endless column of fire before Brahma and Vishnu, then takes the form of the Arunachala hill." },
    { period: "~9th century CE", text: "Chola-era structures and inscriptions." },
    { period: "13th–14th c.", text: "Hoysala patronage; Veera Ballala III associated with the town." },
    { period: "14th–17th c.", text: "Vijayanagara and Nayak additions, including major gopurams." },
    { period: "19th–20th c.", text: "Sri Ramana Maharshi, Seshadri Swamigal and Yogi Ramsuratkumar make it a global spiritual centre." },
    { period: "Today", text: "Administered by the Tamil Nadu HR&CE Department; major pilgrimage hub." },
  ],
  lingams: [
    { name: "Indra Lingam", dir: "East" }, { name: "Agni Lingam", dir: "South-East" },
    { name: "Yama Lingam", dir: "South" }, { name: "Niruthi Lingam", dir: "South-West" },
    { name: "Varuna Lingam", dir: "West" }, { name: "Vayu Lingam", dir: "North-West" },
    { name: "Kubera Lingam", dir: "North" }, { name: "Esanya Lingam", dir: "North-East" },
  ],
  festivals: [
    { name: "Karthigai Deepam", when: "Tamil month Karthigai (Nov–Dec)", note: "10-day Brahmotsavam; Maha Deepam lit atop Arunachala. Extreme crowds.", crowd: "Extreme" },
    { name: "Maha Shivaratri", when: "Feb–Mar", note: "All-night worship.", crowd: "Very high" },
    { name: "Chithirai Vasantha Utsavam", when: "Apr–May", note: "Spring festival.", crowd: "High" },
    { name: "Pournami Girivalam", when: "Every full moon", note: "14 km walk around the hill.", crowd: "Very high" },
    { name: "Pradosham", when: "Twice monthly", note: "Evening worship to Nandi and Shiva.", crowd: "High" },
  ],
  etiquette: [
    "Traditional / modest clothing recommended",
    "Leave footwear at the deposit counters",
    "No photography inside the sanctum",
    "Carry cash for offerings and footwear counter",
    "Senior citizens: ask about separate queues",
  ],
  nearby: [
    { name: "Sri Ramanasramam", dist: "~2 km", emoji: "🧘" },
    { name: "Virupaksha Cave & Skandashram", dist: "Hill path", emoji: "⛰️" },
    { name: "Seshadri Swamigal Ashram", dist: "Girivalam path", emoji: "🙏" },
    { name: "Sathanur Dam", dist: "~30 km", emoji: "💧" },
    { name: "Gingee Fort", dist: "~35–40 km", emoji: "🏰" },
    { name: "Javadhu Hills", dist: "District", emoji: "🌲" },
  ],
  templates: [
    {
      title: "1-day temple darshan", days: 1, emoji: "🛕",
      itinerary: [[
        { type: "transport", name: "Bus/car to Thiruvannamalai", time: "05:00" },
        { type: "temple", name: "Arunachaleswarar Temple darshan", time: "09:30" },
        { type: "meal", name: "Lunch — South Indian meals", time: "12:30" },
        { type: "place", name: "Sri Ramanasramam", time: "15:30" },
        { type: "transport", name: "Return journey", time: "18:00" },
      ]],
    },
    {
      title: "2-day Pournami pilgrimage", days: 2, emoji: "🌕",
      itinerary: [
        [
          { type: "stay", name: "Check in near temple", time: "11:00" },
          { type: "temple", name: "Arunachaleswarar Temple darshan", time: "16:00" },
          { type: "place", name: "Girivalam (14 km)", time: "20:00" },
        ],
        [
          { type: "place", name: "Sri Ramanasramam", time: "08:00" },
          { type: "place", name: "Skandashram & Virupaksha Cave", time: "10:00" },
          { type: "transport", name: "Return journey", time: "15:00" },
        ],
      ],
    },
    {
      title: "3-day spiritual & heritage", days: 3, emoji: "🏰",
      itinerary: [
        [{ type: "temple", name: "Arunachaleswarar Temple", time: "07:00" }, { type: "place", name: "Sri Ramanasramam", time: "15:00" }],
        [{ type: "place", name: "Gingee Fort", time: "07:30" }, { type: "meal", name: "Lunch in Gingee", time: "13:00" }],
        [{ type: "place", name: "Sathanur Dam", time: "09:00" }, { type: "transport", name: "Return journey", time: "16:00" }],
      ],
    },
    {
      title: "Karthigai Deepam festival plan", days: 2, emoji: "🪔",
      itinerary: [
        [{ type: "stay", name: "Check in (book months ahead)", time: "10:00" }, { type: "note", name: "Pick a Deepam viewing spot", time: "16:00" }],
        [{ type: "temple", name: "Early darshan before peak crowd", time: "05:00" }, { type: "transport", name: "Leave before evening traffic", time: "12:00" }],
      ],
    },
  ],
};

// Approximate full-moon dates (mean synodic month). Verify with a panchangam (spec §7.4).
function upcomingFullMoons(count = 6, from = new Date()) {
  const SYNODIC = 29.530588853;
  const refNewMoon = Date.UTC(2000, 0, 6, 18, 14); // known new moon
  const days = (from.getTime() - refNewMoon) / 86400000;
  let n = Math.floor((days - SYNODIC / 2) / SYNODIC);
  const out = [];
  while (out.length < count) {
    const t = refNewMoon + (n * SYNODIC + SYNODIC / 2) * 86400000;
    if (t >= from.getTime() - 86400000) out.push(new Date(t));
    n++;
  }
  return out;
}
