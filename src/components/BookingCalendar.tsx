import React from 'react';
import useBookingStore, { Booking } from '../store/useBookingStore';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './BookingCalendar.css';
import { DateSelectArg, EventClickArg } from '@fullcalendar/core';

interface BookingListProps {
    onEdit: (booking: Booking) => void;
    onDelete: (id: number) => void;
}

const BookingCalendar: React.FC<BookingListProps> = ({ onEdit, onDelete }) => {
    const events = useBookingStore((state) => state.events);

    const handleDelete = (clickInfo: EventClickArg) => {
        const event = clickInfo.event;
        if (confirm(`Are you sure you want to delete the event '${event.title}'`)) {
            onDelete(Number(event.id));
            clickInfo.event.remove();
        }
    };

    const handleUpdate = (selectInfo: DateSelectArg) => {
        // let calendarApi = selectInfo.view.calendar;
        // calendarApi.on();
        //TODO: Implement drag and drop update events on full calendar
    };

    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                initialDate={new Date()}
                select={handleUpdate}
                events={events}
                eventClick={handleDelete}
                validRange={{ start: new Date() }}
                defaultAllDay={true}
            />
        </>
    );
};

export default BookingCalendar;
