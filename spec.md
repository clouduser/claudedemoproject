# Yaatra — Social Travel Platform: Product & Technical Specification

| Field | Value |
|---|---|
| Version | 0.1 (Draft) |
| Date | 2026-10-16 |
| Author | Elayaraja S |
| Status | For review |

---

## 1. Overview

**Yaatra** is a social media platform built around travel. It combines three things that travelers currently juggle across separate apps:

1. **Plan** — build day-by-day vacation itineraries, alone or with companions.
2. **Share & discover** — post stories, photos and trip reports; browse other travelers' real experiences.
3. **Book & explore** — see popular hotels, food spots, sightseeing and travel options for any destination, in context of the itinerary.

As a flagship destination module, the platform ships with a curated **Thiruvannamalai (Arunachaleswarar Temple) guide** — temple history, darshan planning, Girivalam, festival calendar and local logistics — which also serves as the template for future "Sacred & Heritage Destination" guides.

### 1.1 Problem statement

- Trip planning is fragmented: inspiration on Instagram/YouTube, reviews on TripAdvisor/Google, bookings on OTAs, plans in spreadsheets or WhatsApp.
- Social feeds show polished highlights but rarely the practical details (cost, route, timing, crowd levels) that make an experience reproducible.
- Pilgrimage and heritage destinations in India (e.g. Thiruvannamalai) have poor structured information: timings, festival crowds, dress code and rituals are scattered across blogs.

### 1.2 Vision

> "See a trip you love, make it your own in one tap."

Every shared story is linked to real places, so any post can be turned into an itinerary, and any itinerary can be published back as a story.

---

## 2. Goals and Non-Goals

### 2.1 Goals (v1)

| # | Goal | Success metric |
|---|---|---|
| G1 | Users can create and collaborate on trip plans | ≥ 40% of MAU create at least one trip within 30 days |
| G2 | Users share experiences with place-tagged content | ≥ 25% of completed trips published as a story |
| G3 | Users discover places through others' content | ≥ 20% of itinerary items originate from "Add to trip" on a post |
| G4 | Integrated hotel / food / sightseeing / transport info | ≥ 60% of trips have at least one hotel and one transport leg attached |
| G5 | Thiruvannamalai module is the go-to guide for visitors | ≥ 10k trips to Thiruvannamalai in the first Karthigai Deepam season |

### 2.2 Non-goals (v1)

- Being a full OTA: we link out / use affiliate or partner booking APIs; we do not hold inventory or process hotel payments ourselves in v1.
- Real-time chat beyond trip-group chat (no general DMs in v1 — see §15).
- Live video streaming.
- Visa processing or travel insurance sales.

---

## 3. Personas

| Persona | Description | Key needs |
|---|---|---|
| **Planner Priya** (28, IT professional, Bengaluru) | Plans 3–4 weekend trips/year with friends | Collaborative itinerary, budget split, quick hotel comparisons |
| **Storyteller Arjun** (32, hobby photographer) | Posts trip photo essays | Beautiful photo layouts, map-linked stories, followers |
| **Family Traveler Lakshmi** (45, Chennai) | Plans temple and family trips | Trustworthy timings, safe/clean stays, vegetarian food, elderly-friendly travel |
| **Pilgrim / Seeker Ravi** (55) | Visits Thiruvannamalai for Girivalam every full moon | Pournami dates, crowd forecasts, ashram info, simple stays |
| **International Visitor Emma** (38, UK) | Visiting Ramana Maharshi's ashram and South India | Cultural context, etiquette, transport from Chennai, English content |
| **Local Host / Business** | Hotel, restaurant or guide in a destination | Listing claim, respond to reviews, promotions |

---

## 4. Feature Specification

### 4.1 Accounts & Profiles

**Requirements**

- Sign up / sign in via phone OTP, email, Google, Apple.
- Profile: name, handle, photo, bio, home city, languages, travel interests (temples, beaches, trekking, food, heritage, wildlife…), dietary preference (veg / non-veg / Jain / vegan).
- **Travel map**: a world/India map highlighting places visited (auto-filled from completed trips and tagged posts).
- **Stats**: countries, states, cities visited; trips completed; km travelled.
- Badges: e.g. "Pancha Bhoota Sthalam Pilgrim", "Girivalam ×10", "Karthigai Deepam 2026".
- Account types: Personal, Creator (analytics), Business (verified listings; see §4.8).
- Privacy: public / followers-only / private profile; hide travel map; hide home city.

### 4.2 Vacation Planning (Trips)

#### 4.2.1 Create a trip

- Inputs: title, destination(s), dates (or "flexible: N days in month X"), travelers (adults/children/seniors), budget range, travel style (budget / comfort / luxury), interests.
- Start options:
  1. **Blank trip**
  2. **From a template** (e.g. "Thiruvannamalai 2-day Pilgrimage", "Pondicherry + Thiruvannamalai weekend")
  3. **Clone from a post / another user's public trip** ("Make it my trip")
  4. **AI-suggested itinerary** generated from inputs (see §4.2.6)

#### 4.2.2 Itinerary builder

- Day-by-day timeline; each day has ordered **items**:
  - Place visit (sightseeing, temple, museum…)
  - Meal (restaurant / street food spot)
  - Stay (hotel check-in / check-out)
  - Transport leg (flight, train, bus, cab, self-drive)
  - Custom note / activity
- Each item: time slot, duration, cost estimate, notes, attachments (tickets, PDFs), booking reference, status (idea / planned / booked / done).
- Drag-and-drop reordering across days; "Ideas" bucket for unscheduled items.
- **Map view** per day with route lines and travel-time estimates between items.
- **Conflict warnings**: item outside opening hours, overlapping times, unrealistic travel time, temple closed for afternoon break, festival-day crowd alerts.
- Offline access to the itinerary (cached on device).

#### 4.2.3 Collaboration

- Invite companions by link, handle, or phone contact. Roles: Owner, Editor, Viewer.
- Real-time co-editing with presence indicators.
- **Voting** on ideas (👍/👎) to decide between hotels, restaurants, activities.
- **Trip chat** (group thread scoped to the trip) with item mentions.
- Activity log ("Priya added Sathanur Dam to Day 2").

#### 4.2.4 Budget & expenses

- Planned budget per category: stay, food, transport, activities, shopping, donations/offerings.
- Expense tracking during the trip; split among travelers (equal / custom / by share); settle-up summary.
- Multi-currency with daily conversion rates.

#### 4.2.5 Checklists & reminders

- Packing lists from templates (e.g. temple visit: traditional attire, cash for offerings, footwear bag).
- Document checklist (ID, tickets, hotel vouchers).
- Push reminders: check-in times, train departure, darshan slot, Pournami Girivalam start time.

#### 4.2.6 AI trip assistant

- Generates a draft itinerary from: destination, dates, interests, budget, pace, mobility constraints.
- Uses platform data (popular places, opening hours, community ratings, festival calendar) to ground suggestions; every suggested item links to a real place record.
- Conversational edits: "Make Day 2 more relaxed", "Add a vegetarian dinner near the temple", "We have an elderly parent — avoid long walks".
- Clearly labeled as AI-generated; user must accept items into the trip.

#### 4.2.7 Trip lifecycle

`Draft → Planned → Ongoing → Completed → (optional) Published as Story`

- On completion, prompt the user to publish a **Trip Story** auto-assembled from itinerary + photos taken during the trip dates (with user consent to scan the camera roll).

### 4.3 Social: Stories, Posts & Experiences

#### 4.3.1 Content types

| Type | Description |
|---|---|
| **Post** | 1–20 photos/videos with caption, place tags, hashtags |
| **Trip Story** | Long-form, multi-day narrative linked to a trip; sections per day; embedded map; cost breakdown (optional) |
| **Moment** | Ephemeral 24-hour story (photo/video) |
| **Review** | Structured rating of a place (hotel, restaurant, sight) with sub-scores |
| **Tip** | Short practical advice attached to a place ("Leave footwear at the paid counter near Rajagopuram") |
| **Question** | Ask the community about a destination; answers are upvoted |

#### 4.3.2 Creation

- Photo/video upload with in-app crop, filters, captions; EXIF location auto-suggestion (stripped from public file — see §9).
- Place tagging (search our places DB); multiple places per post.
- "Practical details" card (optional): cost, duration, best time, crowd level, accessibility.
- Tag fellow travelers; co-author trip stories.
- Drafts and scheduled publishing.
- Language: English, Tamil, Hindi in v1, with auto-translate on view.

#### 4.3.3 Consumption & discovery

- **Home feed**: following + recommended, ranked by interests, destinations in user's upcoming trips, engagement and recency.
- **Explore**: by destination, by interest, by season ("Where to go in December"), trending places.
- **Destination page**: aggregated posts, stories, tips, Q&A, plus hotels/food/sights/transport tabs (§4.4).
- **Map explore**: pins of posts on a map; filter by category.
- Every post with place tags shows **"Add to trip"** and **"Make it my trip"** (for Trip Stories).

#### 4.3.4 Engagement

- Like, comment (threaded), save to collections ("Temple trips", "Food in Chennai"), share (in-app and external).
- Follow users and **follow destinations** (get notified of new content/tips/alerts).
- "Helpful" votes on tips, reviews and answers; top contributors per destination become **Local Experts**.

#### 4.3.5 Community safety & moderation

- Automated screening: nudity/violence classifiers, spam/link-farm detection, hate-speech detection (multilingual).
- Report flows for posts, comments, users, listings.
- Human moderation queue with SLA (high-severity within 1 hour).
- Cultural-sensitivity rules for religious sites: content policy prohibiting photos where photography is prohibited (e.g. inside the sanctum) — flagged posts get a gentle warning and may be restricted.
- Review integrity: one review per user per place per stay/visit, fake-review detection, disclosure of sponsored content.

### 4.4 Destination Information Integration

Each destination exposes four integrated catalogs. Data comes from third-party providers plus community content, normalized into a single **Place** model (§6).

#### 4.4.1 Hotels & stays

- Listing: name, photos, star category, price range (per night), location/distance to key landmarks, amenities (AC, parking, veg-only kitchen, lift, wheelchair access), guest ratings (provider + Yaatra community), cancellation policy.
- Filters: price, rating, distance to landmark (e.g. "within 1 km of Arunachaleswarar Temple"), property type (hotel, homestay, ashram guest house, dharamshala, resort), family-friendly, pure-veg.
- Live availability and price via partner APIs; "Book" deep-links to partner (affiliate) in v1, native booking in v2.
- Community signal: "Stayed here" posts and reviews from people you follow are surfaced first.
- Add to trip as a Stay item with check-in/out dates.

#### 4.4.2 Food & restaurants

- Listing: cuisine, veg/non-veg/Jain, price for two, hours, must-try dishes (community-tagged), photos, ratings.
- Categories: restaurants, street food, cafés, sweet shops, temple prasadam/annadhanam info.
- Filters: open now, pure veg, near current location / near itinerary item, rating, budget.
- "Food trails": curated or community lists (e.g. "Breakfast spots around Girivalam path").

#### 4.4.3 Local sightseeing

- Types: temples, monuments, nature, museums, viewpoints, markets, experiences/tours.
- Details: history summary, opening hours, entry fees, time needed, best time of day, dress code, photography rules, accessibility, crowd forecast.
- Bookable tours/experiences via partner APIs (guided temple walk, heritage tours).
- "Nearby" carousel and "Day trip from here" suggestions.

#### 4.4.4 Travel options

- **Getting there**: flights, trains, buses, cab/self-drive from user's origin city, with duration, indicative price and frequency.
  - Flights: search via partner API (deep link to book).
  - Trains: schedules and availability via authorized Indian Railways data partner; deep link to IRCTC for booking.
  - Buses: state transport (e.g. TNSTC/SETC) and private operators via aggregator API.
  - Road: route, distance, toll estimate, drive time.
- **Getting around**: auto/cab apps (deep links), local bus, bike/scooter rental, walking distances.
- Multi-modal comparison card: "Chennai → Thiruvannamalai: Train ~4–5 h / Bus ~4 h / Car ~3.5–4 h" with cost bands.
- Add any option to the itinerary as a Transport item.

#### 4.4.5 Live destination info

- Weather forecast and best-season indicator.
- Alerts: festivals, closures, strikes, heavy-rain/cyclone warnings, crowd surges.
- Emergency contacts: police, hospital, tourist helpline.

### 4.5 Thiruvannamalai — Flagship Destination Module

A curated, editorially reviewed guide that is both a destination page and a set of ready-to-use trip templates.

> **Content accuracy:** All timings, ticket prices, distances and dates below are indicative and **must be verified with the temple administration (HR&CE Department, Govt. of Tamil Nadu) before publication**, and refreshed each season. The CMS must store a "last verified" date per fact.

#### 4.5.1 Arunachaleswarar Temple — overview content

- **Deity**: Lord Shiva as **Arunachaleswarar / Annamalaiyar**, with consort Parvati as **Unnamulai Amman (Apithakuchambal)**.
- **Significance**: One of the **Pancha Bhoota Sthalams** — the five Shiva temples representing the five elements; Thiruvannamalai represents **Agni (fire)**, the deity worshipped as the **Agni Lingam**. The Arunachala hill itself is revered as a manifestation of Shiva.
- **Scale**: One of the largest temple complexes in India (roughly 25 acres), with multiple prakarams (enclosures) and towering gopurams. The eastern **Rajagopuram** is among the tallest temple towers in India (about 66 m / 217 ft, 11 tiers).
- **Hymns**: Glorified in the Tevaram hymns of the Nayanmar saints (Appar, Sambandar) and in Manikkavasagar's *Thiruvempavai*, said to have been composed here.

#### 4.5.2 History timeline (content section)

| Period | Highlights (to be finalized by content team) |
|---|---|
| Ancient / legend | The legend of Shiva as an endless column of fire before Brahma and Vishnu; site revered in Tamil Saiva tradition |
| ~9th century CE onward | Chola-era structures and inscriptions |
| 13th–14th century | Hoysala patronage; Hoysala king Veera Ballala III associated with the town |
| 14th–17th century | Vijayanagara and Thanjavur Nayak additions, including major gopuram construction |
| 19th–20th century | Rise of Thiruvannamalai as a spiritual center through **Sri Ramana Maharshi** (Sri Ramanasramam) and saints such as **Seshadri Swamigal** and Yogi Ramsuratkumar |
| Present | Administered by the Tamil Nadu HR&CE Department; major pilgrimage and spiritual-tourism hub |

#### 4.5.3 Legends & stories (rich media)

- **The column of fire (Lingodbhava)**: Brahma and Vishnu argue over supremacy; Shiva appears as an infinite pillar of fire. Vishnu as a boar digs to find its base, Brahma as a swan flies to find its top; neither succeeds. Shiva then takes the form of the Arunachala hill.
- **Ardhanarishvara**: Parvati's penance here, after which Shiva grants her the left half of his body.
- Delivered as illustrated story cards, audio narration (English/Tamil/Hindi), and short video.

#### 4.5.4 Temple visit planner

- **Darshan timings** (displayed from CMS, typically early morning to midday and afternoon to night with a break) — with live "Open now / Closes in X min".
- **Pooja schedule**: daily kaala poojas with times.
- **Special darshan / ticket types** and fees (from CMS).
- **Recommended route inside the temple**: entry via Rajagopuram → key shrines and mandapams (e.g. the thousand-pillared mandapam, Sivaganga theertham, Patala Lingam shrine where Ramana Maharshi meditated, Unnamulai Amman shrine) → exit. Shown as an interactive temple map.
- **Etiquette & rules**: traditional dress recommended, footwear deposit, photography restrictions in inner sanctum, phone usage, queue norms.
- **Accessibility**: wheelchair availability, steps, resting areas, senior-citizen queue info.
- **Crowd forecast**: hour-by-hour estimate (low/medium/high/very high) from historical + community check-in data; extreme peaks on Pournami, Karthigai Deepam, Maha Shivaratri, Mondays and weekends.

#### 4.5.5 Girivalam (circumambulation of Arunachala)

- ~14 km barefoot walk around the Arunachala hill, traditionally on **Pournami (full moon)** nights.
- Interactive route map with: the **Ashta Lingams** (Indra, Agni, Yama, Niruthi, Varuna, Vayu, Kubera, Esanya Lingams), rest points, water/toilets, medical aid, food stalls, ashrams along the path.
- **Pournami calendar**: auto-computed full-moon start/end times (tithi) for the year with push reminders.
- Walk mode: GPS progress, distance completed, next Lingam, offline map, share live location with family.
- Safety tips: hydration, footwear-free walking care, night-walk safety, crowd zones.

#### 4.5.6 Festivals & calendar

- **Karthigai Deepam** (Tamil month Karthigai, Nov–Dec): ten-day Brahmotsavam culminating in the **Maha Deepam** lit atop Arunachala hill, visible for kilometers; draws very large crowds.
  - Special mode: crowd and traffic alerts, special bus/train announcements, stay-availability tracker, live updates feed, designated viewing spots.
- Other: Maha Shivaratri, Chithirai Vasantha Utsavam, Thiruvoodal, monthly Pradosham and Pournami.
- Festival calendar exportable to Google/Apple calendar.

#### 4.5.7 Spiritual & nearby places

| Place | Notes for listing |
|---|---|
| Sri Ramanasramam | Ashram of Sri Ramana Maharshi; meditation hall, samadhi; guest stays by prior application |
| Virupaksha Cave & Skandashram | On the slope of Arunachala; Ramana Maharshi lived here; reached by a hill path |
| Seshadri Swamigal Ashram | On the Girivalam path |
| Yogi Ramsuratkumar Ashram | Near the Girivalam path |
| Arunachala hill trek | Permits/rules vary — show current restrictions from CMS |
| Sathanur Dam | ~30 km; picnic spot, dam and park |
| Gingee (Senji) Fort | ~35–40 km; hilltop fort complex |
| Javadhu Hills | Hill station / nature getaway in the district |

#### 4.5.8 Getting to Thiruvannamalai (seed data; verify)

| From | Approx. distance | Options |
|---|---|---|
| Chennai | ~190–200 km | Bus (frequent), train, car |
| Bengaluru | ~200–210 km | Bus, car |
| Puducherry | ~100–110 km | Bus, car |
| Vellore / Katpadi | ~85 km | Bus, train |
| Nearest airports | Chennai (MAA), Bengaluru (BLR); Puducherry (limited flights) | Flight + road |
| Railway station | Tiruvannamalai (TNM) | Connected via Villupuram / Katpadi lines |

#### 4.5.9 Stays & food in Thiruvannamalai

- Pre-filtered hotel list: "Walking distance to temple", "On Girivalam path", "Ashram stays", "Budget lodges", "Family rooms".
- Food: predominantly vegetarian South Indian meals and tiffin; annadhanam info; cafés catering to international visitors near Ramanasramam.
- Data seeded from partner APIs and validated by local contributors; flagged "verified by Local Expert".

#### 4.5.10 Trip templates

1. **1-day temple darshan** (from Chennai/Bengaluru)
2. **2-day Pournami pilgrimage**: Day 1 darshan + evening Girivalam; Day 2 Ramanasramam + Skandashram
3. **3-day spiritual & heritage**: temple, ashrams, Gingee Fort, Sathanur Dam
4. **Karthigai Deepam festival plan** with crowd strategy
5. **Pondicherry + Thiruvannamalai weekend**

#### 4.5.11 Content governance

- Editorial owner + subject-matter reviewer (historian / temple-tradition expert) for history and ritual content.
- Sources cited per section (temple administration publications, HR&CE, ASI/state archaeology inscriptions, Ramanasramam publications).
- Community corrections flow ("Suggest an edit") routed to editors.
- Respectful tone guidelines; no commercialization of rituals; donations only linked to official channels.

### 4.6 Search

- Global search across users, places, destinations, posts, trips, hashtags.
- Typeahead with transliteration support (e.g. "tiruvannamalai", "thiruvannamalai", "திருவண்ணாமலை", "Arunachala" all resolve to the same destination).
- Filters by content type, date, rating, distance.

### 4.7 Notifications

- Social: likes, comments, follows, mentions, tags.
- Trip: collaborator edits, votes, reminders, price drops on watched hotels.
- Destination: new tips/alerts for followed destinations, Pournami & festival reminders.
- Channels: push, in-app, email digest; per-category user controls; quiet hours.

### 4.8 Business & Partner Portal

- Businesses claim listings (verification via phone/document/GST).
- Manage photos, hours, menus, offers; respond to reviews.
- Analytics: views, saves, "added to trip" count, clicks to book.
- Sponsored placements clearly labeled "Sponsored".

### 4.9 Admin & Ops Console

- Content moderation queue, user management, bans/appeals.
- CMS for destination guides (incl. Thiruvannamalai), festival calendars, trip templates, alerts.
- Place data management: merge duplicates, correct coordinates, override provider data.
- Feature flags and remote config.

---

## 5. Key User Flows

### 5.1 From inspiration to trip

1. User scrolls feed → sees a Trip Story "2 days in Thiruvannamalai on Pournami".
2. Taps **Make it my trip** → picks dates and travelers.
3. System clones itinerary, re-checks timings for new dates (flags Pournami, festival crowds), suggests available hotels near the original ones.
4. User invites spouse as Editor; they vote between two hotels.
5. User books hotel via partner deep link; enters booking reference.
6. Reminders fire; during the trip, Girivalam walk mode is used.
7. On completion, auto-drafted Trip Story is edited and published.

### 5.2 Destination research

1. Search "Thiruvannamalai" → destination page.
2. Tabs: Overview & History | Plan Visit | Girivalam | Stays | Food | Sights | Getting There | Community.
3. User saves places, asks a question in Q&A, adds items to a new trip.

### 5.3 Sharing an experience

1. Create Post → select photos → app suggests place tags from EXIF.
2. Add "practical details" card → publish.
3. Post appears on the place page, the user's travel map, and followers' feeds.

---

## 6. Data Model (core entities)

```
User(id, handle, name, avatar_url, bio, home_city_id, languages[], interests[],
     diet_pref, account_type, privacy, created_at)

Follow(follower_id, followee_id | destination_id, created_at)

Destination(id, name, aliases[], type[city|region|country], geo(lat,lng,bbox),
            parent_id, hero_media[], summary, best_season, guide_id?)

Place(id, destination_id, name, aliases[], category[hotel|restaurant|sight|
      temple|transport_hub|ashram|...], geo, address, hours(json), price_level,
      attributes(json), provider_refs[{provider, external_id}], rating_agg,
      verified, last_verified_at)

Trip(id, owner_id, title, destination_ids[], start_date, end_date, flexible(json),
     travelers(json), budget(json), status, visibility, cloned_from_trip_id?)

TripMember(trip_id, user_id, role[owner|editor|viewer])

TripDay(id, trip_id, date, order)

TripItem(id, trip_day_id?, trip_id, type[place|meal|stay|transport|note],
         place_id?, start_time, end_time, cost(json), booking_ref, status,
         notes, attachments[], order, created_by)

Vote(trip_item_id, user_id, value)

Expense(id, trip_id, paid_by, amount, currency, category, split(json), created_at)

Post(id, author_id, type[post|story|moment|review|tip|question], body,
     media[], place_ids[], trip_id?, practical_details(json), language,
     visibility, created_at, moderation_state)

Media(id, owner_id, type[image|video], url, width, height, blurhash,
      exif_stripped=true, taken_at, geo_private)

Comment(id, post_id, author_id, parent_id?, body, created_at)

Reaction(post_id|comment_id, user_id, type)

Review(post_id, place_id, overall, sub_scores(json), visit_date)

GuideContent(id, destination_id, section, locale, body, sources[],
             editor_id, reviewer_id, last_verified_at, version)

Event(id, destination_id, name, type[festival|pournami|pradosham|alert],
      start_at, end_at, crowd_level, details)

Notification(id, user_id, type, payload, read_at, created_at)
```

---

## 7. System Architecture

### 7.1 Clients

- **Mobile**: iOS + Android (React Native or Flutter — decision in §15), offline-first for itineraries and Girivalam maps.
- **Web**: responsive web app (Next.js) for planning on desktop and SEO-indexed destination/story pages.
- **Admin / Business portal**: web.

### 7.2 Backend services

| Service | Responsibility |
|---|---|
| API Gateway | Auth, rate limiting, routing (REST + GraphQL for feed/trip) |
| Identity | Accounts, OAuth, OTP, sessions |
| Social Graph | Follows, blocks, mutes |
| Content | Posts, stories, comments, reactions |
| Media | Upload (signed URLs), transcoding, EXIF stripping, thumbnails, CDN |
| Feed | Fan-out + ranking (hybrid push/pull) |
| Trip | Trips, items, collaboration (CRDT/OT over WebSocket), expenses |
| Places | Unified place catalog, provider ingestion, dedupe, enrichment |
| Inventory Adapter | Hotel/flight/train/bus partner API wrappers, caching, affiliate links |
| Guide/CMS | Editorial content, events calendar, templates |
| Search | Elasticsearch/OpenSearch with multilingual + transliteration analyzers |
| Recommendations | Interest/destination embeddings, collaborative filtering |
| AI Assistant | LLM orchestration with tool access to Places/Events/Trip services |
| Notifications | Push (FCM/APNs), email, in-app; scheduling for reminders |
| Moderation | ML classifiers + human review queue |
| Analytics | Event pipeline → warehouse |

### 7.3 Data stores

- PostgreSQL (users, trips, places, guides) with PostGIS for geo queries.
- Redis (caching, sessions, feed timelines, rate limits).
- Object storage + CDN (media).
- OpenSearch (search).
- Event bus (Kafka or managed equivalent) for fan-out, notifications, analytics.
- Data warehouse (BigQuery/Snowflake) for analytics and ML features.

### 7.4 Third-party integrations (candidates)

| Domain | Candidates | Notes |
|---|---|---|
| Maps, places, routing | Google Maps Platform / Mapbox / OpenStreetMap | Licensing determines what we can cache/store |
| Hotels | Booking.com / Expedia / Agoda affiliate APIs, MakeMyTrip / Goibibo partner APIs | Deep link + affiliate in v1 |
| Flights | Amadeus / Skyscanner / Indian OTA partners | Search + deep link |
| Trains | Authorized IRCTC data partners | Booking via IRCTC deep link |
| Buses | redBus / abhiBus partner APIs, TNSTC | Deep link |
| Restaurants | Google Places, Zomato/Swiggy partnerships (if available) | Plus community data |
| Tours & experiences | Viator / GetYourGuide / Klook | Affiliate |
| Weather | OpenWeather / Tomorrow.io / IMD | Alerts |
| Panchangam / tithi | Astronomical computation library + verified panchangam source | For Pournami/Pradosham times |
| AI | LLM API (e.g. Claude) | Itinerary generation, translation, summarization |
| Payments (v2) | Razorpay / Stripe | Native bookings, creator tips |

Each provider sits behind the Inventory Adapter so it can be swapped without client changes.

---

## 8. API Sketch (illustrative)

```
POST   /v1/trips                         create trip
GET    /v1/trips/{id}                    trip with days/items
POST   /v1/trips/{id}/items              add item
PATCH  /v1/trips/{id}/items/{itemId}     update / reorder
POST   /v1/trips/{id}/clone              clone into my trips
POST   /v1/trips/{id}/members            invite
POST   /v1/trips/{id}/assistant          AI suggestions (streams)
WS     /v1/trips/{id}/live               real-time collaboration

GET    /v1/feed?cursor=                  home feed
POST   /v1/posts                         create post/story/tip/review
GET    /v1/posts/{id}
POST   /v1/posts/{id}/comments
POST   /v1/posts/{id}/reactions

GET    /v1/destinations/{id}             overview + tabs metadata
GET    /v1/destinations/{id}/places?category=hotel&near=place:{id}&radius=1km
GET    /v1/destinations/{id}/events?from=&to=
GET    /v1/destinations/{id}/guide?section=history&locale=ta

GET    /v1/places/{id}
GET    /v1/places/{id}/availability?checkin=&checkout=&guests=
GET    /v1/transport/options?from=&to=&date=

GET    /v1/search?q=&type=
```

---

## 9. Privacy, Security & Compliance

- Compliance with India's **Digital Personal Data Protection Act, 2023**, and GDPR for EU users.
- Explicit consent for location, camera roll, contacts; granular revocation.
- **EXIF GPS stripped** from all public media; precise home location never shown.
- Delayed-posting option ("post after I leave") and auto-hide exact location for Moments.
- Live location sharing (Girivalam walk mode) only to chosen contacts, auto-expiring.
- Encryption in transit (TLS 1.2+) and at rest; secrets in a managed vault.
- OWASP ASVS L2 controls; rate limiting; abuse detection for scraping.
- Data export and account deletion (self-serve) within statutory timelines.
- Minors: age gate (13+; parental consent where required by law), restricted DMs/discovery for minors.
- Affiliate/sponsored disclosure per ASCI guidelines.

---

## 10. Non-Functional Requirements

| Area | Requirement |
|---|---|
| Performance | Feed first page p95 < 800 ms; trip load p95 < 500 ms; image first paint < 1.5 s on 4G |
| Availability | 99.9% monthly for core APIs; graceful degradation when partner APIs fail (cached data with "as of" timestamp) |
| Scalability | 1M MAU in year 1; burst handling for festival peaks (10× traffic on Karthigai Deepam day for Thiruvannamalai pages) |
| Offline | Trips, guide content and Girivalam map usable offline |
| Low bandwidth | Adaptive image quality; "data saver" mode |
| Accessibility | WCAG 2.1 AA; screen-reader support; large-text mode for senior users |
| Localization | English, Tamil, Hindi at launch; RTL-ready architecture |
| Observability | Tracing, metrics, structured logs; SLO dashboards and alerting |

---

## 11. Monetization

1. **Affiliate commissions** on hotels, flights, buses, tours (v1).
2. **Sponsored listings & promoted posts** for businesses (clearly labeled).
3. **Yaatra Plus** subscription: unlimited AI planning, offline maps for all destinations, price alerts, ad-free.
4. **Creator programs**: paid premium itineraries/guides, tips from followers (v2).
5. **Native bookings** with margin (v2).

No monetization of religious rituals; temple donations link only to official channels.

---

## 12. Analytics & KPIs

- Acquisition: installs, sign-up conversion.
- Activation: first trip created, first post, first follow within 7 days.
- Engagement: DAU/MAU, posts per creator, time in feed, saves.
- Planning: trips created, items per trip, collaborators per trip, clone rate from posts.
- Conversion: partner click-through, affiliate bookings, revenue per trip.
- Content health: moderation actions per 1k posts, report rate, review integrity flags.
- Thiruvannamalai module: guide views, template usage, Girivalam walk-mode sessions, Pournami reminder opt-ins.

---

## 13. Release Plan

| Phase | Scope | Target |
|---|---|---|
| **MVP (Phase 1)** | Accounts, profiles, posts/stories, feed, follow, trip builder (solo + collaborators), destination pages with places from Maps provider, hotel deep links, Thiruvannamalai guide (overview, history, timings, Girivalam map, festival calendar, templates) | Q1 2027 |
| **Phase 2** | AI assistant, expenses & split, transport comparison, crowd forecasts, Girivalam walk mode, Tamil/Hindi, business portal | Q2 2027 |
| **Phase 3** | Native bookings & payments, creator monetization, more sacred-destination guides (e.g. other Pancha Bhoota Sthalams: Chidambaram, Kanchipuram, Thiruvanaikaval, Srikalahasti) | H2 2027 |

**Launch timing note:** Target a public beta before a Karthigai Deepam season to seed the Thiruvannamalai community.

---

## 14. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Inaccurate temple timings/festival dates harm trust | CMS with "last verified" dates, official-source validation, community correction flow, prominent disclaimer |
| Partner API costs / ToS limits on caching | Adapter layer, aggressive but compliant caching, negotiated partner tiers |
| Cold-start content | Seed with editorial guides, onboard local creators, import-from-Instagram (with consent) |
| Festival-day traffic spikes | Load testing at 10×, CDN for static guide content, offline-first app |
| Cultural/religious sensitivity | Expert review, content policy for sacred spaces, respectful moderation |
| Fake reviews / spam | Verified-stay signals, ML detection, rate limits |
| Safety during Girivalam / crowds | Safety content, emergency contacts, live-location sharing, official advisories |

---

## 15. Open Questions

1. Mobile stack: React Native vs Flutter?
2. Primary maps provider (Google vs Mapbox/OSM) given caching/licensing constraints?
3. Should general direct messaging be in v1 or only trip-group chat?
4. Partnership with HR&CE / temple administration for official timings and darshan ticket integration — feasible?
5. Hill-trek (Arunachala) access rules change periodically — who owns updates?
6. Do we allow user-generated hotel listings (homestays) without a partner, and how are they verified?
7. AI assistant cost model — free tier limits?

---

## 16. Glossary

| Term | Meaning |
|---|---|
| Darshan | Viewing/worship of the deity at a temple |
| Girivalam | Circumambulation of a sacred hill (here, Arunachala) |
| Pournami | Full-moon day |
| Pradosham | Twice-monthly auspicious twilight period dedicated to Shiva |
| Gopuram | Monumental temple gateway tower |
| Prakaram | Enclosed courtyard/corridor around a shrine |
| Pancha Bhoota Sthalam | Five Shiva temples each representing an element (earth, water, fire, air, space) |
| Annadhanam | Free meal offered at temples |
| HR&CE | Hindu Religious and Charitable Endowments Department, Govt. of Tamil Nadu |
