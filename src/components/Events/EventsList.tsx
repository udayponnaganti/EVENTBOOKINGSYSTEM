import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Event } from '../../types';
import EventCard from './EventCard';

interface EventsListProps {
  events: Event[];
}

const EventsList: React.FC<EventsListProps> = ({ events }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDutyLeave, setSelectedDutyLeave] = useState('All');
  const [selectedVenue, setSelectedVenue] = useState('All');

  const categories = ['All', ...new Set(events.map(event => event.category))];
  const dutyLeaveTypes = ['All', 'FULL DAY DL', 'HALF DAY DL', 'NO DL'];
  const venues = ['All', 'Baldev Raj Mittal Unipolis', 'Shanti Devi Mittal Auditorium'];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesDutyLeave = selectedDutyLeave === 'All' || event.dutyLeave === selectedDutyLeave;
    const matchesVenue = selectedVenue === 'All' || event.venue === selectedVenue;
    return matchesSearch && matchesCategory && matchesDutyLeave && matchesVenue;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="relative">
          <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-4 mb-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Duty Leave Type:</h3>
            <div className="flex flex-wrap gap-2">
              {dutyLeaveTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedDutyLeave(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedDutyLeave === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Venue:</h3>
          <div className="flex flex-wrap gap-2">
            {venues.map(venue => (
              <button
                key={venue}
                onClick={() => setSelectedVenue(venue)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedVenue === venue
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {venue}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No events found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default EventsList;