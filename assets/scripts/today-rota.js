document.addEventListener('DOMContentLoaded', function () {

    /* ================================
       EVENTS (ONLY FOR MAIN CALENDAR)
    ================================= */
    const rotaEvents = [
        { title: 'Site A - John', start: '2026-01-14T08:00:00', end: '2026-01-14T18:00:00', color: '#FFC107' },
        { title: 'Site B - Mike', start: '2026-01-14T09:00:00', end: '2026-01-14T17:00:00', color: '#28A745' },
        { title: 'Site C - Anna', start: '2026-01-14T10:00:00', end: '2026-01-14T20:00:00', color: '#17A2B8' },
        { title: 'Site D - Sarah', start: '2026-01-20T08:00:00', end: '2026-01-20T16:00:00', color: '#FFC107' }
    ];

    /* ================================
       ELEMENTS
    ================================= */
    const smallEl = document.getElementById('smallCalendar');
    const mainEl = document.getElementById('mainCalendar');

    const smallLoader = document.getElementById('smallCalLoader');
    const mainLoader = document.getElementById('mainCalLoader');

    if (!smallEl || !mainEl) return;

    /* initial state */
    smallEl.classList.add('calendar-hidden');
    mainEl.classList.add('calendar-hidden');

    /* ================================
       SMALL CALENDAR (NO EVENTS)
    ================================= */
    const smallCalendar = new FullCalendar.Calendar(smallEl, {

        initialView: 'dayGridMonth',
        headerToolbar: false,
        height: 'auto',
        selectable: true,

        events: [], // IMPORTANT: no events shown

        dateClick: function (info) {
            mainCalendar.gotoDate(info.date);
            updateMainHeader(info.date);
        },

        loading: function (isLoading) {
            if (smallLoader) {
                smallLoader.style.display = isLoading ? 'flex' : 'none';
            }
            if (!isLoading) {
                smallEl.classList.remove('calendar-hidden');
                smallEl.classList.add('calendar-visible');
            }
        }
    });

    /* ================================
       MAIN CALENDAR (DAY VIEW)
    ================================= */
    const mainCalendar = new FullCalendar.Calendar(mainEl, {

        initialView: 'timeGridDay',
        headerToolbar: false,
        height: 600,
        initialDate: '2026-01-14',

        slotMinTime: "06:00:00",
        slotMaxTime: "22:00:00",

        events: rotaEvents,

        loading: function (isLoading) {
            if (mainLoader) {
                mainLoader.style.display = isLoading ? 'flex' : 'none';
            }
            if (!isLoading) {
                mainEl.classList.remove('calendar-hidden');
                mainEl.classList.add('calendar-visible');
            }
        }
    });

    /* ================================
       RENDER
    ================================= */
    smallCalendar.render();
    mainCalendar.render();

    updateMainHeader(mainCalendar.getDate());

    /* ================================
       NAVIGATION (SYNC BOTH)
    ================================= */
    document.getElementById('prevMonth')?.addEventListener('click', () => {
        smallCalendar.prev();
        mainCalendar.prev();
    });

    document.getElementById('nextMonth')?.addEventListener('click', () => {
        smallCalendar.next();
        mainCalendar.next();
    });

    /* ================================
       HEADER UPDATE (OPTIONAL)
    ================================= */
    function updateMainHeader(date) {
        const el = document.getElementById('mainCalendarDate');
        if (!el) return;

        el.innerText = date.toLocaleDateString(undefined, {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }

});
