import React from 'react';
import { Calendar, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-purple-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Calendar className="h-8 w-8" />
              <div>
                <h3 className="text-xl font-bold">LPU Events</h3>
                <p className="text-sm text-blue-200">Lovely Professional University</p>
              </div>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              Your gateway to exciting campus events, cultural festivals, academic seminars, and sports competitions at LPU.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-blue-200">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/bookings" className="hover:text-white transition-colors">My Bookings</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Event Calendar</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help & Support</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-blue-200">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Phagwara, Punjab, India</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+91-1824-517000</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">events@lpu.co.in</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="bg-blue-800 hover:bg-blue-700 p-2 rounded-full transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-blue-800 hover:bg-blue-700 p-2 rounded-full transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-blue-800 hover:bg-blue-700 p-2 rounded-full transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-blue-800 hover:bg-blue-700 p-2 rounded-full transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-4">
              <p className="text-xs text-blue-200">
                Stay updated with the latest events and announcements
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-blue-800 mt-8 pt-8 text-center">
          <p className="text-blue-200 text-sm">
            © 2024 Lovely Professional University. All rights reserved. | 
            <a href="#" className="hover:text-white ml-1">Privacy Policy</a> | 
            <a href="#" className="hover:text-white ml-1">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;