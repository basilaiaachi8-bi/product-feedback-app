import React, { createContext, useState, useEffect } from "react";
import initialData from "../data.json";

export const FeedbackContext = createContext();

export function FeedbackProvider({ children }) {
  const [feedbackData, setFeedbackData] = useState(() => {
    const savedData = localStorage.getItem("feedbackAppData");
    return savedData ? JSON.parse(savedData) : initialData;
  });

  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("most-upvotes");

  useEffect(() => {
    localStorage.setItem("feedbackAppData", JSON.stringify(feedbackData));
  }, [feedbackData]);

  const addFeedback = (newFeedback) => {
    const newId =
      feedbackData.productRequests.length > 0
        ? Math.max(...feedbackData.productRequests.map((item) => item.id)) + 1
        : 1;

    const itemToAdd = {
      id: newId,
      title: newFeedback.title,
      category: newFeedback.category,
      upvotes: 0,
      status: newFeedback.status || "suggestion",
      description: newFeedback.description,
      comments: [],
    };

    setFeedbackData((prev) => ({
      ...prev,
      productRequests: [itemToAdd, ...prev.productRequests],
    }));
  };

  const updateFeedback = (id, updatedData) => {
    setFeedbackData((prev) => ({
      ...prev,
      productRequests: prev.productRequests.map((item) =>
        item.id === id ? { ...item, ...updatedData } : item,
      ),
    }));
  };

  const deleteFeedback = (id) => {
    setFeedbackData((prev) => ({
      ...prev,
      productRequests: prev.productRequests.filter((item) => item.id !== id),
    }));
  };

  const voteFeedback = (id) => {
    setFeedbackData((prev) => ({
      ...prev,
      productRequests: prev.productRequests.map((item) => {
        if (item.id === id) {
          const isVoted = item.userVoted;
          return {
            ...item,
            upvotes: isVoted ? item.upvotes - 1 : item.upvotes + 1,
            userVoted: !isVoted,
          };
        }
        return item;
      }),
    }));
  };

  const addComment = (feedbackId, commentText, replyToUser = null) => {
    const currentUser = feedbackData.currentUser;

    setFeedbackData((prev) => ({
      ...prev,
      productRequests: prev.productRequests.map((item) => {
        if (item.id === feedbackId) {
          const newComment = {
            id: Date.now(),
            content: commentText,
            user: {
              image: currentUser.image,
              name: currentUser.name,
              username: currentUser.username,
            },
            ...(replyToUser && { replyTo: replyToUser }),
          };

          return {
            ...item,
            comments: [...(item.comments || []), newComment],
          };
        }
        return item;
      }),
    }));
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedbackData,
        category,
        setCategory,
        sortBy,
        setSortBy,
        addFeedback,
        updateFeedback,
        deleteFeedback,
        voteFeedback,
        addComment,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}
