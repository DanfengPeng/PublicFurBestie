document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'timeGridDay',
        slotMinTime: "08:00:00",
        slotMaxTime: "20:00:00",
        allDaySlot: false,
        height: "auto",
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: ''
        },
        events: {
            url: '/DailyCalendar/GetBookings',
            method: 'GET',
            failure: function () {
                alert('There was an error while fetching bookings!');
            }
        },
        eventOverlap: false,
        selectOverlap: function(event) {
            return false;
        },
        selectable: false,
    });

    calendar.render();

    // Mark blue and set label for serviceid != 1
    calendar.setOption('eventDidMount', function(info) {
        var event = info.event;
        var el = info.el;

        // Only mark blue if serviceid != 1
        if (event.extendedProps.service && event.extendedProps.service !== "HouseSit") {
            el.classList.add('blue-label');

            // Set label text: "HH:mm - ServiceName"
            var start = event.start;
            var hours = start.getHours().toString().padStart(2, '0');
            var minutes = start.getMinutes().toString().padStart(2, '0');
            var timeStr = hours + ':' + minutes;
            var serviceName = event.extendedProps.service || '';
            var titleNode = el.querySelector('.fc-event-title');
            if (titleNode) {
                titleNode.textContent = timeStr + ' - ' + serviceName;
            }
        }
    });
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


