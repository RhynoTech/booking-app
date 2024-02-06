import React from 'react';
import useBookingStore, { Booking } from '../store/useBookingStore';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';

interface BookingListProps {
    onEdit: (booking: Booking) => void;
    onDelete: (id: number) => void;
}

const BookingList: React.FC<BookingListProps> = ({ onEdit, onDelete }) => {
    const bookings = useBookingStore((state) => state.bookings);

    return (
        <>
            <div className="card shadow-lg compact bg-base-100">
                {bookings.length > 0 ? (
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking.id}>
                                    <td>{booking.startDate}</td>
                                    <td>{booking.endDate}</td>
                                    <td>
                                        <div className="badge badge-success text-white">Active</div>
                                    </td>
                                    <td>
                                        <div className="flex">
                                            <PencilSquareIcon className="h-6 w-6 mr-2" onClick={() => onEdit(booking)}>
                                                Edit
                                            </PencilSquareIcon>
                                            <TrashIcon
                                                onClick={() => onDelete(booking.id)}
                                                className="h-6 w-6 fill-red-500"
                                            >
                                                Delete
                                            </TrashIcon>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="flex w-full justify-center p-4">No current bookings</div>
                )}
            </div>
        </>
    );
};

export default BookingList;
