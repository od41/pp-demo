import React, { useState, useEffect, useRef } from "react";
import Seo from "@/shared/seo/seo";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import LoaderIcon from "@/components/icons/loader-icon";

const Chats = () => {
  const router = useRouter();
  const isMounted = useRef(false);
  const handleRedirect = async () => {
    router.push(`/chat/new`);
  };

  useEffect(() => {
    // generic first query to get the first message and then redirect to the chat_group_id with the right page
    if (!isMounted.current) {
      // makeFirstQuery();
      isMounted.current = true;
    }
  }, []);

  const canRedirect = isMounted.current;

  // if (!canRedirect) {
  //   return (
  //     <div className="container w-full h-[100vh] flex items-center justify-center">
  //       <div className=" flex flex-col h-full w-full md:max-w-[831px]">
  //         <Seo title="Chats" />
  //         <div className={`flex flex-col flex-grow`}>
  //           <div className="mt-10">
  //             <LoaderIcon />
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  handleRedirect();
  return null;
};

Chats.layout = "AuthenticatedLayout";

export default Chats;
