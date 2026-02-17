import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div>
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-6 underline decoration-4 decoration-cyan-400">
              GameLog
            </h3>
            <p className="text-xl font-bold italic opacity-80 uppercase leading-none">
              Conquer your backlog.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-black uppercase mb-6 tracking-tight">
              Navigation
            </h3>
            <ul className="space-y-3 font-bold uppercase">
              <li>
                <a
                  href="#features"
                  className="hover:bg-yellow-400 hover:text-black px-2 transition-colors"
                >
                  Games
                </a>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:bg-cyan-400 hover:text-black px-2 transition-colors"
                >
                  Roadmap
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:bg1-emerald-400 hover:text-black px-2 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-black uppercase mb-6 tracking-tight">
              Status
            </h3>
            <ul className="space-y-3 font-bold uppercase">
              <li>
                <Link
                  to="/privacy"
                  className="hover:bg-cyan-400 hover:text-black px-2 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:bg-emerald-400 hover:text-black px-2 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t-2 border-white/20 text-center font-black uppercase tracking-widest text-sm">
          &copy; {new Date().getFullYear()} GAMELOG PROTOCOL. ALL RIGHTS
          RESERVED.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
