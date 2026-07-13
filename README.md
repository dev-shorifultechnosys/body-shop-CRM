# BodyShop Booster CRM — Premium Responsive Prototype v7

A clean HTML, CSS, and JavaScript prototype covering the primary desktop and mobile CRM workflows.

## Run

Open `index.html` in a modern browser. For the most reliable local experience, serve the folder with any static web server.

Example:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Demo login

- Email: `ux@bodyshopbooster.com`
- Password: `Testing321$`

## Separate login layouts

The project includes two purpose-built login compositions in the same responsive application:

- Desktop/tablet login: `.desktop-login-view`
- Phone login: `.mobile-login-view`

CSS automatically displays the correct login for the current viewport. The phone design is not a compressed desktop screen.

## Functional prototype areas

- Dashboard and all left navigation routes
- Customer and repair search/filtering
- Customer details drawer and stage updates
- Repair board and drag-and-drop stage changes
- Schedule: week, day, and capacity views
- Estimates and sales pipeline
- Invoices and payment flow
- Messaging and conversation sending
- Reviews, vehicles, parts, reports, team, integrations
- Settings tabs, theme, density, and collapsible sidebar
- Global command search (`Ctrl/Cmd + K`)
- Shop switcher, notifications, profile menu, logout
- Mobile bottom navigation and mobile create/more sheets
- CSV exports and print schedule action
- Device-local persistence for customers, appointments, estimates, invoices, and messages
- Mobile contact cards with immediate Call, Message, and Open actions
- Sticky mobile contact search with quick stage filters

## Scope

This is an interactive front-end prototype. It does not connect to the production BodyShop Booster database, authentication service, or APIs.
