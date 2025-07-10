import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, MapPin, Users, Home, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { events } from '../../data/events';
import EventCard from '../Events/EventCard';

const BookingConfirmation: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const { bookings } = useAuth();
  const navigate = useNavigate();
  
  const booking = bookings.find(b => b.id === bookingId);
  const event = booking ? events.find(e => e.id === booking.eventId) : null;
  
  // Get upcoming events (excluding the current booked event)
  const upcomingEvents = events
    .filter(e => e.id !== booking?.eventId && new Date(e.date) > new Date())
    .slice(0, 3);

  if (!booking || !event) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Booking not found</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header with Home Button */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Booking Confirmation</h1>
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Home className="h-4 w-4" />
          <span>Home</span>
        </button>
      </div>

      {/* Confirmation Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
          <div className="flex items-center space-x-4">
            <CheckCircle className="h-12 w-12" />
            <div>
              <h2 className="text-2xl font-bold">Booking Confirmed!</h2>
              <p className="text-green-100">Your tickets have been successfully booked</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Event Details */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Event Details</h3>
              <div className="space-y-4">
                <div>
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <h4 className="text-2xl font-bold text-gray-900">{event.title}</h4>
                <p className="text-gray-600">{event.description}</p>
                
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">{new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">{event.venue}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">{booking.ticketCount} Ticket{booking.ticketCount > 1 ? 's' : ''}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Information */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Booking Information</h3>
              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Booking ID</p>
                  <p className="font-mono text-lg font-bold text-gray-900">{booking.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Booking Date</p>
                  <p className="font-medium text-gray-900">
                    {new Date(booking.bookingDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Registered Students */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Registered Students</h4>
                <div className="space-y-2">
                  {booking.registrationNumbers.map((regNum, index) => (
                    <div key={index} className="flex items-center space-x-3 bg-blue-50 p-3 rounded-lg">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Ticket #{index + 1}</p>
                        <p className="text-sm text-gray-600">Registration: {regNum}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Important Notice */}
              <div className="mt-6 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">Important Notice</h4>
                <p className="text-sm text-yellow-700">
                  Please ensure all registered students bring their ID cards. Only students with the registration numbers listed above will be allowed entry through the turnstile gates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
            >
              <span>View All Events</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingConfirmation;