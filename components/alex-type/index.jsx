//  import React, { useEffect, useRef } from 'react'
// import { useSelector } from 'react-redux'
// import ChatText from './ChatText'
// import TypingEffect from '@components/Typing/TypingEffect'
// import { isNilOrEmpty } from 'ramda-adjunct'
// import ReferenceLinks from './ReferenceLinks'

// export default function ChatMessages({
//   chatMessages,
//   isGeneratingResponse,
//   isGeneratingResponseFailed = false,
//   handleRetry,
//   typingText = '',
//   onTypingDone,
//   isLastTextUpdated,
//   showReferenceLinks = false,
//   isAnalysingData = false,
// }) {
//   const { data } = useSelector((state) => state.auth || {})
//   const messagesEndRef = useRef(null)

//   const scrollToBottom = () => {
//     messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
//   }

//   useEffect(() => {
//     scrollToBottom()
//   }, [chatMessages])

//   return (
//     <>
//       {!isNilOrEmpty(chatMessages) && chatMessages.map((chatItem, index) => (
//         <div key={index} className="flex items-start justify-start w-full mb-4">
//           <div
//             className={`${
//               chatItem.isResponse ? 'bg-blue-200' : 'bg-blue-600'
//             } hidden lg:flex items-center justify-center mr-2 w-9 h-9 rounded-lg rounded-tr-none`}
//           >
//             {chatItem.isResponse ? (
//               <img
//                 className="h-6 w-6"
//                 src="https://hdxdev-spaces.nyc3.digitaloceanspaces.com/hdxdev-spaces/copianto/copianto-icon-blue.png"
//                 alt="Copianto Logo"
//               />
//             ) : (
//               <p className="text-sm text-white uppercase">
//                 {data && data?.user?.name?.charAt(0)}
//               </p>
//             )}
//           </div>
//           {chatItem.isResponse &&
//           chatMessages.length - 1 === index &&
//           typingText ? (
//             <TypingEffect
//               text={typingText}
//               onDone={onTypingDone}
//               isLastTextUpdated={isLastTextUpdated}
//             />
//           ) : (
//             <div
//               className={`${
//                 chatItem.isResponse
//                   ? 'bg-blue-50 mr-4 lg:mr-0'
//                   : 'bg-gray-50 ml-4 lg:ml-0'
//               } flex flex-col items-start justify-start w-full rounded-lg lg:rounded-tl-none`}
//             >
//               <ChatText chatItem={chatItem} />
//               {chatItem.isResponse && !isNilOrEmpty(chatItem?.refLinks) && (chatItem?.message?.endsWith('') || chatItem?.message?.endsWith('.')) && showReferenceLinks && (
//                 <ReferenceLinks refLinks={chatItem?.refLinks || []} />
//               )}

//             </div>
//           )}
//         </div>
//       ))}
//       {isGeneratingResponse && !typingText && (
//         <div className="flex items-start justify-start w-full mb-4">
//           <div
//             className={bg-blue-200 hidden lg:flex items-center justify-center mr-2 w-9 h-9 rounded-lg rounded-tr-none}
//           >
//             <img
//               className="h-6 w-6"
//               src="https://hdxdev-spaces.nyc3.digitaloceanspaces.com/hdxdev-spaces/copianto/copianto-icon-blue.png"
//               alt="Copianto Logo"
//             />
//           </div>
//           {/* div column */}
//           <div className="flex flex-col items-start justify-start w-full rounded-lg lg:rounded-tl-none mr-4 lg:mr-0">
//             <div className="bg-blue-50 flex flex-col items-start justify-start w-full rounded-lg rounded-tl-none">
//               <p className="text-sm font-light py-2 px-4 whitespace-pre-wrap">
//                 <span className="animate-ping font-extrabold">|</span>
//               </p>
//             </div>
//             <p className="text-gray-400 text-sm">{isAnalysingData ? 'Analysing data...' : 'Generating response...'}</p>
//           </div>
//         </div>
//       )}
//       {isGeneratingResponseFailed && (
//         <div className="flex items-start justify-start w-full mb-4">
//           <div
//             className={bg-blue-200 flex items-center justify-center mr-2 w-9 h-9 rounded-lg rounded-tr-none}
//           >
//             <img
//               className="h-6 w-6"
//               src="https://hdxdev-spaces.nyc3.digitaloceanspaces.com/hdxdev-spaces/copianto/copianto-icon-blue.png"
//               alt="Copianto Logo"
//             />
//           </div>
//           {/* div column */}
//           <div className="flex flex-col items-start justify-start w-full rounded-lg lg:rounded-tl-none mr-4 lg:mr-0">
//             <div className="bg-blue-50 flex flex-col items-start justify-start w-full rounded-lg rounded-tl-none">
//               <p className="text-sm font-light py-2 px-4 whitespace-pre-wrap text-red-600">
//                 We are sorry, an error occurred while generating your response.
//               </p>
//             </div>
//             <button
//               type="button"
//               onClick={() => handleRetry()}
//               className="flex flex-shrink-0 items-center justify-center h-8 mt-2 bg-blue-600 px-4 rounded-lg text-white text-sm font-light hover:bg-blue-700"
//             >
//               Regenerate Response
//             </button>
//           </div>
//         </div>
//       )}
//       <div ref={messagesEndRef} />
//     </>
//   )
// }




