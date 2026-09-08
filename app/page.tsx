"use client";

import { useState } from "react";
import Image from "next/image";
import { reviews4Star, reviews5Star } from "./reviews";

export default function ReviewFunnel() {
  const [rating, setRating] = useState(0);
  const [selectedReview, setSelectedReview] = useState("");
  const [suggestion, setSuggestion] = useState("");

  // Aapki di hui exact links
  const googleDesktopLink =
    "https://www.google.com/search?q=the+fit+monk+-+andheri+mumbai+reviews&oq=the+fit+&gs_lcrp=EgZjaHJvbWUqCAgAEEUYJxg7MggIABBFGCcYOzIICAEQRRgnGDsyBggCEEUYOzIGCAMQRRg5MhAIBBAuGK8BGMcBGIAEGI4FMgYIBRBFGDwyBggGEEUYPDIGCAcQRRg80gEIMjA1N2owajmoAgCwAgE&sourceid=chrome&source=chrome.ob&ie=UTF-8#lrd=0x3be7b796095b7ec7:0xe8e8eaa091186d4d,3,,,,";
  const googleMobileLink =
    "https://www.google.com/search?sca_esv=a9c0e99a3096cf33&biw=1536&bih=730&sxsrf=APpeQnupvqPxL1hwPH-7t_9gXHKoYo8uuw:1788850129785&q=shanthi+orthopaedic+and+dental+clinic+mumbai+reviews&uds=AJ5uw19GuBVBLMbQsdSycHwVNNfHs1sgjFLk_qZnH0xMjRcwUHrQbsaJngOOzpQ54psAY71lcH94x0tkT_iNme0MrG_zFPDVVzW5sTpvdLTqy8d16dOD5NofeF8EsbyFI8dC15FGEKNcTOCkbfT8rUC52p4kcO0dW-AXc32sTuhBy1-XUswzET-P43fXdaRSIGHFfanNV6RjSZFkm2iJ33dMjujAsCDyekigRyOlNnqebd-lOKQnKj0-LgOGv3i9IjmfaUL_BPW7TNRWax2AndsgHwIZMmt3CvpHuDq__tQdgZHr5_f2-LFX2-Oqg9mUWfHumh69mjO5IKFi2qDdhDN4cK93iFwkrEX7iwJUA2V8WPfo3af6xrWxYhTsNtXTtk6YCRZeFiD_SkhEvG_3LGkDRFtORwbsMu5NmmfBgQPdXuC_Y_PfRKK3fylnkKyKq4KZxqfKpgob4OC6HYDLZ1Q4msCje0vx8Bx7sAyj5WTaR3_UhA435chTx0fAFp0bh-jXgV96VKtP1xBugf_mAr8GSR6vbVAhfVx5PNLcZ2iYke9pr33U5xecJsQcDwhbNdEFFmVBw35M&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_2poS2qiz9ScWtfGpEnokV1Xw_FRYO4nlfjN73-R9t_hJdTIlrmrhvfAhwY8_CnY8gAXhDnUnz0tGv0jeWHbp3KIkBe19TpVcB1GxGo7IywCgxQryukY-7tq-qX4wtQw_0w2JC4%3D&sa=X&ved=2ahUKEwit8KqEst6WAxXbTGwGHWT_IYQQk8gLegQIGhAB&ictx=1&stq=1&cs=1&lei=0a-fau3DL9uZseMP5P6HoQg#ebo=4";

  // Apna Client / Owner ka WhatsApp Number yahan daale
  const whatsappNumber = "919876543210";

  const handleSubmit = () => {
    if (rating === 0) return;

    // RULE 1: For 1 & 2 Stars (No Google, only WhatsApp, Suggestion mandatory)
    if (rating <= 2) {
      if (!suggestion.trim()) {
        alert("Please write your suggestion so we can improve.");
        return;
      }
      const message = encodeURIComponent(
        `Feedback for The Fit Monk:\nRating: ${rating} Stars\nSuggestion: ${suggestion}`,
      );
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
      return;
    }

    // RULE 2: For 3 Stars (Google link, Suggestion mandatory)
    if (rating === 3 && !suggestion.trim()) {
      alert("Please provide a suggestion for improvement in the box below.");
      return;
    }

    // Checking if review is selected for 3, 4, and 5 stars
    if (!selectedReview) {
      alert("Please select a review option to copy.");
      return;
    }

    // Prepare text to copy
    let finalReview = selectedReview;
    if (suggestion.trim()) {
      finalReview += ` (Suggestion: ${suggestion})`;
    }

    // RULE 3: Copy to clipboard and open appropriate Google Link
    navigator.clipboard.writeText(finalReview).then(() => {
      alert("Review copied! Please PASTE it in the Google review box.");

      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      if (isMobile) {
        window.open(googleMobileLink, "_blank");
      } else {
        window.open(googleDesktopLink, "_blank");
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center p-4 sm:p-6 font-sans">
      {/* Custom Scrollbar Styling (Premium Look) */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1; 
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db; 
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ffb900; 
        }
      `,
        }}
      />

      {/* Header / Logo Section */}
      <div className="mt-6 sm:mt-10 flex flex-col items-center text-center">
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full shadow-lg border-4 border-[#ffb900] bg-[#111827] overflow-hidden flex items-center justify-center p-2">
          <Image
            src="/fitmonk_logo.png"
            alt="The Fit Monk"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
        <h1 className="mt-5 text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-wider uppercase">
          The Fit Monk
        </h1>
        <p className="text-gray-500 mt-1 font-medium sm:text-lg">
          We value your experience
        </p>
      </div>

      {/* Main Review Card (Responsive Width: max-w-md on mobile, max-w-lg on tablet) */}
      <div className="bg-white w-full max-w-md sm:max-w-lg mt-8 rounded-2xl shadow-xl p-6 sm:p-8 border-t-[6px] border-[#ffb900]">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-6">
          Make a Review
        </h2>

        {/* Stars Section */}
        <div className="flex justify-center gap-2 sm:gap-4 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => {
                setRating(star);
                setSelectedReview("");
              }}
              className="focus:outline-none transition-transform active:scale-90"
            >
              <svg
                className={`w-12 h-12 sm:w-14 sm:h-14 ${rating >= star ? "text-[#ffb900]" : "text-gray-200"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
        </div>

        {/* Dynamic Content based on Rating */}
        {rating > 0 && rating <= 2 && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl text-sm sm:text-base text-center font-medium">
            We are sorry to hear that! Please let us know what went wrong below.
          </div>
        )}

        {/* Scrollable Review Selection Options (Visible for 3, 4, and 5 stars) */}
        {rating >= 3 && (
          <div className="mb-6">
            <p className="text-sm sm:text-base font-bold text-gray-700 mb-3">
              Select a review to copy:
            </p>
            {/* THIS IS THE SCROLLABLE DIV */}
            <div className="flex flex-col gap-2.5 max-h-[240px] sm:max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {(rating === 5 ? reviews5Star : reviews4Star).map(
                (text, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedReview(text)}
                    className={`text-left p-3.5 sm:p-4 rounded-xl text-sm sm:text-[15px] border transition-all ${
                      selectedReview === text
                        ? "bg-[#eefcf2] border-[#166534] text-[#166534] font-semibold shadow-sm"
                        : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
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
            <label className="block text-sm sm:text-base font-bold text-gray-700 mb-2">
              {rating <= 3
                ? "What could we improve? (Required)"
                : "Suggestions for cafe improvement (Optional)"}
            </label>
            <textarea
              rows={2}
              className="w-full placeholder-gray-500 border-2 border-gray-200 rounded-xl p-3 text-sm sm:text-base focus:ring-0 focus:border-[#ffb900] outline-none transition-colors custom-scrollbar"
              placeholder="Type your suggestions here..."
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
            ></textarea>
          </div>
        )}

        {/* Dynamic Submit Button - Always Visible Without Page Scroll */}
        <button
          onClick={handleSubmit}
          disabled={rating === 0}
          className={`w-full py-3.5 sm:py-4 rounded-xl font-bold text-[15px] sm:text-lg shadow-md transition-all uppercase tracking-wide ${
            rating === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : rating <= 2
                ? "bg-[#111827] text-white hover:bg-gray-800"
                : "bg-[#ffb900] text-[#111827] hover:bg-[#e5a700]"
          }`}
        >
          {rating === 0
            ? "Select Stars to Continue"
            : rating <= 2
              ? "Submit Suggestion"
              : "Go to Review Page"}
        </button>
      </div>
    </div>
  );
}
