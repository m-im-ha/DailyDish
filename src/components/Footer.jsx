import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-amber-50 to-amber-100 py-12">
      <div className="container mx-auto px-6 sm:px-10 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Website Information */}
        <div>
          <h3 className="text-4xl font-extrabold text-amber-800 mb-6">
            Daily<span className="text-amber-600">Dish</span>
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            Your ultimate destination for tasty food and delightful experiences.
          </p>
        </div>

        {/* Contact Information */}
        <div>
          <h4 className="text-2xl font-bold text-amber-800 mb-6">Contact Us</h4>
          <div className="space-y-4">
            <div className="flex items-center text-lg text-gray-700">
              <FaEnvelope className="mr-3 text-amber-500" />
              <span>support@dailyDish.com</span>
            </div>
            <div className="flex items-center text-lg text-gray-700">
              <FaPhoneAlt className="mr-3 text-amber-500" />
              <span>+88 0179 9332 841</span>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div>
          <h4 className="text-2xl font-bold text-amber-800 mb-6">Connect With Us</h4>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/kirimvesValitsos"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-amber-100 rounded-full hover:bg-amber-300 transition-all duration-300 shadow-lg"
            >
              <FaFacebook size={24} className="text-blue-600" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-amber-100 rounded-full hover:bg-amber-300 transition-all duration-300 shadow-lg"
            >
              <FaXTwitter size={24} className="text-blue-400" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-amber-100 rounded-full hover:bg-amber-300 transition-all duration-300 shadow-lg"
            >
              <FaInstagram size={24} className="text-pink-500" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-amber-100 rounded-full hover:bg-amber-300 transition-all duration-300 shadow-lg"
            >
              <FaLinkedin size={24} className="text-blue-700" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright and Legal */}
      <div className="mt-12 border-t border-amber-200 pt-6 text-center">
        <p className="text-lg text-gray-700">
          © {currentYear} <span className="font-bold text-amber-800">DailyDish</span>. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
