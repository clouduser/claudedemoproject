# Yaatra — Prototype Scaffold

Static multi-page prototype of the social travel platform described in [../spec.md](../spec.md).
No build step and no dependencies. Data is mocked in `js/data.js`, and anything you create
(trips, posts, profile, alerts) is saved in the browser's localStorage.

## Run

From the project root:

```
npm start        # serves app/ at http://localhost:8080
```

Or simply open `index.html` in a browser.

## Pages (one per module)

| Page | Spec section | What it does |
|---|---|---|
| `index.html` | §1, §4.3.3 | Home: feed, upcoming trip, trending destinations, next Pournami |
| `plan.html` | §4.2 | Trip planner: create trips, day-by-day itinerary, ideas bucket, budget, companions, checklist, temple-break warnings |
| `stories.html` | §4.3 | Stories feed and composer (post / trip story / tip / review, practical details) |
| `explore.html` | §4.4, §4.6 | Destination search with aliases (e.g. "Arunachala", "Pondy") and interest filter |
| `destination.html?id=…` | §4.4 | Stays, food, sightseeing, getting there and community Q&A for a destination |
| `thiruvannamalai.html` | §4.5 | Temple overview & history, visit planner, Girivalam, festivals, nearby places, trip templates |
| `profile.html` | §4.1 | Profile, travel stats, badges, my posts/trips, settings |
| `business.html` | §4.8 | Listing claim form, listing analytics, review replies |
| `admin.html` | §4.9 | Moderation queue, CMS "last verified" tracking, destination alerts |

## Structure

```
app/
  css/styles.css   shared light-blue theme
  js/app.js        header/nav, storage, tabs, toast, trip helpers, post card
  js/data.js       mock data (replace with API calls per spec §8)
  *.html           one page per module
```

## Notes

- Hotel and restaurant names are placeholders. Temple timings, dates and distances are indicative and must be verified.
- Pournami dates are approximate (average lunar cycle); production should use a panchangam source.
