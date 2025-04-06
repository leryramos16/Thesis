import FullCalendar from '@fullcalendar/react'
import { Calendar } from '@fullcalendar/core'
import timeGridPlugin from '@fullcalendar/timegrid'

const events = [
    { title: 'Meeting', start: new Date() }
]

const Booking = (props) => {
    return (
        <div>
            <h1>Reservation</h1>
            <FullCalendar
                timeZone='UTC'
                plugins={[timeGridPlugin]}
                initialView='timeGridWeek'
                headerToolbar={{
                    left: 'prev,next',
                    center: 'title',
                    right: 'timeGridWeek,timeGridDay' // user can switch between the two
                }}
                weekends={false}
                events={events}
            //eventContent={renderEventContent}
            />
        </div>
    );
}

export default Booking;