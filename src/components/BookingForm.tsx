import React, { useState } from 'react';
import useBookingStore, { Booking } from '../store/useBookingStore';
import Datepicker from 'react-tailwindcss-datepicker';
import { DateRangeType, DateValueType } from 'react-tailwindcss-datepicker/dist/types';
import { toast } from 'react-toastify';

interface BookingFormProps {
    editMode: boolean;
    initialData: Booking | null;
    onSubmitBookingForm: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ editMode, initialData, onSubmitBookingForm }) => {
    const [formData, setFormData] = useState<Booking>(initialData || { id: 0, startDate: '', endDate: '' });
    const { bookings, addBooking, updateBooking } = useBookingStore();

    const handleValueChange = (newValue: DateValueType) => {
        setFormData((prevData) => ({
            ...prevData,
            startDate: newValue?.startDate as string,
            endDate: newValue?.endDate as string,
        }));
    };

    const isOverlap = (newStart: string, newEnd: string): boolean => {
        return getExistingBookings().some((booking) => {
            const { startDate, endDate } = booking;

            // Check for overlap
            if (newStart >= startDate && newStart < endDate) {
                return true; // The new booking starts during an existing booking
            }

            if (newEnd > startDate && newEnd <= endDate) {
                return true; // The new booking ends during an existing booking
            }

            if (newStart <= startDate && newEnd >= endDate) {
                return true; // The new booking fully contains an existing booking
            }

            return false;
        });
    };

    const handleDisabledDates = (): DateRangeType[] => {
        return getExistingBookings().map((booking) => {
            return { startDate: booking.startDate, endDate: booking.endDate };
        });
    };

    const getExistingBookings = () => {
        if (editMode) {
            return bookings.filter((booking) => booking.id !== initialData?.id);
        } else {
            return bookings;
        }
    };

    const handleFormSubmit = () => {
        const { startDate, endDate } = formData;

        // Make sure they have selected a date range
        if (!startDate || !endDate) {
            toast.error('Please select a date.');
            return;
        }

        // Perform validation to prevent double bookings
        if (isOverlap(startDate, endDate)) {
            toast.error('Booking unavailable. Please choose a different date.');
            return;
        }

        // Add or update booking in the store
        if (editMode) {
            // Update existing booking
            updateBooking(initialData!.id, { ...initialData!, startDate, endDate });
            toast.success('Booking has been updated.');
        } else {
            // Add new booking
            addBooking({ id: Date.now(), startDate, endDate });
            toast.success('Booking has been confirmed.');
        }

        onSubmitBookingForm();
    };

    const getDefaultValue = () => {
        if (editMode && !!initialData) {
            return { startDate: initialData.startDate, endDate: initialData.endDate };
        }
        return { startDate: formData.startDate, endDate: formData.endDate };
    };

    return (
        <>
            <div className="card shadow-lg compact bg-base-100">
                <div className="grid place-items-center py-8">
                    <Datepicker
                        value={getDefaultValue()}
                        startFrom={new Date()}
                        onChange={handleValueChange}
                        disabledDates={handleDisabledDates()}
                        separator={'to'}
                        minDate={new Date()}
                    />
                    <div className="flex justify-end">
                        <button onClick={handleFormSubmit} className="btn btn-primary align-end">
                            {editMode ? 'Update Booking' : 'Add Booking'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookingForm;
