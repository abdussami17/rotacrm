
document.addEventListener('DOMContentLoaded', function () {

    const staffEvents = [
        { title: 'John - Site A (Pending)', start: '2026-01-14', color: '#FFC107' },
        { title: 'Mike - Site B (Accepted)', start: '2026-01-16', color: '#28A745' },
        { title: 'Anna - Site C (Started)', start: '2026-01-20', color: '#17A2B8' }
    ];

    /* -------- SMALL CALENDAR -------- */
    const staffSmallCal = new FullCalendar.Calendar(
        document.getElementById('staffSmallCalendar'),
        {
            initialView: 'dayGridMonth',
            headerToolbar: false,
            height: 'auto',
            events: staffEvents,

            dateClick: function (info) {
                staffMainCal.gotoDate(info.dateStr);
                updateStaffHeader(info.dateStr);
            }
        }
    );
    staffSmallCal.render();


    /* -------- MAIN CALENDAR -------- */
    const staffMainCal = new FullCalendar.Calendar(
        document.getElementById('staffMainCalendar'),
        {
            initialView: 'dayGridMonth',
            height: 650,
            events: staffEvents,

            headerToolbar: {
                left: 'dayGridMonth,timeGridWeek,timeGridDay',
                center: '',
                right: ''
            },

            datesSet: function (info) {
                updateStaffHeader(info.start);
            }
        }
    );
    staffMainCal.render();


    /* -------- HEADER TITLE -------- */
    function updateStaffHeader(date) {
        const d = new Date(date);
        document.getElementById('staffCalendarTitle').innerText =
            d.toLocaleString('default', { month: 'long', year: 'numeric' });
    }


    /* -------- NAV BUTTONS -------- */
    document.getElementById('staffPrevBtn').addEventListener('click', function () {
        staffSmallCal.prev();
        staffMainCal.prev();
    });

    document.getElementById('staffNextBtn').addEventListener('click', function () {
        staffSmallCal.next();
        staffMainCal.next();
    });

});

