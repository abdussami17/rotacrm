document.addEventListener('DOMContentLoaded', function () {

    /* ================================
       STAFF EVENTS
    ================================= */
    const staffEvents = [
        {
            title: 'John Smith',
            extendedProps: { site: 'Site A', status: 'Pending' },
            start: '2026-01-14T08:00:00',
            end: '2026-01-14T18:00:00',
            classNames: ['shift-pending']
        },
        {
            title: 'Mike Brown',
            extendedProps: { site: 'Site B', status: 'Accepted' },
            start: '2026-01-16T09:00:00',
            end: '2026-01-16T17:00:00',
            classNames: ['shift-accepted']
        },
        {
            title: 'Anna Patel',
            extendedProps: { site: 'Site C', status: 'Started' },
            start: '2026-01-20T10:00:00',
            end: '2026-01-20T20:00:00',
            classNames: ['shift-started']
        }
    ];

    /* ================================
       ELEMENTS
    ================================= */
    const calendarEl = document.getElementById('siteMainCalendar');
    const loaderEl = document.getElementById('siteCalendarLoader');

    if (!calendarEl || !loaderEl) return;

    /* force initial state */
    calendarEl.classList.add('calendar-hidden');
    loaderEl.style.display = 'flex';

    /* ================================
       CALENDAR INIT
    ================================= */
    const staffCalendar = new FullCalendar.Calendar(calendarEl, {

        initialView: 'dayGridMonth',
        height: 720,

        headerToolbar: {
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
            center: 'title',
            left: 'today prev,next'
        },

        displayEventTime: false,
        dayMaxEvents: 2,
        eventDisplay: 'block',

        slotMinTime: "06:00:00",
        slotMaxTime: "22:00:00",

        events: staffEvents,

        eventContent: function (arg) {

            const name = arg.event.title;
            const site = arg.event.extendedProps.site || '';

            const maxLen = 26;
            let text = name + ' - ' + site;

            if (text.length > maxLen) {
                text = text.substring(0, maxLen).trim() + '…';
            }

            return {
                html: `<div class="shift-event-text" title="${name} — ${site}">${text}</div>`
            };
        },

        eventClick: function (info) {
            info.jsEvent.preventDefault();
            console.log('STAFF SHIFT:', info.event.title, info.event.extendedProps);
        },

        /* ================================
           CORRECT LOADER CONTROL
        ================================= */
        loading: function (isLoading) {
            if (isLoading) {
                loaderEl.style.display = 'flex';
                calendarEl.classList.add('calendar-hidden');
            } else {
                loaderEl.style.display = 'none';
                calendarEl.classList.remove('calendar-hidden');
                calendarEl.classList.add('calendar-visible');
            }
        }
    });

    staffCalendar.render();

});
