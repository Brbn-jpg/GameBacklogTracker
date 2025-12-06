import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/10 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-evenly gap-8 text-center md:text-left">
          <div>
            <h3 className="text-white font-bold mb-4">GameLog</h3>
            <p className="text-gray-400">Conquer your backlog.</p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul>
              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Games
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Legal</h3>
            <ul>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-8 text-center text-gray-400">
          &copy; {new Date().getFullYear()} GameLog. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
