document.addEventListener('DOMContentLoaded', () => {
    const calendarEl = document.getElementById('holidayCalendar');
    const errorAlert = document.getElementById('holidayCalendarErrorAlert');
    const errorMessage = document.getElementById('holidayCalendarErrorMessage');
    
    const API_KEY = 'hbHXfPITS2uxxV2WVObkfkUVWntWpOWc';
    const CURRENT_YEAR = new Date().getFullYear();
    
    let calendar = null;
    
    const fetchHolidays = async (year = CURRENT_YEAR) => {
        try {
            const response = await fetch(
                `https://calendarific.com/api/v2/holidays?api_key=${API_KEY}&country=US&year=${year}`
            );
            
            if (!response.ok) throw new Error(`API Error: ${response.status}`);
            
            const data = await response.json();
            if (data.meta.code !== 200) throw new Error(data.meta.error_detail || 'Failed to fetch');
            
            return data.response.holidays.map(holiday => ({
                title: holiday.name,
                start: holiday.date.iso,
                color: '#dc2626',
                description: holiday.description || '',
                type: holiday.type ? holiday.type.join(', ') : 'Public Holiday',
                allDay: true
            }));
        } catch (error) {
            console.error('Failed to fetch holidays:', error);
            throw error;
        }
    };
    
    const showError = (text) => {
        errorMessage.textContent = text;
        errorAlert.style.display = 'flex';
    };
    
    const hideError = () => {
        errorAlert.style.display = 'none';
    };
    
    const initCalendar = (events = []) => {
        if (!FullCalendar) {
            showError('FullCalendar library not loaded');
            return null;
        }
        
        if (calendar) calendar.destroy();
        
        calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            headerToolbar: false,
            height: 'auto',
            events,
            eventClassNames: 'holidayCalendarEventMarker',
            dayMaxEventRows: 3,
            eventClick: (info) => {
                const date = info.event.start.toLocaleDateString();
                const desc = info.event.extendedProps.description || 'No description';
                const type = info.event.extendedProps.type || 'Public Holiday';
                alert(`Holiday: ${info.event.title}\nDate: ${date}\nType: ${type}\n\n${desc}`);
            },
            dayCellDidMount: (arg) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const cellDate = new Date(arg.date);
                cellDate.setHours(0, 0, 0, 0);
                if (today.getTime() === cellDate.getTime()) {
                    arg.el.style.backgroundColor = 'rgba(245, 158, 11, 0.1)';
                    arg.el.style.border = '2px solid #f59e0b';
                }
            }
        });
        
        calendar.render();
        
        document.getElementById('holidayCalendarPrevButton').onclick = () => calendar.prev();
        document.getElementById('holidayCalendarNextButton').onclick = () => calendar.next();
        document.getElementById('holidayCalendarTodayButton').onclick = () => calendar.today();
        
        document.getElementById('holidayCalendarMonthViewButton').onclick = () => {
            calendar.changeView('dayGridMonth');
            toggleActiveButton('holidayCalendarMonthViewButton');
        };
        
        document.getElementById('holidayCalendarYearViewButton').onclick = () => {
            calendar.changeView('listYear');
            toggleActiveButton('holidayCalendarYearViewButton');
        };
        
        return calendar;
    };
    
    const toggleActiveButton = (activeId) => {
        const monthBtn = document.getElementById('holidayCalendarMonthViewButton');
        const yearBtn = document.getElementById('holidayCalendarYearViewButton');
        monthBtn.classList.toggle('active', activeId === 'holidayCalendarMonthViewButton');
        yearBtn.classList.toggle('active', activeId === 'holidayCalendarYearViewButton');
    };
    
    const loadCalendar = async () => {
        try {
            hideError();
            const holidays = await fetchHolidays();
            initCalendar(holidays);
        } catch (error) {
            showError(`Failed to load holidays: ${error.message}`);
            initCalendar([]);
        }
    };
    
    loadCalendar();
});