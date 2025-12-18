import React, { useContext, useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import { AuthContext } from "../Contexts/AuthContext";
import LoadingSpinnerr from "../Components/LoadingSpinnerr";

const RootLayOut = () => {
  const { loading: authLoading } = useContext(AuthContext);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (authLoading || initialLoading) {
    return <LoadingSpinnerr />;
  }

  return (
    <div>
      <Navbar />
      <main className="min-h-[calc(100vh-245px)] w-11/12 mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayOut;
