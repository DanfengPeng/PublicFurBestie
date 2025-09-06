// Shared events for all services
const allServiceEvents = [
    // DogHike events
    {
        title: 'Dog Hike',
        start: '2025-09-05T09:00:00',
        end: '2025-09-05T16:00:00'
    },
    // DogWalk events
    {
        title: 'Dog Walk',
        start: '2025-09-06T08:00:00',
        end: '2025-09-06T10:00:00'
    },
    // HomeVisit events
    {
        title: 'Home Visit',
        start: '2025-09-07T14:00:00',
        end: '2025-09-07T15:00:00'
    },
    {
        title: 'Home Visit',
        start: '2025-09-08T17:00:00',
        end: '2025-09-08T18:00:00'
    }
    // Add more events as needed
];

// Shared calendar initialization
function initServiceCalendar(options) {
    var calendarEl = document.getElementById('calendar');
    if (!calendarEl) return;

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
        events: options.events || [],
        eventContent: function (arg) {
            var start = arg.event.start;
            var end = arg.event.end;
            var startHours = start.getHours().toString().padStart(2, '0');
            var startMinutes = start.getMinutes().toString().padStart(2, '0');
            var endHours = end.getHours().toString().padStart(2, '0');
            var endMinutes = end.getMinutes().toString().padStart(2, '0');
            var timeStr = `${startHours}:${startMinutes} - ${endHours}:${endMinutes}`;
            return { html: `<span style="color:#fff;">${timeStr}<span style="margin-left:16px;">${arg.event.title}</span></span>` };
        },
        eventOverlap: false,
        selectOverlap: function (event) {
            return false;
        },
        selectable: false,
    });

    calendar.render();

    // Go to date picker logic
    var calendarDatePicker = document.getElementById('calendarDatePicker');
    if (calendarDatePicker) {
        var minDate = today.toISOString().split('T')[0];
        var maxDate = oneYearFromNow.toISOString().split('T')[0];
        calendarDatePicker.setAttribute('min', minDate);
        calendarDatePicker.setAttribute('max', maxDate);

        calendarDatePicker.addEventListener('change', function (e) {
            var val = e.target.value;
            if (val) {
                calendar.gotoDate(val);
            }
        });
    }
}

// Shared booking form logic
function initBookingForm(options) {
    var form = document.getElementById('bookingForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        var bookingDate = document.getElementById('bookingDate').value;
        var startTime = document.getElementById('startTime').value;
        var finishTime = document.getElementById('finishTime').value;
        var firstName = document.getElementById('firstName').value;
        var phone = document.getElementById('phone').value;
        var email = document.getElementById('email').value;
        var promptDiv = document.getElementById('bookingPrompt');

        var content =
            `Booking Details:\n` +
            `Service: ${options.serviceName}\n` +
            `Date: ${bookingDate}\n` +
            `Start Time: ${startTime}\n` +
            `Finish Time: ${finishTime}\n` +
            `Name: ${firstName}\n` +
            `Phone: ${phone}\n` +
            `Email: ${email}`;

        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }
        if (!isValidEmail(email)) {
            promptDiv.innerHTML = '<div class="alert alert-danger text-center mt-2">Please enter a valid email address.</div>';
            return;
        }

        // Show prompt immediately
        promptDiv.innerHTML = '<div class="alert alert-success text-center mt-2">Booking submitted! Please check your email for confirmation.</div>';

        // Send email to user
        emailjs.send('service_31yisxd', 'template_bv5qf8p', {
            email: email,
            name: firstName,
            title: content
        })
            .then(function () {
                // Send email to yourself
                emailjs.send('service_31yisxd', 'template_bv5qf8p', {
                    email: 'dfpeng32@hotmail.com',
                    name: firstName,
                    title: content
                });
                form.reset();
            }, function () {
                promptDiv.innerHTML = '<div class="alert alert-danger text-center mt-2">Failed to send confirmation email. Please check your email address and try again.</div>';
            });
    });
}

// Set min and max for all booking form date pickers
document.addEventListener('DOMContentLoaded', function () {
    var today = new Date();
    var oneYearFromNow = new Date(today);
    oneYearFromNow.setFullYear(today.getFullYear() + 1);

    var minDate = today.toISOString().split('T')[0];
    var maxDate = oneYearFromNow.toISOString().split('T')[0];

    // Select all date inputs in booking forms
    document.querySelectorAll('#bookingForm input[type="date"]').forEach(function (input) {
        input.setAttribute('min', minDate);
        input.setAttribute('max', maxDate);
    });
});

// Set min and max for all booking form time pickers
document.addEventListener('DOMContentLoaded', function () {
    // Select all time inputs in booking forms
    document.querySelectorAll('#bookingForm input[type="time"]').forEach(function (input) {
        input.setAttribute('min', '08:00');
        input.setAttribute('max', '18:00');
    });
});

// Site-wide logo splash effect (shows once per browser/tab session)
document.addEventListener('DOMContentLoaded', function () {
    // Only show splash if not already shown in this session
    if (!sessionStorage.getItem('LogoSplashShown')) {
        var splash = document.getElementById('logo-splash');
        if (splash) {
            splash.style.display = 'flex';
            setTimeout(function () {
                splash.style.display = 'none';
            }, 1500); // Show for 1.5 seconds
            sessionStorage.setItem('LogoSplashShown', 'true');
        }
    }
});

function attachFooterFormHandler() {
    // Initialize EmailJS if not already done
    if (typeof emailjs !== 'undefined' && !window._emailjsInitialized) {
        emailjs.init("h3_ERKdg3w5LyOYze");
        window._emailjsInitialized = true;
    }

    // Attach contact form event handler
    document.querySelectorAll('#contact-footer-form').forEach(function (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var firstName = form.querySelector('[name="firstName"]').value;
            var email = form.querySelector('[name="email"]').value;
            var content = form.querySelector('[name="content"]').value;
            var promptDiv = document.getElementById('contact-footer-prompt');

            function isValidEmail(email) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            }
            if (!isValidEmail(email)) {
                promptDiv.innerHTML = '<div class="alert alert-danger text-center mt-2">Please enter a valid email address.</div>';
                return;
            }

            emailjs.send('service_31yisxd', 'template_cqqt16p', {
                to_email: email,
                firstName: firstName,
                message: content
            })
                .then(function () {
                    promptDiv.innerHTML = '<div class="alert alert-success text-center mt-2">Message sent! Please check your email for confirmation.</div>';
                    form.reset();

                    emailjs.send('service_31yisxd', 'template_cqqt16p', {
                        to_email: 'dfpeng32@hotmail.com',
                        firstName: firstName,
                        customer_email: email,
                        message: content
                    });
                }, function () {
                    promptDiv.innerHTML = '<div class="alert alert-danger text-center mt-2">Failed to send confirmation email. Please check your email address and try again.</div>';
                });
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    // Highlight the current nav link
    var navLinks = document.querySelectorAll('.nav-link');
    var currentPage = window.location.pathname.split('/').pop().toLowerCase();
    navLinks.forEach(function (link) {
        var href = link.getAttribute('href').toLowerCase();
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
});
