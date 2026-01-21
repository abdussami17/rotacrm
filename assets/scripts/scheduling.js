document.addEventListener('DOMContentLoaded', function () {

    const rotaEvents = [
        {
            title: 'John Smith',
            extendedProps: { site: 'Tesco Extra, Croydon' },
            start: '2026-01-14T08:00:00',
            end: '2026-01-14T18:00:00',
            classNames: ['shift-pending']
        },
        {
            title: 'Michael Brown',
            extendedProps: { site: 'Westfield Stratford' },
            start: '2026-01-14T09:00:00',
            end: '2026-01-14T17:00:00',
            classNames: ['shift-accepted']
        },
        {
            title: 'Anna Patel',
            extendedProps: { site: 'Canary Wharf Office' },
            start: '2026-01-15T10:00:00',
            end: '2026-01-15T20:00:00',
            classNames: ['shift-started']
        },
        {
            title: 'Tom Wilson',
            extendedProps: { site: 'Wembley Stadium Gate C' },
            start: '2026-01-16T07:00:00',
            end: '2026-01-16T15:00:00',
            classNames: ['shift-rejected']
        },
        {
            title: 'David Khan',
            extendedProps: { site: 'Night Patrol, Ilford' },
            start: '2026-01-17T20:00:00',
            end: '2026-01-18T06:00:00',
            classNames: ['shift-prestart']
        },
        {
            title: 'Sarah Ahmed',
            extendedProps: { site: 'Hospital Security, Barking' },
            start: '2026-01-18T06:00:00',
            end: '2026-01-18T18:00:00',
            classNames: ['shift-awaitfinish']
        }
    ];

    const calendarEl = document.getElementById('completeRotaCalendar');
    const loaderEl = document.getElementById('calendarLoader');

    const rotaCalendar = new FullCalendar.Calendar(calendarEl, {

        initialView: 'dayGridMonth',
        height: 720,

        headerToolbar: {
            left: 'today prev,next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },

        displayEventTime: false,   
        dayMaxEvents: 2,
        eventDisplay: 'block',

        slotMinTime: "06:00:00",
        slotMaxTime: "22:00:00",

        events: rotaEvents,

      
        eventContent: function (arg) {

            const name = arg.event.title;
            const site = arg.event.extendedProps.site || '';

            const maxLen = 24;
            let text = name + ' - ' + site;

            if (text.length > maxLen) {
                text = text.substring(0, maxLen).trim() + '…';
            }

            return {
                html: `<div class="shift-event-text" title="${name} — ${site}">${text}</div>`
            };
        },

    
        eventClick: function(info){
            info.jsEvent.preventDefault();
            console.log('FULL SHIFT:', info.event.title, info.event.extendedProps);
        },

        eventDidMount() {
            if (loaderEl) {
                loaderEl.remove();
                calendarEl.classList.remove('calendar-hidden');
                calendarEl.classList.add('calendar-visible');
            }
        }
    });

    rotaCalendar.render();
});
