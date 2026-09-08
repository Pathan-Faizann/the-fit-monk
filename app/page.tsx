"use client";

import { useState } from "react";
import Image from "next/image";

export default function ReviewFunnel() {
  const [rating, setRating] = useState(0);
  const [selectedReview, setSelectedReview] = useState("");
  const [suggestion, setSuggestion] = useState("");

  // Demo Links & Numbers
  const googleReviewLinkMobile = "https://maps.google.com/?cid=YOUR_CID_HERE"; // Yahan mobile map link dalna
  const whatsappNumber = "919876543210"; // Owner ka number

  // Pre-written reviews
  const reviews5Star = [
    "Amazing healthy food and great ambiance! The Fit Monk is my new favorite.",
    "Best cafe in town! The staff is very polite and the vibe is super peaceful.",
    "Highly recommended! The quality of ingredients they use is top-notch.",
  ];

  const reviews4Star = [
    "Great food and good service. Really enjoyed the healthy options.",
    "Nice place to hang out. The menu is unique and tastes good.",
    "Good experience overall. Will definitely visit again!",
  ];

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please select a star rating first!");
      return;
    }

    if (rating <= 2) {
      // 1 or 2 Stars: Send internal feedback via WhatsApp, NO Google!
      if (!suggestion) {
        alert("Please let us know how we can improve in the suggestion box.");
        return;
      }
      const message = encodeURIComponent(
        `Feedback for The Fit Monk:\nRating: ${rating} Stars\nSuggestion: ${suggestion}`,
      );
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
    } else {
      // 3, 4, or 5 Stars: Copy review text & redirect to Google
      let finalReview = selectedReview;
      if (suggestion) {
        finalReview += ` (Suggestion: ${suggestion})`;
      }

      if (!finalReview && rating >= 4) {
        alert("Please select a review option.");
        return;
      }

      navigator.clipboard.writeText(finalReview).then(() => {
        alert("Review copied! Please PASTE it in the Google review box.");
        window.open(googleReviewLinkMobile, "_blank");
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6 font-sans">
      {/* Header Section */}
      <div className="mt-8 flex flex-col items-center text-center">
        {/* Replace src with your actual uploaded image path in the public folder */}
        <img
          src="/fitmonk_logo.png"
          alt="The Fit Monk Logo"
          width={150}
          height={150}
          className="rounded-full shadow-lg border-4 border-yellow-500"
        />
        <h1 className="mt-4 text-3xl font-extrabold text-gray-900 tracking-wide uppercase">
          The Fit Monk
        </h1>
        <p className="text-gray-500 mt-1">We value your experience</p>
      </div>

      {/* Main Card */}
      <div className="bg-white w-full max-w-md mt-8 rounded-2xl shadow-xl p-6 border-t-4 border-yellow-500">
        <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
          Make a Review
        </h2>

        {/* Stars */}
        <div className="flex justify-center gap-3 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => {
                setRating(star);
                setSelectedReview(""); // Reset selection on star change
              }}
              className="focus:outline-none transition-transform active:scale-90"
            >
              <svg
                className={`w-12 h-12 ${rating >= star ? "text-yellow-500" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
        </div>

        {/* Options based on Rating */}
        {rating > 0 && rating <= 2 && (
          <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-lg text-sm text-center">
            We are sorry to hear that! Please let us know what went wrong so we
            can fix it immediately.
          </div>
        )}

        {rating >= 3 && (
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 mb-3">
              Select a review to copy:
            </p>
            <div className="flex flex-col gap-2">
              {(rating === 5 ? reviews5Star : reviews4Star).map(
                (text, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedReview(text)}
                    className={`text-left p-3 rounded-lg text-sm border transition-colors ${
                      selectedReview === text
                        ? "bg-green-50 border-green-600 text-green-900 font-medium"
                        : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {text}
                  </button>
                ),
              )}
            </div>
          </div>
        )}

        {/* Suggestion Text Area */}
        {rating > 0 && (
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {rating === 3
                ? "What could we improve? (Required for 3 stars)"
                : "Any suggestions for improvement? (Optional)"}
            </label>
            <textarea
              rows={3}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
              placeholder="Type your suggestions here..."
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
            ></textarea>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className={`w-full py-3 rounded-xl font-bold text-lg shadow-md transition-all ${
            rating === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : rating <= 2
                ? "bg-gray-900 text-white hover:bg-gray-800"
                : "bg-yellow-500 text-gray-900 hover:bg-yellow-400"
          }`}
        >
          {rating === 0
            ? "Select Stars to Continue"
            : rating <= 2
              ? "Submit Feedback directly"
              : "Go to Review Page"}
        </button>
      </div>
    </div>
  );
}
