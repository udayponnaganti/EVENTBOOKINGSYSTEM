import React from 'react';
import Layout from '../components/Layout/Layout';
import BookingForm from '../components/Booking/BookingForm';

const BookingPage: React.FC = () => {
  return (
    <Layout>
      <BookingForm />
    </Layout>
  );
};

export default BookingPage;