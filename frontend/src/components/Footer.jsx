import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone, Book } from 'lucide-react';

const FooterLink = ({ href, children }) => (
  <a
    href={href}
    className="text-gray-500 hover:text-blue-600 transition-colors duration-300"
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

const FooterSection = ({ title, children }) => (
  <div>
    <h3 className="font-semibold text-gray-800 mb-4">{title}</h3>
    <ul className="space-y-3">
      {children}
    </ul>
  </div>
);

const Footer = () => (
  <footer className="bg-gradient-to-b from-white to-blue-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Main Footer Content */}
      <div className="pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <Book size={24} />
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Digital Access Nepal
              </h2>
            </div>
            <p className="text-gray-500 text-sm">
              Empowering rural communities through digital access to educational resources and government services.
            </p>
            <div className="flex space-x-4">
              <FooterLink href="https://facebook.com">
                <Facebook size={20} />
              </FooterLink>
              <FooterLink href="https://twitter.com">
                <Twitter size={20} />
              </FooterLink>
              <FooterLink href="https://instagram.com">
                <Instagram size={20} />
              </FooterLink>
            </div>
          </div>

          {/* Quick Links */}
          <FooterSection title="Quick Links">
            <li>
              <Link to="/" className="text-gray-500 hover:text-blue-600 transition-colors duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-500 hover:text-blue-600 transition-colors duration-300">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/login" className="text-gray-500 hover:text-blue-600 transition-colors duration-300">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="text-gray-500 hover:text-blue-600 transition-colors duration-300">
                Register
              </Link>
            </li>
          </FooterSection>

          {/* Resources */}
          <FooterSection title="Resources">
            <li>
              <FooterLink href="#">Study Materials</FooterLink>
            </li>
            <li>
              <FooterLink href="#">Practice Tests</FooterLink>
            </li>
            <li>
              <FooterLink href="#">Exam Updates</FooterLink>
            </li>
            <li>
              <FooterLink href="#">FAQs</FooterLink>
            </li>
          </FooterSection>

          {/* Contact Info */}
          <FooterSection title="Contact Us">
            <li className="flex items-center gap-2 text-gray-500">
              <MapPin size={18} />
              <span>Kathmandu, Nepal</span>
            </li>
            <li className="flex items-center gap-2 text-gray-500">
              <Mail size={18} />
              <a href="mailto:contact@digitalaccessnepal.com" className="hover:text-blue-600 transition-colors duration-300">
                contact@digitalaccessnepal.com
              </a>
            </li>
            <li className="flex items-center gap-2 text-gray-500">
              <Phone size={18} />
              <a href="tel:+977-1-4XXXXXX" className="hover:text-blue-600 transition-colors duration-300">
                +977-1-4XXXXXX
              </a>
            </li>
          </FooterSection>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Digital Access Nepal. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Terms of Service</FooterLink>
            <FooterLink href="#">Cookie Policy</FooterLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
