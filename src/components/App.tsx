import React, { useState } from 'react';
import BookingForm from './BookingForm';
import BookingList from './BookingList';
import useBookingStore, { Booking } from '../store/useBookingStore';
import BookingCalendar from './BookingCalendar';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App: React.FC = () => {
    const [editData, setEditData] = useState<Booking | null>(null);
    const { deleteBooking } = useBookingStore();

    const handleEdit = (booking: Booking): void => {
        setEditData(booking);
    };

    const handleDelete = (id: number) => {
        deleteBooking(Number(id));
        toast.success('Booking has been deleted');
    };

    const onSubmitBookingForm = () => {
        setEditData(null);
    };

    return (
        <>
            <div className="navbar bg-primary text-primary-content">
                <button className="btn btn-ghost text-xl">Booking App</button>
            </div>
            <div className={`p-4 lg:p-10 min-h-full`}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 rounded-box">
                    <div className="col-span-1">
                        <div className="grid grid-cols-1 gap-6">
                            <h2 className="text-3xl">Add Booking</h2>
                            <BookingForm
                                editMode={!!editData}
                                initialData={editData}
                                onSubmitBookingForm={onSubmitBookingForm}
                            />
                            <h2 className="text-3xl">Booking Agenda</h2>
                            <BookingList onEdit={handleEdit} onDelete={handleDelete} />
                        </div>
                    </div>
                    <div className="lg:col-span-2 col-span-1">
                        <BookingCalendar onEdit={handleEdit} onDelete={handleDelete} />
                    </div>
                </div>
            </div>

            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                theme="light"
                transition={Bounce}
            ></ToastContainer>
        </>
    );
};

export default App;
