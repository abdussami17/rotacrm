
document.addEventListener('DOMContentLoaded', function() {

    const rotaEvents = [
        { title: 'Site A - John', start: '2026-01-14', color: '#FFC107' },
        { title: 'Site B - Mike', start: '2026-01-14', color: '#28A745' },
        { title: 'Site C - Anna', start: '2026-01-14', color: '#17A2B8' },
        { title: 'Site D - Sarah', start: '2026-01-20', color: '#FFC107' }
    ];

    // Initialize Small Month Calendar
    const smallCalendarEl = document.getElementById('smallCalendar');
    const smallCalendar = new FullCalendar.Calendar(smallCalendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: false,
        height: 'auto',
        events: rotaEvents,
        dateClick: function(info) {
            // When a date is clicked, update the main calendar
            mainCalendar.gotoDate(info.dateStr);
            document.getElementById('mainCalendarDate').innerText = new Date(info.dateStr).toDateString();
        }
    });
    smallCalendar.render();

    // Initialize Main Day Calendar
    const mainCalendarEl = document.getElementById('mainCalendar');
    const mainCalendar = new FullCalendar.Calendar(mainCalendarEl, {
        initialView: 'timeGridDay', // Shows only one day
        headerToolbar: false,
        height: 600,
        events: rotaEvents,
        initialDate: '2026-01-14'
    });
    mainCalendar.render();

    // Month navigation buttons (updates both calendars)
    document.getElementById('prevMonth').addEventListener('click', () => {
        smallCalendar.prev();
        mainCalendar.prev();
    });
    document.getElementById('nextMonth').addEventListener('click', () => {
        smallCalendar.next();
        mainCalendar.next();
    });
});
