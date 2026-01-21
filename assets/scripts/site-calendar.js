document.addEventListener('DOMContentLoaded', function () {

    const rotaEvents = [
        { title: 'Pending - Site A', start: '2026-01-14', color: '#FFC107' },
        { title: 'Accepted - Site B', start: '2026-01-14', color: '#28A745' },
        { title: 'Started - Site C', start: '2026-01-20', color: '#17A2B8' },
        { title: 'Rejected - Site D', start: '2026-01-25', color: '#DC3545' }
    ];

    /* -------- SMALL CALENDAR -------- */
    const smallCal = new FullCalendar.Calendar(
        document.getElementById('rotaSmallCalendar'),
        {
            initialView: 'dayGridMonth',
            headerToolbar: false,
            height: 'auto',
            events: rotaEvents,

            dateClick: function (info) {
                mainCal.gotoDate(info.dateStr);
                updateHeader(info.dateStr);
            }
        }
    );
    smallCal.render();


    /* -------- MAIN CALENDAR -------- */
    const mainCal = new FullCalendar.Calendar(
        document.getElementById('rotaMainCalendar'),
        {
            initialView: 'dayGridMonth',
            height: 650,
            events: rotaEvents,

            headerToolbar: {
                left: 'dayGridMonth,timeGridWeek,timeGridDay',
                center: '',
                right: ''
            },

            datesSet: function (info) {
                updateHeader(info.start);
            }
        }
    );
    mainCal.render();


    /* -------- HEADER TITLE -------- */
    function updateHeader(date) {
        const d = new Date(date);
        document.getElementById('rotaCalendarTitle').innerText =
            d.toLocaleString('default', { month: 'long', year: 'numeric' });
    }


    /* -------- NAV BUTTONS -------- */
    document.getElementById('rotaPrevBtn').addEventListener('click', function () {
        smallCal.prev();
        mainCal.prev();
    });

    document.getElementById('rotaNextBtn').addEventListener('click', function () {
        smallCal.next();
        mainCal.next();
    });

});