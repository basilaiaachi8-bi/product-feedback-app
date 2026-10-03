import React, { useState, useContext } from "react";
import { FeedbackContext } from "../context/FeedbackContext";

export default function Sidebar({ onViewRoadmap }) {
  const {
    category = "all",
    setCategory,
    feedbackData,
  } = useContext(FeedbackContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = ["All", "UI", "UX", "Enhancement", "Bug", "Feature"];

  const requests = feedbackData?.productRequests || [];
  const plannedCount = requests.filter(
    (item) => item.status === "planned",
  ).length;
  const inProgressCount = requests.filter(
    (item) => item.status === "in-progress",
  ).length;
  const liveCount = requests.filter((item) => item.status === "live").length;

  return (
    <>
      <aside className="hidden lg:flex flex-col gap-6 w-64 shrink-0">
        <div className="rounded-xl p-6 text-white bg-gradient-to-r from-[#E84D70] via-[#A337F6] to-[#28A7ED] flex flex-col justify-end min-h-[130px] shadow-sm">
          <h1 className="font-bold text-lg">Frontend Mentor</h1>
          <p className="text-sm text-white/75">Feedback Board</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive =
              category === cat.toLowerCase() ||
              (cat === "All" && category === "all");
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat.toLowerCase())}
                className={`text-sm font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer ${
                  isActive
                    ? "bg-[#4661E6] text-white"
                    : "bg-[#F2F4FF] text-[#4661E6] hover:bg-[#CFD7FF]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg text-[#3A4374]">Roadmap</h3>
            <span
              onClick={onViewRoadmap}
              className="text-sm text-[#4661E6] underline font-semibold cursor-pointer"
            >
              View
            </span>
          </div>
          <div className="flex flex-col gap-2 text-sm text-[#647196]">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F49F52]"></span>
                Planned
              </span>
              <span className="font-bold">{plannedCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#AD1FEA]"></span>
                In-Progress
              </span>
              <span className="font-bold">{inProgressCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#62BCFA]"></span>Live
              </span>
              <span className="font-bold">{liveCount}</span>
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:hidden w-full relative z-30">
        <div className="bg-gradient-to-r from-[#E84D70] via-[#A337F6] to-[#28A7ED] p-6 text-white flex justify-between items-center">
          <div>
            <h1 className="font-bold text-lg">Frontend Mentor</h1>
            <p className="text-xs text-white/80">Feedback Board</p>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-2xl font-bold focus:outline-none cursor-pointer p-2"
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full h-[calc(100vh-80px)] bg-black/50 flex justify-end">
            <div
              className="w-[271px] bg-[#F7F8FD] h-full p-6 flex flex-col gap-6 shadow-2xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-xl p-6 shadow-sm flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const isActive =
                    category === cat.toLowerCase() ||
                    (cat === "All" && category === "all");
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setCategory(cat.toLowerCase());
                        setIsMobileMenuOpen(false);
                      }}
                      className={`text-sm font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer ${
                        isActive
                          ? "bg-[#4661E6] text-white"
                          : "bg-[#F2F4FF] text-[#4661E6] hover:bg-[#CFD7FF]"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg text-[#3A4374]">Roadmap</h3>
                  <span
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onViewRoadmap();
                    }}
                    className="text-sm text-[#4661E6] underline font-semibold cursor-pointer"
                  >
                    View
                  </span>
                </div>
                <div className="flex flex-col gap-2 text-sm text-[#647196]">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#F49F52]"></span>
                      Planned
                    </span>
                    <span className="font-bold">{plannedCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#AD1FEA]"></span>
                      In-Progress
                    </span>
                    <span className="font-bold">{inProgressCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#62BCFA]"></span>
                      Live
                    </span>
                    <span className="font-bold">{liveCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
