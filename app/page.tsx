// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { reviews4Star, reviews5Star } from "./reviews";

// export default function ReviewFunnel() {
//   const [rating, setRating] = useState(0);
//   const [selectedReview, setSelectedReview] = useState("");
//   const [suggestion, setSuggestion] = useState("");

//   // Custom Popup State
//   const [popup, setPopup] = useState<{
//     isOpen: boolean;
//     type: "success" | "error";
//     title: string;
//     message: string;
//     onOk?: () => void;
//   }>({
//     isOpen: false,
//     type: "error",
//     title: "",
//     message: "",
//   });

//   // Aapki di hui exact links
//   const googleDesktopLink =
//     "https://www.google.com/search?q=the+fit+monk+-+andheri+mumbai+reviews&oq=the+fit+&gs_lcrp=EgZjaHJvbWUqCAgAEEUYJxg7MggIABBFGCcYOzIICAEQRRgnGDsyBggCEEUYOzIGCAMQRRg5MhAIBBAuGK8BGMcBGIAEGI4FMgYIBRBFGDwyBggGEEUYPDIGCAcQRRg80gEIMjA1N2owajmoAgCwAgE&sourceid=chrome&source=chrome.ob&ie=UTF-8#lrd=0x3be7b796095b7ec7:0xe8e8eaa091186d4d,3,,,,";

//   const googleMobileLink =
//     "https://www.google.com/search?q=the+fit+monk+-+andheri+mumbai+reviews&oq=&gs_lcrp=EgZjaHJvbWUqDAgEECMYJxjqAhiMBDIGCAAQRRg5MgcIARBFGLABMgwIAhAjGCcY6gIYjAQyDAgDECMYJxjqAhiMBDIMCAQQIxgnGOoCGIwEMgwIBRAjGCcY6gIYjAQyDAgGECMYJxjqAhiMBDIVCAcQLhgnGK8BGMcBGLoCGOoCGIwEMgwICBAjGCcY6gIYjAQyDAgJECMYJxjqAhiMBDIMCAoQIxgnGOoCGIwEMg8ICxAjGCcY6gIYjAQY8AUyDAgMECMYJxjqAhiMBDIPCA0QIxgnGOoCGIwEGPAFMgwIDhAjGCcY6gIYjATSAQYtMWowajmoAg6wAgHxBdP8RBDlS57m&client=ms-android-vivo-terr1-rso2&sourceid=chrome-mobile&source=chrome.ob&ie=UTF-8#ebo=2";

//   const whatsappNumber = "919876543210";

//   // Function to trigger the custom popup
//   const showPopup = (
//     type: "success" | "error",
//     title: string,
//     message: string,
//     onOk?: () => void,
//   ) => {
//     setPopup({ isOpen: true, type, title, message, onOk });
//   };

//   // Function to close popup and execute any pending action (like opening google)
//   const closePopup = () => {
//     const action = popup.onOk;
//     setPopup({ ...popup, isOpen: false });
//     if (action) {
//       action();
//     }
//   };

//   const handleSubmit = () => {
//     if (rating === 0) return;

//     // RULE 1: For 1 & 2 Stars (No Google, only WhatsApp, Suggestion mandatory)
//     if (rating <= 2) {
//       if (!suggestion.trim()) {
//         showPopup(
//           "error",
//           "Suggestion Required",
//           "Please write your suggestion so we can improve.",
//         );
//         return;
//       }
//       const message = encodeURIComponent(
//         `Feedback for The Fit Monk:\nRating: ${rating} Stars\nSuggestion: ${suggestion}`,
//       );
//       window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
//       return;
//     }

//     // RULE 2: For 3 Stars (Google link, Suggestion mandatory)
//     if (rating === 3 && !suggestion.trim()) {
//       showPopup(
//         "error",
//         "Suggestion Required",
//         "Please provide a suggestion for improvement in the box below.",
//       );
//       return;
//     }

//     // Checking if review is selected for 3, 4, and 5 stars
//     if (!selectedReview) {
//       showPopup(
//         "error",
//         "Select a Review",
//         "Please select a review option from the list to copy.",
//       );
//       return;
//     }

//     // Prepare text to copy
//     let finalReview = selectedReview;
//     if (suggestion.trim()) {
//       finalReview += ` (Suggestion: ${suggestion})`;
//     }

//     // RULE 3: Copy to clipboard and open appropriate Google Link via Popup
//     navigator.clipboard
//       .writeText(finalReview)
//       .then(() => {
//         showPopup(
//           "success",
//           "Review Copied! 📋",
//           "Please PASTE the copied text in the Google review box.",
//           () => {
//             const isMobile = /iPhone|iPad|iPod|Android/i.test(
//               navigator.userAgent,
//             );
//             if (isMobile) {
//               window.open(googleMobileLink, "_blank");
//             } else {
//               window.open(googleDesktopLink, "_blank");
//             }
//           },
//         );
//       })
//       .catch(() => {
//         showPopup(
//           "error",
//           "Oops!",
//           "Could not copy the text. Please try again.",
//         );
//       });
//   };

//   return (
//     <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center p-4 sm:p-6 font-sans relative">
//       {/* CUSTOM POPUP MODAL */}
//       {popup.isOpen && (
//         <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
//           <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl transform scale-100 transition-transform flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
//             {/* Dynamic Icon based on type */}
//             {popup.type === "success" ? (
//               <div className="w-16 h-16 bg-[#eefcf2] text-[#166534] rounded-full flex items-center justify-center mb-4">
//                 <svg
//                   className="w-8 h-8"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="3"
//                     d="M5 13l4 4L19 7"
//                   ></path>
//                 </svg>
//               </div>
//             ) : (
//               <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
//                 <svg
//                   className="w-8 h-8"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2.5"
//                     d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
//                   ></path>
//                 </svg>
//               </div>
//             )}

//             <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
//               {popup.title}
//             </h3>
//             <p className="text-gray-600 mb-6 text-sm sm:text-base font-medium">
//               {popup.message}
//             </p>

//             <button
//               onClick={closePopup}
//               className={`w-full py-3.5 rounded-xl font-bold text-sm sm:text-base transition-colors uppercase tracking-wide ${
//                 popup.type === "success"
//                   ? "bg-[#ffb900] text-[#111827] hover:bg-[#e5a700]"
//                   : "bg-[#111827] text-white hover:bg-gray-800"
//               }`}
//             >
//               {popup.type === "success" ? "OK, Go To Google" : "Okay, Got it"}
//             </button>
//           </div>
//         </div>
//       )}
//       {/* END CUSTOM POPUP MODAL */}

//       {/* Custom Scrollbar Styling (Premium Look) */}
//       <style
//         dangerouslySetInnerHTML={{
//           __html: `
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 6px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: #f1f1f1;
//           border-radius: 8px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #d1d5db;
//           border-radius: 8px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: #ffb900;
//         }
//       `,
//         }}
//       />

//       {/* Header / Logo Section */}
//       <div className="lg:mt-6 w-full sm:mt-10 flex flex-row items-center text-center justify-center gap-4">
//         <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-full shadow-lg border-4 border-[#ffb900] bg-[#111827] overflow-hidden flex items-center justify-center p-1 sm:p-2 shrink-0">
//           <Image
//             src="/fitmonk_logo.png"
//             alt="The Fit Monk"
//             fill
//             style={{ objectFit: "contain" }}
//             priority
//           />
//         </div>
//         <h1 className="text-[25px] sm:text-4xl font-extrabold text-[#111827] tracking-wider uppercase text-left">
//           The Fit Monk
//         </h1>
//       </div>

//       {/* Main Review Card (Responsive Width: max-w-md on mobile, max-w-lg on tablet) */}
//       <div className="bg-white w-full max-w-md sm:max-w-4xl mt-6 lg:mt-8 rounded-2xl shadow-xl p-6 sm:p-8 border-t-[6px] border-[#ffb900]">
//         <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-4 lg:mb-6">
//           Rate Your Experience
//         </h2>

//         {/* Stars Section */}
//         <div className="flex justify-center gap-2 sm:gap-4 mb-6">
//           {[1, 2, 3, 4, 5].map((star) => (
//             <button
//               key={star}
//               onClick={() => {
//                 setRating(star);
//                 setSelectedReview("");
//               }}
//               className="focus:outline-none transition-transform active:scale-90"
//             >
//               <svg
//                 className={`w-12 h-12 sm:w-14 sm:h-14 transition-colors duration-300 ${rating >= star ? "text-[#ffb900]" : "text-gray-200"}`}
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//               </svg>
//             </button>
//           ))}
//         </div>

//         {/* Dynamic Content based on Rating */}
//         {rating > 0 && rating <= 2 && (
//           <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl text-sm sm:text-base text-center font-medium">
//             We are sorry to hear that! Please let us know what went wrong below.
//           </div>
//         )}

//         {/* Scrollable Review Selection Options (Visible for 3, 4, and 5 stars) */}
//         {rating >= 3 && (
//           <div className="mb-6">
//             <p className="text-sm sm:text-base font-bold text-gray-700 mb-3">
//               Select a review to copy:
//             </p>
//             {/* SCROLLABLE DIV */}
//             <div className="flex flex-col gap-2.5 max-h-[280px] sm:max-h-[460px] overflow-y-auto px-2 custom-scrollbar">
//               {(rating === 5 ? reviews5Star : reviews4Star).map(
//                 (text, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setSelectedReview(text)}
//                     className={`text-left p-3.5 sm:p-4 rounded-xl text-sm sm:text-[15px] border transition-all ${
//                       selectedReview === text
//                         ? "bg-[#eefcf2] border-[#166534] text-[#166534] font-semibold shadow-sm ring-1 ring-[#166534]"
//                         : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
//                     }`}
//                   >
//                     {text}
//                   </button>
//                 ),
//               )}
//             </div>
//           </div>
//         )}

//         {/* Suggestion Text Area */}
//         {rating > 0 && (
//           <div className="mb-6">
//             <label className="block text-sm sm:text-base font-bold text-gray-700 mb-2">
//               {rating <= 3
//                 ? "What could we improve? (Required)"
//                 : "Suggestions for cafe improvement (Optional)"}
//             </label>
//             <textarea
//               rows={2}
//               className="w-full placeholder-gray-400 text-gray-800 border-2 border-gray-200 rounded-xl p-3 text-sm sm:text-base focus:ring-0 focus:border-[#ffb900] outline-none transition-colors custom-scrollbar"
//               placeholder="Type your suggestions here..."
//               value={suggestion}
//               onChange={(e) => setSuggestion(e.target.value)}
//             ></textarea>
//           </div>
//         )}

//         {/* Dynamic Submit Button */}
//         <button
//           onClick={handleSubmit}
//           disabled={rating === 0}
//           className={`w-full py-3.5 sm:py-4 rounded-xl font-bold text-[15px] sm:text-lg shadow-md transition-all uppercase tracking-wide ${
//             rating === 0
//               ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//               : rating <= 2
//                 ? "bg-[#111827] text-white hover:bg-gray-800"
//                 : "bg-[#ffb900] text-[#111827] hover:bg-[#e5a700]"
//           }`}
//         >
//           {rating === 0
//             ? "Select Stars to Continue"
//             : rating <= 2
//               ? "Submit Suggestion"
//               : "Go to Review Page"}
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Image from "next/image";
import { reviews4Star, reviews5Star } from "./reviews";

export default function ReviewFunnel() {
  const [rating, setRating] = useState(0);
  const [selectedReview, setSelectedReview] = useState("");
  const [suggestion, setSuggestion] = useState("");

  // Custom Popup State
  const [popup, setPopup] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    title: string;
    message: string;
    onOk?: () => void;
  }>({
    isOpen: false,
    type: "error",
    title: "",
    message: "",
  });

  // 👉 YAHAN APNA WHATSAPP NUMBER DAALO (Country code 91 ke sath, bina + ke)
  const whatsappNumber = "9737667990";

  // Aapki di hui exact links
  const googleDesktopLink =
    "https://www.google.com/search?q=the+fit+monk+-+andheri+mumbai+reviews&oq=the+fit+&gs_lcrp=EgZjaHJvbWUqCAgAEEUYJxg7MggIABBFGCcYOzIICAEQRRgnGDsyBggCEEUYOzIGCAMQRRg5MhAIBBAuGK8BGMcBGIAEGI4FMgYIBRBFGDwyBggGEEUYPDIGCAcQRRg80gEIMjA1N2owajmoAgCwAgE&sourceid=chrome&source=chrome.ob&ie=UTF-8#lrd=0x3be7b796095b7ec7:0xe8e8eaa091186d4d,3,,,,";

  const googleMobileLink =
    "https://www.google.com/search?q=the+fit+monk+-+andheri+mumbai+reviews&oq=&gs_lcrp=EgZjaHJvbWUqDAgEECMYJxjqAhiMBDIGCAAQRRg5MgcIARBFGLABMgwIAhAjGCcY6gIYjAQyDAgDECMYJxjqAhiMBDIMCAQQIxgnGOoCGIwEMgwIBRAjGCcY6gIYjAQyDAgGECMYJxjqAhiMBDIVCAcQLhgnGK8BGMcBGLoCGOoCGIwEMgwICBAjGCcY6gIYjAQyDAgJECMYJxjqAhiMBDIMCAoQIxgnGOoCGIwEMg8ICxAjGCcY6gIYjAQY8AUyDAgMECMYJxjqAhiMBDIPCA0QIxgnGOoCGIwEGPAFMgwIDhAjGCcY6gIYjATSAQYtMWowajmoAg6wAgHxBdP8RBDlS57m&client=ms-android-vivo-terr1-rso2&sourceid=chrome-mobile&source=chrome.ob&ie=UTF-8#ebo=2";

  // Function to trigger the custom popup
  const showPopup = (
    type: "success" | "error",
    title: string,
    message: string,
    onOk?: () => void,
  ) => {
    setPopup({ isOpen: true, type, title, message, onOk });
  };

  // Function to close popup and execute any pending action (like opening google)
  const closePopup = () => {
    const action = popup.onOk;
    setPopup({ ...popup, isOpen: false });
    if (action) {
      action();
    }
  };

  const handleSubmit = () => {
    if (rating === 0) return;

    // RULE 1: For 1 & 2 Stars (No Google, ONLY WhatsApp)
    if (rating <= 2) {
      if (!suggestion.trim()) {
        showPopup(
          "error",
          "Suggestion Required",
          "Please write your suggestion so we can improve.",
        );
        return;
      }

      // WhatsApp message formatting
      const message = encodeURIComponent(
        `*Suggestion from a customer:*\n\n${suggestion}\n\n(Rating given: ${rating} Stars)`,
      );
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
      return;
    }

    // RULE 2: For 3 Stars (Suggestion is mandatory, but will NOT be copied to Google)
    if (rating === 3 && !suggestion.trim()) {
      showPopup(
        "error",
        "Suggestion Required",
        "Please provide a suggestion for improvement in the box below.",
      );
      return;
    }

    // Checking if review is selected for 3, 4, and 5 stars
    if (!selectedReview) {
      showPopup(
        "error",
        "Select a Review",
        "Please select a review option from the list to copy.",
      );
      return;
    }

    // RULE 3: Prepare text to copy
    // EXTREMELY IMPORTANT: Suggestion is NEVER appended here. Public review stays clean!
    const finalReview = selectedReview;

    // Copy to clipboard and open appropriate Google Link via Popup
    navigator.clipboard
      .writeText(finalReview)
      .then(() => {
        showPopup(
          "success",
          "Review Copied! 📋",
          "Please PASTE the copied text in the Google review box.",
          () => {
            const isMobile = /iPhone|iPad|iPod|Android/i.test(
              navigator.userAgent,
            );
            if (isMobile) {
              window.open(googleMobileLink, "_blank");
            } else {
              window.open(googleDesktopLink, "_blank");
            }
          },
        );
      })
      .catch(() => {
        showPopup(
          "error",
          "Oops!",
          "Could not copy the text. Please try again.",
        );
      });
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center p-4 sm:p-6 font-sans relative">
      {/* CUSTOM POPUP MODAL */}
      {popup.isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl transform scale-100 transition-transform flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
            {/* Dynamic Icon based on type */}
            {popup.type === "success" ? (
              <div className="w-16 h-16 bg-[#eefcf2] text-[#166534] rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
            ) : (
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  ></path>
                </svg>
              </div>
            )}

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              {popup.title}
            </h3>
            <p className="text-gray-600 mb-6 text-sm sm:text-base font-medium">
              {popup.message}
            </p>

            <button
              onClick={closePopup}
              className={`w-full py-3.5 rounded-xl font-bold text-sm sm:text-base transition-colors uppercase tracking-wide ${
                popup.type === "success"
                  ? "bg-[#ffb900] text-[#111827] hover:bg-[#e5a700]"
                  : "bg-[#111827] text-white hover:bg-gray-800"
              }`}
            >
              {popup.type === "success" ? "OK, Go To Google" : "Okay, Got it"}
            </button>
          </div>
        </div>
      )}
      {/* END CUSTOM POPUP MODAL */}

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
      <div className="lg:mt-6 w-full sm:mt-10 flex flex-row items-center text-center justify-center gap-4">
        <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-full shadow-lg border-4 border-[#ffb900] bg-[#111827] overflow-hidden flex items-center justify-center p-1 sm:p-2 shrink-0">
          <Image
            src="/fitmonk_logo.png"
            alt="The Fit Monk"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
        <h1 className="text-[25px] sm:text-4xl font-extrabold text-[#111827] tracking-wider uppercase text-left">
          The Fit Monk
        </h1>
      </div>

      {/* Main Review Card (Responsive Width: max-w-md on mobile, max-w-lg on tablet) */}
      <div className="bg-white w-full max-w-md sm:max-w-4xl mt-6 lg:mt-8 rounded-2xl shadow-xl p-6 sm:p-8 border-t-[6px] border-[#ffb900]">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-4 lg:mb-6">
          Rate Your Experience
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
                className={`w-12 h-12 sm:w-14 sm:h-14 transition-colors duration-300 ${rating >= star ? "text-[#ffb900]" : "text-gray-200"}`}
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
            {/* SCROLLABLE DIV */}
            <div className="flex flex-col gap-2.5 max-h-[280px] sm:max-h-[460px] overflow-y-auto px-2 custom-scrollbar">
              {(rating === 5 ? reviews5Star : reviews4Star).map(
                (text, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedReview(text)}
                    className={`text-left p-3.5 sm:p-4 rounded-xl text-sm sm:text-[15px] border transition-all ${
                      selectedReview === text
                        ? "bg-[#eefcf2] border-[#166534] text-[#166534] font-semibold shadow-sm ring-1 ring-[#166534]"
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
              className="w-full placeholder-gray-400 text-gray-800 border-2 border-gray-200 rounded-xl p-3 text-sm sm:text-base focus:ring-0 focus:border-[#ffb900] outline-none transition-colors custom-scrollbar"
              placeholder="Type your suggestions here..."
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
            ></textarea>
          </div>
        )}

        {/* Dynamic Submit Button */}
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
