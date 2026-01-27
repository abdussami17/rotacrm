const CalendarState = {
    currentDate: new Date(),
    currentView: 'month',
    today: new Date()
};

const CalendarEvents = [
    // ===== January 2026 (9 events) =====
    {
        id: 1,
        title: 'Monday, January 5 ⋅ 9:00 – 10:00am',
        date: new Date(2026, 0, 5),
        startTime: '09:00',
        endTime: '10:00',
        startHour: 9,
        startMinute: 0,
        endHour: 10,
        endMinute: 0
    },
    {
        id: 2,
        title: 'Wednesday, January 7 ⋅ 2:30 – 3:30pm',
        date: new Date(2026, 0, 7),
        startTime: '14:30',
        endTime: '15:30',
        startHour: 14,
        startMinute: 30,
        endHour: 15,
        endMinute: 30
    },
    {
        id: 3,
        title: 'Friday, January 9 ⋅ 11:00 – 12:00pm',
        date: new Date(2026, 0, 9),
        startTime: '11:00',
        endTime: '12:00',
        startHour: 11,
        startMinute: 0,
        endHour: 12,
        endMinute: 0
    },
    {
        id: 4,
        title: 'Tuesday, January 13 ⋅ 4:00 – 5:00pm',
        date: new Date(2026, 0, 13),
        startTime: '16:00',
        endTime: '17:00',
        startHour: 16,
        startMinute: 0,
        endHour: 17,
        endMinute: 0
    },
    {
        id: 5,
        title: 'Thursday, January 15 ⋅ 10:15 – 11:15am',
        date: new Date(2026, 0, 15),
        startTime: '10:15',
        endTime: '11:15',
        startHour: 10,
        startMinute: 15,
        endHour: 11,
        endMinute: 15
    },
    {
        id: 6,
        title: 'Monday, January 19 ⋅ 1:00 – 2:00pm',
        date: new Date(2026, 0, 19),
        startTime: '13:00',
        endTime: '14:00',
        startHour: 13,
        startMinute: 0,
        endHour: 14,
        endMinute: 0
    },
    {
        id: 7,
        title: 'Wednesday, January 21 ⋅ 3:45 – 4:45pm',
        date: new Date(2026, 0, 21),
        startTime: '15:45',
        endTime: '16:45',
        startHour: 15,
        startMinute: 45,
        endHour: 16,
        endMinute: 45
    },
    {
        id: 8,
        title: 'Friday, January 23 ⋅ 9:30 – 10:30am',
        date: new Date(2026, 0, 23),
        startTime: '09:30',
        endTime: '10:30',
        startHour: 9,
        startMinute: 30,
        endHour: 10,
        endMinute: 30
    },
    {
        id: 9,
        title: 'Tuesday, January 27 ⋅ 4:15 – 5:15pm',
        date: new Date(2026, 0, 27),
        startTime: '16:15',
        endTime: '17:15',
        startHour: 16,
        startMinute: 15,
        endHour: 17,
        endMinute: 15
    },

    // ===== February 2026 (5 events) =====
    {
        id: 10,
        title: 'Monday, February 2 ⋅ 10:00 – 11:00am',
        date: new Date(2026, 1, 2),
        startTime: '10:00',
        endTime: '11:00',
        startHour: 10,
        startMinute: 0,
        endHour: 11,
        endMinute: 0
    },
    {
        id: 11,
        title: 'Wednesday, February 4 ⋅ 1:30 – 2:30pm',
        date: new Date(2026, 1, 4),
        startTime: '13:30',
        endTime: '14:30',
        startHour: 13,
        startMinute: 30,
        endHour: 14,
        endMinute: 30
    },
    {
        id: 12,
        title: 'Friday, February 6 ⋅ 3:00 – 4:00pm',
        date: new Date(2026, 1, 6),
        startTime: '15:00',
        endTime: '16:00',
        startHour: 15,
        startMinute: 0,
        endHour: 16,
        endMinute: 0
    },
    {
        id: 13,
        title: 'Tuesday, February 10 ⋅ 9:15 – 10:15am',
        date: new Date(2026, 1, 10),
        startTime: '09:15',
        endTime: '10:15',
        startHour: 9,
        startMinute: 15,
        endHour: 10,
        endMinute: 15
    },
    {
        id: 14,
        title: 'Thursday, February 12 ⋅ 4:30 – 5:30pm',
        date: new Date(2026, 1, 12),
        startTime: '16:30',
        endTime: '17:30',
        startHour: 16,
        startMinute: 30,
        endHour: 17,
        endMinute: 30
    }
];


const CalendarUtils = {
    formatMonthYear(date) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
        return `${months[date.getMonth()]} ${date.getFullYear()}`;
    },

    formatWeekRange(startDate, endDate) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
        
        if (startDate.getMonth() === endDate.getMonth()) {
            return `${months[startDate.getMonth()]} ${startDate.getFullYear()}`;
        } else {
            return `${months[startDate.getMonth()]} ${startDate.getDate()} – ${months[endDate.getMonth()]} ${endDate.getDate()}, ${endDate.getFullYear()}`;
        }
    },

    formatFullDate(date) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    },

    getWeekdayName(date, short = false) {
        const days = short 
            ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[date.getDay()];
    },

    isSameDay(date1, date2) {
        return date1.getDate() === date2.getDate() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getFullYear() === date2.getFullYear();
    },

    getFirstDayOfMonth(date) {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    },

    getLastDayOfMonth(date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0);
    },

    getDaysInMonth(date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    },

    getWeekStart(date) {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day;
        return new Date(d.setDate(diff));
    },

    getWeekEnd(date) {
        const start = this.getWeekStart(date);
        return new Date(start.getFullYear(), start.getMonth(), start.getDate() + 6);
    },

    formatTime(hour, minute) {
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
    },

    getEventsForDate(date) {
        return CalendarEvents.filter(event => this.isSameDay(event.date, date));
    }
};

function renderMonthView() {
    const container = document.getElementById('calendarContent');
    const firstDay = CalendarUtils.getFirstDayOfMonth(CalendarState.currentDate);
    const startDay = firstDay.getDay();
    const daysInMonth = CalendarUtils.getDaysInMonth(CalendarState.currentDate);
    const prevMonthLastDay = new Date(CalendarState.currentDate.getFullYear(), 
                                      CalendarState.currentDate.getMonth(), 0).getDate();
    
    let html = '<div class="crm-calendar-month-view-container">';
    html += '<div class="crm-calendar-month-weekday-header-row">';
    const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    weekdays.forEach(day => {
        html += `<div class="crm-calendar-month-weekday-header-cell">${day}</div>`;
    });
    html += '</div>';
    html += '<div class="crm-calendar-month-grid-days-container">';
    
    for (let i = startDay - 1; i >= 0; i--) {
        const day = prevMonthLastDay - i;
        html += `<div class="crm-calendar-month-grid-day-cell-box crm-calendar-other-month-day">
                    <div class="crm-calendar-month-day-number-label">${day}</div>
                 </div>`;
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(CalendarState.currentDate.getFullYear(), 
                                    CalendarState.currentDate.getMonth(), day);
        const isToday = CalendarUtils.isSameDay(currentDate, CalendarState.today);
        const events = CalendarUtils.getEventsForDate(currentDate);
        
        let cellClass = 'crm-calendar-month-grid-day-cell-box';
        if (isToday) cellClass += ' crm-calendar-current-day-highlight';
        
        html += `<div class="${cellClass}" data-date="${currentDate.toISOString()}">
                    <div class="crm-calendar-month-day-number-label">${day}</div>`;
        
        events.forEach(event => {
            html += `<div class="crm-calendar-month-event-item-container">${event.title}</div>`;
        });
        
        html += '</div>';
    }
    
    const totalCells = startDay + daysInMonth;
    const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let day = 1; day <= remainingCells; day++) {
        html += `<div class="crm-calendar-month-grid-day-cell-box crm-calendar-other-month-day">
                    <div class="crm-calendar-month-day-number-label">${day}</div>
                 </div>`;
    }
    
    html += '</div></div>';
    container.innerHTML = html;
    
    document.querySelectorAll('.crm-calendar-month-grid-day-cell-box').forEach(cell => {
        if (!cell.classList.contains('crm-calendar-other-month-day')) {
            cell.addEventListener('click', function() {
                const dateStr = this.getAttribute('data-date');
                if (dateStr) {
                    CalendarState.currentDate = new Date(dateStr);
                    CalendarState.currentView = 'day';
                    document.getElementById('viewSelector').value = 'day';
                    renderView();
                }
            });
            cell.addEventListener('dblclick', function() {
                const dateStr = this.getAttribute('data-date');
                if (dateStr && CalendarEvents.length > 0) {
                    window.location.href = 'event-detail.html';
                }
            });
        }
    });
}

function renderWeekView() {
    const container = document.getElementById('calendarContent');
    const weekStart = CalendarUtils.getWeekStart(CalendarState.currentDate);
    
    let html = '<div class="crm-calendar-week-view-container">';
    html += '<div class="crm-calendar-week-header-days-row">';
    html += '<div class="crm-calendar-week-time-label-spacer"></div>';
    
    for (let i = 0; i < 7; i++) {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + i);
        const isToday = CalendarUtils.isSameDay(date, CalendarState.today);
        
        let headerClass = 'crm-calendar-week-header-day-column';
        if (isToday) headerClass += ' crm-calendar-current-day-highlight';
        
        html += `<div class="${headerClass}">
                    <div class="crm-calendar-week-header-day-name">${CalendarUtils.getWeekdayName(date, true).toUpperCase()}</div>
                    <div class="crm-calendar-week-header-day-number">${date.getDate()}</div>
                 </div>`;
    }
    html += '</div>';
    html += '<div class="crm-calendar-week-grid-body-container">';
    html += '<div class="crm-calendar-week-time-column-labels">';
    for (let hour = 0; hour < 24; hour++) {
        const displayHour = hour % 12 || 12;
        const period = hour < 12 ? 'AM' : 'PM';
        html += `<div class="crm-calendar-week-time-slot-label">${displayHour} ${period}</div>`;
    }
    html += '</div>';
    
    for (let i = 0; i < 7; i++) {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + i);
        
        html += '<div class="crm-calendar-week-day-column-container" style="position: relative;">';
        
        for (let hour = 0; hour < 24; hour++) {
            html += `<div class="crm-calendar-week-hour-row-slot"></div>`;
        }
        
        const events = CalendarUtils.getEventsForDate(date);
        events.forEach(event => {
            const topPosition = (event.startHour + event.startMinute / 60) * 60;
            const height = ((event.endHour - event.startHour) + (event.endMinute - event.startMinute) / 60) * 60;
            
            html += `<div class="crm-calendar-week-event-block-positioned" 
                          style="top: ${topPosition}px; height: ${height}px;"
                          data-event-id="${event.id}">
                        <div class="crm-calendar-week-event-title-text">example</div>
                        <div class="crm-calendar-week-event-time-text">4:30 – 5:30pm</div>
                     </div>`;
        });
        
        html += '</div>';
    }
    
    html += '</div></div>';
    container.innerHTML = html;
    
    document.querySelectorAll('.crm-calendar-week-event-block-positioned').forEach(eventBlock => {
        eventBlock.addEventListener('click', function() {
            const eventId = this.getAttribute('data-event-id');
            if (eventId) {
                window.location.href ='event-detail.html';
            }
        });
    });
}

function renderDayView() {
    const container = document.getElementById('calendarContent');
    let html = '<div class="crm-calendar-day-view-container">';
    html += `<div class="crm-calendar-day-header-section">
                <div class="crm-calendar-day-header-weekday-name">${CalendarUtils.getWeekdayName(CalendarState.currentDate, true).toUpperCase()}</div>
                <div class="crm-calendar-day-header-date-number">${CalendarState.currentDate.getDate()}</div>
             </div>`;
    html += '<div class="crm-calendar-day-grid-time-container">';
    html += '<div class="crm-calendar-day-time-column-labels">';
    for (let hour = 0; hour < 24; hour++) {
        const displayHour = hour % 12 || 12;
        const period = hour < 12 ? 'AM' : 'PM';
        html += `<div class="crm-calendar-day-time-slot-label">${displayHour} ${period}</div>`;
    }
    html += '</div>';
    html += '<div class="crm-calendar-day-events-column-container" style="position: relative;">';
    
    for (let hour = 0; hour < 24; hour++) {
        html += `<div class="crm-calendar-day-hour-row-slot"></div>`;
    }
    
    const events = CalendarUtils.getEventsForDate(CalendarState.currentDate);
    events.forEach(event => {
        const topPosition = (event.startHour + event.startMinute / 60) * 60;
        const height = ((event.endHour - event.startHour) + (event.endMinute - event.startMinute) / 60) * 60;
        
        html += `<div class="crm-calendar-day-event-block-positioned" 
                      style="top: ${topPosition}px; height: ${height}px;"
                      data-event-id="${event.id}">
                    <div class="crm-calendar-day-event-title-text">example</div>
                    <div class="crm-calendar-day-event-time-text">4:30 – 5:30pm</div>
                 </div>`;
    });
    
    html += '</div></div></div>';
    container.innerHTML = html;
    
    document.querySelectorAll('.crm-calendar-day-event-block-positioned').forEach(eventBlock => {
        eventBlock.addEventListener('click', function() {
            const eventId = this.getAttribute('data-event-id');
            if (eventId) {
                window.location.href = 'event-detail.html';
            }
        });
    });
}

function renderYearView() {
    const container = document.getElementById('calendarContent');
    const year = CalendarState.currentDate.getFullYear();
    let html = '<div class="crm-calendar-year-view-container">';
    html += '<div class="crm-calendar-year-grid-months-container">';
    
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    const weekdaysShort = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    
    for (let month = 0; month < 12; month++) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startDay = firstDay.getDay();
        
        html += `<div class="crm-calendar-year-month-mini-calendar-box" data-month="${month}">
                    <div class="crm-calendar-year-month-name-header">${months[month]}</div>
                    <div class="crm-calendar-year-mini-weekday-header-row">`;
        
        weekdaysShort.forEach(day => {
            html += `<div class="crm-calendar-year-mini-weekday-label">${day}</div>`;
        });
        
        html += '</div><div class="crm-calendar-year-mini-days-grid-container">';
        
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = startDay - 1; i >= 0; i--) {
            html += `<div class="crm-calendar-year-mini-day-cell-box crm-calendar-other-month-day">${prevMonthLastDay - i}</div>`;
        }
        
        for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = new Date(year, month, day);
            const isToday = CalendarUtils.isSameDay(currentDate, CalendarState.today);
            
            let cellClass = 'crm-calendar-year-mini-day-cell-box';
            if (isToday) cellClass += ' crm-calendar-current-day-highlight';
            
            html += `<div class="${cellClass}">${day}</div>`;
        }
        
        const totalCells = startDay + daysInMonth;
        const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
        for (let day = 1; day <= remainingCells; day++) {
            html += `<div class="crm-calendar-year-mini-day-cell-box crm-calendar-other-month-day">${day}</div>`;
        }
        
        html += '</div></div>';
    }
    
    html += '</div></div>';
    container.innerHTML = html;
    
    document.querySelectorAll('.crm-calendar-year-month-mini-calendar-box').forEach(box => {
        box.addEventListener('click', function() {
            const month = parseInt(this.getAttribute('data-month'));
            CalendarState.currentDate = new Date(year, month, 1);
            CalendarState.currentView = 'month';
            document.getElementById('viewSelector').value = 'month';
            renderView();
        });
    });
}

function renderView() {
    switch (CalendarState.currentView) {
        case 'month':
            renderMonthView();
            updateDateLabel();
            break;
        case 'week':
            renderWeekView();
            updateDateLabel();
            break;
        case 'day':
            renderDayView();
            updateDateLabel();
            break;
        case 'year':
            renderYearView();
            updateDateLabel();
            break;
    }
}

function updateDateLabel() {
    const label = document.getElementById('currentDateLabel');
    switch (CalendarState.currentView) {
        case 'month':
            label.textContent = CalendarUtils.formatMonthYear(CalendarState.currentDate);
            break;
        case 'week':
            const weekStart = CalendarUtils.getWeekStart(CalendarState.currentDate);
            const weekEnd = CalendarUtils.getWeekEnd(CalendarState.currentDate);
            label.textContent = CalendarUtils.formatWeekRange(weekStart, weekEnd);
            break;
        case 'day':
            label.textContent = CalendarUtils.formatFullDate(CalendarState.currentDate);
            break;
        case 'year':
            label.textContent = CalendarState.currentDate.getFullYear().toString();
            break;
    }
}

function navigateDate(direction) {
    const amount = direction === 'next' ? 1 : -1;
    switch (CalendarState.currentView) {
        case 'month':
            CalendarState.currentDate.setMonth(CalendarState.currentDate.getMonth() + amount);
            break;
        case 'week':
            CalendarState.currentDate.setDate(CalendarState.currentDate.getDate() + (amount * 7));
            break;
        case 'day':
            CalendarState.currentDate.setDate(CalendarState.currentDate.getDate() + amount);
            break;
        case 'year':
            CalendarState.currentDate.setFullYear(CalendarState.currentDate.getFullYear() + amount);
            break;
    }
    renderView();
}

function goToToday() {
    CalendarState.currentDate = new Date();
    renderView();
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('todayButton').addEventListener('click', goToToday);
    document.getElementById('prevButton').addEventListener('click', () => navigateDate('prev'));
    document.getElementById('nextButton').addEventListener('click', () => navigateDate('next'));
    document.getElementById('viewSelector').addEventListener('change', function() {
        CalendarState.currentView = this.value;
        renderView();
    });
    renderView();
});