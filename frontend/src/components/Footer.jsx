import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-green-400 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left Section: App Info */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h1 className="text-lg font-bold">Note App</h1>
          <p className="text-sm">Organize your thoughts effortlessly!</p>
        </div>

        {/* Center Section: Links */}
        <div className="flex gap-6 text-sm justify-center mb-4 md:mb-0">
          <a
            href="#"
            className="hover:underline hover:text-yellow-300 transition duration-300"
          >
            About
          </a>
          <a
            href="mailto:bawekeasres@gmail.com"
            className="hover:underline hover:text-yellow-300 transition duration-300"
          >
            Contact
          </a>
          <a
            href="#"
            className="hover:underline hover:text-yellow-300 transition duration-300"
          >
            Help
          </a>
        </div>

        {/* Right Section: Social Media */}
        <div className="flex gap-4 justify-center">
          <a
            href="https://web.facebook.com/profile.php?id=100056780534739"
            className="hover:text-yellow-300 transition duration-300"
          >
            <i className="fab fa-facebook text-xl"></i>
          </a>
          <a href="#" className="hover:text-yellow-300 transition duration-300">
            <i className="fab fa-twitter text-xl"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/baweke-mekonnen-asres-5aaa5a257/"
            className="hover:text-yellow-300 transition duration-300"
          >
            <i className="fab fa-linkedin text-xl"></i>
          </a>
        </div>
      </div>

      {/* Bottom Section: Copyright */}
      <div className="text-center text-sm mt-4 border-t border-white/20 pt-4">
        © {new Date().getFullYear()} Note App. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
