import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <span className="text-blue-600">Trip</span>
          <span className="text-green-500">Advise</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
        </div>

        {/* Sign In Button (Always Visible) */}
        <Link to="/sign-in" className="hidden md:block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Sign In
        </Link>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg p-4 space-y-4">
          <Link to="/" className="block text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/about" className="block text-gray-700 hover:text-blue-600">About</Link>
          <Link to="/sign-in" className="block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
}
