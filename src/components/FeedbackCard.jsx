import React, { useContext } from "react";
import { FeedbackContext } from "../context/FeedbackContext";

export default function FeedbackCard({ item, onSelect }) {
  const { voteFeedback } = useContext(FeedbackContext);

  return (
    <div
      onClick={onSelect}
      className="bg-white rounded-xl p-6 shadow-sm border border-transparent hover:border-[#4661E6] transition-all duration-300 ease-in-out cursor-pointer flex flex-col sm:flex-row items-start justify-between gap-4 group"
    >
      <div className="flex items-start gap-6">
        <button
          onClick={(e) => {
            e.stopPropagation();
            voteFeedback(item.id);
          }}
          className={`hidden sm:flex flex-col items-center justify-center font-bold px-3 py-2 rounded-xl min-h-[53px] min-w-[40px] transition-all duration-200 cursor-pointer ${
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

        <div>
          <h3 className="text-lg font-bold text-[#3A4374] group-hover:text-[#4661E6] transition-colors duration-200">
            {item.title}
          </h3>
          <p className="text-sm text-[#647196] mt-1">{item.description}</p>
          <span className="inline-block text-xs font-semibold text-[#4661E6] bg-[#F2F4FF] px-3 py-1 rounded-xl mt-3 uppercase">
            {item.category}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between w-full sm:w-auto">
        <button
          onClick={(e) => {
            e.stopPropagation();
            voteFeedback(item.id);
          }}
          className={`flex sm:hidden items-center gap-2 font-bold px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
            item.userVoted
              ? "bg-[#4661E6] text-white"
              : "bg-[#F2F4FF] text-[#3A4374]"
          }`}
        >
          <span className={item.userVoted ? "text-white" : "text-[#4661E6]"}>
            ▲
          </span>
          <span>{item.upvotes}</span>
        </button>

        <div className="flex items-center gap-2 text-sm font-bold text-[#3A4374]">
          💬 <span>{item.comments ? item.comments.length : 0}</span>
        </div>
      </div>
    </div>
  );
}
