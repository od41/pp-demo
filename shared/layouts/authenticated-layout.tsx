// add content to be used by pages in this layout

import { useState, useEffect } from "react";
import SharedLayout from "@/shared/layouts/shared-layout";
import Sidebar, { sidebarMenuItems } from "../sidebar/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import Modal from "@/components/modals/auth-modal";
import { LoginForm } from "@/components/forms/login";
import SignUp from "@/components/forms/sign-up";
import Link from "next/link";
import Portal from "@/components/portal";
import Button from "@/components/button";
import { UserAvatar } from "@/components/user-avatar";
import { useChat } from "@/hooks/useChat";
import { PaulPlaysLogo } from "@/components/icons/paul-logo";

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const {
    showAuthModal,
    toggleAuthModal,
    showSignUpOrLogin,
    setShowSignUpOrLogin,
    displaySignUpOrLogin,
    toggle,
    handleToggle,
    user,
  } = useAuth();
  const [refreshedAuth, setRefreshedAuth] = useState(true);

  const { firstName, email } = user || {};
  const { isSidebarExpanded, setIsSidebarExpanded } = useChat();

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

  const renderName = firstName
    ? firstName
    : email
    ? email.split("@")[0]
    : "User";

  function handleStartChat(event: any): void {
    event.preventDefault();
    router.replace("/chat/new");
  }

  return refreshedAuth ? (
    <SharedLayout>
      {showAuthModal && (
        <Modal
          id="hs-vertically-centered-modal"
          title="Modal title"
          toggleModal={toggleAuthModal}
        >
          {showSignUpOrLogin === "login" ? (
            <LoginForm toggleForm={displaySignUpOrLogin} />
          ) : (
            <SignUp toggleForm={displaySignUpOrLogin} />
          )}
        </Modal>
      )}
      <div
        className={`bg-black_300 md:grid ${
          isSidebarExpanded ? "grid-cols-[300px_1fr]" : "grid-cols-[75px_1fr]"
        } w-full h-[100dvh] md:[100vh] overflow-x-hidden text-white`}
      >
        <div className="relative">
          <aside
            className={`absolute top-0 left-0 z-10 ${
              isSidebarExpanded ? "w-[300px] " : "w-[75px]"
            }`}
          >
            <Sidebar />
          </aside>
        </div>

        <Portal portalId={"dialog-portal"}>
          <nav className="md:hidden container z-40 bg-black_300 text-white flex justify-between h-[87px] border-b border-black_100 items-center fixed w-full top-0">
            <button onClick={handleToggle}>
              <img
                src="/images/pngs/hamburger.png"
                alt=""
                className="w-[24px]"
              />
            </button>
            <div
              onClick={handleToggle}
              className={`bg-opacity-70 h-screen absolute w-full inset-0 bg-black transition-all ${
                toggle ? "block" : "hidden"
              } `}
            ></div>

            <div
              className={`nav_drawer_default  ${
                toggle ? "horizontal_overlay " : "no_overlay"
              } `}
            >
              <div className="size-full py-[37px] px-[29px] flex flex-col">
                <div className="mb-[51px]">
                  {toggle && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggle(e);
                      }}
                    >
                      <span>
                        <i className="ri-close-large-fill text-[24px]"></i>
                      </span>
                    </button>
                  )}
                </div>

                {toggle && (
                  <div className="flex items-center gap-2 mb-20">
                    {/* <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="39"
                        height="39"
                        viewBox="0 0 39 39"
                        fill="none"
                      >
                        <path
                          d="M19.2762 0L35.9699 9.63809V28.9143L19.2762 38.5524L2.58252 28.9143V9.63809L19.2762 0Z"
                          fill="#FF3D10"
                        />
                        <path
                          d="M19.2763 20.561L2.57031 28.9141L19.2763 38.5521L35.9824 28.9141L19.2763 20.561Z"
                          fill="#AD2202"
                        />
                        <path
                          d="M19.2754 20.5333V0L36.0373 9.63809V28.9143L19.2754 20.5333Z"
                          fill="#B83A1D"
                        />
                      </svg>
                    </div>
                    <p className=" text-[1.7rem] leading-[24px] font-display">
                      PaulPlays
                    </p> */}
                    <PaulPlaysLogo isBeta />
                  </div>
                )}
                {toggle && (
                  <div className=" flex flex-col gap-8 flex-1">
                    {sidebarMenuItems.map((item, index) => (
                      <Link
                        key={item.link}
                        className={`flex items-center gap-4 hover:text-white/80 ${
                          router.asPath.includes(item.link) ||
                          router.pathname.includes(item.parent)
                            ? "text-white hover:cursor-default"
                            : "text-grey_200"
                        } `}
                        href={item.link}
                      >
                        <span>{item.icon}</span>
                        <p className=" text-heading_sm1_normal font-inter">
                          {item.label}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}
                {user && toggle && <UserAvatar />}

                {!user && toggle && (
                  <div>
                    <p className=" text-body_lg2_normal font-inter mb-2">
                      Sign up or log in
                    </p>
                    <p className="text-[15px] text-grey_100 mb-6 w-full">
                      Discover a new fan experience; smarter, personal and more
                      fun 😁 ⛷️🏀​￼​
                    </p>
                    <div className="flex flex-col gap-2">
                      <Button
                        className="w-full bg-orange font-semibold rounded-sm p-5"
                        onClick={showSIgnUp}
                      >
                        Sign Up
                      </Button>
                      <Button
                        className="w-full bg-black_100 font-semibold border border-grey_100 rounded-sm p-5"
                        onClick={showLogin}
                      >
                        Login
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center ">
              {/* <img
                src="/images/pngs/paul_logo.png"
                alt=""
                className="w-[34px]"
              /> */}
              <Link
                href={"/chat/new"}
                className=" text-[1.6rem] leading-[1.7rem] font-display"
              >
                <PaulPlaysLogo isBeta />
              </Link>
            </div>

            {!user ? (
              <Button
                className=" bg-orange font-semibold text-white rounded-sm"
                onClick={toggleAuthModal}
              >
                Sign Up
              </Button>
            ) : (
              <button onClick={handleStartChat}>
                {" "}
                <img src="/images/pngs/edit.png" alt="" className="w-[28px]" />
              </button>
            )}
          </nav>
        </Portal>

        <main className={`w-full h-full`}>
          <>{children}</>
        </main>
      </div>
    </SharedLayout>
  ) : null;
};

export default AuthenticatedLayout;
