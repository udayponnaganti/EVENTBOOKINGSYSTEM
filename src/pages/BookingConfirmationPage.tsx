import React from 'react';
import Layout from '../components/Layout/Layout';
import BookingConfirmation from '../components/Booking/BookingConfirmation';

const BookingConfirmationPage: React.FC = () => {
  return (
    <Layout>
      <BookingConfirmation />
    </Layout>
  );
};

export default BookingConfirmationPage;