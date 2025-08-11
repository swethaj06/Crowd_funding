import React from 'react';

const Footer = () => (
  <footer className="bg-[#181e2a] text-white py-6 mt-16">
    <div className="max-w-5xl mx-auto px-4 flex flex-col items-center">
      <div className="flex flex-col items-center mb-4">
        <span className="font-bold text-xl tracking-wide mb-1">FundMe</span>
        <span className="text-xs text-gray-400">&copy; {new Date().getFullYear()} FundMe. All rights reserved.</span>
      </div>
      <nav className="flex flex-wrap justify-center gap-4 text-sm mb-2">
        <a href="/about" className="hover:text-blue-400 transition">About</a>
        <a href="/contact" className="hover:text-blue-400 transition">Contact</a>
        <a href="/terms" className="hover:text-blue-400 transition">Terms</a>
        <a href="/privacy" className="hover:text-blue-400 transition">Privacy</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">Twitter</a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">Facebook</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">Instagram</a>
      </nav>
      <div className="text-xs text-gray-500 mt-2 text-center">Made with ❤️ by real people for real causes.</div>
    </div>
  </footer>
);

export default Footer;
