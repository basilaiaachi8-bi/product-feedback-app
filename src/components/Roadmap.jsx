import React, { useContext, useState } from "react";
import { FeedbackContext } from "../context/FeedbackContext";

export default function Roadmap({ onBack, onSelectFeedback, onAddNew }) {
  const { feedbackData, voteFeedback } = useContext(FeedbackContext);
  const [activeTab, setActiveTab] = useState("in-progress");

  const requests = feedbackData.productRequests || [];

  const planned = requests.filter((item) => item.status === "planned");
  const inProgress = requests.filter((item) => item.status === "in-progress");
  const live = requests.filter((item) => item.status === "live");

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-12 font-sans flex flex-col gap-8">
      <div className="bg-[#373F68] text-white rounded-xl p-6 flex justify-between items-center shadow-sm">
        <div>
          <button
            onClick={onBack}
            className="text-xs font-bold text-white/70 hover:text-white mb-2 flex items-center gap-1 cursor-pointer"
          >
            &lt; Go Back
          </button>
          <h1 className="text-xl md:text-2xl font-bold">Roadmap</h1>
        </div>
        <button
          onClick={onAddNew}
          className="bg-[#AD1FEA] hover:bg-[#C75AF6] text-white font-bold text-sm px-5 py-3 rounded-xl transition-colors cursor-pointer"
        >
          + Add Feedback
        </button>
      </div>

      <div className="flex sm:hidden border-b border-[#8C92B3]/20">
        <button
          onClick={() => setActiveTab("planned")}
          className={`flex-1 pb-4 text-sm font-bold text-center border-b-4 cursor-pointer ${activeTab === "planned" ? "border-[#F49F85] text-[#3A4374]" : "border-transparent text-[#647196]"}`}
        >
          Planned ({planned.length})
        </button>
        <button
          onClick={() => setActiveTab("in-progress")}
          className={`flex-1 pb-4 text-sm font-bold text-center border-b-4 cursor-pointer ${activeTab === "in-progress" ? "border-[#AD1FEA] text-[#3A4374]" : "border-transparent text-[#647196]"}`}
        >
          In-Progress ({inProgress.length})
        </button>
        <button
          onClick={() => setActiveTab("live")}
          className={`flex-1 pb-4 text-sm font-bold text-center border-b-4 cursor-pointer ${activeTab === "live" ? "border-[#62BCFA] text-[#3A4374]" : "border-transparent text-[#647196]"}`}
        >
          Live ({live.length})
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Planned */}
        <div
          className={`flex-col gap-6 ${activeTab === "planned" ? "flex" : "hidden md:flex"}`}
        >
          <div>
            <h2 className="text-lg font-bold text-[#3A4374]">
              Planned ({planned.length})
            </h2>
            <p className="text-sm text-[#647196]">
              Ideas prioritized for research
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {planned.map((item) => (
              <RoadmapCard
                key={item.id}
                item={item}
                color="border-[#F49F85]"
                dotColor="bg-[#F49F85]"
                statusText="Planned"
                onSelect={() => onSelectFeedback(item)}
                toggleUpvote={voteFeedback}
              />
            ))}
          </div>
        </div>

        {/* In-Progress */}
        <div
          className={`flex-col gap-6 ${activeTab === "in-progress" ? "flex" : "hidden md:flex"}`}
        >
          <div>
            <h2 className="text-lg font-bold text-[#3A4374]">
              In-Progress ({inProgress.length})
            </h2>
            <p className="text-sm text-[#647196]">Currently being developed</p>
          </div>
          <div className="flex flex-col gap-4">
            {inProgress.map((item) => (
              <RoadmapCard
                key={item.id}
                item={item}
                color="border-[#AD1FEA]"
                dotColor="bg-[#AD1FEA]"
                statusText="In-Progress"
                onSelect={() => onSelectFeedback(item)}
                toggleUpvote={voteFeedback}
              />
            ))}
          </div>
        </div>

        {/* Live */}
        <div
          className={`flex-col gap-6 ${activeTab === "live" ? "flex" : "hidden md:flex"}`}
        >
          <div>
            <h2 className="text-lg font-bold text-[#3A4374]">
              Live ({live.length})
            </h2>
            <p className="text-sm text-[#647196]">Released features</p>
          </div>
          <div className="flex flex-col gap-4">
            {live.map((item) => (
              <RoadmapCard
                key={item.id}
                item={item}
                color="border-[#62BCFA]"
                dotColor="bg-[#62BCFA]"
                statusText="Live"
                onSelect={() => onSelectFeedback(item)}
                toggleUpvote={voteFeedback}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RoadmapCard({
  item,
  color,
  dotColor,
  statusText,
  onSelect,
  toggleUpvote,
}) {
  return (
    <div
      className={`bg-white rounded-xl p-6 shadow-sm border-t-8 ${color} flex flex-col gap-4`}
    >
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${dotColor}`}></span>
        <span className="text-sm text-[#647196] font-medium">{statusText}</span>
      </div>

      <div>
        <h3
          onClick={onSelect}
          className="text-lg font-bold text-[#3A4374] hover:text-[#4661E6] cursor-pointer"
        >
          {item.title}
        </h3>
        <p className="text-sm text-[#647196] mt-2">{item.description}</p>
      </div>

      <span className="inline-block self-start text-xs font-semibold text-[#4661E6] bg-[#F2F4FF] px-3 py-1 rounded-xl uppercase">
        {item.category}
      </span>

      <div className="flex justify-between items-center mt-2">
        <button
          onClick={() => toggleUpvote(item.id)}
          className={`flex items-center gap-2 font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer ${
            item.userVoted
              ? "bg-[#4661E6] text-white"
              : "bg-[#F2F4FF] hover:bg-[#CFD7FF] text-[#3A4374]"
          }`}
        >
          <span
            className={`text-xs ${item.userVoted ? "text-white" : "text-[#4661E6]"}`}
          >
            ▲
          </span>
          <span className="text-xs">{item.upvotes}</span>
        </button>

        <div
          onClick={onSelect}
          className="flex items-center gap-2 text-sm font-bold text-[#3A4374] cursor-pointer"
        >
          💬 <span>{item.comments ? item.comments.length : 0}</span>
        </div>
      </div>
    </div>
  );
}
