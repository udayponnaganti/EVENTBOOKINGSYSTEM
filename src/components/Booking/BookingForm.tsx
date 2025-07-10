import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, User, AlertCircle, Home } from 'lucide-react';
import { events } from '../../data/events';
import { useAuth } from '../../context/AuthContext';

const BookingForm: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { user, addBooking } = useAuth();
  const navigate = useNavigate();
  
  const event = events.find(e => e.id === eventId);
  const [ticketCount, setTicketCount] = useState(1);
  const [registrationNumbers, setRegistrationNumbers] = useState<string[]>([user?.registrationNumber || '']);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!event) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Event not found</p>
      </div>
    );
  }

  const handleTicketCountChange = (newCount: number) => {
    if (newCount < 1 || newCount > 10) return;
    
    setTicketCount(newCount);
    
    // Adjust registration numbers array
    const newRegNumbers = [...registrationNumbers];
    if (newCount > registrationNumbers.length) {
      // Add empty strings for additional tickets
      const additionalSlots = newCount - registrationNumbers.length;
      newRegNumbers.push(...Array(additionalSlots).fill(''));
    } else if (newCount < registrationNumbers.length) {
      // Remove extra registration numbers
      newRegNumbers.splice(newCount);
    }
    
    setRegistrationNumbers(newRegNumbers);
  };

  const handleRegistrationNumberChange = (index: number, value: string) => {
    const newRegNumbers = [...registrationNumbers];
    newRegNumbers[index] = value;
    setRegistrationNumbers(newRegNumbers);
  };

  const validateRegistrationNumbers = () => {
    return registrationNumbers.every(regNum => 
      regNum.trim() && /^\d{1,8}$/.test(regNum.trim())
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all registration numbers are filled
    const emptyFields = registrationNumbers.some(regNum => !regNum.trim());
    if (emptyFields) {
      alert('Please fill in all registration numbers');
      return;
    }

    // Validate registration number format
    if (!validateRegistrationNumbers()) {
      alert('Please enter valid registration numbers (up to 8 digits)');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create booking record
    const bookingData = {
      id: Date.now().toString(),
      eventId: event!.id,
      userId: user?.registrationNumber || '',
      ticketCount,
      registrationNumbers: registrationNumbers.filter(reg => reg.trim()),
      bookingDate: new Date().toISOString(),
      status: 'confirmed' as const
    };
    
    // Add booking to context
    addBooking(bookingData);
    
    // Redirect to confirmation page
    navigate(`/booking-confirmation/${bookingData.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Events
        </button>
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <Home className="h-5 w-5 mr-2" />
          Home
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative h-64 md:h-80">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {event.title}
            </h1>
            <p className="text-gray-200">{event.description}</p>
          </div>
        </div>

        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Details</h2>
              <div className="space-y-3 text-gray-600">
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span className="font-medium">{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span className="font-medium">{event.time}</span>
                </div>
                <div className="flex justify-between">
                  <span>Venue:</span>
                  <span className="font-medium">{event.venue}</span>
                </div>
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span className="font-medium">{event.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>Available Tickets:</span>
                  <span className="font-medium">{event.availableTickets}</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Book Tickets</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Tickets (Max 10)
                  </label>
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={() => handleTicketCountChange(ticketCount - 1)}
                      disabled={ticketCount <= 1}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="text-xl font-bold px-4">{ticketCount}</span>
                    <button
                      type="button"
                      onClick={() => handleTicketCountChange(ticketCount + 1)}
                      disabled={ticketCount >= 10}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Registration Numbers for Each Ticket
                  </label>
                  <div className="space-y-3">
                    {registrationNumbers.map((regNum, index) => (
                      <div key={index} className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          value={regNum}
                          onChange={(e) => handleRegistrationNumberChange(index, e.target.value)}
                          placeholder={`6-digit reg. number for ticket ${index + 1}`}
                          placeholder={`Registration number for ticket ${index + 1} (up to 8 digits)`}
                          placeholder={`Registration number for ticket ${index + 1} (up to 8 digits)`}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          maxLength={8}
                          pattern="\d{1,8}"
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium">Important:</p>
                      <p>Only students with valid registration numbers will be allowed entry through the turnstile gates. Please ensure all registration numbers are correct and belong to current LPU students.</p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Processing...' : `Book ${ticketCount} Ticket${ticketCount > 1 ? 's' : ''}`}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;