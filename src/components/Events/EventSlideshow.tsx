import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Clock, MapPin, Calendar } from 'lucide-react';
import { Event } from '../../types';

interface EventSlideshowProps {
  events: Event[];
}

const EventSlideshow: React.FC<EventSlideshowProps> = ({ events }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredEvents = events.filter(event => event.featured);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === featuredEvents.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [featuredEvents.length]);

  const nextSlide = () => {
    setCurrentIndex(currentIndex === featuredEvents.length - 1 ? 0 : currentIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? featuredEvents.length - 1 : currentIndex - 1);
  };

  if (featuredEvents.length === 0) return null;

  const currentEvent = featuredEvents[currentIndex];

  return (
    <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl mb-12">
      <div className="absolute inset-0">
        <img
          src={currentEvent.image}
          alt={currentEvent.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
      </div>
      
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-8">
          <div className="max-w-2xl">
            <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              {currentEvent.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {currentEvent.title}
            </h1>
            <p className="text-xl text-gray-200 mb-6">
              {currentEvent.description}
            </p>
            
            <div className="flex flex-wrap gap-4 text-white mb-8">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>{new Date(currentEvent.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>{currentEvent.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>{currentEvent.venue}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                to={`/book/${currentEvent.id}`}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 inline-block"
              >
                Book Now
              </Link>
              <div className="text-white">
                <span className="text-sm">Available: </span>
                <span className="font-bold">{currentEvent.availableTickets}</span>
                <span className="text-sm">/{currentEvent.totalTickets}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {featuredEvents.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default EventSlideshow;