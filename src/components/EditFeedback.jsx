import React, { useState, useContext } from "react";
import { FeedbackContext } from "../context/FeedbackContext";

export default function EditFeedback({ item, onBack }) {
  const { updateFeedback, deleteFeedback } = useContext(FeedbackContext);

  const [title, setTitle] = useState(item.title);
  const [category, setCategory] = useState(item.category.toLowerCase());
  const [status, setStatus] = useState(item.status);
  const [description, setDescription] = useState(item.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    updateFeedback(item.id, {
      title,
      category,
      status,
      description,
    });

    onBack();
  };

  const handleDelete = () => {
    if (window.confirm("ნამდვილად გსურთ ამ ფიდბექის წაშლა?")) {
      deleteFeedback(item.id);
      onBack();
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 md:p-12 font-sans">
      <button
        onClick={onBack}
        className="text-sm font-bold text-[#647196] hover:underline mb-10 flex items-center gap-2"
      >
        &lt; Go Back
      </button>

      <div className="bg-white rounded-xl p-8 relative shadow-sm">
        <div className="absolute -top-6 left-8 w-12 h-12 bg-[#62BCFA] rounded-full flex items-center justify-center text-white text-xl shadow-md">
          ✎
        </div>

        <h1 className="text-2xl font-bold text-[#3A4374] mt-4 mb-8">
          Editing '{item.title}'
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Feedback Title */}
          <div>
            <label className="block text-sm font-bold text-[#3A4374] mb-1">
              Feedback Title
            </label>
            <p className="text-xs text-[#647196] mb-3">
              Add a short, descriptive headline
            </p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#F7F8FD] border border-transparent focus:border-[#4661E6] rounded-xl p-4 text-sm text-[#3A4374] outline-none"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-bold text-[#3A4374] mb-1">
              Category
            </label>
            <p className="text-xs text-[#647196] mb-3">
              Choose a category for your feedback
            </p>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#F7F8FD] border border-transparent focus:border-[#4661E6] rounded-xl p-4 text-sm text-[#3A4374] outline-none cursor-pointer"
            >
              <option value="feature">Feature</option>
              <option value="ui">UI</option>
              <option value="ux">UX</option>
              <option value="enhancement">Enhancement</option>
              <option value="bug">Bug</option>
            </select>
          </div>

          {/* Update Status */}
          <div>
            <label className="block text-sm font-bold text-[#3A4374] mb-1">
              Update Status
            </label>
            <p className="text-xs text-[#647196] mb-3">Change feedback state</p>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-[#F7F8FD] border border-transparent focus:border-[#4661E6] rounded-xl p-4 text-sm text-[#3A4374] outline-none cursor-pointer"
            >
              <option value="suggestion">Suggestion</option>
              <option value="planned">Planned</option>
              <option value="in-progress">In-Progress</option>
              <option value="live">Live</option>
            </select>
          </div>

          {/* Feedback Detail */}
          <div>
            <label className="block text-sm font-bold text-[#3A4374] mb-1">
              Feedback Detail
            </label>
            <p className="text-xs text-[#647196] mb-3">
              Include any specific comments on what should be improved, added,
              etc.
            </p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full bg-[#F7F8FD] border border-transparent focus:border-[#4661E6] rounded-xl p-4 text-sm text-[#3A4374] outline-none resize-none"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
            <button
              type="button"
              onClick={handleDelete}
              className="w-full sm:w-auto bg-[#D73737] hover:bg-[#E98888] text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-colors cursor-pointer"
            >
              Delete
            </button>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={onBack}
                className="bg-[#3A4374] hover:bg-[#656EA3] text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#AD1FEA] hover:bg-[#C75AF6] text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-colors cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
