import React, { useState, useContext } from "react";
import { FeedbackContext } from "../context/FeedbackContext";

export default function FeedbackDetail({ item, onBack, onEdit }) {
  const { voteFeedback, addComment, feedbackData } =
    useContext(FeedbackContext);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const currentItem =
    feedbackData.productRequests.find((req) => req.id === item.id) || item;
  const commentList = currentItem.comments || [];

  const handlePostComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    addComment(currentItem.id, newComment);
    setNewComment("");
  };

  const handlePostReply = (commentId, replyToUsername) => {
    if (!replyText.trim()) return;
    addComment(currentItem.id, replyText, replyToUsername);
    setReplyText("");
    setReplyingTo(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 md:p-12 font-sans flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="text-sm font-bold text-[#647196] hover:underline flex items-center gap-2 cursor-pointer"
        >
          &lt; Go Back
        </button>
        <button
          onClick={onEdit}
          className="bg-[#4661E6] hover:bg-[#8397F8] text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
        >
          Edit Feedback
        </button>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col sm:flex-row items-start justify-between gap-4">
        <div className="flex items-start gap-6">
          <button
            onClick={() => voteFeedback(currentItem.id)}
            className={`hidden sm:flex flex-col items-center justify-center font-bold px-3 py-2 rounded-xl min-h-[53px] min-w-[40px] transition-colors cursor-pointer ${
              currentItem.userVoted
                ? "bg-[#4661E6] text-white"
                : "bg-[#F2F4FF] hover:bg-[#CFD7FF] text-[#3A4374]"
            }`}
          >
            <span
              className={`text-xs ${currentItem.userVoted ? "text-white" : "text-[#4661E6]"}`}
            >
              ▲
            </span>
            <span className="text-xs">{currentItem.upvotes}</span>
          </button>

          <div>
            <h3 className="text-lg font-bold text-[#3A4374]">
              {currentItem.title}
            </h3>
            <p className="text-sm text-[#647196] mt-1">
              {currentItem.description}
            </p>
            <span className="inline-block text-xs font-semibold text-[#4661E6] bg-[#F2F4FF] px-3 py-1 rounded-xl mt-3 uppercase">
              {currentItem.category}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between w-full sm:w-auto">
          <button
            onClick={() => voteFeedback(currentItem.id)}
            className={`flex sm:hidden items-center gap-2 font-bold px-3 py-2 rounded-xl cursor-pointer ${
              currentItem.userVoted
                ? "bg-[#4661E6] text-white"
                : "bg-[#F2F4FF] text-[#3A4374]"
            }`}
          >
            <span
              className={
                currentItem.userVoted ? "text-white" : "text-[#4661E6]"
              }
            >
              ▲
            </span>
            <span>{currentItem.upvotes}</span>
          </button>

          <div className="flex items-center gap-2 text-sm font-bold text-[#3A4374]">
            💬 <span>{commentList.length}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-sm flex flex-col gap-6">
        <h3 className="text-lg font-bold text-[#3A4374]">
          {commentList.length} Comments
        </h3>

        {commentList.length > 0 ? (
          <div className="flex flex-col gap-6 divide-y divide-[#8C92B3]/15">
            {commentList.map((comment, index) => (
              <div
                key={comment.id || index}
                className={`flex flex-col gap-4 ${index !== 0 ? "pt-6" : ""}`}
              >
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#3A4374] flex items-center justify-center text-white font-bold text-xs shrink-0 overflow-hidden">
                    {comment.user?.image ? (
                      <img
                        src={comment.user.image}
                        alt={comment.user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : comment.user?.name ? (
                      comment.user.name.charAt(0)
                    ) : (
                      "U"
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h4 className="text-sm font-bold text-[#3A4374]">
                          {comment.user?.name}
                        </h4>
                        <p className="text-xs text-[#647196]">
                          @{comment.user?.username}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setReplyingTo(
                            replyingTo === comment.id ? null : comment.id,
                          )
                        }
                        className="text-xs font-semibold text-[#4661E6] hover:underline cursor-pointer"
                      >
                        Reply
                      </button>
                    </div>
                    <p className="text-sm text-[#647196]">
                      {comment.replyTo && (
                        <span className="font-bold text-[#AD1FEA] mr-1">
                          @{comment.replyTo}
                        </span>
                      )}
                      {comment.content}
                    </p>
                  </div>
                </div>

                {replyingTo === comment.id && (
                  <div className="flex gap-4 pl-14 mt-2">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={`Type reply to @${comment.user?.username}...`}
                      className="flex-1 bg-[#F7F8FD] border border-[#4661E6] rounded-xl px-4 py-2 text-sm text-[#3A4374] outline-none"
                    />
                    <button
                      onClick={() =>
                        handlePostReply(comment.id, comment.user?.username)
                      }
                      className="bg-[#AD1FEA] hover:bg-[#C75AF6] text-white font-bold text-xs px-5 py-2 rounded-xl transition-colors cursor-pointer"
                    >
                      Post Reply
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-[#647196]">
            No comments yet. Be the first to add one!
          </p>
        )}
      </div>

      <div className="bg-white rounded-xl p-8 shadow-sm">
        <h3 className="text-lg font-bold text-[#3A4374] mb-4">Add Comment</h3>
        <form onSubmit={handlePostComment} className="flex flex-col gap-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Type your comment here..."
            rows="3"
            maxLength="250"
            className="w-full bg-[#F7F8FD] border border-transparent focus:border-[#4661E6] rounded-xl p-4 text-sm text-[#3A4374] outline-none resize-none"
            required
          />
          <div className="flex justify-between items-center">
            <span className="text-xs text-[#647196]">250 characters left</span>
            <button
              type="submit"
              className="bg-[#AD1FEA] hover:bg-[#C75AF6] text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors cursor-pointer"
            >
              Post Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
