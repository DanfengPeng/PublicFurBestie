document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');

    var today = new Date();
    var oneYearFromNow = new Date(today);
    oneYearFromNow.setFullYear(today.getFullYear() + 1);

    var calendar = new FullCalendar.Calendar(calendarEl, {
        
        initialView: 'timeGridDay',
        slotMinTime: "08:00:00",
        slotMaxTime: "18:00:00",
        allDaySlot: false,
        height: "auto",
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: ''
        },
        validRange: {
            start: today.toISOString().split('T')[0],
            end: oneYearFromNow.toISOString().split('T')[0]
        },
       
        events: [
            {
                title: 'Home Visit',
                start: '2025-09-04T14:00:00',
                end: '2025-09-04T15:00:00'
            },
            {
                title: 'Dog Hike',
                start: '2025-09-05T09:00:00',
                end: '2025-09-05T16:00:00'
            },
            {
                title: 'Dog Walk',
                start: '2025-09-06T08:00:00',
                end: '2025-09-06T10:00:00'
            },
            {
                title: 'Home Visit',
                start: '2025-09-05T17:00:00',
                end: '2025-09-05T18:00:00'
            }
            // Add more events as needed
        ],
        //eventContent: function (arg) {
        //    return { html: '<span style="color:#fff;">' + arg.event.title + '</span>' };
        //}
        eventContent: function (arg) {
            // Show time and title
            var start = arg.event.start;
            var hours = start.getHours().toString().padStart(2, '0');
            var minutes = start.getMinutes().toString().padStart(2, '0');
            var timeStr = hours + ':' + minutes;
            return { html: `<span style="color:#fff;">${timeStr} - ${arg.event.title}</span>` };
        },

        eventOverlap: false,
        selectOverlap: function(event) {
            return false;
        },
        selectable: false,
    });

    calendar.render();

});



document.addEventListener('DOMContentLoaded', function () {
// Use a unique form id for each page if needed, or use a shared class
var bookingForm = document.querySelector('form[action="/DailyCalendar/Book"]');
if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent actual submission

        // Remove any previous prompt
        let prompt = bookingForm.querySelector('.booking-prompt');
        if (prompt) prompt.remove();

        // Show success prompt above the form
        var div = document.createElement('div');
        div.className = 'alert alert-success booking-prompt mt-2';
        div.innerHTML = 'Booking submitted! (Not saved in database)';
        bookingForm.prepend(div);

        // Optionally reset the form
        bookingForm.reset();
    });
}
});


