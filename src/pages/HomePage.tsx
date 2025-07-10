import React from 'react';
import Layout from '../components/Layout/Layout';
import EventSlideshow from '../components/Events/EventSlideshow';
import EventsList from '../components/Events/EventsList';
import { events } from '../data/events';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <EventSlideshow events={events} />
        
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">All Events</h2>
          <p className="text-gray-600 mb-6">Discover and book tickets for upcoming events at LPU</p>
          <EventsList events={events} />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;