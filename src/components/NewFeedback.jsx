import React, { useState, useContext } from "react";
import { FeedbackContext } from "../context/FeedbackContext";

export default function NewFeedback({ onBack }) {
  const { addFeedback } = useContext(FeedbackContext);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Feature");
  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState({
    title: false,
    description: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      title: !title.trim(),
      description: !description.trim(),
    };

    setErrors(newErrors);

    if (!newErrors.title && !newErrors.description) {
      addFeedback({
        title,
        category: category.toLowerCase(),
        description,
        status: "planned",
      });
      onBack();
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 md:p-12 font-sans flex flex-col gap-10">
      <button
        onClick={onBack}
        className="text-sm font-bold text-[#647196] hover:underline self-start cursor-pointer"
      >
        &lt; Go Back
      </button>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-white rounded-xl p-8 md:p-10 relative flex flex-col gap-6 shadow-sm mt-4"
      >
        <div className="absolute -top-6 left-10 w-12 h-12 rounded-full bg-gradient-to-r from-[#E84D70] via-[#A337F6] to-[#28A7ED] flex items-center justify-center text-white shadow-md">
          <span className="text-xl font-bold">+</span>
        </div>

        <h1 className="text-xl md:text-2xl font-bold text-[#3A4374] mt-2">
          Create New Feedback
        </h1>

        {/* Feedback Title */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-[#3A4374]">
            Feedback Title
          </label>
          <span className="text-xs text-[#647196]">
            Add a short, descriptive headline
          </span>
          <div className="relative">
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (e.target.value.trim())
                  setErrors((prev) => ({ ...prev, title: false }));
              }}
              className={`w-full bg-[#F7F8FD] border rounded-xl p-4 text-sm text-[#3A4374] outline-none transition-colors ${
                errors.title
                  ? "border-[#D73737] focus:border-[#D73737]"
                  : "border-transparent focus:border-[#4661E6]"
              }`}
            />
            {errors.title && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#D73737]">
                Can't be empty
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-[#3A4374]">Category</label>
          <span className="text-xs text-[#647196]">
            Choose a category for your feedback
          </span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-[#F7F8FD] border border-transparent focus:border-[#4661E6] rounded-xl p-4 text-sm text-[#3A4374] outline-none cursor-pointer"
          >
            <option value="Feature">Feature</option>
            <option value="UI">UI</option>
            <option value="UX">UX</option>
            <option value="Enhancement">Enhancement</option>
            <option value="Bug">Bug</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-[#3A4374]">
            Feedback Detail
          </label>
          <span className="text-xs text-[#647196]">
            Include any specific comments on what should be improved, added,
            etc.
          </span>
          <div className="relative">
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (e.target.value.trim())
                  setErrors((prev) => ({ ...prev, description: false }));
              }}
              rows="3"
              className={`w-full bg-[#F7F8FD] border rounded-xl p-4 text-sm text-[#3A4374] outline-none resize-none transition-colors ${
                errors.description
                  ? "border-[#D73737] focus:border-[#D73737]"
                  : "border-transparent focus:border-[#4661E6]"
              }`}
            />
            {errors.description && (
              <span className="absolute right-4 top-4 text-xs font-bold text-[#D73737]">
                Can't be empty
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-4">
          <button
            type="button"
            onClick={onBack}
            className="bg-[#3A4374] hover:bg-[#656EA3] text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-colors cursor-pointer order-2 sm:order-1"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#AD1FEA] hover:bg-[#C75AF6] text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-colors cursor-pointer order-1 sm:order-2"
          >
            Add Feedback
          </button>
        </div>
      </form>
    </div>
  );
}
