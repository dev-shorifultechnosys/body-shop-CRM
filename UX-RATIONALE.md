# UX rationale

## What changed

### V7 simplification
The desktop dashboard now uses a full-width repair board followed by a compact action and capacity row, removing the blank area created by uneven columns. Duplicate lower KPIs and shortcut blocks are removed from the dashboard because the same actions remain available through the global New menu.

On phones, contact discovery stays anchored beneath the header with sticky search, common stage filters, and three immediate actions on every customer card: Call, Message, and Open. The schedule opens as a day agenda on phones instead of shrinking the week grid.

### Desktop navigation
Primary work is grouped by task: Core Work, Sales, Communication, Operations, Insights, and Administration. The sidebar remains full-height and independently scrollable. It can collapse to an icon-only mode on desktop without hiding functionality.

### Dashboard hierarchy
The dashboard now follows a clear order:

1. Today at a glance
2. Customer, scheduling, and sales workflows
3. Repair workflow and action center
4. Capacity and operating metrics
5. Quick actions

The repair board no longer uses a fixed oversized height. At narrower desktop widths, the action center moves below the board instead of compressing both areas.

### Repair workflow
Repair cards show customer, vehicle, value, owner, RO number, and next action. Dragging a card between columns updates the repair stage in the prototype. On phones, the Kanban board becomes a scannable priority list.

### Mobile-first contact actions
Phone screens prioritize name, vehicle, status, value, next action, open repair, and message actions. Forms use full-width controls and large tap targets. Navigation changes to a five-item bottom bar with create and more sheets.

### Separate login designs
Desktop uses a two-panel operational story plus a focused sign-in form. Mobile uses a compact shop-status hero and a bottom sign-in sheet designed for one-handed use.

### Premium visual direction
The interface uses a restrained navy, white, and royal-blue system. Green, amber, red, teal, and purple are reserved for status and workflow meaning. Cards use light borders, modest shadows, generous spacing, and vector icons.

## Original feature mapping

- CRM / List View → Customers & Repairs and Jobs & Repairs
- CRM conversation → Messages plus customer repair drawer
- Calendar → Schedule with Week, Day, and Capacity modes
- Reports → Featured and saved reports library
- Filters → Search, stage filters, and filter modal
- Add customer / repair / estimate → Global New menu and quick actions
- Repair status timeline → Customer repair drawer and draggable workflow board
- Profile notification hours → Settings: Business hours and Notifications
- VIN lookup → Vehicles page action
- AMP / integrations → Integrations area
