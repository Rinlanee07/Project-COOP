// app/components/LoginForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

export default function LoginForm({
  onSwitchToRegister,
}: {
  onSwitchToRegister?: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Hardcode backend URL for now since env var not loading properly
      const BACKEND_URL = 'http://localhost:3001';
      const res = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password: password
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        Swal.fire({
          icon: "success",
          title: "Login successful!",
          text: "Welcome back!",
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          window.location.href = "/dashboard";
        });
      } else {
        setError(data.message || "Email or password is incorrect");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 w-96">
      <h2 className="text-2xl font-semibold text-center mb-5">Login</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <Button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition"
        >
          {loading ? "Loading..." : "Login"}
        </Button>
      </form>

      <p className="text-sm text-gray-500 mt-3 text-center">
        Don't have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer font-medium hover:underline"
          onClick={onSwitchToRegister}
        >
          Register
        </span>
      </p>
    </div>
  );
}