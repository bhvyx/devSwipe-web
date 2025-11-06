const Footer = () => {
  return (
    <footer className="w-full bg-[#0b0f13] border-t border-gray-800 text-gray-400 flex flex-col md:flex-row items-center justify-between px-8 py-4 fixed bottom-0 left-0 z-50 shadow-[0_-2px_20px_rgba(79,70,229,0.1)]">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-linear-to-tr from-indigo-600 to-fuchsia-600 shadow-[0_0_15px_rgba(139,92,246,0.5)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M9 18h6" />
            <path d="M10 22h4" />
            <path d="M8 14a6 6 0 1 1 8 0c-.5.6-1 1.3-1 2a2 2 0 0 1-6 0c0-.7-.5-1.4-1-2z" />
          </svg>
        </div>

        <p className="text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="text-gray-300 font-medium">DevSwipe</span> — All
          rights reserved.
        </p>
      </div>
      <div className="mt-3 md:mt-0 text-sm text-gray-400">
        Developed by{" "}
        <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-fuchsia-500 font-semibold">
          Bhavya Gupta
        </span>
      </div>
    </footer>
  );
};

export default Footer;
