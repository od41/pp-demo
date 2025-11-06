// import React, { useState, useEffect } from 'react';



// const TypingEffect = ({
//   text,
//   typingSpeed = 2,
//   isTyping = true,
//   isLastTextUpdated = false,
//   botSettings = {},
//   onDone = () => {},
// }) => {
//   const [displayedText, setDisplayedText] = useState('');

//   useEffect(() => {
//     let currentIndex = displayedText.length;

//     const typingInterval = setInterval(() => {
//       if (currentIndex < text.length) {
//         const text_currentIndex = text[currentIndex] ? text[currentIndex] : '';
//         setDisplayedText(
//           (prevDisplayedText) => prevDisplayedText + text_currentIndex
//         );
//         currentIndex++;
//       } else {
//         clearInterval(typingInterval);
//         if (isLastTextUpdated) {
//           onDone();
//         }
//       }
//     }, typingSpeed);

//     return () => clearInterval(typingInterval);
//   }, [text, typingSpeed, displayedText, isLastTextUpdated, onDone]);

//   const renderTextWithLineBreaks = () => {
//     const lines = displayedText.split('\n');
//     return lines.map((line, index) => (
//       <div key={index}>
//         <span>{line}</span>
//         {index === lines.length - 1 && isTyping && (
//           <span className="blinking-cursor cs-font-extrabold">|</span>
//         )}
//         {index < lines.length - 1 && <br />}
//       </div>
//     ));
//   };

//   return (
//     <div className="cs-chat cs-chat-start cs-whitespace-pre-wrap cs-text-sm cs-font-light">
//       <div className="cs-chat-image avatar cs-avatar">
//         <div className="cs-w-5 cs-rounded-full">
//           <img src={botSettings?.logo} className="cs-w-full cs-h-full" />
//         </div>
//       </div>
//       <div className="cs-chat-bubble cs-rounded-lg cs-text-sm cs-px-4 cs-py-2 cs-min-h-0 bg-slate-100 cs-text-gray-800 cs-shadow-sm"
//       style={{
//         backgroundColor: botSettings.bot_message_background_color,
//         color: botSettings.bot_message_color,
//       }}
//       >
//         {renderTextWithLineBreaks()}
//       </div>
//     </div>
//   );
// };

// export default TypingEffect;