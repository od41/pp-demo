import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import Button from "@/components/button";
import Image from "next/image";
import { UserAvatar } from "@/components/user-avatar";
import { useRouter } from "next/router";
import { useChat } from "@/hooks/useChat";
import { PaulPlaysLogo } from "@/components/icons/paul-logo";

export const sidebarMenuItems = [
  {
    label: "Chats",
    link: "/chat/history",
    parent: "/chat",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", height: "100%" }}
      >
        <path
          d="M28 20C28 20.7072 27.719 21.3855 27.219 21.8856C26.7189 22.3857 26.0406 22.6667 25.3333 22.6667H9.33333L4 28V6.66667C4 5.95942 4.28095 5.28115 4.78105 4.78105C5.28115 4.28095 5.95942 4 6.66667 4H25.3333C26.0406 4 26.7189 4.28095 27.219 4.78105C27.719 5.28115 28 5.95942 28 6.66667V20Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Purchases",
    link: "/purchases",
    parent: "/purchases",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", height: "100%" }}
      >
        <path
          d="M27.1668 17.1096C27.1681 16.8684 27.1219 16.6294 27.0307 16.4061C26.9394 16.1827 26.805 15.9795 26.6351 15.8082L26.6337 15.8068L15.807 4.98013L15.6605 4.83368H15.4534H5.33344H4.83344V5.33368V15.4537V15.661L4.9801 15.8075L15.8068 26.6208L15.8076 26.6216C16.1511 26.9631 16.6158 27.1547 17.1001 27.1547C17.5844 27.1547 18.0491 26.9631 18.3926 26.6216L18.3934 26.6209L26.6334 18.3942L26.6351 18.3925C26.9737 18.0511 27.1646 17.5904 27.1668 17.1096ZM27.1668 17.1096C27.1668 17.1095 27.1668 17.1093 27.1668 17.1091L26.6668 17.107L27.1668 17.1099C27.1668 17.1098 27.1668 17.1097 27.1668 17.1096ZM16.0001 3.16702L16.003 3.16701C16.1127 3.16637 16.2214 3.18739 16.3229 3.22886C16.4241 3.2702 16.5162 3.33105 16.5939 3.40794C16.5942 3.40818 16.5944 3.40843 16.5947 3.40867L27.6601 14.4873V14.5539L27.8063 14.7003C28.4618 15.3566 28.8299 16.2462 28.8299 17.1737C28.8299 18.1008 28.4621 18.99 27.8071 19.6462C27.8069 19.6465 27.8066 19.6467 27.8063 19.647L19.5813 27.8054L19.5801 27.8066C18.9239 28.462 18.0343 28.8302 17.1068 28.8302C16.1793 28.8302 15.2897 28.462 14.6334 27.8066L3.40843 16.5949C3.40818 16.5947 3.40794 16.5944 3.4077 16.5942C3.33081 16.5165 3.26996 16.4244 3.22862 16.3232C3.18715 16.2216 3.16613 16.1129 3.16676 16.0032H3.16677V16.0003V4.00035C3.16677 3.77933 3.25457 3.56737 3.41085 3.41109C3.56713 3.25481 3.77909 3.16701 4.0001 3.16701L16.0001 3.16702ZM9.16675 8.75314C9.41342 8.58832 9.70343 8.50035 10.0001 8.50035C10.3979 8.50035 10.7795 8.65838 11.0608 8.93969C11.3421 9.22099 11.5001 9.60252 11.5001 10.0003C11.5001 10.297 11.4121 10.587 11.2473 10.8337C11.0825 11.0804 10.8482 11.2726 10.5741 11.3862C10.3 11.4997 9.99844 11.5294 9.70747 11.4715C9.4165 11.4136 9.14922 11.2708 8.93944 11.061C8.72966 10.8512 8.5868 10.584 8.52893 10.293C8.47105 10.002 8.50075 9.70041 8.61428 9.42632C8.72782 9.15223 8.92007 8.91797 9.16675 8.75314Z"
          fill="currentColor"
          stroke="currentColor"
        />
      </svg>
    ),
  },
];
const Sidebar = () => {
  const { user, setShowSignUpOrLogin, toggleAuthModal } = useAuth();
  const { isSidebarExpanded, setIsSidebarExpanded } = useChat();
  const router = useRouter();

  const toggleSidebar = (e: any) => {
    e.preventDefault();
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const showSIgnUp = (e: any) => {
    e.preventDefault();
    setShowSignUpOrLogin("signup");
    toggleAuthModal();
  };

  const showLogin = (e: any) => {
    e.preventDefault();
    setShowSignUpOrLogin("login");
    toggleAuthModal();
  };

  useEffect(() => {
    if (!user) {
      setIsSidebarExpanded(true);
    }
  }, [user]);

  return (
    <div
      className={`h-screen transition-width duration-200 bg-black_200 hidden md:flex flex-col gap-6 pt-20 pb-6 rounded-r-[1.9rem] ${
        isSidebarExpanded ? "w-75 px-6" : "w-[75px]"
      }`}
    >
      <div className="flex-1">
        <div className="w-full flex items-center gap-7 mb-20">
          {isSidebarExpanded ? (
            <div className="flex items-center gap-[28px] w-full justify-between">
              <div className="flex items-center gap-1">
                <Link
                  href={"/chat/new"}
                  className=" text-[1.6rem] leading-[1.7rem] font-display"
                >
                  <PaulPlaysLogo isBeta />
                </Link>
              </div>
              {user && (
                <Button
                  variant="icon"
                  className="rounded-full bg-black_100 w-[29px] h-[29px] px-1 py-1 hover:bg-black_100/50"
                  onClick={toggleSidebar}
                >
                  <svg
                    width="8"
                    height="12"
                    viewBox="0 0 8 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.499951 7.7998L6.19995 13.3998C6.59995 13.7998 7.19995 13.7998 7.59995 13.3998C7.99995 12.9998 7.99995 12.3998 7.59995 11.9998L2.69995 6.9998L7.59995 1.9998C7.99995 1.5998 7.99995 0.999804 7.59995 0.599804C7.39995 0.399804 7.19995 0.299805 6.89995 0.299805C6.59995 0.299805 6.39995 0.399804 6.19995 0.599804L0.499951 6.1998C0.0999512 6.6998 0.0999512 7.2998 0.499951 7.7998C0.499951 7.6998 0.499951 7.6998 0.499951 7.7998Z"
                      fill="#797979"
                    />
                  </svg>
                </Button>
              )}
            </div>
          ) : (
            <button
              onClick={toggleSidebar}
              className=" w-full flex justify-center"
            >
              <div className="w-9 h-9 relative">
                <Image
                  src="/images/pngs/paul_logo.png"
                  fill={true}
                  alt="PaulPlays logo"
                />
              </div>
            </button>
          )}
        </div>

        <div className="flex flex-col gap-8">
          {sidebarMenuItems.map((item, index) => (
            <div
              className={`flex items-center gap-4 ${
                isSidebarExpanded ? "" : "justify-center"
              }`}
              key={`sidebar-menu-${index}`}
            >
              <Link
                className={`flex items-center gap-4 ${
                  router.asPath.includes(item.link) ||
                  router.pathname.includes(item.parent)
                    ? "text-white  hover:cursor-default"
                    : "text-grey_200"
                } `}
                href={item.link}
              >
                <span>{item.icon}</span>
                {isSidebarExpanded && (
                  <p className="text-heading_sm1_normal font-medium">
                    {item.label}
                  </p>
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {user && <UserAvatar isExpanded={isSidebarExpanded} />}

      {!user && (
        <div>
          <p className=" text-body_lg2_normal mb-2">Sign up or log in</p>
          <p className="text-[15px] text-grey_100 mb-6 w-full">
            Discover a new fan experience; smarter, personal and more fun 😁
            ⛷️🏀​￼​
          </p>
          <div className="flex flex-col gap-2">
            <Button
              className="w-full bg-orange rounded-sm p-5 font-semibold hover:bg-orange/80"
              onClick={showSIgnUp}
            >
              Sign Up
            </Button>
            <Button
              className="w-full bg-black_100 border border-grey_100 rounded-sm p-5 font-semibold hover:bg-black_100/80"
              onClick={showLogin}
            >
              Login
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
