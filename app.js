(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  const formatCurrency = value => new Intl.NumberFormat('en-US', {style:'currency', currency:'USD', maximumFractionDigits:0}).format(Number(value) || 0);
  const initials = name => String(name).split(/\s+/).filter(Boolean).map(part => part[0]).slice(0, 2).join('').toUpperCase();
  const uid = () => Date.now() + Math.floor(Math.random() * 1000);

  const iconPaths = {
    'layout-dashboard':'<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
    users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    wrench:'<path d="M14.7 6.3a4 4 0 0 0-5-5L7.5 3.5l3 3-4 4-3-3-2.2 2.2a4 4 0 0 0 5 5L15 23l8-8-8.3-8.7z"/>',
    calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/>',
    trend:'<path d="m3 17 6-6 4 4 8-8"/><path d="M14 7h7v7"/>',
    message:'<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/>',
    report:'<path d="M4 19V9M10 19V5M16 19v-7M22 19H2"/>',
    settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4v-.2a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6 1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1z"/>',
    search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    plus:'<path d="M12 5v14M5 12h14"/>', menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
    bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0"/>',
    phone:'<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 1.9z"/>',
    'chevron-down':'<path d="m6 9 6 6 6-6"/>','chevron-right':'<path d="m9 18 6-6-6-6"/>','chevron-left':'<path d="m15 18-6-6 6-6"/>',
    user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    lock:'<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    eye:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    'eye-off':'<path d="m3 3 18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 4.2A10.5 10.5 0 0 1 12 4c6.5 0 10 8 10 8a16 16 0 0 1-3 4.4M6.2 6.2C3.4 8.2 2 12 2 12s3.5 8 10 8a9.8 9.8 0 0 0 3.8-.8"/>',
    'arrow-right':'<path d="M5 12h14M13 6l6 6-6 6"/>',
    sparkles:'<path d="m12 3 1.4 3.6L17 8l-3.6 1.4L12 13l-1.4-3.6L7 8l3.6-1.4zM19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8zM5 15l.7 1.8L7.5 17.5l-1.8.7L5 20l-.7-1.8-1.8-.7 1.8-.7z"/>',
    'shield-check':'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    'panel-left':'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/>',
    headphones:'<path d="M4 14a8 8 0 0 1 16 0"/><path d="M18 19h-2v-6h4v4a4 4 0 0 1-4 4M6 19H4v-6h4v6z"/>',
    logout:'<path d="M10 17l5-5-5-5M15 12H3M21 19V5a2 2 0 0 0-2-2h-5"/>',
    x:'<path d="M18 6 6 18M6 6l12 12"/>', check:'<path d="m5 12 4 4L19 6"/>',
    'check-circle':'<circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/>',
    filter:'<path d="M4 5h16l-6 7v5l-4 2v-7z"/>',
    file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
    dollar:'<circle cx="12" cy="12" r="9"/><path d="M16 8.5c-.8-1-2-1.5-4-1.5-2.2 0-3.5 1-3.5 2.5 0 1.7 1.4 2.2 3.8 2.7 2.4.5 3.7 1 3.7 2.7 0 1.6-1.5 2.8-4 2.8-2.1 0-3.4-.6-4.3-1.7M12 5v14"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    car:'<path d="M3 13l2-5h14l2 5v6h-2v-2H5v2H3z"/><circle cx="7" cy="14" r="1"/><circle cx="17" cy="14" r="1"/>',
    'message-circle':'<path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9.2 9.2 0 0 1-4-.9L3 21l1.8-4A8.7 8.7 0 1 1 21 11.5z"/>',
    download:'<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>',
    upload:'<path d="M12 21V9M7 14l5-5 5 5M5 3h14"/>',
    send:'<path d="m22 2-7 20-4-9-9-4zM22 2 11 13"/>',
    star:'<path d="m12 2 3 6 6 .9-4.5 4.4 1.1 6.2L12 16.6l-5.6 2.9 1.1-6.2L3 8.9 9 8z"/>',
    building:'<path d="M3 21h18M6 21V4h12v17M9 8h2M13 8h2M9 12h2M13 12h2M9 16h2M13 16h2"/>',
    palette:'<path d="M12 3a9 9 0 0 0 0 18h1.4a1.6 1.6 0 0 0 1.1-2.7 1.6 1.6 0 0 1 1.1-2.7H18a3 3 0 0 0 3-3A9 9 0 0 0 12 3z"/><circle cx="7.5" cy="10" r=".7" fill="currentColor"/><circle cx="10" cy="6.5" r=".7" fill="currentColor"/><circle cx="14" cy="6.5" r=".7" fill="currentColor"/><circle cx="17" cy="10" r=".7" fill="currentColor"/>',
    package:'<path d="m21 8-9-5-9 5 9 5 9-5z"/><path d="m3 8 9 5 9-5M3 8v8l9 5 9-5V8M12 13v8"/>',
    credit:'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>',
    team:'<circle cx="8" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2 20a6 6 0 0 1 12 0M13 20a5 5 0 0 1 9 0"/>',
    plug:'<path d="M12 22v-5M9 8V2M15 8V2M6 8h12v3a6 6 0 0 1-12 0z"/>',
    review:'<path d="m12 2 3 6 6 .9-4.5 4.4 1.1 6.2L12 16.6l-5.6 2.9 1.1-6.2L3 8.9 9 8z"/>',
    invoice:'<path d="M6 2h12v20l-3-2-3 2-3-2-3 2z"/><path d="M9 7h6M9 11h6M9 15h4"/>',
    list:'<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    board:'<rect x="3" y="4" width="5" height="16" rx="1"/><rect x="10" y="4" width="5" height="10" rx="1"/><rect x="17" y="4" width="4" height="13" rx="1"/>',
    mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    alert:'<path d="M10.3 3.7 2.4 17.2A2 2 0 0 0 4.1 20h15.8a2 2 0 0 0 1.7-2.8L13.7 3.7a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>'
  };

  function renderIcons(root = document) {
    $$('[data-icon]', root).forEach(node => {
      const name = node.dataset.icon;
      node.innerHTML = `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name] || iconPaths['layout-dashboard']}</svg>`;
    });
  }

  const storage = {
    get(key, fallback = null){ try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; } },
    set(key, value){ try { localStorage.setItem(key, value); } catch {} },
    remove(key){ try { localStorage.removeItem(key); } catch {} },
    sget(key, fallback = null){ try { return sessionStorage.getItem(key) ?? fallback; } catch { return fallback; } },
    sset(key, value){ try { sessionStorage.setItem(key, value); } catch {} },
    sremove(key){ try { sessionStorage.removeItem(key); } catch {} }
  };

  const auth = $('#authScreen');
  const app = $('#appShell');
  const main = $('#mainContent');
  const sidebarNav = $('#sidebarNav');
  const modalRoot = $('#modalRoot');
  const drawerRoot = $('#drawerRoot');
  const notificationPanel = $('#notificationPanel');
  const moreSheet = $('#mobileMoreSheet');
  const toast = $('#toast');
  const toastText = $('#toastText');

  const repairStages = ['New','Estimate Sent','Approved','Scheduled','In Repair','Quality Check','Ready for Pickup'];
  const state = {
    route: 'dashboard',
    theme: storage.get('bsb-theme','light'),
    density: storage.get('bsb-density','comfortable'),
    shop: storage.get('bsb-shop','Demo Body Shop'),
    sidebarCollapsed: storage.get('bsb-sidebar','expanded') === 'collapsed',
    signedIn: storage.get('bsb-session') === '1' || storage.sget('bsb-session') === '1',
    jobView: 'board',
    scheduleView: 'week',
    salesView: 'overview',
    activeConversation: 0,
    settingsTab: 'profile',
    customers: [
      {id:1,name:'Tim Melis',phone:'(312) 555-0184',email:'tim.melis@example.com',vehicle:'2007 Mitsubishi Eclipse',insurer:'Progressive',stage:'Estimate Sent',assignee:'Dana Rivera',value:6450,next:'Follow up today',ro:'RO #10531',due:'Jul 14'},
      {id:2,name:'Pam Genni',phone:'(312) 555-0142',email:'pam.genni@example.com',vehicle:'2019 Subaru Impreza',insurer:'State Farm',stage:'Quality Check',assignee:'Sarah Williams',value:4850,next:'Verify delivery',ro:'RO #10527',due:'Today'},
      {id:3,name:'Zhao Zhang',phone:'(312) 810-5888',email:'zhao.zhang@example.com',vehicle:'2023 Tesla Model Y',insurer:'State Farm',stage:'Approved',assignee:'Jeff Nelson',value:8120,next:'Create repair order',ro:'RO #10518',due:'Jul 15'},
      {id:4,name:'Neon Don',phone:'(312) 555-0127',email:'neon.don@example.com',vehicle:'2023 Audi A4',insurer:'GEICO',stage:'New',assignee:'Maya Patel',value:5920,next:'Review photos',ro:'RO #10542',due:'Jul 16'},
      {id:5,name:'Michelle Booster',phone:'(312) 555-0170',email:'michelle@example.com',vehicle:'2024 Lexus NX',insurer:'Allstate',stage:'In Repair',assignee:'Sarah Williams',value:9340,next:'Quality check',ro:'RO #10521',due:'Jul 17'},
      {id:6,name:'Ramon Cuevas',phone:'(312) 555-0115',email:'ramon@example.com',vehicle:'2016 Honda Civic',insurer:'State Farm',stage:'Scheduled',assignee:'Mike Johnson',value:4310,next:'Confirm arrival',ro:'RO #10524',due:'Today'},
      {id:7,name:'Calvin Ford',phone:'(312) 555-0188',email:'calvin@example.com',vehicle:'2022 Tesla Model Y',insurer:'Allstate',stage:'Ready for Pickup',assignee:'Dana Rivera',value:7690,next:'Arrange pickup',ro:'RO #10516',due:'Today'},
      {id:8,name:'Ryan McTesting',phone:'(312) 555-0192',email:'ryan@example.com',vehicle:'2020 Lexus NX',insurer:'Progressive',stage:'In Repair',assignee:'David Brown',value:7150,next:'Review supplement',ro:'RO #10543',due:'Jul 18'},
      {id:9,name:'Maria Sanchez',phone:'(312) 555-0148',email:'maria@example.com',vehicle:'2018 Honda Accord',insurer:'GEICO',stage:'Estimate Sent',assignee:'Dana Rivera',value:5280,next:'Call by 3 PM',ro:'RO #10548',due:'Jul 19'},
      {id:10,name:'John Peterson',phone:'(312) 555-0166',email:'john@example.com',vehicle:'2020 Toyota Camry',insurer:'State Farm',stage:'New',assignee:'Maya Patel',value:3820,next:'Collect VIN',ro:'RO #10549',due:'Jul 20'}
    ],
    appointments: [
      {id:1,day:0,time:'8:30 AM',name:'Calvin Ford',vehicle:'2022 Tesla Model Y',type:'Drop-off',tone:'blue'},
      {id:2,day:1,time:'10:15 AM',name:'Michelle Booster',vehicle:'2024 Lexus NX',type:'Repair',tone:'green'},
      {id:3,day:2,time:'1:00 PM',name:'Ramon Cuevas',vehicle:'2016 Honda Civic',type:'Estimate',tone:'amber'},
      {id:4,day:3,time:'9:30 AM',name:'Pam Genni',vehicle:'2019 Subaru Impreza',type:'Pickup',tone:'green'},
      {id:5,day:4,time:'2:30 PM',name:'Maria Sanchez',vehicle:'2018 Honda Accord',type:'Estimate',tone:'blue'}
    ],
    estimates: [
      {id:101,customer:'Tim Melis',vehicle:'2007 Mitsubishi Eclipse',value:6450,status:'Sent',owner:'Dana Rivera',age:'2 days'},
      {id:102,customer:'Zhao Zhang',vehicle:'2023 Tesla Model Y',value:8120,status:'Approved',owner:'Jeff Nelson',age:'Today'},
      {id:103,customer:'Maria Sanchez',vehicle:'2018 Honda Accord',value:5280,status:'Sent',owner:'Dana Rivera',age:'1 day'},
      {id:104,customer:'John Peterson',vehicle:'2020 Toyota Camry',value:3820,status:'Draft',owner:'Maya Patel',age:'Today'},
      {id:105,customer:'Ryan McTesting',vehicle:'2020 Lexus NX',value:7150,status:'Approved',owner:'David Brown',age:'3 days'}
    ],
    invoices: [
      {id:'INV-10045',customer:'Pam Genni',amount:4850,status:'Due',due:'Today'},
      {id:'INV-10046',customer:'Calvin Ford',amount:7690,status:'Paid',due:'Jul 10'},
      {id:'INV-10047',customer:'Michelle Booster',amount:9340,status:'Partial',due:'Jul 18'},
      {id:'INV-10048',customer:'Ramon Cuevas',amount:4310,status:'Draft',due:'Jul 22'}
    ],
    messages: [
      {id:1,name:'Ryan McTesting',preview:'The photos are uploaded. Can you confirm?',time:'9:07 AM',unread:2,messages:[{out:true,text:'Hi Ryan, your estimate is ready. Would you like us to review it together?'},{out:false,text:'The photos are uploaded. Can you confirm you received them?'},{out:true,text:'Yes, received. I’ll review them now and update you shortly.'}]},
      {id:2,name:'Pam Genni',preview:'Thanks—what time can I pick it up?',time:'Yesterday',unread:1,messages:[{out:false,text:'Thanks—what time can I pick it up?'},{out:true,text:'Your vehicle will be ready after 3 PM.'}]},
      {id:3,name:'Zhao Zhang',preview:'Please send the approved estimate.',time:'Mon',unread:0,messages:[{out:false,text:'Please send the approved estimate.'}]},
      {id:4,name:'Maria Sanchez',preview:'Is Thursday still available?',time:'Mon',unread:0,messages:[{out:false,text:'Is Thursday still available?'}]}
    ],
    notifications: [
      {title:'Schedule conflict detected',detail:'Estimate Calendar · 8:51 AM',route:'schedule',tone:'red'},
      {title:'Customer replied by SMS',detail:'Ryan McTesting · 9:07 AM',route:'messages',tone:'blue'},
      {title:'Estimate approved',detail:'Zhao Zhang · 9:38 AM',route:'sales',tone:'green'},
      {title:'Assignment data received',detail:'New repair · 8:36 AM',route:'customers',tone:'purple'}
    ]
  };

  const persistentCollections = ['customers','appointments','estimates','invoices','messages'];

  function restoreWorkspaceData(){
    try {
      const saved = JSON.parse(storage.get('bsb-workspace-v7','null'));
      if(!saved || typeof saved !== 'object') return;
      persistentCollections.forEach(key => {
        if(Array.isArray(saved[key])) state[key] = saved[key];
      });
    } catch {}
  }

  function persistWorkspaceData(){
    const snapshot = Object.fromEntries(persistentCollections.map(key => [key,state[key]]));
    storage.set('bsb-workspace-v7',JSON.stringify(snapshot));
  }

  restoreWorkspaceData();

  const navGroups = [
    {title:'CORE WORK',items:[['dashboard','Dashboard','layout-dashboard'],['customers','Customers','users',18],['jobs','Jobs & Repairs','wrench'],['schedule','Schedule','calendar']]},
    {title:'SALES',items:[['estimates','Estimates','file'],['sales','Sales Pipeline','trend','dot'],['invoices','Invoices & Payments','invoice']]},
    {title:'COMMUNICATION',items:[['messages','Messages','message-circle',6],['reviews','Reviews','review']]},
    {title:'OPERATIONS',items:[['vehicles','Vehicles','car'],['inventory','Parts & Inventory','package']]},
    {title:'INSIGHTS',items:[['reports','Reports','report']]},
    {title:'ADMINISTRATION',items:[['team','Team','team'],['integrations','Integrations','plug'],['settings','Settings','settings']]}
  ];

  function applyPreferences(){
    document.body.classList.toggle('dark', state.theme === 'dark');
    document.body.classList.toggle('compact', state.density === 'compact');
    document.body.classList.toggle('sidebar-collapsed', state.sidebarCollapsed);
  }

  function showToast(message){
    toastText.textContent = message;
    toast.classList.add('show');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove('show'), 2500);
  }

  function pageHeader(kicker, title, subtitle, actions = ''){
    return `<div class="page-header"><div class="page-title"><span class="eyebrow">${kicker}</span><h1>${title}</h1><p>${subtitle}</p></div><div class="header-actions">${actions}</div></div>`;
  }

  function metricCard(icon, label, value, delta, tone = 'primary'){
    return `<article class="metric-card"><div class="metric-card-top"><span class="metric-icon ${tone}"><i data-icon="${icon}"></i></span><span class="delta up">${delta}</span></div><small>${label}</small><h3>${value}</h3><div class="trendline"><span></span></div></article>`;
  }

  function statusTone(stage){
    if(/Approved|Paid|Ready|Quality/i.test(stage)) return 'green';
    if(/Sent|Partial|Due/i.test(stage)) return 'amber';
    if(/New|Draft|Scheduled/i.test(stage)) return 'blue';
    if(/Repair/i.test(stage)) return 'purple';
    return 'blue';
  }

  function customerRows(){
    return state.customers.map(customer => `<tr data-customer="${customer.id}"><td><div class="table-person"><span class="avatar">${initials(customer.name)}</span><span><strong>${escapeHtml(customer.name)}</strong><small>${escapeHtml(customer.vehicle)}</small></span></div></td><td>${escapeHtml(customer.insurer)}</td><td><span class="status-badge ${statusTone(customer.stage)}">${escapeHtml(customer.stage)}</span></td><td>${escapeHtml(customer.assignee)}</td><td>${formatCurrency(customer.value)}</td><td>${escapeHtml(customer.next)}</td><td><button class="mini-btn" data-open-customer="${customer.id}" aria-label="Open customer"><i data-icon="chevron-right"></i></button></td></tr>`).join('');
  }

  function mobileCustomerCards(){
    return state.customers.map(customer => `<article class="mobile-data-card" data-customer-card="${customer.id}"><div class="mobile-data-head"><span class="avatar">${initials(customer.name)}</span><div class="mobile-data-copy"><strong>${escapeHtml(customer.name)}</strong><small>${escapeHtml(customer.vehicle)} · ${escapeHtml(customer.insurer)}</small></div><span class="status-badge ${statusTone(customer.stage)}">${escapeHtml(customer.stage)}</span></div><div class="mobile-data-meta"><div><small>REPAIR VALUE</small><strong>${formatCurrency(customer.value)}</strong></div><div><small>NEXT ACTION</small><strong>${escapeHtml(customer.next)}</strong></div></div><div class="mobile-data-actions"><a class="btn btn-secondary" href="tel:${String(customer.phone).replace(/[^+\d]/g,'')}" aria-label="Call ${escapeHtml(customer.name)}"><i data-icon="phone"></i> Call</a><button class="btn btn-secondary" data-action="message" data-name="${escapeHtml(customer.name)}"><i data-icon="message-circle"></i> Message</button><button class="btn btn-primary" data-open-customer="${customer.id}">Open <i data-icon="chevron-right"></i></button></div></article>`).join('');
  }

  function repairCard(customer, draggable = true){
    return `<button class="job-card" data-open-customer="${customer.id}" data-repair-id="${customer.id}" ${draggable ? 'draggable="true"' : ''}><div class="job-card-top"><span class="avatar">${initials(customer.name)}</span><strong>${escapeHtml(customer.name)}</strong><b>${formatCurrency(customer.value)}</b></div><small>${escapeHtml(customer.vehicle)}</small><div class="job-card-meta"><span>${escapeHtml(customer.assignee)} · ${escapeHtml(customer.ro)}</span><span>${escapeHtml(customer.next)}</span></div></button>`;
  }

  function dashboard(){
    const visibleStages = repairStages.slice(0, 4);
    const mobilePriority = state.customers.filter(customer => ['Estimate Sent','Approved','New'].includes(customer.stage)).slice(0, 5);
    return `<section class="page active dashboard-page">
      ${pageHeader('MONDAY · JULY 13','Good morning, Dana.','Focus on the customers, jobs, and opportunities that need a decision today.','<button class="btn btn-secondary" data-action="schedule"><i data-icon="calendar"></i> Schedule job</button><button class="btn btn-primary" data-action="customer"><i data-icon="plus"></i> Add customer</button>')}
      <div class="today-strip">
        ${[
          ['alert','URGENT TASKS','7','Require attention','red','customers'],
          ['calendar','TODAY\'S APPOINTMENTS','11','2 arrivals soon','blue','schedule'],
          ['wrench','REPAIR CAPACITY','78%','21 of 27 bays','teal','jobs'],
          ['dollar','SALES OPPORTUNITIES','$42,680','6 awaiting decision','purple','sales'],
          ['message-circle','CUSTOMERS WAITING','8','3 new leads','green','messages']
        ].map(item => `<button type="button" class="today-card" data-route="${item[5]}"><span class="metric-icon ${item[4]}"><i data-icon="${item[0]}"></i></span><span class="today-copy"><small>${item[1]}</small><strong>${item[2]}</strong><span class="today-detail">${item[3]}</span></span></button>`).join('')}
      </div>
      <div class="core-workflows">
        <article class="workflow-card blue"><div class="workflow-title"><span class="metric-icon blue"><i data-icon="users"></i></span><div><small>CUSTOMER MANAGEMENT</small><h3>8 need a response</h3><p>New leads, follow-ups, and delivery issues in one focused queue.</p></div></div><div class="workflow-actions"><button class="btn btn-secondary" data-route="customers">View customers</button><button class="btn btn-primary" data-action="customer">Add customer</button></div></article>
        <article class="workflow-card teal"><div class="workflow-title"><span class="metric-icon teal"><i data-icon="calendar"></i></span><div><small>JOB SCHEDULING</small><h3>11 jobs today</h3><p>Plan capacity, arrivals, technicians, and unscheduled approvals.</p></div></div><div class="workflow-actions"><button class="btn btn-secondary" data-route="schedule">Open schedule</button><button class="btn btn-primary" data-action="schedule">Schedule job</button></div></article>
        <article class="workflow-card purple"><div class="workflow-title"><span class="metric-icon purple"><i data-icon="trend"></i></span><div><small>SALES TRACKING</small><h3>$148.6k pipeline</h3><p>Follow estimates, approvals, booked work, and stalled decisions.</p></div></div><div class="workflow-actions"><button class="btn btn-secondary" data-route="sales">View pipeline</button><button class="btn btn-primary" data-action="estimate">New estimate</button></div></article>
      </div>
      <div class="dashboard-main">
        <article class="card workflow-board-card"><div class="card-header"><div><span class="eyebrow">REPAIR WORKFLOW</span><h2>Active repair board</h2></div><div class="segmented"><button class="active" aria-pressed="true"><i data-icon="board"></i> Board</button><button data-route="jobs"><i data-icon="list"></i> List</button></div></div><div class="workflow-board">${visibleStages.map((stage,index) => { const repairs = state.customers.filter(customer => customer.stage === stage).slice(0,3); return `<section class="board-column" data-drop-stage="${stage}"><div class="board-column-head"><span class="board-num">${index+1}</span><strong>${stage}</strong><small>${repairs.length} jobs</small></div><div class="board-list">${repairs.length ? repairs.map(customer => repairCard(customer)).join('') : '<div class="empty-column">Drop a repair here</div>'}</div></section>`; }).join('')}</div></article>
        <div class="mobile-repair-list"><article class="card"><div class="card-header"><div><span class="eyebrow">PRIORITY REPAIRS</span><h2>What needs attention</h2></div><button class="text-button" data-route="jobs">View all</button></div><div class="alerts-stack">${mobilePriority.map(customer => `<button class="alert-card ${statusTone(customer.stage)}" data-open-customer="${customer.id}"><span class="avatar">${initials(customer.name)}</span><span class="alert-copy"><strong>${escapeHtml(customer.name)} · ${escapeHtml(customer.vehicle)}</strong><small>${escapeHtml(customer.next)}</small></span><b>${formatCurrency(customer.value)}</b><i data-icon="chevron-right"></i></button>`).join('')}</div></article></div>
        <aside class="alerts-column">
          <article class="card"><div class="card-header"><div><span class="eyebrow">ACTION CENTER</span><h2>Alerts & notifications</h2></div><button class="text-button" data-notifications>View all</button></div><div class="alerts-stack">${[
            ['Overdue jobs','5 jobs are past due','red','5','jobs'],['Estimate follow-ups','12 estimates need a response','amber','12','sales'],['Pending approvals','7 jobs awaiting approval','purple','7','estimates'],['Unread messages','13 customer conversations','blue','13','messages']
          ].map(alert => `<button class="alert-card ${alert[2]}" data-route="${alert[4]}"><span class="row-icon"><i data-icon="bell"></i></span><span class="alert-copy"><strong>${alert[0]}</strong><small>${alert[1]}</small></span><b>${alert[3]}</b><i data-icon="chevron-right"></i></button>`).join('')}</div></article>
          <article class="card capacity-card"><div class="card-header"><div><span class="eyebrow">SHOP CAPACITY</span><h2>Balanced this week</h2></div><span class="status-badge green">Healthy</span></div><div class="capacity-visual"><svg class="capacity-ring" viewBox="0 0 120 120" aria-label="78 percent capacity"><circle class="ring-track" cx="60" cy="60" r="44"/><circle class="ring-value" cx="60" cy="60" r="44"/><text x="60" y="60" dy=".1em">78%</text><text class="ring-label" x="60" y="77">UTILIZED</text></svg><div class="capacity-bars">${[42,57,49,74,63,89,76].map((height,index) => `<span class="capacity-bar"><i style="height:${height}%"></i><small>${['M','T','W','T','F','S','S'][index]}</small></span>`).join('')}</div></div></article>
        </aside>
      </div>
      <div class="lower-dashboard">${metricCard('car','Active repairs','39','+12%','blue')}${metricCard('users','New leads','24','+8%','green')}${metricCard('clock','Jobs due today','11','3 high priority','amber')}${metricCard('dollar','Monthly revenue','$186,540','+15%','purple')}</div>
      <article class="card quick-actions-card"><div class="card-header"><div><span class="eyebrow">SHORTCUTS</span><h2>Quick actions</h2></div><span class="status-badge blue">Available everywhere from “New”</span></div><div class="card-body quick-actions-grid">${[['customer','users','Add customer'],['estimate','file','New estimate'],['schedule','calendar','Schedule job'],['repair','wrench','Create repair order'],['message','send','Send message']].map(action => `<button class="quick-action" data-action="${action[0]}"><span class="metric-icon primary"><i data-icon="${action[1]}"></i></span><strong>${action[2]}</strong></button>`).join('')}</div></article>
    </section>`;
  }

  function customers(){
    return `<section class="page active customer-page">${pageHeader('CUSTOMER MANAGEMENT','Customers & repairs','Search, filter, and act on every customer without losing repair context.','<button class="btn btn-secondary" data-action="import"><i data-icon="upload"></i> Import</button><button class="btn btn-primary" data-action="customer"><i data-icon="plus"></i> Add customer</button>')}<div class="toolbar customer-toolbar"><label class="search-field"><i data-icon="search"></i><input id="customerSearch" inputmode="search" aria-label="Search customers" placeholder="Search name, vehicle, phone, insurer…"></label><select class="select" id="customerStage" aria-label="Filter by repair stage"><option value="">All stages</option>${repairStages.map(stage => `<option>${stage}</option>`).join('')}</select><button class="btn btn-secondary" data-action="filters"><i data-icon="filter"></i> Filters</button></div><div class="mobile-stage-scroll" aria-label="Common customer filters"><button class="active" data-mobile-stage="">All</button><button data-mobile-stage="New">New leads</button><button data-mobile-stage="Estimate Sent">Follow-ups</button><button data-mobile-stage="Ready for Pickup">Pickup</button></div><div class="card table-wrap"><table class="data-table"><thead><tr><th>Customer / vehicle</th><th>Insurer</th><th>Stage</th><th>Assignee</th><th>Value</th><th>Next action</th><th></th></tr></thead><tbody id="customerRows">${customerRows()}</tbody></table></div><div class="mobile-cards" id="customerCards">${mobileCustomerCards()}</div></section>`;
  }

  function jobs(){
    const listView = `<div class="card table-wrap"><table class="data-table"><thead><tr><th>Repair</th><th>RO</th><th>Stage</th><th>Assignee</th><th>Due</th><th>Value</th><th></th></tr></thead><tbody>${state.customers.map(customer => `<tr><td><div class="table-person"><span class="avatar">${initials(customer.name)}</span><span><strong>${customer.name}</strong><small>${customer.vehicle}</small></span></div></td><td>${customer.ro}</td><td><span class="status-badge ${statusTone(customer.stage)}">${customer.stage}</span></td><td>${customer.assignee}</td><td>${customer.due}</td><td>${formatCurrency(customer.value)}</td><td><button class="mini-btn" data-open-customer="${customer.id}"><i data-icon="chevron-right"></i></button></td></tr>`).join('')}</tbody></table></div><div class="mobile-cards">${mobileCustomerCards()}</div>`;
    const boardView = `<div class="kanban">${repairStages.map(stage => { const repairs = state.customers.filter(customer => customer.stage === stage); return `<section class="kanban-column" data-drop-stage="${stage}"><div class="kanban-column-head"><strong>${stage}</strong><span>${repairs.length}</span></div><div class="kanban-list">${repairs.map(customer => `<article class="kanban-card" data-open-customer="${customer.id}" data-repair-id="${customer.id}" draggable="true"><div class="kanban-card-foot"><span class="status-badge blue">${customer.ro}</span><strong>${formatCurrency(customer.value)}</strong></div><h3>${customer.name}</h3><p>${customer.vehicle} · ${customer.insurer}</p><div class="kanban-card-foot"><span>${customer.assignee}</span><span>${customer.next}</span></div></article>`).join('') || '<div class="empty-column">Drop a repair here</div>'}</div></section>`; }).join('')}</div>`;
    return `<section class="page active">${pageHeader('OPERATIONS','Jobs & repairs','Move every repair forward with a visible owner, stage, due date, and next action.','<button class="btn btn-secondary" data-action="export-jobs"><i data-icon="download"></i> Export</button><button class="btn btn-primary" data-action="repair"><i data-icon="plus"></i> New repair order</button>')}<div class="toolbar"><label class="search-field"><i data-icon="search"></i><input id="jobSearch" placeholder="Search RO#, customer, vehicle…"></label><div class="segmented"><button class="${state.jobView==='board'?'active':''}" data-job-view="board"><i data-icon="board"></i> Board</button><button class="${state.jobView==='list'?'active':''}" data-job-view="list"><i data-icon="list"></i> List</button></div><button class="btn btn-secondary" data-action="filters"><i data-icon="filter"></i> Filters</button></div>${state.jobView === 'board' ? boardView : listView}</section>`;
  }

  function scheduleWeek(){
    const days = ['Mon 13','Tue 14','Wed 15','Thu 16','Fri 17'];
    const times = ['8 AM','10 AM','12 PM','2 PM','4 PM'];
    return `<article class="card calendar-card"><div class="calendar-head"><div><button class="mini-btn" data-toast="Previous week"><i data-icon="chevron-left"></i></button><strong>July 13–17, 2026</strong><button class="mini-btn" data-toast="Next week"><i data-icon="chevron-right"></i></button></div><button class="text-button" data-toast="Jumped to today">Today</button></div><div class="calendar-grid"><div class="corner"></div>${days.map(day => `<div class="day-head">${day}</div>`).join('')}${times.map((time,row) => `<div class="time">${time}</div>${days.map((_,dayIndex) => `<div class="slot">${state.appointments.filter(appointment => appointment.day === dayIndex && Math.floor(state.appointments.indexOf(appointment)/1.2) % times.length === row).map(appointment => `<button class="appointment ${appointment.tone}" data-action="appointment" data-id="${appointment.id}"><strong>${appointment.time} · ${appointment.name}</strong><small>${appointment.vehicle}</small><span>${appointment.type}</span></button>`).join('')}</div>`).join('')}`).join('')}</div></article>`;
  }

  function scheduleDay(){
    return `<article class="card"><div class="card-header"><div><span class="eyebrow">MONDAY · JULY 13</span><h2>Today’s agenda</h2></div><span class="status-badge green">11 appointments</span></div><div class="card-body">${state.appointments.map(appointment => `<button class="alert-card ${appointment.tone}" data-action="appointment" data-id="${appointment.id}"><span class="row-icon"><i data-icon="calendar"></i></span><span class="alert-copy"><strong>${appointment.time} · ${appointment.name}</strong><small>${appointment.vehicle} · ${appointment.type}</small></span><b>${appointment.day === 0 ? 'Today' : 'This week'}</b><i data-icon="chevron-right"></i></button>`).join('')}</div></article>`;
  }

  function scheduleCapacity(){
    return `<div class="analytics-grid"><article class="card"><div class="card-header"><div><span class="eyebrow">BAY UTILIZATION</span><h2>Weekly capacity</h2></div><span class="status-badge green">78% utilized</span></div><div class="line-chart"><div class="chart-grid-lines"></div><svg viewBox="0 0 600 220" preserveAspectRatio="none"><path d="M0 165 C80 125 110 150 170 105 S280 115 340 72 S460 92 520 52 S575 47 600 35" fill="none" stroke="#0b9d96" stroke-width="5" stroke-linecap="round"/><path d="M0 165 C80 125 110 150 170 105 S280 115 340 72 S460 92 520 52 S575 47 600 35 L600 220 L0 220Z" fill="rgba(11,157,150,.1)"/></svg></div></article><article class="card"><div class="card-header"><div><span class="eyebrow">CAPACITY BY WORK TYPE</span><h2>Booked bays</h2></div></div><div class="card-body">${[['Checking',3,5,'blue'],['Repair',7,10,'green'],['Estimate',4,4,'amber'],['Paint',5,6,'purple']].map(item => `<div class="setting-row"><span><strong>${item[0]}</strong><small>${item[1]} of ${item[2]} available bays</small></span><span class="status-badge ${item[3]}">${Math.round(item[1]/item[2]*100)}%</span></div>`).join('')}</div></article></div>`;
  }

  function schedule(){
    const content = state.scheduleView === 'week' ? scheduleWeek() : state.scheduleView === 'day' ? scheduleDay() : scheduleCapacity();
    const unscheduled = state.customers.filter(customer => customer.stage === 'Approved');
    return `<section class="page active schedule-page">${pageHeader('JOB SCHEDULING','Schedule','Balance appointments, technicians, and repair capacity from one operational calendar.','<button class="btn btn-secondary" data-action="print-schedule"><i data-icon="download"></i> Print</button><button class="btn btn-primary" data-action="schedule"><i data-icon="plus"></i> New appointment</button>')}<div class="toolbar"><div class="segmented"><button class="${state.scheduleView==='week'?'active':''}" data-schedule-view="week">Week</button><button class="${state.scheduleView==='day'?'active':''}" data-schedule-view="day">Day</button><button class="${state.scheduleView==='capacity'?'active':''}" data-schedule-view="capacity">Capacity</button></div><button class="btn btn-secondary" data-action="calendar-filter"><i data-icon="filter"></i> Calendars</button></div><div class="calendar-shell"><div>${content}</div><aside class="card unscheduled-card"><div class="card-header"><div><span class="eyebrow">APPROVED, NOT BOOKED</span><h2>Unscheduled jobs</h2></div><span class="status-badge amber">${unscheduled.length}</span></div><div class="unscheduled-list">${unscheduled.length ? unscheduled.map(customer => `<button class="unscheduled-item" data-action="schedule" data-name="${escapeHtml(customer.name)}"><span class="avatar">${initials(customer.name)}</span><span><strong>${customer.name}</strong><small>${customer.vehicle} · ${formatCurrency(customer.value)}</small></span><i data-icon="chevron-right"></i></button>`).join('') : '<div class="unscheduled-empty"><i data-icon="check-circle"></i><strong>Everything is scheduled</strong><small>No approved jobs are waiting for a time.</small></div>'}</div></aside></div></section>`;
  }

  function estimates(){
    return `<section class="page active">${pageHeader('SALES','Estimates','Create, send, follow up, and convert estimates without losing customer context.','<button class="btn btn-secondary" data-action="import-estimates"><i data-icon="upload"></i> Upload PDF</button><button class="btn btn-primary" data-action="estimate"><i data-icon="plus"></i> New estimate</button>')}<div class="metric-grid">${metricCard('file','Open estimates','18','+4 this week','blue')}${metricCard('send','Sent, awaiting decision','6','3 due today','amber')}${metricCard('check-circle','Approved value','$67,250','+18.6%','green')}${metricCard('trend','Closing rate','38.6%','+3.2 pts','purple')}</div><div class="toolbar"><label class="search-field"><i data-icon="search"></i><input id="estimateSearch" placeholder="Search customer or vehicle…"></label><select class="select" id="estimateStatus"><option value="">All statuses</option><option>Draft</option><option>Sent</option><option>Approved</option></select><button class="btn btn-secondary" data-action="export-estimates"><i data-icon="download"></i> Export</button></div><div class="card table-wrap"><table class="data-table"><thead><tr><th>Customer / vehicle</th><th>Estimate</th><th>Status</th><th>Owner</th><th>Age</th><th></th></tr></thead><tbody id="estimateRows">${state.estimates.map(estimate => `<tr data-estimate-id="${estimate.id}"><td><div class="table-person"><span class="avatar">${initials(estimate.customer)}</span><span><strong>${estimate.customer}</strong><small>${estimate.vehicle}</small></span></div></td><td>${formatCurrency(estimate.value)}</td><td><span class="status-badge ${statusTone(estimate.status)}">${estimate.status}</span></td><td>${estimate.owner}</td><td>${estimate.age}</td><td><button class="mini-btn" data-action="open-estimate" data-id="${estimate.id}"><i data-icon="chevron-right"></i></button></td></tr>`).join('')}</tbody></table></div><div class="mobile-cards">${state.estimates.map(estimate => `<article class="mobile-data-card"><div class="mobile-data-head"><span class="avatar">${initials(estimate.customer)}</span><div class="mobile-data-copy"><strong>${estimate.customer}</strong><small>${estimate.vehicle}</small></div><span class="status-badge ${statusTone(estimate.status)}">${estimate.status}</span></div><div class="mobile-data-meta"><div><small>VALUE</small><strong>${formatCurrency(estimate.value)}</strong></div><div><small>OWNER</small><strong>${estimate.owner}</strong></div></div><button class="btn btn-primary btn-block" data-action="open-estimate" data-id="${estimate.id}">Open estimate</button></article>`).join('')}</div></section>`;
  }

  function sales(){
    const stages = ['New Leads','Estimate Sent','Approved','Booked','Won / Closed'];
    return `<section class="page active">${pageHeader('SALES TRACKING','Sales pipeline','See what is moving, what is stalled, and the next action that will close more repair work.','<button class="btn btn-secondary" data-action="export-sales"><i data-icon="download"></i> Export CSV</button><button class="btn btn-primary" data-action="estimate"><i data-icon="plus"></i> New estimate</button>')}<div class="metric-grid">${metricCard('dollar','Pipeline value','$148,620','+18.6%','blue')}${metricCard('trend','Closing rate','38.6%','+3.2 pts','purple')}${metricCard('clock','Average sales cycle','4.2 days','-0.8 day','green')}${metricCard('users','High-value follow-ups','6','3 due today','amber')}</div><div class="analytics-grid"><article class="card"><div class="card-header"><div><span class="eyebrow">REVENUE OVERVIEW</span><h2>$158,720 this month</h2></div><select class="select" style="width:auto"><option>This month</option><option>Last month</option></select></div><div class="line-chart"><div class="chart-grid-lines"></div><svg viewBox="0 0 600 220" preserveAspectRatio="none"><path d="M0 180 C70 155 100 170 150 135 S250 95 300 115 S400 65 450 75 S540 30 600 48" fill="none" stroke="#245fda" stroke-width="5" stroke-linecap="round"/><path d="M0 180 C70 155 100 170 150 135 S250 95 300 115 S400 65 450 75 S540 30 600 48 L600 220 L0 220Z" fill="rgba(36,95,218,.1)"/></svg></div></article><article class="card"><div class="card-header"><div><span class="eyebrow">CONVERSION</span><h2>Pipeline funnel</h2></div></div><div class="funnel">${[['New leads',42,'$24,500'],['Estimate sent',28,'$58,750'],['Approved',18,'$67,250'],['Booked',14,'$88,720'],['Completed',10,'$158,720']].map((item,index) => `<div class="funnel-row" style="width:${100-index*7}%"><span>${item[0]}</span><b>${item[1]}</b><strong>${item[2]}</strong></div>`).join('')}</div></article></div><article class="card"><div class="card-header"><div><span class="eyebrow">OPPORTUNITIES</span><h2>Pipeline board</h2></div><div class="segmented"><button class="active">Board</button><button data-toast="List view selected">List</button></div></div><div class="sales-board">${stages.map((stage,index) => `<section class="sales-stage"><div class="sales-stage-head"><strong>${stage}</strong><span>${index+4}</span></div><div class="sales-stage-list">${state.customers.slice(index%4,index%4+2).map(customer => `<button class="sales-opportunity" data-open-customer="${customer.id}"><h4>${customer.name}</h4><p>${customer.vehicle}</p><div class="sales-opportunity-foot"><span>${customer.next}</span><strong>${formatCurrency(customer.value)}</strong></div></button>`).join('')}</div></section>`).join('')}</div></article></section>`;
  }

  function invoices(){
    return `<section class="page active">${pageHeader('FINANCE','Invoices & payments','Track outstanding balances, record payments, and keep repair financials connected.','<button class="btn btn-secondary" data-action="export-invoices"><i data-icon="download"></i> Export</button><button class="btn btn-primary" data-action="payment"><i data-icon="plus"></i> Record payment</button>')}<div class="metric-grid">${metricCard('invoice','Outstanding invoices','18','5 overdue','red')}${metricCard('dollar','Amount receivable','$42,680','-8% this week','amber')}${metricCard('check-circle','Collected this month','$186,540','+15%','green')}${metricCard('clock','Average days to pay','3.8 days','-0.4 day','blue')}</div><div class="card table-wrap"><table class="data-table"><thead><tr><th>Invoice</th><th>Customer</th><th>Amount</th><th>Status</th><th>Due</th><th></th></tr></thead><tbody>${state.invoices.map(invoice => `<tr><td><strong>${invoice.id}</strong></td><td>${invoice.customer}</td><td>${formatCurrency(invoice.amount)}</td><td><span class="status-badge ${statusTone(invoice.status)}">${invoice.status}</span></td><td>${invoice.due}</td><td><button class="mini-btn" data-action="open-invoice" data-id="${invoice.id}"><i data-icon="chevron-right"></i></button></td></tr>`).join('')}</tbody></table></div><div class="mobile-cards">${state.invoices.map(invoice => `<article class="mobile-data-card"><div class="mobile-data-head"><span class="metric-icon amber"><i data-icon="invoice"></i></span><div class="mobile-data-copy"><strong>${invoice.id}</strong><small>${invoice.customer}</small></div><span class="status-badge ${statusTone(invoice.status)}">${invoice.status}</span></div><div class="mobile-data-meta"><div><small>AMOUNT</small><strong>${formatCurrency(invoice.amount)}</strong></div><div><small>DUE</small><strong>${invoice.due}</strong></div></div><button class="btn btn-primary btn-block" data-action="open-invoice" data-id="${invoice.id}">Open invoice</button></article>`).join('')}</div></section>`;
  }

  function messages(){
    const active = state.messages[state.activeConversation] || state.messages[0];
    return `<section class="page active">${pageHeader('COMMUNICATION','Messages','Keep every customer conversation connected to the repair record and next action.','<button class="btn btn-primary" data-action="message"><i data-icon="plus"></i> New message</button>')}<div class="card inbox-layout" id="inboxLayout"><aside class="conversation-list"><div class="conversation-search"><i data-icon="search"></i><input id="messageSearch" placeholder="Search conversations"></div>${state.messages.map((message,index) => `<button class="conversation-row ${index===state.activeConversation?'active':''}" data-chat-index="${index}"><span class="avatar">${initials(message.name)}</span><span class="conversation-copy"><strong>${message.name}</strong><small>${message.preview}</small></span><span><small>${message.time}</small>${message.unread ? `<b>${message.unread}</b>` : ''}</span></button>`).join('')}</aside><section class="chat-pane"><div class="chat-header"><button class="mini-btn mobile-only" data-chat-back><i data-icon="chevron-left"></i></button><div class="table-person"><span class="avatar">${initials(active.name)}</span><span><strong>${active.name}</strong><small>Customer conversation · Repair connected</small></span></div><button class="mini-btn" data-open-customer="${state.customers.find(customer=>customer.name===active.name)?.id || 1}"><i data-icon="chevron-right"></i></button></div><div class="chat-messages" id="chatMessages">${active.messages.map(message => `<div class="message-bubble ${message.out?'out':''}">${escapeHtml(message.text)}</div>`).join('')}</div><form class="chat-compose" id="chatCompose"><button type="button" class="mini-btn" data-toast="Attachment picker opened"><i data-icon="plus"></i></button><input name="message" placeholder="Write a message…" autocomplete="off"><button class="btn btn-primary" type="submit"><i data-icon="send"></i></button></form></section><aside class="contact-pane"><div class="contact-details"><span class="avatar">${initials(active.name)}</span><h3>${active.name}</h3><p>${state.customers.find(customer=>customer.name===active.name)?.vehicle || 'Customer record'}</p></div><div class="drawer-section"><h3>Contact</h3><p>${state.customers.find(customer=>customer.name===active.name)?.phone || '(312) 555-0192'}</p><p>${state.customers.find(customer=>customer.name===active.name)?.email || 'customer@example.com'}</p></div><div class="drawer-section"><h3>Quick actions</h3><button class="btn btn-secondary btn-block" data-action="schedule">Schedule appointment</button></div></aside></div></section>`;
  }

  function reviews(){
    const reviewsData = [
      ['Pam Genni',5,'Great communication and the car looked perfect.','Yesterday'],
      ['Zhao Zhang',5,'Fast estimate process and clear updates.','Jul 11'],
      ['Ramon Cuevas',4,'Good experience. Pickup was a little delayed.','Jul 9'],
      ['Michelle Booster',5,'The team kept me informed throughout the repair.','Jul 7']
    ];
    return `<section class="page active">${pageHeader('CUSTOMER EXPERIENCE','Reviews','Monitor customer sentiment, respond quickly, and identify service opportunities.','<button class="btn btn-secondary" data-action="review-request"><i data-icon="send"></i> Request review</button><button class="btn btn-primary" data-action="review-settings"><i data-icon="settings"></i> Review settings</button>')}<div class="metric-grid">${metricCard('star','Average rating','4.8','+0.2','amber')}${metricCard('users','Reviews this month','36','+18%','blue')}${metricCard('check-circle','Response rate','92%','+6%','green')}${metricCard('clock','Average response','2.1 hours','-32 min','purple')}</div><article class="card"><div class="card-header"><div><span class="eyebrow">RECENT REVIEWS</span><h2>Customer feedback</h2></div><select class="select" style="width:auto"><option>All ratings</option><option>5 stars</option><option>4 stars</option></select></div><div class="card-body">${reviewsData.map(review => `<article class="alert-card green"><span class="avatar">${initials(review[0])}</span><span class="alert-copy"><strong>${review[0]}</strong><span class="review-stars" role="img" aria-label="${review[1]} out of 5 stars">${'★'.repeat(review[1])}${'☆'.repeat(5-review[1])}</span><small>${review[2]}</small></span><b>${review[3]}</b><button class="text-button" data-action="reply-review" data-name="${review[0]}">Reply</button></article>`).join('')}</div></article></section>`;
  }

  function vehicles(){
    const vins = ['4A3AK24F47E021846','JF1GKAL63KH214507','7SAYGDEE9PF612084','WAUENAF48PA041732','JTJGGCEZ8R2014659','19XFC2F59GE204681','7SAYGDEE8NF398210','JTJZK1BA3L2017435','1HGCV1F31JA081462','4T1BF1FK7LU918350'];
    return `<section class="page active">${pageHeader('OPERATIONS','Vehicles','Find VIN, repair history, customer ownership, and active work in one place.','<button class="btn btn-secondary" data-action="vin"><i data-icon="search"></i> VIN lookup</button><button class="btn btn-primary" data-action="vehicle"><i data-icon="plus"></i> Add vehicle</button>')}<div class="toolbar"><label class="search-field"><i data-icon="search"></i><input id="vehicleSearch" placeholder="Search VIN, make, model, customer…"></label><button class="btn btn-secondary" data-action="filters"><i data-icon="filter"></i> Filters</button></div><div class="card table-wrap"><table class="data-table"><thead><tr><th>Vehicle</th><th>Customer</th><th>VIN</th><th>Active stage</th><th>Last visit</th><th></th></tr></thead><tbody>${state.customers.map((customer,index) => `<tr><td><div class="table-person"><span class="metric-icon blue"><i data-icon="car"></i></span><span><strong>${customer.vehicle}</strong><small>${customer.insurer}</small></span></div></td><td>${customer.name}</td><td>${vins[index] || `1HGBH41JXMN${String(109180+index)}`}</td><td><span class="status-badge ${statusTone(customer.stage)}">${customer.stage}</span></td><td>Jul ${12-index}</td><td><button class="mini-btn" data-open-customer="${customer.id}"><i data-icon="chevron-right"></i></button></td></tr>`).join('')}</tbody></table></div><div class="mobile-cards">${mobileCustomerCards()}</div></section>`;
  }

  function inventory(){
    const parts = [['Front bumper cover','2023 Tesla Model Y',2,'Ordered'],['Headlamp assembly','2020 Lexus NX',1,'Received'],['Quarter panel','2019 Subaru Impreza',1,'Backordered'],['ADAS bracket','2018 Honda Accord',4,'In stock'],['Paint material kit','Universal',8,'Low stock'],['Windshield molding','2022 Tesla Model Y',2,'Ordered']];
    return `<section class="page active">${pageHeader('OPERATIONS','Parts & inventory','Track ordered parts, shortages, receiving, and repair impact before they become delays.','<button class="btn btn-secondary" data-action="purchase-order"><i data-icon="file"></i> Purchase order</button><button class="btn btn-primary" data-action="part"><i data-icon="plus"></i> Add part</button>')}<div class="metric-grid">${metricCard('package','Parts on order','12','3 arriving today','blue')}${metricCard('alert','Backordered items','4','2 critical','red')}${metricCard('check-circle','Received today','18','+6 vs avg','green')}${metricCard('dollar','Inventory value','$84,320','+2.4%','purple')}</div><div class="admin-grid">${parts.map(part => `<article class="admin-card"><div class="integration-card-top"><span class="metric-icon amber"><i data-icon="package"></i></span><span class="status-badge ${statusTone(part[3])}">${part[3]}</span></div><h3>${part[0]}</h3><p>${part[1]}</p><div class="setting-row"><span><small>QUANTITY</small><strong>${part[2]}</strong></span><button class="btn btn-secondary" data-action="manage-part" data-name="${part[0]}">Manage</button></div></article>`).join('')}</div></section>`;
  }

  function reports(){
    const saved = ['DRP to Repair','Today’s Schedule','Phone Booster','Customer Reviews','Lead Sources','Outstanding Invoices','Cycle Time by Insurer','Technician Utilization'];
    return `<section class="page active">${pageHeader('REPORTING','Reports library','Curated business reports first, custom reporting tools second.','<button class="btn btn-secondary" data-action="folder"><i data-icon="plus"></i> New folder</button><button class="btn btn-primary" data-action="report"><i data-icon="plus"></i> Build report</button>')}<div class="report-grid">${[['Estimate closing ratio','Understand conversion by estimator, source, insurer, and time period.','trend','purple'],['Lead source performance','See which channels create qualified and booked repairs.','users','green'],['Schedule utilization','Compare booked capacity, missed appointments, and cycle time.','calendar','amber']].map(report => `<article class="report-card"><div class="report-card-top"><span class="metric-icon ${report[3]}"><i data-icon="${report[2]}"></i></span><span class="eyebrow">FEATURED</span></div><h3>${report[0]}</h3><p>${report[1]}</p><button class="btn btn-secondary" data-action="open-report" data-title="${report[0]}">Open report</button></article>`).join('')}</div><article class="card"><div class="card-header"><div><span class="eyebrow">ALL REPORTS</span><h2>Saved reports</h2></div><label class="search-field" style="max-width:320px"><i data-icon="search"></i><input id="reportSearch" placeholder="Search reports"></label></div><div class="card-body report-grid" id="savedReports">${saved.map((report,index) => `<article class="report-card" data-report-name="${report.toLowerCase()}"><span class="tag">${index===2?'AI Calls':'Operations'}</span><h3>${report}</h3><p>Operational detail, trends, and drill-down data.</p><button class="text-button" data-action="open-report" data-title="${report}">View report →</button></article>`).join('')}</div></article></section>`;
  }

  function team(){
    const members = [['Dana Rivera','Shop Manager','Online',92],['Sarah Williams','Body Technician','Online',78],['Mike Johnson','Lead Technician','Busy',88],['David Brown','Paint Technician','Online',65],['Maya Patel','Estimator','Away',83],['Jeff Nelson','Estimator','Online',76]];
    return `<section class="page active">${pageHeader('ADMINISTRATION','Team','Manage shop users, workload, roles, notification hours, and access.','<button class="btn btn-secondary" data-action="permissions"><i data-icon="shield-check"></i> Permissions</button><button class="btn btn-primary" data-action="team-member"><i data-icon="plus"></i> Add team member</button>')}<div class="metric-grid">${metricCard('team','Active users','12','10 online','blue')}${metricCard('wrench','Technicians','7','78% utilized','green')}${metricCard('users','Estimators','3','6 follow-ups','purple')}${metricCard('clock','Avg. response time','12 min','-4 min','amber')}</div><div class="admin-grid">${members.map(member => `<article class="admin-card"><div class="table-person"><span class="avatar">${initials(member[0])}</span><span><strong>${member[0]}</strong><small>${member[1]}</small></span></div><div class="setting-row"><span><small>STATUS</small><strong>${member[2]}</strong></span><span class="status-badge ${member[2]==='Online'?'green':member[2]==='Busy'?'amber':'blue'}">${member[3]}% utilized</span></div><button class="btn btn-secondary btn-block" data-action="edit-team" data-name="${member[0]}">Manage profile</button></article>`).join('')}</div></section>`;
  }

  function integrations(){
    const items = [['CCC ONE','Connected','Assignment and repair data'],['Mitchell','Connected','Estimate and repair data'],['QuickBooks','Connect','Invoices and payments'],['Google Calendar','Connect','Appointments and availability'],['Enterprise Rentals','Connected','Rental coordination'],['Phone Booster AI','Connected','Call results and follow-ups']];
    return `<section class="page active">${pageHeader('ADMINISTRATION','Integrations','Connect the tools your shop already uses and keep data moving automatically.','<button class="btn btn-primary" data-action="integration"><i data-icon="plus"></i> Browse integrations</button>')}<div class="integration-grid">${items.map(item => `<article class="integration-card"><div class="integration-card-top"><span class="integration-logo"><i data-icon="plug"></i></span><span class="status-badge ${item[1]==='Connected'?'green':'blue'}">${item[1]}</span></div><h3>${item[0]}</h3><p>${item[2]}</p><button class="btn btn-secondary" data-action="manage-integration" data-name="${item[0]}">${item[1]==='Connected'?'Manage':'Connect'}</button></article>`).join('')}</div></section>`;
  }

  function settingsPanel(tab){
    if(tab === 'appearance') return `<div class="settings-section"><span class="eyebrow">APPEARANCE</span><h2>Theme, density, and navigation</h2><p>Preferences are saved on this device.</p><div class="theme-options"><button class="theme-card ${state.theme==='light'?'active':''}" data-theme="light"><span class="theme-preview light"></span><strong>Light</strong><small>Bright and focused</small></button><button class="theme-card ${state.theme==='dark'?'active':''}" data-theme="dark"><span class="theme-preview dark"></span><strong>Dark</strong><small>Low-light workspace</small></button></div><div class="setting-row"><span><strong>Compact density</strong><small>Show more information on larger screens.</small></span><label class="switch"><input id="densityToggle" type="checkbox" ${state.density==='compact'?'checked':''}><b></b></label></div><div class="setting-row"><span><strong>Collapsed desktop sidebar</strong><small>Use icon-only navigation on desktop.</small></span><label class="switch"><input id="sidebarSettingToggle" type="checkbox" ${state.sidebarCollapsed?'checked':''}><b></b></label></div></div>`;
    if(tab === 'notifications') return `<div class="settings-section"><span class="eyebrow">NOTIFICATIONS</span><h2>What should reach you?</h2><p>Choose alerts for in-app, email, and mobile delivery.</p>${[['Overdue job alerts',true],['Estimate follow-up reminders',true],['Unread customer messages',true],['Schedule conflicts',true],['Weekly revenue summary',false],['Customer review alerts',false]].map(item => `<div class="setting-row"><span><strong>${item[0]}</strong><small>Send in-app and email notifications.</small></span><label class="switch"><input type="checkbox" ${item[1]?'checked':''}><b></b></label></div>`).join('')}</div>`;
    if(tab === 'shop') return `<div class="settings-section"><span class="eyebrow">SHOP DETAILS</span><h2>Demo Body Shop</h2><p>Information used in customer communication, reports, and documents.</p><div class="form-grid"><label class="form-group"><span>Shop name</span><input class="input" value="Demo Body Shop"></label><label class="form-group"><span>Phone</span><input class="input" value="(432) 465-2978"></label><label class="form-group full"><span>Address</span><input class="input" value="123 Auto Way, Dallas, TX 75201"></label><label class="form-group"><span>Region</span><select class="select"><option>USA Region</option><option>Canada Region</option></select></label><label class="form-group"><span>Time zone</span><select class="select"><option>Central Time</option><option>Eastern Time</option><option>Pacific Time</option></select></label></div></div>`;
    if(tab === 'hours') return `<div class="settings-section"><span class="eyebrow">BUSINESS HOURS</span><h2>Shop and notification hours</h2><p>Used for scheduling, customer expectations, and staff alerts.</p>${['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map((day,index) => `<div class="setting-row"><span><strong>${day}</strong><small>${index<5?'7:00 AM – 5:00 PM':index===5?'9:00 AM – 12:00 PM':'Closed'}</small></span><label class="switch"><input type="checkbox" ${index<6?'checked':''}><b></b></label></div>`).join('')}</div>`;
    if(tab === 'permissions') return `<div class="settings-section"><span class="eyebrow">TEAM & PERMISSIONS</span><h2>Role-based access</h2><p>Control what each role can view and change.</p>${[['Owner','Full access'],['Shop Manager','Operations, sales, reports'],['Estimator','Customers, estimates, sales'],['Technician','Assigned jobs and schedule'],['CSR','Customers, messages, appointments']].map(item => `<div class="setting-row"><span><strong>${item[0]}</strong><small>${item[1]}</small></span><button class="btn btn-secondary" data-action="edit-role" data-name="${item[0]}">Edit</button></div>`).join('')}</div>`;
    if(tab === 'integrations') return `<div class="settings-section"><span class="eyebrow">INTEGRATIONS</span><h2>Connected tools</h2><p>Manage data sources and automation connections.</p><div class="integration-grid">${[['CCC ONE','Connected'],['Mitchell','Connected'],['QuickBooks','Connect'],['Google Calendar','Connect']].map(item => `<article class="integration-card"><div class="integration-card-top"><span class="integration-logo"><i data-icon="building"></i></span><span class="status-badge ${item[1]==='Connected'?'green':'blue'}">${item[1]}</span></div><h3>${item[0]}</h3><p>Keep customer, repair, and financial data in sync.</p><button class="btn btn-secondary" data-action="manage-integration" data-name="${item[0]}">Manage</button></article>`).join('')}</div></div>`;
    if(tab === 'setup') return `<div class="settings-section"><span class="eyebrow">SETUP HEALTH</span><h2>92% complete</h2><p>Complete these remaining tasks to improve automation and reporting.</p>${[['Connect QuickBooks','Keep invoices and payments in sync','Connect'],['Confirm notification hours','Avoid after-hours alerts','Review'],['Invite one more estimator','Balance lead follow-up workload','Invite']].map(item => `<div class="setting-row"><span><strong>${item[0]}</strong><small>${item[1]}</small></span><button class="btn btn-primary" data-toast="${item[2]} flow opened">${item[2]}</button></div>`).join('')}</div>`;
    return `<div class="settings-section"><span class="eyebrow">PROFILE</span><h2>Dana Rivera</h2><p>Personal details used for assignments, notifications, and customer communication.</p><div class="form-grid"><label class="form-group"><span>First name</span><input class="input" value="Dana"></label><label class="form-group"><span>Last name</span><input class="input" value="Rivera"></label><label class="form-group full"><span>Email</span><input class="input" value="ux@bodyshopbooster.com"></label><label class="form-group"><span>Role</span><select class="select"><option>Shop Manager</option><option>Owner</option><option>Estimator</option></select></label><label class="form-group"><span>Phone</span><input class="input" value="+1 555 948 3383"></label></div></div>`;
  }

  function settings(){
    const tabs = [['profile','Profile'],['shop','Shop details'],['hours','Business hours'],['permissions','Team & permissions'],['notifications','Notifications'],['appearance','Appearance'],['integrations','Integrations'],['setup','Setup health']];
    return `<section class="page active">${pageHeader('ADMINISTRATION','Settings','Control your profile, shop operations, team access, notifications, and appearance.','<button class="btn btn-primary" id="saveSettings"><i data-icon="check"></i> Save changes</button>')}<div class="settings-layout"><nav class="settings-nav">${tabs.map(tab => `<button class="${state.settingsTab===tab[0]?'active':''}" data-settings="${tab[0]}">${tab[1]}</button>`).join('')}</nav><div class="settings-panel" id="settingsPanel">${settingsPanel(state.settingsTab)}</div></div></section>`;
  }

  function help(){
    return `<section class="page active help-page">${pageHeader('SUPPORT','Help & support','Find answers, learn workflows, or contact the BodyShop Booster support team.','<button class="btn btn-primary" data-action="support"><i data-icon="message-circle"></i> Contact support</button>')}<div class="report-grid">${[['Getting started','Learn the core customer, scheduling, and sales workflows.','sparkles'],['Customer management','Add customers, repairs, estimates, documents, and notes.','users'],['Scheduling','Create appointments, manage calendars, and plan capacity.','calendar'],['Communication','Text, email, templates, attachments, and AI assistance.','message-circle'],['Reporting','Build reports and understand shop performance.','report'],['Integrations','Connect estimate, accounting, rental, and calendar tools.','plug']].map(item => `<article class="report-card"><span class="metric-icon primary"><i data-icon="${item[2]}"></i></span><h3>${item[0]}</h3><p>${item[1]}</p><button class="text-button" data-toast="${item[0]} guide opened">Open guide →</button></article>`).join('')}</div></section>`;
  }

  const pageRenderers = {dashboard,customers,jobs,schedule,estimates,sales,invoices,messages,reviews,vehicles,inventory,reports,team,integrations,settings,help};

  function renderNav(){
    sidebarNav.innerHTML = navGroups.map(group => `<div class="nav-group"><div class="nav-group-title">${group.title}</div>${group.items.map(([routeName,label,icon,badge]) => `<button class="nav-item ${state.route===routeName?'active':''}" data-route="${routeName}" title="${label}"><i data-icon="${icon}"></i><span class="label">${label}</span>${badge==='dot'?'<span class="nav-status"></span>':badge?`<span class="nav-count">${badge}</span>`:''}</button>`).join('')}</div>`).join('');
    renderIcons(sidebarNav);
  }

  function renderPage(routeName){
    const renderer = pageRenderers[routeName] || dashboard;
    main.innerHTML = renderer();
    renderIcons(main);
    bindPageEvents();
    main.focus({preventScroll:true});
  }

  function route(name){
    if(!pageRenderers[name]) name = 'dashboard';
    if(name === 'schedule' && window.innerWidth <= 767 && state.scheduleView === 'week') state.scheduleView = 'day';
    state.route = name;
    if(location.hash !== `#${name}`) history.replaceState(null,'',`#${name}`);
    renderNav();
    renderPage(name);
    $$('.mobile-nav [data-route]').forEach(button => button.classList.toggle('active', button.dataset.route === name));
    closeSidebar();
    closePopovers();
  }

  function filterCustomers(query = '', stage = ''){
    const term = query.toLowerCase();
    state.customers.forEach(customer => {
      const match = (!term || `${customer.name} ${customer.vehicle} ${customer.insurer} ${customer.phone}`.toLowerCase().includes(term)) && (!stage || customer.stage === stage);
      const row = $(`[data-customer="${customer.id}"]`, main);
      if(row) row.hidden = !match;
      const card = $(`[data-customer-card="${customer.id}"]`, main);
      if(card) card.hidden = !match;
    });
  }

  function bindDragAndDrop(){
    let draggedId = null;
    $$('[data-repair-id]', main).forEach(card => {
      card.addEventListener('dragstart', event => { draggedId = Number(card.dataset.repairId); event.dataTransfer.effectAllowed = 'move'; card.style.opacity = '.55'; });
      card.addEventListener('dragend', () => { card.style.opacity = ''; $$('.drag-over', main).forEach(column => column.classList.remove('drag-over')); });
    });
    $$('[data-drop-stage]', main).forEach(column => {
      column.addEventListener('dragover', event => { event.preventDefault(); column.classList.add('drag-over'); });
      column.addEventListener('dragleave', () => column.classList.remove('drag-over'));
      column.addEventListener('drop', event => {
        event.preventDefault();
        column.classList.remove('drag-over');
        const customer = state.customers.find(item => item.id === draggedId);
        if(customer){ customer.stage = column.dataset.dropStage; customer.next = `Continue ${column.dataset.dropStage.toLowerCase()} workflow`; persistWorkspaceData(); showToast(`${customer.name} moved to ${customer.stage}`); renderPage(state.route); }
      });
    });
  }

  function bindPageEvents(){
    $$('[data-route]', main).forEach(element => element.addEventListener('click', () => route(element.dataset.route)));
    $$('[data-action]', main).forEach(element => element.addEventListener('click', event => { event.stopPropagation(); handleAction(element.dataset.action, element.dataset); }));
    $$('[data-open-customer]', main).forEach(element => element.addEventListener('click', event => { event.stopPropagation(); openCustomer(Number(element.dataset.openCustomer)); }));
    $$('[data-notifications]', main).forEach(element => element.addEventListener('click', openNotifications));
    $$('[data-job-view]', main).forEach(button => button.addEventListener('click', () => { state.jobView = button.dataset.jobView; renderPage('jobs'); }));
    $$('[data-schedule-view]', main).forEach(button => button.addEventListener('click', () => { state.scheduleView = button.dataset.scheduleView; renderPage('schedule'); }));
    $$('.settings-nav button', main).forEach(button => button.addEventListener('click', () => { state.settingsTab = button.dataset.settings; renderPage('settings'); }));
    $('#saveSettings', main)?.addEventListener('click', () => showToast('Settings saved'));
    $('#customerSearch', main)?.addEventListener('input', event => {
      const stage = $('#customerStage', main)?.value || '';
      filterCustomers(event.target.value,stage);
    });
    $('#customerStage', main)?.addEventListener('change', () => $('#customerSearch', main)?.dispatchEvent(new Event('input')));
    $$('[data-mobile-stage]', main).forEach(button => button.addEventListener('click', () => {
      $$('[data-mobile-stage]', main).forEach(item => item.classList.toggle('active',item === button));
      const select = $('#customerStage', main);
      if(select) select.value = button.dataset.mobileStage;
      $('#customerSearch', main)?.dispatchEvent(new Event('input'));
    }));
    $('#estimateSearch', main)?.addEventListener('input', event => {
      const term = event.target.value.toLowerCase(); const status = $('#estimateStatus', main)?.value || '';
      $$('#estimateRows tr', main).forEach(row => { const estimate = state.estimates.find(item => item.id === Number(row.dataset.estimateId)); row.hidden = !((!term || `${estimate.customer} ${estimate.vehicle}`.toLowerCase().includes(term)) && (!status || estimate.status === status)); });
    });
    $('#estimateStatus', main)?.addEventListener('change', () => $('#estimateSearch', main)?.dispatchEvent(new Event('input')));
    $('#reportSearch', main)?.addEventListener('input', event => { const term = event.target.value.toLowerCase(); $$('[data-report-name]', main).forEach(card => card.hidden = !card.dataset.reportName.includes(term)); });
    $$('[data-chat-index]', main).forEach(row => row.addEventListener('click', () => { state.activeConversation = Number(row.dataset.chatIndex); renderPage('messages'); $('#inboxLayout', main)?.classList.add('chat-open'); }));
    $('[data-chat-back]', main)?.addEventListener('click', () => $('#inboxLayout', main)?.classList.remove('chat-open'));
    $('#chatCompose', main)?.addEventListener('submit', event => {
      event.preventDefault();
      const input = event.currentTarget.elements.message;
      const text = input.value.trim();
      if(!text) return;
      state.messages[state.activeConversation].messages.push({out:true,text});
      state.messages[state.activeConversation].preview = text;
      persistWorkspaceData();
      input.value = '';
      renderPage('messages');
      setTimeout(() => { const chat = $('#chatMessages', main); if(chat) chat.scrollTop = chat.scrollHeight; }, 20);
      showToast('Message sent');
    });
    bindSettingsEvents();
    bindDragAndDrop();
  }

  function bindSettingsEvents(){
    $$('[data-theme]', main).forEach(button => button.addEventListener('click', () => { state.theme = button.dataset.theme; storage.set('bsb-theme', state.theme); applyPreferences(); renderPage('settings'); showToast(`${state.theme === 'dark' ? 'Dark' : 'Light'} theme applied`); }));
    $('#densityToggle', main)?.addEventListener('change', event => { state.density = event.target.checked ? 'compact' : 'comfortable'; storage.set('bsb-density', state.density); applyPreferences(); showToast(`${state.density} density applied`); });
    $('#sidebarSettingToggle', main)?.addEventListener('change', event => { state.sidebarCollapsed = event.target.checked; storage.set('bsb-sidebar', state.sidebarCollapsed ? 'collapsed' : 'expanded'); applyPreferences(); renderNav(); showToast(state.sidebarCollapsed ? 'Sidebar collapsed' : 'Sidebar expanded'); });
    $$('[data-toast]', main).forEach(button => button.addEventListener('click', () => showToast(button.dataset.toast)));
  }

  function field(label,name,type='text',placeholder='',value=''){
    return `<label class="form-group"><span>${label}</span><input class="input" name="${name}" type="${type}" placeholder="${placeholder}" value="${escapeHtml(value)}" required></label>`;
  }

  let lastFocusedElement = null;

  function modal(title, body, submitLabel = 'Save', onSubmit = null, size = ''){
    lastFocusedElement = document.activeElement;
    modalRoot.innerHTML = `<div class="modal-dialog ${size}" role="dialog" aria-modal="true" aria-labelledby="activeModalTitle"><div class="modal-header"><h2 id="activeModalTitle">${title}</h2><button class="icon-btn" type="button" data-close-modal aria-label="Close"><i data-icon="x"></i></button></div><form id="activeModalForm"><div class="modal-body">${body}</div><div class="modal-footer"><button class="btn btn-secondary" type="button" data-close-modal>Cancel</button><button class="btn btn-primary" type="submit">${submitLabel}</button></div></form></div>`;
    renderIcons(modalRoot);
    modalRoot.classList.add('open');
    modalRoot.setAttribute('aria-hidden','false');
    $$('[data-close-modal]', modalRoot).forEach(button => button.addEventListener('click', closeModal));
    $('#activeModalForm', modalRoot).addEventListener('submit', event => { event.preventDefault(); const result = onSubmit?.(new FormData(event.currentTarget)); if(result !== false) closeModal(); });
    requestAnimationFrame(() => $('input,select,textarea,button',modalRoot)?.focus());
  }

  function closeModal(){ modalRoot.classList.remove('open'); modalRoot.setAttribute('aria-hidden','true'); if(lastFocusedElement?.focus) lastFocusedElement.focus(); }

  function openCustomer(id){
    const customer = state.customers.find(item => item.id === id);
    if(!customer) return;
    const activeIndex = Math.max(0, repairStages.indexOf(customer.stage));
    drawerRoot.innerHTML = `<div class="drawer-head"><div class="table-person"><span class="avatar">${initials(customer.name)}</span><span><strong>${customer.name}</strong><small>${customer.vehicle}</small></span></div><button class="icon-btn" data-close-drawer><i data-icon="x"></i></button></div><div class="drawer-body"><div class="timeline">${repairStages.map((stage,index) => `<span class="${index<activeIndex?'done':index===activeIndex?'current':''}">${stage}</span>`).join('')}</div><div class="drawer-section"><h3>Repair snapshot</h3><div class="detail-grid"><div><small>RO NUMBER</small><strong>${customer.ro}</strong></div><div><small>INSURER</small><strong>${customer.insurer}</strong></div><div><small>ASSIGNEE</small><strong>${customer.assignee}</strong></div><div><small>VALUE</small><strong>${formatCurrency(customer.value)}</strong></div><div><small>DUE</small><strong>${customer.due}</strong></div><div><small>NEXT ACTION</small><strong>${customer.next}</strong></div></div></div><div class="drawer-section"><h3>Contact</h3><p>${customer.phone}</p><p>${customer.email}</p></div><div class="drawer-section"><h3>Update repair stage</h3><select class="select" id="drawerStage">${repairStages.map(stage => `<option ${stage===customer.stage?'selected':''}>${stage}</option>`).join('')}</select></div><div class="drawer-section"><h3>Recent activity</h3><p>Estimate reviewed · 32 minutes ago</p><p>Customer replied by SMS · 1 hour ago</p><p>Assignment data received · Yesterday</p></div></div><div class="drawer-foot"><button class="btn btn-secondary" data-action="message" data-name="${customer.name}">Message</button><button class="btn btn-secondary" data-action="schedule" data-name="${customer.name}">Schedule</button><button class="btn btn-primary" id="saveDrawerStage">Save stage</button></div>`;
    drawerRoot.setAttribute('role','dialog');
    drawerRoot.setAttribute('aria-modal','true');
    renderIcons(drawerRoot);
    drawerRoot.classList.add('open');
    drawerRoot.setAttribute('aria-hidden','false');
    $('[data-close-drawer]', drawerRoot).addEventListener('click', closeDrawer);
    $$('[data-action]', drawerRoot).forEach(button => button.addEventListener('click', () => handleAction(button.dataset.action, button.dataset)));
    $('#saveDrawerStage', drawerRoot).addEventListener('click', () => { customer.stage = $('#drawerStage', drawerRoot).value; customer.next = `Continue ${customer.stage.toLowerCase()} workflow`; persistWorkspaceData(); closeDrawer(); renderPage(state.route); showToast('Repair stage updated'); });
  }

  function closeDrawer(){ drawerRoot.classList.remove('open'); drawerRoot.setAttribute('aria-hidden','true'); }

  function downloadCSV(filename, rows){
    const csv = rows.map(row => row.map(cell => `"${String(cell).replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], {type:'text/csv;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = filename; document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(url);
  }

  function handleAction(action, data = {}){
    if(action === 'customer'){
      modal('Add customer', `<div class="form-grid">${field('First name','first')}${field('Last name','last')}${field('Phone','phone','tel')}${field('Email','email','email')}<label class="form-group full"><span>Vehicle</span><input class="input" name="vehicle" placeholder="Year, make, model"></label><label class="form-group"><span>Insurer</span><select class="select" name="insurer"><option>Not set</option><option>State Farm</option><option>Progressive</option><option>GEICO</option><option>Allstate</option></select></label><label class="form-group"><span>Initial assignee</span><select class="select" name="assignee"><option>Unassigned</option><option>Dana Rivera</option><option>Jeff Nelson</option><option>Maya Patel</option></select></label></div>`, 'Add customer', formData => {
        const name = `${formData.get('first')} ${formData.get('last')}`.trim();
        state.customers.unshift({id:uid(),name,phone:formData.get('phone'),email:formData.get('email'),vehicle:formData.get('vehicle')||'Vehicle not added',insurer:formData.get('insurer'),stage:'New',assignee:formData.get('assignee'),value:0,next:'Complete intake',ro:`RO #${10600+state.customers.length}`,due:'Not scheduled'});
        persistWorkspaceData();
        showToast(`${name} added`); if(state.route === 'customers' || state.route === 'dashboard') renderPage(state.route);
      });
      return;
    }
    if(action === 'schedule' || action === 'appointment'){
      modal('Schedule appointment', `<div class="form-grid">${field('Customer','customer','text','Customer name',data.name||'')}${field('Date','date','date')}${field('Start time','time','time')}<label class="form-group"><span>Appointment type</span><select class="select" name="type"><option>Estimate</option><option>Drop-off</option><option>Repair</option><option>Pickup</option></select></label><label class="form-group"><span>Calendar</span><select class="select" name="calendar"><option>Checking</option><option>Estimate Calendar</option><option>Large Repair</option><option>Small Repair</option></select></label><label class="form-group full"><span>Notes</span><textarea class="textarea" name="notes" placeholder="Add preparation or customer notes"></textarea></label></div>`, 'Schedule appointment', formData => {
        state.appointments.push({id:uid(),day:0,time:formData.get('time') || '9:00 AM',name:formData.get('customer')||'New customer',vehicle:'Vehicle',type:formData.get('type'),tone:'blue'});
        persistWorkspaceData();
        showToast('Appointment scheduled'); if(state.route === 'schedule' || state.route === 'dashboard') renderPage(state.route);
      });
      return;
    }
    if(action === 'estimate'){
      modal('Create estimate', `<div class="form-grid">${field('Customer','customer','','Customer name')}${field('Vehicle','vehicle','','Year, make, model')}${field('Estimate value','value','number','0')}<label class="form-group"><span>Insurer</span><select class="select" name="insurer"><option>State Farm</option><option>Progressive</option><option>GEICO</option><option>Allstate</option></select></label><label class="form-group"><span>Owner</span><select class="select" name="owner"><option>Dana Rivera</option><option>Jeff Nelson</option><option>Maya Patel</option></select></label><label class="form-group full"><span>Notes</span><textarea class="textarea" name="notes"></textarea></label></div>`, 'Create estimate', formData => {
        state.estimates.unshift({id:uid(),customer:formData.get('customer'),vehicle:formData.get('vehicle'),value:Number(formData.get('value')),status:'Draft',owner:formData.get('owner'),age:'Today'});
        persistWorkspaceData();
        showToast('Estimate created'); if(state.route === 'estimates' || state.route === 'sales') renderPage(state.route);
      });
      return;
    }
    if(action === 'repair'){
      modal('Create repair order', `<div class="form-grid">${field('Customer','customer','','Customer name')}${field('Vehicle','vehicle','','Year, make, model')}${field('RO number','ro','','RO #')}<label class="form-group"><span>Starting stage</span><select class="select" name="stage">${repairStages.map(stage => `<option>${stage}</option>`).join('')}</select></label><label class="form-group"><span>Assignee</span><select class="select" name="assignee"><option>Dana Rivera</option><option>Sarah Williams</option><option>Mike Johnson</option></select></label><label class="form-group"><span>Value</span><input class="input" name="value" type="number" value="0"></label></div>`, 'Create repair order', formData => {
        state.customers.unshift({id:uid(),name:formData.get('customer'),phone:'Not added',email:'Not added',vehicle:formData.get('vehicle'),insurer:'Not set',stage:formData.get('stage'),assignee:formData.get('assignee'),value:Number(formData.get('value')),next:'Review new repair order',ro:formData.get('ro')||`RO #${10600+state.customers.length}`,due:'Not scheduled'});
        persistWorkspaceData();
        showToast('Repair order created'); if(state.route === 'jobs' || state.route === 'dashboard') renderPage(state.route);
      });
      return;
    }
    if(action === 'message'){
      modal(`Message ${data.name || 'customer'}`, `<label class="form-group"><span>Recipient</span><input class="input" name="recipient" value="${escapeHtml(data.name||'')}" placeholder="Customer name"></label><label class="form-group"><span>Channel</span><select class="select" name="channel"><option>SMS</option><option>Email</option></select></label><label class="form-group"><span>Message</span><textarea class="textarea" name="message" placeholder="Write a message…" required></textarea></label>`, 'Send message', formData => { showToast(`${formData.get('channel')} sent to ${formData.get('recipient') || 'customer'}`); });
      return;
    }
    if(action === 'payment'){
      modal('Record payment', `<div class="form-grid">${field('Invoice number','invoice','','INV-10045')}${field('Payment amount','amount','number','0')}<label class="form-group"><span>Method</span><select class="select" name="method"><option>Credit card</option><option>Check</option><option>Cash</option><option>Insurance payment</option></select></label>${field('Reference','reference','','Optional')}</div>`, 'Record payment', formData => showToast(`${formatCurrency(formData.get('amount'))} payment recorded`));
      return;
    }
    if(action === 'vehicle'){
      modal('Add vehicle', `<div class="form-grid">${field('Customer','customer','','Customer name')}${field('VIN','vin','','17-character VIN')}${field('Year','year','number','2026')}${field('Make','make','','Make')}${field('Model','model','','Model')}${field('Color','color','','Color')}</div>`, 'Add vehicle', () => showToast('Vehicle added'));
      return;
    }
    if(action === 'part'){
      modal('Add part', `<div class="form-grid">${field('Part name','name','','Part name')}${field('Part number','number','','Part number')}${field('Quantity','quantity','number','1')}${field('Unit cost','cost','number','0')}<label class="form-group full"><span>Repair / vehicle</span><input class="input" name="repair" placeholder="Search repair or vehicle"></label></div>`, 'Add part', () => showToast('Part added'));
      return;
    }
    if(action === 'team-member'){
      modal('Add team member', `<div class="form-grid">${field('First name','first')}${field('Last name','last')}${field('Email','email','email')}<label class="form-group"><span>Role</span><select class="select"><option>Technician</option><option>Estimator</option><option>CSR</option><option>Manager</option></select></label></div>`, 'Send invitation', () => showToast('Team invitation sent'));
      return;
    }
    if(action === 'open-estimate'){
      const estimate = state.estimates.find(item => item.id === Number(data.id));
      modal(`Estimate #${estimate?.id || ''}`, `<div class="metric-grid">${metricCard('dollar','Estimate value',formatCurrency(estimate?.value || 0),'Current','blue')}${metricCard('clock','Age',estimate?.age || 'Today','Follow up','amber')}</div><div class="drawer-section"><h3>${estimate?.customer || 'Customer'}</h3><p>${estimate?.vehicle || ''}</p><p>Owner: ${estimate?.owner || ''}</p></div><label class="form-group"><span>Status</span><select class="select" name="status"><option ${estimate?.status==='Draft'?'selected':''}>Draft</option><option ${estimate?.status==='Sent'?'selected':''}>Sent</option><option ${estimate?.status==='Approved'?'selected':''}>Approved</option></select></label>`, 'Save estimate', formData => { if(estimate) estimate.status = formData.get('status'); persistWorkspaceData(); showToast('Estimate updated'); if(state.route==='estimates') renderPage('estimates'); });
      return;
    }
    if(action === 'open-invoice'){
      const invoice = state.invoices.find(item => item.id === data.id);
      modal(invoice?.id || 'Invoice', `<div class="detail-grid"><div><small>CUSTOMER</small><strong>${invoice?.customer || ''}</strong></div><div><small>AMOUNT</small><strong>${formatCurrency(invoice?.amount || 0)}</strong></div><div><small>STATUS</small><strong>${invoice?.status || ''}</strong></div><div><small>DUE</small><strong>${invoice?.due || ''}</strong></div></div><div class="drawer-section"><h3>Payment activity</h3><p>No payment activity recorded in this prototype.</p></div>`, 'Close', () => showToast('Invoice reviewed'));
      return;
    }
    if(action === 'open-report'){
      modal(data.title || 'Report', `<div class="metric-grid">${metricCard('dollar','Revenue','$158,720','+18.6%','green')}${metricCard('trend','Conversion','38.6%','+3.2 pts','purple')}${metricCard('clock','Cycle time','4.1 days','-0.7 day','blue')}${metricCard('users','Qualified leads','42','+12%','amber')}</div><div class="line-chart"><div class="chart-grid-lines"></div><svg viewBox="0 0 600 220" preserveAspectRatio="none"><path d="M0 180 C80 150 115 175 175 125 S280 100 330 95 S440 45 600 58" fill="none" stroke="#245fda" stroke-width="5" stroke-linecap="round"/><path d="M0 180 C80 150 115 175 175 125 S280 100 330 95 S440 45 600 58 L600 220 L0 220Z" fill="rgba(36,95,218,.1)"/></svg></div>`, 'Close', () => {});
      return;
    }
    if(action.startsWith('export-')){
      if(action === 'export-sales') downloadCSV('bodyshop-sales.csv', [['Customer','Vehicle','Stage','Value'], ...state.customers.map(customer => [customer.name,customer.vehicle,customer.stage,customer.value])]);
      else if(action === 'export-estimates') downloadCSV('bodyshop-estimates.csv', [['Customer','Vehicle','Status','Value'], ...state.estimates.map(estimate => [estimate.customer,estimate.vehicle,estimate.status,estimate.value])]);
      else if(action === 'export-invoices') downloadCSV('bodyshop-invoices.csv', [['Invoice','Customer','Status','Amount'], ...state.invoices.map(invoice => [invoice.id,invoice.customer,invoice.status,invoice.amount])]);
      else downloadCSV('bodyshop-jobs.csv', [['RO','Customer','Vehicle','Stage','Assignee'], ...state.customers.map(customer => [customer.ro,customer.name,customer.vehicle,customer.stage,customer.assignee])]);
      showToast('CSV export downloaded');
      return;
    }
    if(action === 'print-schedule'){ window.print(); return; }
    if(action === 'folder'){
      modal('Create report folder', `${field('Folder name','name','','Folder name')}<label class="form-group"><span>Description</span><textarea class="textarea" name="description"></textarea></label>`, 'Create folder', formData => showToast(`${formData.get('name')} folder created`));
      return;
    }
    if(action === 'report'){
      modal('Build custom report', `<div class="form-grid">${field('Report name','name','','Report name')}<label class="form-group"><span>Data source</span><select class="select"><option>Repairs</option><option>Estimates</option><option>Customers</option><option>Appointments</option><option>Invoices</option></select></label><label class="form-group"><span>Date range</span><select class="select"><option>This month</option><option>Last 30 days</option><option>This quarter</option></select></label><label class="form-group"><span>Visualization</span><select class="select"><option>Table</option><option>Line chart</option><option>Bar chart</option><option>Funnel</option></select></label></div>`, 'Build report', formData => showToast(`${formData.get('name')} report created`));
      return;
    }
    if(action === 'filters' || action === 'calendar-filter'){
      modal('Filters', `<div class="form-grid"><label class="form-group"><span>Customer status</span><select class="select"><option>Active</option><option>Archived</option></select></label><label class="form-group"><span>Repair stage</span><select class="select"><option>All stages</option>${repairStages.map(stage => `<option>${stage}</option>`).join('')}</select></label><label class="form-group"><span>Assignee</span><select class="select"><option>Everyone</option><option>Dana Rivera</option><option>Sarah Williams</option></select></label><label class="form-group"><span>Insurer</span><select class="select"><option>All insurers</option><option>State Farm</option><option>Progressive</option><option>GEICO</option></select></label></div>`, 'Apply filters', () => showToast('Filters applied'));
      return;
    }
    if(action === 'vin'){
      modal('VIN lookup', `${field('VIN','vin','','Enter a 17-character VIN')}<div class="drawer-section"><p>Vehicle details, warranty information, and specifications will appear here.</p></div>`, 'Look up VIN', () => showToast('VIN lookup completed'));
      return;
    }
    if(action === 'support'){
      modal('Contact support', `<div class="form-grid">${field('Subject','subject','','How can we help?')}<label class="form-group full"><span>Message</span><textarea class="textarea" name="message" required></textarea></label></div>`, 'Send request', () => showToast('Support request sent'));
      return;
    }
    if(action === 'reply-review'){
      modal(`Reply to ${data.name}`, `<label class="form-group"><span>Public reply</span><textarea class="textarea" name="reply" placeholder="Thank the customer and address their feedback."></textarea></label>`, 'Publish reply', () => showToast('Review reply published'));
      return;
    }
    if(action === 'manage-integration'){
      modal(data.name || 'Integration', `<div class="drawer-section"><h3>Connection status</h3><p>This integration is configured for the prototype. Connection controls are simulated.</p></div><div class="setting-row"><span><strong>Automatic sync</strong><small>Sync new records and updates.</small></span><label class="switch"><input type="checkbox" checked><b></b></label></div>`, 'Save connection', () => showToast(`${data.name || 'Integration'} settings saved`));
      return;
    }
    showToast(`${String(action).replace(/-/g,' ')} opened`);
  }

  function closePopovers(){ $$('.menu-popover.open').forEach(popover => popover.classList.remove('open')); }

  function setupMenus(){
    const shopMenu = $('#shopMenu');
    shopMenu.innerHTML = ['Demo Body Shop','Auto Glass Pro','Hulk Smash South'].map(shop => `<button class="menu-row" data-shop="${shop}"><span class="shop-icon">${shop.split(' ').map(word=>word[0]).slice(0,2).join('')}</span><span>${shop}</span>${shop===state.shop?'<i data-icon="check"></i>':''}</button>`).join('');
    renderIcons(shopMenu);
    $$('[data-shop]', shopMenu).forEach(button => button.addEventListener('click', () => { state.shop = button.dataset.shop; storage.set('bsb-shop',state.shop); $('#currentShopName').textContent = state.shop; setupMenus(); closePopovers(); showToast(`Switched to ${state.shop}`); }));

    const newMenu = $('#newMenu');
    newMenu.innerHTML = '<div class="menu-heading">CREATE NEW</div>' + [['customer','users','Customer'],['estimate','file','Estimate'],['schedule','calendar','Appointment'],['repair','wrench','Repair order'],['payment','credit','Payment'],['message','message-circle','Message']].map(item => `<button class="menu-row" data-new-action="${item[0]}"><i data-icon="${item[1]}"></i><span>${item[2]}</span></button>`).join('');
    renderIcons(newMenu);
    $$('[data-new-action]', newMenu).forEach(button => button.addEventListener('click', () => { closePopovers(); handleAction(button.dataset.newAction); }));

    const profileMenu = $('#profileMenu');
    profileMenu.innerHTML = '<div class="menu-heading">DANA RIVERA · SHOP MANAGER</div><button class="menu-row" data-route="settings"><i data-icon="settings"></i><span>Account settings</span></button><button class="menu-row" data-route="team"><i data-icon="team"></i><span>Team & permissions</span></button><button class="menu-row" data-logout><i data-icon="logout"></i><span>Log out</span></button>';
    renderIcons(profileMenu);
    $$('[data-route]', profileMenu).forEach(button => button.addEventListener('click', () => route(button.dataset.route)));
    $('[data-logout]', profileMenu).addEventListener('click', logout);
  }

  function openNotifications(){
    notificationPanel.innerHTML = `<div class="drawer-head"><div><span class="eyebrow">ACTION CENTER</span><h2>Notifications</h2></div><button class="icon-btn" data-close-notifications><i data-icon="x"></i></button></div><div class="drawer-body">${state.notifications.map(notification => `<button class="alert-card ${notification.tone}" data-route="${notification.route}"><span class="row-icon"><i data-icon="bell"></i></span><span class="alert-copy"><strong>${notification.title}</strong><small>${notification.detail}</small></span><i data-icon="chevron-right"></i></button>`).join('')}</div><div class="drawer-foot"><button class="btn btn-secondary" data-toast="All notifications marked as read">Mark all read</button><button class="btn btn-primary" data-route="settings">Notification settings</button></div>`;
    renderIcons(notificationPanel);
    notificationPanel.classList.add('open');
    notificationPanel.setAttribute('aria-hidden','false');
    $('[data-close-notifications]', notificationPanel).addEventListener('click', () => notificationPanel.classList.remove('open'));
    $$('[data-route]', notificationPanel).forEach(button => button.addEventListener('click', () => { notificationPanel.classList.remove('open'); route(button.dataset.route); }));
    $$('[data-toast]', notificationPanel).forEach(button => button.addEventListener('click', () => showToast(button.dataset.toast)));
  }

  function openMore(){
    const items = [['schedule','calendar','Schedule'],['estimates','file','Estimates'],['sales','trend','Sales'],['invoices','invoice','Invoices'],['messages','message-circle','Messages'],['reviews','review','Reviews'],['vehicles','car','Vehicles'],['inventory','package','Inventory'],['reports','report','Reports'],['team','team','Team'],['integrations','plug','Integrations'],['settings','settings','Settings']];
    moreSheet.innerHTML = `<div class="sheet-handle"></div><div class="sheet-grid">${items.map(item => `<button class="sheet-action" data-route="${item[0]}"><span class="metric-icon primary"><i data-icon="${item[1]}"></i></span><span>${item[2]}</span></button>`).join('')}</div>`;
    renderIcons(moreSheet);
    moreSheet.classList.add('open');
    moreSheet.setAttribute('aria-hidden','false');
    $$('[data-route]', moreSheet).forEach(button => button.addEventListener('click', () => { moreSheet.classList.remove('open'); route(button.dataset.route); }));
  }

  function openCommand(){
    const overlay = $('#commandPalette');
    const results = $('#commandResults');
    const input = $('#commandInput');
    const items = [
      ...navGroups.flatMap(group => group.items.map(item => ({route:item[0],label:item[1],icon:item[2],sub:'Jump to page'}))),
      ...state.customers.map(customer => ({customer:customer.id,label:customer.name,sub:customer.vehicle,icon:'users'})),
      ...state.estimates.map(estimate => ({action:'open-estimate',id:estimate.id,label:`Estimate · ${estimate.customer}`,sub:formatCurrency(estimate.value),icon:'file'}))
    ];
    const draw = query => {
      const filtered = items.filter(item => `${item.label} ${item.sub}`.toLowerCase().includes(query.toLowerCase())).slice(0,14);
      results.innerHTML = `<div class="command-section"><span>RESULTS</span>${filtered.map(item => `<button class="command-item" ${item.route?`data-route="${item.route}"`:item.customer?`data-open-customer="${item.customer}"`:`data-command-action="${item.action}" data-id="${item.id}"`}><span class="metric-icon primary"><i data-icon="${item.icon}"></i></span><span><strong>${item.label}</strong><small>${item.sub}</small></span><i data-icon="chevron-right"></i></button>`).join('') || '<div class="card-body">No results found.</div>'}</div>`;
      renderIcons(results);
      $$('[data-route]', results).forEach(button => button.addEventListener('click', () => { closeCommand(); route(button.dataset.route); }));
      $$('[data-open-customer]', results).forEach(button => button.addEventListener('click', () => { closeCommand(); openCustomer(Number(button.dataset.openCustomer)); }));
      $$('[data-command-action]', results).forEach(button => button.addEventListener('click', () => { closeCommand(); handleAction(button.dataset.commandAction,button.dataset); }));
    };
    draw('');
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden','false');
    input.value = '';
    setTimeout(() => input.focus(),30);
    input.oninput = () => draw(input.value);
  }

  function closeCommand(){ $('#commandPalette').classList.remove('open'); $('#commandPalette').setAttribute('aria-hidden','true'); }
  function closeSidebar(){ $('#sidebar').classList.remove('open'); $('#sidebarBackdrop').classList.remove('open'); }

  function loginSuccess(remember){
    if(remember) storage.set('bsb-session','1'); else storage.sset('bsb-session','1');
    state.signedIn = true;
    auth.hidden = true;
    app.hidden = false;
    setupMenus();
    renderNav();
    route(location.hash.replace('#','') || 'dashboard');
  }

  function logout(){
    storage.remove('bsb-session'); storage.sremove('bsb-session'); state.signedIn = false;
    app.hidden = true; auth.hidden = false; closePopovers(); closeDrawer(); notificationPanel.classList.remove('open');
    history.replaceState(null,'',location.pathname);
    renderIcons(auth);
  }

  function bindLogin(){
    $$('[data-login-form]').forEach(form => {
      const email = form.elements.email;
      const password = form.elements.password;
      const error = $('[data-login-error]', form);
      form.addEventListener('submit', event => {
        event.preventDefault();
        const valid = email.value.trim().toLowerCase() === 'ux@bodyshopbooster.com' && password.value === 'Testing321$';
        if(!valid){ error.textContent = 'Use ux@bodyshopbooster.com and Testing321$ for this prototype.'; email.focus(); return; }
        error.textContent = '';
        loginSuccess(form.elements.remember.checked);
      });
    });
    $$('.demo-fill').forEach(button => button.addEventListener('click', () => { const form = button.closest('form'); form.elements.email.value = 'ux@bodyshopbooster.com'; form.elements.password.value = 'Testing321$'; form.elements.password.focus(); }));
    $$('.password-toggle').forEach(button => button.addEventListener('click', () => { const input = button.parentElement.querySelector('input'); input.type = input.type === 'password' ? 'text' : 'password'; button.dataset.icon = input.type === 'text' ? 'eye-off' : 'eye'; renderIcons(button); }));
    $$('[data-toast]', auth).forEach(button => button.addEventListener('click', () => showToast(button.dataset.toast)));
  }

  function initShell(){
    applyPreferences();
    $('#currentShopName').textContent = state.shop;
    setupMenus();
    renderNav();
    renderIcons();

    document.addEventListener('click', event => {
      const routeButton = event.target.closest('[data-route]');
      if(routeButton && !routeButton.closest('#mainContent') && !routeButton.closest('#profileMenu') && !routeButton.closest('#mobileMoreSheet') && !routeButton.closest('#notificationPanel')) route(routeButton.dataset.route);
      const toastButton = event.target.closest('[data-toast]');
      if(toastButton && !toastButton.closest('#mainContent') && !toastButton.closest('#notificationPanel') && !toastButton.closest('#authScreen')) showToast(toastButton.dataset.toast);
      if(!event.target.closest('.shop-switcher-wrap') && !event.target.closest('.new-menu-wrap') && !event.target.closest('.profile-wrap')) closePopovers();
    });

    $('#shopSwitcher').addEventListener('click', event => { event.stopPropagation(); $('#shopMenu').classList.toggle('open'); $('#newMenu').classList.remove('open'); $('#profileMenu').classList.remove('open'); });
    $('#newButton').addEventListener('click', event => { event.stopPropagation(); $('#newMenu').classList.toggle('open'); $('#shopMenu').classList.remove('open'); $('#profileMenu').classList.remove('open'); });
    $('#profileButton').addEventListener('click', event => { event.stopPropagation(); $('#profileMenu').classList.toggle('open'); $('#shopMenu').classList.remove('open'); $('#newMenu').classList.remove('open'); });
    $('#notificationButton').addEventListener('click', openNotifications);
    $('#globalSearchButton').addEventListener('click', openCommand);
    $('#mobileMenu').addEventListener('click', () => { $('#sidebar').classList.add('open'); $('#sidebarBackdrop').classList.add('open'); });
    $('#sidebarBackdrop').addEventListener('click', closeSidebar);
    $('#mobileCreate').addEventListener('click', () => { const button = $('#newButton'); if(window.innerWidth <= 920){ openMobileCreate(); } else button.click(); });
    $('#mobileMore').addEventListener('click', openMore);
    $('#phoneButton').addEventListener('click', () => showToast('Call center opened'));
    $('#collapseSidebar').addEventListener('click', () => { state.sidebarCollapsed = !state.sidebarCollapsed; storage.set('bsb-sidebar',state.sidebarCollapsed?'collapsed':'expanded'); applyPreferences(); renderNav(); });
    $('#commandPalette').addEventListener('click', event => { if(event.target.id === 'commandPalette') closeCommand(); });
    modalRoot.addEventListener('click', event => { if(event.target === modalRoot) closeModal(); });
    window.addEventListener('hashchange', () => { if(state.signedIn) route(location.hash.replace('#','') || 'dashboard'); });
    document.addEventListener('keydown', event => {
      if((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k'){ event.preventDefault(); openCommand(); }
      if(event.key === 'Escape'){ closeCommand(); closeModal(); closeDrawer(); closePopovers(); moreSheet.classList.remove('open'); notificationPanel.classList.remove('open'); closeSidebar(); }
    });
  }

  function openMobileCreate(){
    moreSheet.innerHTML = `<div class="sheet-handle"></div><div class="menu-heading">CREATE NEW</div><div class="sheet-grid">${[['customer','users','Customer'],['estimate','file','Estimate'],['schedule','calendar','Appointment'],['repair','wrench','Repair order'],['payment','credit','Payment'],['message','message-circle','Message']].map(item => `<button class="sheet-action" data-action="${item[0]}"><span class="metric-icon primary"><i data-icon="${item[1]}"></i></span><span>${item[2]}</span></button>`).join('')}</div>`;
    renderIcons(moreSheet);
    moreSheet.classList.add('open');
    $$('[data-action]', moreSheet).forEach(button => button.addEventListener('click', () => { moreSheet.classList.remove('open'); handleAction(button.dataset.action); }));
  }

  bindLogin();
  initShell();

  const previewRoute = new URLSearchParams(location.search).get('preview');
  if(previewRoute){ auth.hidden = true; app.hidden = false; state.signedIn = true; route(previewRoute === 'app' ? 'dashboard' : previewRoute); }
  else if(state.signedIn){ auth.hidden = true; app.hidden = false; route(location.hash.replace('#','') || 'dashboard'); }
  else { auth.hidden = false; app.hidden = true; renderIcons(auth); }
})();
