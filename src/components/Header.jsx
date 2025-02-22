import { Button } from "@/components/ui/button";
import { Menu, X, Rocket, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle"; // Import Theme Toggle

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if user is authenticated
  const isAuthenticated = !!localStorage.getItem("isAuthenticated");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false); // Close mobile menu on route change
  }, [location]);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/lesson-planner");
    } else {
      alert("Please log in first!");
      navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated"); // Remove auth token
    navigate("/login"); // Redirect to login
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-background/80 transition-all duration-300 border-b ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Rocket className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tight text-transparent bg-gradient-to-r from-primary to-purple-600 bg-clip-text">
              EduAI Planner
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle /> {/* Added Theme Toggle Button */}
            {isAuthenticated ? (
              // Show Logout button when authenticated
              <Button
                size="sm"
                className="bg-red-500 hover:bg-red-600 flex gap-2"
                onClick={handleLogout}
              >
                Logout
                <LogOut className="h-4 w-4" />
              </Button>
            ) : (
              // Show Get Started button when not logged in
              <Button
                size="sm"
                className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 flex gap-2"
                onClick={handleGetStarted}
              >
                Get Started
                <Rocket className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-16 inset-x-0 bg-background border-b shadow-lg px-4 py-4">
            <div className="flex flex-col gap-4">
              <ThemeToggle /> {/* Theme toggle for mobile */}
              {isAuthenticated ? (
                <Button
                  className="w-full bg-red-500 hover:bg-red-600"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                  onClick={handleGetStarted}
                >
                  Get Started
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
