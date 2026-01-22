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
    const gauge = {
        target: 80,
        duration: 2000,
        circle: document.getElementById('progressCircle'),
        text: document.getElementById('percentageText'),
        thumb: document.getElementById('thumb'),
        container: document.querySelector('.gauge-container'),
    
        // SVG constants (must match your SVG)
        svgSize: 200,
        center: 100,
        radius: 80
    };
    
    const STROKE_WIDTH = 8;
    const THUMB_SIZE = 18;
    
    if (gauge.circle && gauge.text && gauge.thumb && gauge.container) {
    
        const circumference = 2 * Math.PI * gauge.radius;
        gauge.circle.style.strokeDasharray = circumference;
        gauge.circle.style.strokeDashoffset = circumference;
    
        const moveThumb = (percent) => {
            const angle = (percent / 100) * 360 - 90;
            const rad = angle * Math.PI / 180;
    
            // SVG-space position (exact)
            const svgX =
                gauge.center +
                gauge.radius * Math.cos(rad);
    
            const svgY =
                gauge.center +
                gauge.radius * Math.sin(rad);
    
            // Convert SVG → DOM pixels
            const box = gauge.container.getBoundingClientRect();
            const scale = box.width / gauge.svgSize;
    
            const x = svgX * scale;
            const y = svgY * scale;
    
            gauge.thumb.style.left = `${x}px`;
            gauge.thumb.style.top = `${y}px`;
            gauge.thumb.style.opacity = '1';
        };
    
        const start = performance.now();
    
        const animate = (now) => {
            const progress = Math.min((now - start) / gauge.duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            const value = gauge.target * eased;
    
            gauge.circle.style.strokeDashoffset =
                circumference - (circumference * value / 100);
    
            gauge.text.textContent = `${Math.round(value)}%`;
            moveThumb(value);
    
            if (progress < 1) requestAnimationFrame(animate);
        };
    
        requestAnimationFrame(animate);
        window.addEventListener('resize', () => moveThumb(gauge.target));
    }
    

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

    /* --- Security Timeline Data --- */
    const activityData = {
        labels: [
            '00:00', '02:00', '04:00', '06:00',
            '08:00', '10:00', '12:00', '14:00',
            '16:00', '18:00', '20:00', '22:00'
        ],
        values: [2, 4, 6, 14, 22, 30, 26, 18, 10, 6, 4, 2]
    };

    const canvas = document.getElementById('myCanvas');

    if (!canvas) {
   
        return;
    }

    const ctx = canvas.getContext('2d');

    if (!ctx) {
       
        return;
    }

    /* --- Rebalanced Gradient: Dark → Soft → White --- */
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);

    gradient.addColorStop(0,   'rgba(0, 33, 64, 0.95)'); // strong dark top
    gradient.addColorStop(0.3, 'rgba(0, 33, 64, 0.75)'); // increased coverage
    gradient.addColorStop(0.7, 'rgba(0, 33, 64, 0.25)'); // smooth middle fade
    gradient.addColorStop(1,   'rgba(255, 255, 255, 0)'); // white bottom

    /* --- Shadow Plugin (Matched to New Color) --- */
    const shadowPlugin = {
        id: 'shadowLine',
        beforeDatasetsDraw(chart) {
            const { ctx } = chart;
            ctx.save();
            ctx.shadowColor = 'rgba(0, 33, 64, 0.45)';
            ctx.shadowBlur = 20;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 10;
        },
        afterDatasetsDraw(chart) {
            chart.ctx.restore();
        }
    };

    /* --- Chart --- */
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: activityData.labels,
            datasets: [{
                data: activityData.values,
                fill: true,
                backgroundColor: gradient,
                borderColor: 'rgb(0, 33, 64)',
                borderWidth: 3,
                tension: 0.45,
                pointRadius: 0,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: '#ffffff',
                pointHoverBorderColor: 'rgb(0, 33, 64)',
                pointHoverBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 2200,
                easing: 'easeInOutCubic'
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#0b1d2e',
                    titleColor: '#ffffff',
                    bodyColor: '#d6e2f0',
                    padding: 10,
                    displayColors: false,
                    callbacks: {
                        label: ctx => ` Security events: ${ctx.parsed.y}`
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: {
                        color: '#8fa6bf',
                        font: { size: 11 }
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.04)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#8fa6bf',
                        font: { size: 11 }
                    }
                }
            }
        },
        plugins: [shadowPlugin]
    });

});


document.addEventListener('DOMContentLoaded', function () {
        
    const ctx = document.getElementById('shiftsChart')?.getContext('2d');
    if (!ctx) return;
    

    /* --- Hour Buckets (Bottom Time Axis) --- */
    const labels = [
        '8 AM','9 AM','10 AM','11 AM',
        '12 PM','1 PM','2 PM','3 PM',
        '4 PM','5 PM','6 PM'
    ];

    /* --- Active Staff Count Per Hour (Live Feel) --- */
    const values = [2, 3, 4, 4, 3, 3, 2, 2, 2, 1, 1];

    /* --- Shadow Plugin (Keep What You Liked) --- */
    const shadowPlugin = {
        id: 'barShadow',
        beforeDatasetsDraw(chart) {
            const { ctx } = chart;
            ctx.save();
            ctx.shadowColor = 'rgba(0, 33, 64, 0.35)';
            ctx.shadowBlur = 14;
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
                backgroundColor: 'rgba(0, 33, 64, 0.85)',
                borderRadius: 10,
                barThickness: 26
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1400,
                easing: 'easeOutQuart'
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#0b1d2e',
                    titleColor: '#ffffff',
                    bodyColor: '#d6e2f0',
                    displayColors: false,
                    callbacks: {
                        label: ctx =>
                            ` Active staff: ${ctx.parsed.y}`
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: {
                        color: '#8fa6bf',
                        font: { size: 11 }
                    }
                },
                y: {
                    beginAtZero: true,
                    suggestedMax: 5,
                    grid: {
                        color: 'rgba(0,0,0,0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        stepSize: 1,
                        color: '#8fa6bf'
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
    flatpickr('.fp-time', {
        enableTime: true,
        noCalendar: true,
        dateFormat: 'H:i',  
        time_24hr: true
    });
});

document.addEventListener('DOMContentLoaded', function () {
    flatpickr('.flatpickr', {
        dateFormat: 'd/m/Y'
    });

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
