import { create, SetState } from 'zustand';
import { faker } from '@faker-js/faker';

export interface Booking {
    id: number;
    startDate: string;
    endDate: string;
}

export interface CalendarEvent {
    id: string;
    title: string;
    start: string;
    end: string;
}

interface UseBookingStore {
    bookings: Booking[];
    events: CalendarEvent[];
    addBooking: (newBooking: Booking) => void;
    updateBooking: (id: number, updatedBooking: Booking) => void;
    deleteBooking: (id: number) => void;
}

const useBookingStore = create<UseBookingStore>((set: SetState<UseBookingStore>) => ({
    bookings: [],
    events: [],
    addBooking: (newBooking) => {
        set((state) => ({ bookings: [...state.bookings, newBooking] }));

        const newBookingEndDate = new Date(newBooking.endDate);

        const newEvent: CalendarEvent = {
            id: newBooking.id.toFixed(),
            title: `${faker.person.firstName()} Booking`,
            start: newBooking.startDate,
            end: new Date(newBookingEndDate.setDate(newBookingEndDate.getDate() + 1)).toISOString().split('T')[0],
        };
        set((state) => ({ events: [...state.events, newEvent] }));
    },
    updateBooking: (id, updatedBooking) => {
        set((state) => ({
            bookings: state.bookings.map((booking) => (booking.id === id ? updatedBooking : booking)),
        }));

        const eventId = id.toString();
        const updatedBookingEndDate = new Date(updatedBooking.endDate);

        set((state) => ({
            events: state.events.map((event) =>
                event.id === eventId
                    ? {
                          id: eventId,
                          title: event.title,
                          start: updatedBooking.startDate,
                          end: new Date(updatedBookingEndDate.setDate(updatedBookingEndDate.getDate() + 1))
                              .toISOString()
                              .split('T')[0],
                      }
                    : event,
            ),
        }));
    },
    deleteBooking: (id) => {
        set((state) => ({ bookings: state.bookings.filter((booking) => booking.id !== id) }));

        const eventId = id.toString();
        set((state) => ({ events: state.events.filter((event) => event.id !== eventId) }));
    },
}));

export default useBookingStore;
