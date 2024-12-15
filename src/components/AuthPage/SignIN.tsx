"use client";
import { useState, useEffect, FormEvent } from "react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  AuthError,
  User,
} from "firebase/auth";
import { auth } from "../../utils/firebaseCred";
import Image from "next/image";

export default function Signin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      setUser(currentUser);
      if (currentUser) {
        console.log("User Info:", currentUser);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setUser(user); // Update the user state
      console.log("User Info:", user);
      console.log("User Photo URL:", user.photoURL);
      // Handle successful sign-in here
    } catch (error) {
      const authError = error as AuthError;
      setError(authError.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      setUser(user); // Update the user state
      console.log("User Info:", user);
      console.log("User Photo URL:", user.photoURL);
      // Handle successful Google sign-in here
    } catch (error) {
      const authError = error as AuthError;
      if (authError.code === "auth/popup-closed-by-user") {
        setError(
          "The popup was closed before completing the sign-in. Please try again."
        );
      } else {
        setError(authError.message);
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      setUser(null);
    } catch (error) {
      const authError = error as AuthError;
      setError(authError.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Sign In</h2>
        {error && <p className="text-red-500">{error}</p>}
        {user ? (
          <div className="text-center">
            <p>Welcome, {user.displayName || user.email}</p>
            <p>Email: {user.email}</p>
            {user.photoURL && (
              <Image
                src={user.photoURL}
                alt="User Photo"
                className="mx-auto rounded-full w-24 h-24"
                width={96}
                height={96}
              />
            )}
            <button
              onClick={handleSignOut}
              className="mt-4 px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full px-3 py-2 border border-gray-300 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full px-3 py-2 border border-gray-300 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign In
                </button>
              </div>
            </form>
            <div className="mt-6">
              <button
                onClick={handleGoogleSignIn}
                className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md group hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Sign In with Google
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
