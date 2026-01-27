/* =========================================================
   GLOBAL UTILITIES
========================================================= */

/**
 * Safe DOM selector
 */
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

/**
 * Convert 12h time string to decimal hours (Chart.js helper)
 */
function timeToDecimal(timeStr) {
    let [time, meridian] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (meridian === 'PM' && hours !== 12) hours += 12;
    if (meridian === 'AM' && hours === 12) hours = 0;

    return hours + minutes / 60;
}

/* =========================================================
   DOM READY
========================================================= */
document.addEventListener('DOMContentLoaded', () => {

    /* =====================================================
       SIDEBAR + MENU STATE
    ===================================================== */

    const toggles = document.querySelectorAll('.section-toggle');

    function closeAllSections(except = null) {
        toggles.forEach(toggle => {
            if (toggle === except) return;
            const items = document.getElementById(toggle.getAttribute('aria-controls'));
            toggle.setAttribute('aria-expanded', 'false');
            items.setAttribute('aria-hidden', 'true');
        });
    }
    
    toggles.forEach(toggle => {
        const items = document.getElementById(toggle.getAttribute('aria-controls'));
        const isOpen = toggle.getAttribute('aria-expanded') === 'true';
        items.setAttribute('aria-hidden', String(!isOpen));
    
        toggle.addEventListener('click', () => {
            const open = toggle.getAttribute('aria-expanded') === 'true';
            closeAllSections(open ? null : toggle);
            toggle.setAttribute('aria-expanded', String(!open));
            items.setAttribute('aria-hidden', String(open));
        });
    });
    


    /* =====================================================
       THEME TOGGLE
    ===================================================== */
    window.toggleTheme = function () {
        const html = document.documentElement;
        const icon = $('#themeIcon');
        const logo = $('#brandLogo');

        if (html.getAttribute('data-theme') === 'dark') {
            html.removeAttribute('data-theme');
            icon && (icon.className = 'ri-moon-line');
            logo && (logo.src = 'https://test.voags.com/Media/website.png');
        } else {
            html.setAttribute('data-theme', 'dark');
            icon && (icon.className = 'ri-sun-line');
            logo && (logo.src = 'assets/img/website.png');
        }
    };

    /* =====================================================
       SUBMENU TOGGLE
    ===================================================== */
    window.toggleSubmenu = function (button) {
        const submenu = button.nextElementSibling;
        const arrow = button.querySelector('.menu_arrow');

        submenu?.classList.toggle('expanded');
        arrow && (arrow.style.transform =
            submenu.classList.contains('expanded') ? 'rotate(180deg)' : 'rotate(0)');
    };

    /* =====================================================
       TABS
    ===================================================== */
    window.switchTab = function (button) {
        $$('.tab_button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    };

    /* =====================================================
       VAT TOGGLE
    ===================================================== */
    $('#vatCheck')?.addEventListener('change', function () {
        $('#vatNumberField')?.classList.toggle('d-none', !this.checked);
    });

    /* =====================================================
       SECTION COLLAPSE
    ===================================================== */
    window.toggleSection = function (id) {
        const items = $(`#${id}-items`);
        const chevron = $(`#${id}-chevron`);

        if (!items || !chevron) return;

        const expanded = items.classList.contains('expanded-section');
        items.classList.toggle('expanded-section', !expanded);
        items.classList.toggle('collapsed-section', expanded);
        chevron.classList.toggle('rotated-chevron', expanded);
    };

    /* =====================================================
       MOBILE MENU
    ===================================================== */
    const sidebar = document.getElementById('sidebarContainer');
    const toggleBtn = document.getElementById('menuToggle');

    window.toggleSidebar = function () {
        sidebar.classList.toggle('mobile-open');
    };

    document.addEventListener('click', function (event) {
        const clickedInsideSidebar = sidebar.contains(event.target);
        const clickedToggleBtn = toggleBtn.contains(event.target);

        if (!clickedInsideSidebar && !clickedToggleBtn) {
            sidebar.classList.remove('mobile-open');
        }
    });
    

    /* =====================================================
       GAUGE / CIRCULAR PROGRESS
    ===================================================== */
    
    const container = document.querySelector('.gauge-container');
    const circle = document.getElementById('progressCircle');
    const text = document.getElementById('percentageText');
    const thumb = document.getElementById('thumb');
    
    if (!container || !circle || !text || !thumb) return;
    
    const TARGET = 80;
    const DURATION = 1800;
    
    /* SVG CONFIG — MUST MATCH SVG */
    const SVG_SIZE = 200;
    const CENTER = 100;
    const RADIUS = 80;
    
    const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
    
    /* APPLY THEME COLOR */
    circle.style.stroke = 'rgb(35, 36, 41)';
    
    circle.style.strokeDasharray = CIRCUMFERENCE;
    circle.style.strokeDashoffset = CIRCUMFERENCE;
    
    function getScale() {
        const box = container.getBoundingClientRect();
        return box.width / SVG_SIZE;
    }
    
    function moveThumb(percent) {
        const angle = (percent / 100) * 360 - 90;
        const rad = angle * Math.PI / 180;
    
        const svgX = CENTER + RADIUS * Math.cos(rad);
        const svgY = CENTER + RADIUS * Math.sin(rad);
    
        const scale = getScale();
    
        thumb.style.left = `${svgX * scale}px`;
        thumb.style.top = `${svgY * scale}px`;
        thumb.style.opacity = '1';
    }
    
    function animateGauge() {
        const start = performance.now();
    
        function frame(now) {
            const progress = Math.min((now - start) / DURATION, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            const value = TARGET * eased;
    
            circle.style.strokeDashoffset =
                CIRCUMFERENCE - (CIRCUMFERENCE * value / 100);
    
            text.textContent = `${Math.round(value)}%`;
    
            moveThumb(value);
    
            if (progress < 1) requestAnimationFrame(frame);
        }
    
        requestAnimationFrame(frame);
    }
    
    /* WAIT FOR LAYOUT BEFORE FIRST DRAW */
    requestAnimationFrame(() => {
        moveThumb(0);
        animateGauge();
    });
    
    /* FIX POSITION ON RESIZE */
    window.addEventListener('resize', () => moveThumb(TARGET));
    
   
    

    /* =====================================================
       CHART.JS – SHIFT TIMELINE
    ===================================================== */



    /* =====================================================
       MAPLIBRE MAP
    ===================================================== */
    if (document.getElementById('ukMap') && window.maplibregl) {
        const map = new maplibregl.Map({
            container: 'ukMap',
            style: 'https://api.maptiler.com/maps/streets-v2/style.json?key=B0yAfO4jhSsrR2kTOdds',
            center: [-0.1276, 51.5074], // London center
            zoom: 14
        });
    
        map.addControl(new maplibregl.NavigationControl());
    
        const locations = [
            { lng: -0.1276, lat: 51.5074, description: "Central London - HQ" },
            { lng: -0.1280, lat: 51.5077, description: "Nearby patrol point 1" },
            { lng: -0.1270, lat: 51.5072, description: "Nearby patrol point 2" },
            { lng: -0.1265, lat: 51.5078, description: "Security alert location" },
            { lng: -0.1290, lat: 51.5068, description: "Incident reported" }
        ];
    
        // Add markers
        locations.forEach(loc => {
            const popup = new maplibregl.Popup({ offset: 25 }).setText(loc.description);
    
            new maplibregl.Marker({ color: 'red' })
                .setLngLat([loc.lng, loc.lat])
                .setPopup(popup)
                .addTo(map);
        });
    
        // Fit map to all markers so they are visible even if very close
        const bounds = new maplibregl.LngLatBounds();
        locations.forEach(loc => bounds.extend([loc.lng, loc.lat]));
        map.fitBounds(bounds, { padding: 100 }); // padding ensures markers not at edges
    }
   
    
})

    /* =====================================================
       HR METRICS
    ===================================================== */
const counters = document.querySelectorAll('.hr-stat-metric-number-display');
            
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const suffix = counter.getAttribute('data-suffix') || '';
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current) + suffix;
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + suffix;
                    }
                };
                
                updateCounter();
            });
    

 // Initialize Lucide icons
 lucide.createIcons();

 document.addEventListener('DOMContentLoaded', function () {

    const ctx = document.getElementById('shiftsChart')?.getContext('2d');
    if (!ctx) return;

    const labels = [
        '8 AM','9 AM','10 AM','11 AM',
        '12 PM','1 PM','2 PM','3 PM',
        '4 PM','5 PM','6 PM'
    ];

    const values = [2, 3, 4, 4, 3, 3, 2, 2, 2, 1, 1];

    /* Shadow Plugin */
    const shadowPlugin = {
        id: 'barShadow',
        beforeDatasetsDraw(chart) {
            const ctx = chart.ctx;
            ctx.save();
            ctx.shadowColor = 'rgba(0,0,0,0.35)';
            ctx.shadowBlur = 10;
            ctx.shadowOffsetY = 6;
        },
        afterDatasetsDraw(chart) {
            chart.ctx.restore();
        }
    };

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                data: values,
                backgroundColor: 'rgba(35, 36, 41, 0.95)',
                hoverBackgroundColor: 'rgba(35, 36, 41, 1)',
                borderRadius: 10,
                barThickness: 26
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,

            animation: {
                duration: 1200,
                easing: 'easeOutQuart'
            },

            plugins: {
                legend: { display: false },

                tooltip: {
                    backgroundColor: '#111318',
                    titleColor: '#ffffff',
                    bodyColor: '#e5e7eb',
                    padding: 10,
                    cornerRadius: 10,
                    displayColors: false,
                    callbacks: {
                        label: ctx => ` Active staff: ${ctx.parsed.y}`
                    }
                }
            },

            scales: {
                x: {
                    grid: { display: false },
                    ticks: {
                        color: '#9ca3af',
                        font: { size: 11, family: 'Poppins' }
                    }
                },
                y: {
                    beginAtZero: true,
                    suggestedMax: 5,
                    grid: {
                        color: 'rgba(0,0,0,0.06)',
                        drawBorder: false
                    },
                    ticks: {
                        stepSize: 1,
                        color: '#9ca3af'
                    }
                }
            }
        },
        plugins: [shadowPlugin]
    });

});


function initTomSelect(scope = document) {
    scope.querySelectorAll('select.tomselect').forEach(function (el) {
        if (!el.tomselect) {
            new TomSelect(el, {
                create: false,
                allowEmptyOption: true,
                placeholder: 'Select option',
                dropdownParent: 'body',
                dropdownDirection: 'auto',
                maxOptions: 1000
            });
        }
    });
}


document.addEventListener('DOMContentLoaded', function () {
    const editorEl = document.querySelector('#mailMessageEditor');
    if (!editorEl) return;

    ClassicEditor
        .create(editorEl, {
            toolbar: [
                'heading',
                '|',
                'bold',
                'italic',
                'underline',
                'link',
                'bulletedList',
                'numberedList',
                '|',
                'blockQuote',
                'insertTable',
                '|',
                'undo',
                'redo'
            ],
            placeholder: 'Add mail message content here...'
        })
        .catch(error => {
            console.error(error);
        });
});


document.addEventListener('DOMContentLoaded', function () {
    initTomSelect();
});

document.addEventListener('shown.bs.modal', function (e) {
    initTomSelect(e.target);
});

document.addEventListener('DOMContentLoaded', function () {
    if (typeof flatpickr !== 'undefined') {
        flatpickr('.flatpickr', {
            dateFormat: 'd/m/Y',
            allowInput: false,
            placeholder: 'Click to enter date'
        });

        flatpickr('.fp-time', {
            enableTime: true,
            noCalendar: true,
            dateFormat: 'H:i',
            time_24hr: true,
            allowInput: false,
            placeholder: 'Click to enter time'
        });
    }
});


document.addEventListener('DOMContentLoaded', function () {


    document.querySelectorAll('.dropdown-toggle').forEach(function (el) {
        new bootstrap.Dropdown(el, {
            popperConfig: {
                strategy: 'fixed',
                modifiers: [
                    {
                        name: 'preventOverflow',
                        options: {
                            boundary: document.body
                        }
                    }
                ]
            }
        });
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );

    tooltipTriggerList.forEach(function (el) {
        new bootstrap.Tooltip(el, {
            trigger: 'hover focus',
            container: 'body'
        });
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById('mapShiftRotaDetail');
    if (!el || !window.maplibregl) return;

    const map = new maplibregl.Map({
        container: el,
        style: 'https://api.maptiler.com/maps/streets-v2/style.json?key=B0yAfO4jhSsrR2kTOdds',
        center: [-0.1276, 51.5074],
        zoom: 14
    });

    map.addControl(new maplibregl.NavigationControl());
    map.on('load', () => map.resize());
});

