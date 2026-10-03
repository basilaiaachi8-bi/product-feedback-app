import React, { useContext, useState } from "react";
import { FeedbackContext } from "./context/FeedbackContext";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import FeedbackCard from "./components/FeedbackCard";
import NewFeedback from "./components/NewFeedback";
import FeedbackDetail from "./components/FeedbackDetail";
import EditFeedback from "./components/EditFeedback";
import Roadmap from "./components/Roadmap";

export default function App() {
  const contextValues = useContext(FeedbackContext) || {};
  const {
    feedbackData,
    category = "all",
    sortBy = "most-upvotes",
  } = contextValues;

  const [currentView, setCurrentView] = useState("suggestions");
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  if (currentView === "new-feedback") {
    return <NewFeedback onBack={() => setCurrentView("suggestions")} />;
  }

  if (currentView === "detail" && selectedFeedback) {
    return (
      <FeedbackDetail
        item={selectedFeedback}
        onBack={() => setCurrentView("suggestions")}
        onEdit={() => setCurrentView("edit-feedback")}
      />
    );
  }

  if (currentView === "edit-feedback" && selectedFeedback) {
    return (
      <EditFeedback
        item={selectedFeedback}
        onBack={() => setCurrentView("suggestions")}
      />
    );
  }

  if (currentView === "roadmap") {
    return (
      <Roadmap
        onBack={() => setCurrentView("suggestions")}
        onAddNew={() => setCurrentView("new-feedback")}
        onSelectFeedback={(item) => {
          setSelectedFeedback(item);
          setCurrentView("detail");
        }}
      />
    );
  }

  const productRequests = feedbackData?.productRequests || [];

  let filtered = productRequests.filter((item) => {
    if (!category || category === "all") return true;
    const itemCat = item?.category ? String(item.category).toLowerCase() : "";
    const currentCat = String(category).toLowerCase();
    return itemCat === currentCat;
  });

  filtered.sort((a, b) => {
    const aUpvotes = Number(a?.upvotes) || 0;
    const bUpvotes = Number(b?.upvotes) || 0;
    const aComments = Array.isArray(a?.comments) ? a.comments.length : 0;
    const bComments = Array.isArray(b?.comments) ? b.comments.length : 0;

    if (sortBy === "most-upvotes") return bUpvotes - aUpvotes;
    if (sortBy === "least-upvotes") return aUpvotes - bUpvotes;
    if (sortBy === "most-comments") return bComments - aComments;
    if (sortBy === "least-comments") return aComments - bComments;
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#F7F8FD] pb-12 font-sans">
      <div className="lg:hidden w-full">
        <Sidebar onViewRoadmap={() => setCurrentView("roadmap")} />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-start px-6 md:px-12 mt-6 lg:mt-12">
        <div className="hidden lg:block shrink-0">
          <Sidebar onViewRoadmap={() => setCurrentView("roadmap")} />
        </div>

        <main className="w-full flex-1 flex flex-col gap-6">
          <Header onAddNew={() => setCurrentView("new-feedback")} />

          <div className="flex flex-col gap-4">
            {filtered.length > 0 ? (
              filtered.map((item) => (
                <FeedbackCard
                  key={item?.id || Math.random()}
                  item={item}
                  onSelect={() => {
                    setSelectedFeedback(item);
                    setCurrentView("detail");
                  }}
                />
              ))
            ) : (
              <div className="bg-white rounded-xl p-16 text-center flex flex-col items-center justify-center shadow-sm">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-[#3A4374] mb-2">
                  There is no feedback yet.
                </h3>
                <p className="text-sm text-[#647196] max-w-xs mb-6">
                  Got a suggestion? Found a bug that needs to be squashed? We
                  love hearing about new ideas to improve our app.
                </p>
                <button
                  onClick={() => setCurrentView("new-feedback")}
                  className="bg-[#AD1FEA] hover:bg-[#C75AF6] text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors cursor-pointer"
                >
                  + Add Feedback
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
