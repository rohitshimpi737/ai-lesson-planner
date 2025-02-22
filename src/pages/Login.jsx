import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Sun, Moon } from "lucide-react";
import { Info } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Theme state for toggling
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "demouser@gmail.com" && password === "demopass") {
      localStorage.setItem("isAuthenticated", "true"); // Store login state
      window.location.href = "/lesson-planner"; // Redirect & force re-render
    } else {
      setError("Invalid Credentials! Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background text-foreground transition-colors duration-300">
      <Card className="w-full max-w-md p-8 space-y-6 rounded-xl shadow-xl border dark:border-border">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          EduAI Planner
          </h1>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsDark(!isDark)}
            className="rounded-full dark:bg-primary/10 dark:hover:bg-primary/20"
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-foreground" />
            ) : (
              <Moon className="h-5 w-5 text-foreground" />
            )}
          </Button>
        </div>

        <Alert className="bg-white dark:bg-purple-900/30 border-2 border-purple-200 dark:border-purple-700 shadow-sm">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-purple-600 dark:text-purple-300 flex-shrink-0" />
            <div>
              <AlertTitle className="font-semibold text-black dark:text-purple-100 mb-2">
                Demo Access
              </AlertTitle>
              <AlertDescription className="text-black dark:text-purple-200 space-y-1">
                <p className="flex gap-1">
                  <span className="font-medium">Email:</span>
                  <code className="text-gray-800 dark:text-purple-100 font-mono">
                    demouser@gmail.com
                  </code>
                </p>
                <p className="flex gap-1">
                  <span className="font-medium">Password:</span>
                  <code className="text-gray-800 dark:text-purple-100 font-mono">
                    demopass
                  </code>
                </p>
              </AlertDescription>
            </div>
          </div>
        </Alert>

        <p className="text-gray-600 dark:text-gray-300 text-center">
          Sign in to continue
        </p>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium dark:text-foreground"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter demo email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="focus-visible:ring-2 focus-visible:ring-primary dark:bg-muted dark:text-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium dark:text-foreground"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter demo password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="focus-visible:ring-2 focus-visible:ring-primary dark:bg-muted dark:text-foreground"
            />
          </div>

          <Button className="w-full bg-primary hover:bg-primary/90 h-11 text-white">
            Sign In
          </Button>

          {error && (
            <Alert variant="destructive" className="text-sm">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </form>
      </Card>
    </div>
  );
};

export default Login;
