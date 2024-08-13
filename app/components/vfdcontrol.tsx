"use client";
import React, { useState, useEffect } from "react";
import { getLampStatus, sendCommand } from "../api/vfdcontrol";

const App: React.FC = () => {
  const [lampStatus, setLampStatus] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchLampStatus();
    const interval = setInterval(fetchLampStatus, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchLampStatus = async () => {
    try {
      const status = await getLampStatus();
      setLampStatus(status.isOn);
    } catch (error) {
      console.error("Failed to fetch lamp status:", error);
    }
  };

  const handleCommand = async (command: "ON" | "OFF") => {
    setIsLoading(true);
    try {
      await sendCommand(command);
      await fetchLampStatus();
    } catch (error) {
      console.error(`Failed to send ${command} command:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h2 className="text-3xl font-extrabold text-gray-900">
                  VFD Control
                </h2>
                <p className="text-xl">
                  Lamp Status: {lampStatus ? "ON" : "OFF"}
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleCommand("ON")}
                    disabled={isLoading}
                    className="px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-green-600 focus:outline-none focus:shadow-outline disabled:opacity-50"
                  >
                    Turn ON
                  </button>
                  <button
                    onClick={() => handleCommand("OFF")}
                    disabled={isLoading}
                    className="px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-600 focus:outline-none focus:shadow-outline disabled:opacity-50"
                  >
                    Turn OFF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
