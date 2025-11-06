import React, { useEffect, useState } from "react";
import Seo from "@/shared/seo/seo";
import RichTextEditor from "@/components/rich-text-editor";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { storeItemInLocalStorage, getItemFromLocalStorage } from "@/utils";
import content from "@/data/home.content";
import Button from "@/components/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Minus, Plus } from "lucide-react";
import Modal from "@/components/modals/auth-modal";
import SignUp from "@/components/forms/sign-up";
import { LoginForm } from "@/components/forms/login";
import { LoopingSentences } from "@/components/looping-sentences";
import { FadeIn } from "@/components/fade-in";
import { GlitterIcon } from "@/components/icons/glitter-icon";
import { UserAvatar } from "@/components/user-avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PaulPlaysLogo } from "@/components/icons/paul-logo";
import { sidebarMenuItems } from "@/shared/sidebar/sidebar";
import Portal from "@/components/portal";

const images = [
  "/images/pngs/home_icons/ucla-football-fan.png",
  "/images/pngs/home_icons/gamer.png",
  "/images/pngs/home_icons/woman-gamer.png",
  "/images/pngs/home_icons/squirrel-football-fan.png",
  "/images/pngs/home_icons/black-gamer.png",
];

const emojiImages = [
  "/images/pngs/home_icons/hero-left-emoji-1.png",
  "/images/pngs/home_icons/hero-left-emoji-2.png",
  "/images/pngs/home_icons/hero-left-emoji-3.png",
  "/images/pngs/home_icons/hero-right-emoji-1.png",
  "/images/pngs/home_icons/hero-right-emoji-2.png",
  "/images/pngs/home_icons/hero-right-emoji-3.png",
];

const Home = () => {
  const router = useRouter();
  const { user, setShowAuthModal, setShowSignUpOrLogin } = useAuth();
  const [displayedImages, setDisplayedImages] = useState(images);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [userInput, setUserInput] = useState<string>();

  const handleGoToChats = (e: any) => {
    e.preventDefault();
    if (!user) {
      // show create account modal
      setShowSignUpOrLogin("signup");
      setShowAuthModal(true);
    } else {
      // take them to the new chat view
      router.push("/chat/new");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedImages((prevImages) => {
        const shuffledImages = [...prevImages].sort(() => Math.random() - 0.5);
        return shuffledImages;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // redirect to home page if user is signed in
    if (user) {
      router.replace("/chat/new");
      return;
    }
  }, [user]);

  const handleUserInput = (value: string) => {
    setUserInput(value);
  };

  const handleSubmit = () => {
    setShowSignUpOrLogin("signup");
    setShowAuthModal(true);
  };

  const toggleShowAllFaqs = () => {
    setShowAllFaqs(!showAllFaqs);
  };
  return (
    <>
      <div className="h-full w-full flex flex-col relative">
        <Seo title="Home" />
        <FadeIn direction="down" className="z-[200]" once>
          <Navbar />
        </FadeIn>

        {/* hero section */}
        <FadeIn direction="down" initialDelay={0.3} once>
          <section className="w-full h-auto lg:relative lg:min-h-screen lg:overflow-x-hidden lg:overflow-y-visible">
            {/* Floating Emojis */}
            <div className="hidden lg:block absolute w-full h-full -z-[0] top-0 left-0 overflow-x-hidden overflow-y-visible">
              <div className="hidden lg:block absolute w-full h-full -z-[0] top-0 left-0 overflow-x-hidden overflow-y-visible">
                <div className="relative h-full w-full">
                  <div className="absolute top-[10%] -left-12 animate-float1">
                    <div className="w-60 h-60 relative">
                      <Image
                        src={emojiImages[0]}
                        fill={true}
                        className="object-contain"
                        alt="Fans & sports emoji"
                      />
                    </div>
                  </div>
                  <div className="absolute top-[40%] -left-12 animate-float2">
                    <div className="top-0 left-0 w-60 h-60 relative">
                      <Image
                        src={emojiImages[1]}
                        fill={true}
                        className="object-contain"
                        alt="Fans & sports emoji"
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-[10%] -left-22 animate-float3">
                    <div className="top-0 left-0 w-72 h-72 relative">
                      <Image
                        src={emojiImages[2]}
                        fill={true}
                        className="object-contain"
                        alt="Fans & sports emoji"
                      />
                    </div>
                  </div>

                  {/* right side */}
                  <div className="absolute top-[10%] -right-12 animate-float3">
                    <div className="w-68 h-68 relative">
                      <Image
                        src={emojiImages[3]}
                        fill={true}
                        className="object-contain"
                        alt="Fans & sports emoji"
                      />
                    </div>
                  </div>
                  <div className="absolute top-[32%] -right-12 animate-float1">
                    <div className="w-64 h-64 relative">
                      <Image
                        src={emojiImages[4]}
                        fill={true}
                        className="object-contain"
                        alt="Fans & sports emoji"
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-[10%] -right-12 animate-float2">
                    <div className="w-60 h-60 relative">
                      <Image
                        src={emojiImages[5]}
                        fill={true}
                        className="object-contain"
                        alt="Fans & sports emoji"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* hero section text */}
            <div className="container mx-auto flex flex-col lg:w-[960px] items-center justify-center min-h-screen lg:min-h-0 lg:mt-20 md:mt-16 xxl:mt-44 relative px-4 lg:px-0">
              <div className="flex flex-col items-center justify-center w-full max-w-3xl lg:block mt-[-25vh] lg:mt-0">
                <div className="mb-6 lg:mb-6  justify-center">
                  <p className="text-center mx-auto text-[18px] md:text-[24px] md:leading-[28px] mb-2 lg:mb-10 max-w-2xl">
                    {content.hero.description}
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center h-[88px] md:h-[140px] lg:h-[200px] mb-6 lg:mb-0">
                  <h1 className="text-center font-bold leading-tight text-[26px] md:text-4xl lg:text-6xl text-white mb-1 md:mb-2">
                    {content.hero.heading}
                  </h1>

                  <p className="text-gradient bg-orange-gradient font-bold leading-tight text-[26px] md:text-4xl lg:text-6xl text-center">
                    <LoopingSentences
                      sentences={content.hero.cta_hook}
                      delay={4}
                    />
                  </p>
                </div>

                <Button
                  className="flex justify-center items-center mt-4 lg:mt-10 xl:mb-12 rounded-full bg-orange-gradient p-5 px-8 w-fit font-semibold hover:bg-orange/80 mx-auto"
                  onClick={handleGoToChats}
                  variant="primary"
                >
                  <GlitterIcon />
                  Chat with Paul
                </Button>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* chat input section and text */}
        <section className="w-full px-4 md:px-8 fixed bottom-3 left-0 right-0 z-[100]">
          <FadeIn initialDelay={0.6} once>
            <div className="max-w-[650px] mx-auto">
              <RichTextEditor
                containClassName="!mt-5"
                isHome
                onChange={handleUserInput}
                onSubmit={handleSubmit}
              />
              <div className="text-center py-2 text-[12px] text-grey_200">
                By messaging PaulPlays, you agree to our
                <a href="/terms" className="underline hover:text-dark_orange">
                  {" "}
                  Terms{" "}
                </a>{" "}
                and have read our
                <a href="/privacy" className="underline hover:text-dark_orange">
                  {" "}
                  Privacy Policy
                </a>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* How it works */}
        <section className="container lg:w-[903px] lg:px-0">
          <h2 className="text-2xl md:text-5xl text-center font-bold w-full mt-12 md:mt-24 mb-6 md:mb-12">
            How it works
          </h2>
          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            {content.features.map((feature, index) => (
              <FadeIn
                key={`${index}-index`}
                initialDelay={(index + 1) * 0.2}
                once
              >
                <div className="w-full h-full bg-black_200 p-7 pb-0 rounded-lg">
                  <div className="text-xl md:text-3xl font-bold mb-2">
                    {feature.heading}
                  </div>
                  <div className="text-md md:text-lg mb-2">
                    {feature.description}
                  </div>
                  <div className="w-full h-[200px] relative">
                    <Image
                      src={feature.photo}
                      fill={true}
                      className="object-contain"
                      alt="PaulPlays logo"
                    />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Frequently Asked questions */}
        <section className="container lg:w-[903px] lg:px-0 items-center">
          <h2 className="text-2xl md:text-5xl text-center font-bold w-full mt-12 md:mt-24 mb-6 md:mb-12">
            {content.faqs.title}
          </h2>
          <div className="flex flex-col justify-start w-full gap-4">
            {content.faqs.items.map((item, index) => {
              if (!showAllFaqs && index >= 5) return; // show MAX of 5 FAQs at a time
              return (
                <FadeIn
                  key={`${index}-faq-index`}
                  initialDelay={(index + 1) * 0.07}
                  once
                >
                  <Accordion type="single" collapsible>
                    <AccordionItem value={`${index}-item`}>
                      <AccordionTrigger className="text-lg md:text-2xl font-bold [&[data-state=open]]:pb-3">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-lg pb-0">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </FadeIn>
              );
            })}
          </div>
          <div className="flex w-full justify-center mt-8">
            {/* <FadeIn initialDelay={0.5} once> */}
            <Button
              onClick={toggleShowAllFaqs}
              className="rounded-full text-sm border self-center px-5 font-bold uppercase text-grey_100 border-grey_100 hover:bg-orange hover:text-white"
            >
              {showAllFaqs ? (
                <>
                  Show Less <Minus className="h-4 w-4 ml-2" />
                </>
              ) : (
                <>
                  Show More <Plus className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
            {/* </FadeIn> */}
          </div>
        </section>

        {/* Footer */}
        <footer className="container lg:w-[903px] lg:px-0 mb-24 pb-[80px] md:pb-0">
          <FadeIn initialDelay={0.2} once>
            <div className="text-base md:text-3xl text-center text-grey_200 w-full my-10 md:my-20">
              {content.footer.description}
            </div>

            <h3 className="text-xl md:text-[2.5rem] leading-[1.2] text-center font-bold w-full mb-8">
              {content.footer.heading}
            </h3>
            <div className="w-1/2 items-center mx-auto md:w-full h-15 md:h-30 relative">
              <Image
                src={content.footer.avatar}
                alt={`Sports fans avatars on PaulPlays photo`}
                layout="fill"
                objectFit="contain"
                className=""
              />
            </div>
            <h4 className="text-xl md:text-3xl text-center font-bold w-full mt-8 md:mt-20 mb-4 md:mb-8">
              {content.footer.cta}
            </h4>
          </FadeIn>

          <div className="grid grid-cols-2 lg:flex justify-between gap-3 md:gap-5">
            {content.footer.socialPosts.map((socialPostLink, index) => (
              <FadeIn
                key={`${index}-social-media-pp`}
                initialDelay={(index + 1) * 0.1}
                direction="left"
                className="w-full h-40 md:h-74 relative"
                once
              >
                <div className="w-full h-40 md:h-74 relative">
                  <Image
                    src={socialPostLink}
                    alt={`socialPostLink ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn initialDelay={0.2} once>
            <div className="flex justify-center gap-5 mt-7">
              {content.footer.socials.map((social, index) => (
                <Link
                  href={social.link}
                  target="_blank"
                  key={`${social.link}`}
                  className="bg-grey_100 hover:bg-grey_200 p-2 rounded-full w-10 h-10 flex items-center justify-center"
                >
                  <Image
                    src={social.icon}
                    alt={`social-media-${social.label}-${index + 1}`}
                    className="rounded-lg"
                    width={30}
                    height={30}
                  />
                </Link>
              ))}
            </div>

            <div className="flex justify-center gap-6 w-full mt-6 mb-20 lg:mb-44">
              {content.footer.hashtags.map((tag, index) => (
                <div key={`${tag}-tag`} className="text-2xl">
                  {tag}
                </div>
              ))}
            </div>
          </FadeIn>
        </footer>
      </div>
    </>
  );
};

Home.layout = "GuestLayout";

export default Home;

export const Navbar = () => {
  const router = useRouter();
  const [displayWithinSidebar, setDisplayWithinSidebar] = useState(false);

  const showSignUp = (e: any) => {
    e.preventDefault();
    setShowSignUpOrLogin("signup");
    setDisplayWithinSidebar(true);
  };

  const showLogin = (e: any) => {
    e.preventDefault();
    setShowSignUpOrLogin("login");
    setDisplayWithinSidebar(true);
  };

  const {
    showAuthModal,
    toggleAuthModal,
    setShowAuthModal,
    showSignUpOrLogin,
    setShowSignUpOrLogin,
    displaySignUpOrLogin,
    user,
  } = useAuth();

  const { firstName, email } = user || {};

  const handleGoToChats = (e: any) => {
    e.preventDefault();
    if (!user) {
      // show create account modal
      setShowSignUpOrLogin("signup");
      setShowAuthModal(true);
    } else {
      // take them to the new chat view
      router.push("/chat/new");
    }
  };

  const renderName = firstName
    ? firstName
    : email
    ? email.split("@")[0]
    : "User";

  return (
    <nav className="py-6 w-full mx-auto px-4 md:px-8 z-[200]">
      {showAuthModal && (
        <Portal portalId={"dialog-portal"}>
          <div>
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
          </div>
        </Portal>
      )}
      <div className="flex justify-between md:grid md:grid-cols-3 w-full items-center">
        {/* Hamburger menu */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="w-fit hover:bg-grey_200/25 rounded-full p-2">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="max-w-xs min-w-[300px] w-[20%] p-0 rounded-r-[1.9rem]"
          >
            {/* Auth Modal */}
            {displayWithinSidebar && (
              <Modal
                id="hs-vertically-centered-modal"
                title="Modal title"
                toggleModal={() => {
                  setDisplayWithinSidebar(!displayWithinSidebar);
                }}
              >
                {showSignUpOrLogin === "login" ? (
                  <LoginForm toggleForm={displaySignUpOrLogin} />
                ) : (
                  <SignUp toggleForm={displaySignUpOrLogin} />
                )}
              </Modal>
            )}
            <div className="size-full py-[37px] lg:py-12 pb-8 px-[29px] h-full max-h-[100vh]">
              <div className="flex flex-col justify-between h-full ">
                <div className="">
                  <div className="mb-8 md:mb-14 mt-5 md:mt-8">
                    <PaulPlaysLogo isBeta />
                  </div>
                  <div className="flex flex-col h-full">
                    <div className=" flex flex-col gap-3 md:gap-6">
                      {sidebarMenuItems.map((item, index) => (
                        <Link
                          className={`flex items-center gap-4 hover:text-white/80 ${
                            router.asPath.includes(item.link) ||
                            router.pathname.includes(item.parent)
                              ? "text-white"
                              : "text-grey_200"
                          } `}
                          href={item.link}
                        >
                          <span className="w-6 md:w-7">{item.icon}</span>
                          <p className="text-xl md:text-xl font-inter">
                            {item.label}
                          </p>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-4 md:mt-6">
                      <hr className="my-4 md:my-6 opacity-20" />
                      <a
                        href="https://g5bjzme4990.typeform.com/to/Dx32Rfvg"
                        className="block text-xl md:text-xl md:text-heading_sm1_normal text-grey_200 hover:text-white/80 font-medium mb-4 md:mb-6"
                      >
                        Partner with us
                      </a>
                    </div>
                  </div>
                </div>
                {/* {user && toggle && <UserAvatar />} */}
                {!user && (
                  <div className="">
                    <p className="text-body_lg2_normal text-white font-inter mb-2">
                      Sign up or log in
                    </p>
                    <p className="text-[14px] text-grey_200 mb-6 w-full">
                      Discover a new fan experience; smarter, personal and more
                      fun 😁 ⛷️🏀​￼​
                    </p>
                    {/* <div className="flex flex-col gap-2">
                      <Button
                        className="w-full bg-orange  text-white rounded-sm p-3 font-semibold hover:bg-orange/80"
                        onClick={showSignUp}
                      >
                        Sign Up
                      </Button>
                      <Button
                        className="w-full bg-black_100 border text-white border-grey_100 rounded-sm p-3 font-semibold hover:bg-black_100/80"
                        onClick={showLogin}
                      >
                        Login
                      </Button>
                    </div> */}
                    <div className="flex flex-col gap-2">
                      <Button
                        className="w-full bg-orange  text-white rounded-sm p-3 font-semibold hover:bg-orange/80"
                        onClick={showSignUp}
                      >
                        Sign Up
                      </Button>
                      <Button
                        className="w-full bg-black_100 border text-white border-grey_100 rounded-sm p-3 font-semibold hover:bg-black_100/80"
                        onClick={showLogin}
                      >
                        Login
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href={"/"} className="hover:opacity-80 mx-auto justify-center ">
          <PaulPlaysLogo isBeta />
        </Link>

        {/* Buttons */}
        <div className="flex space-x-4 lg:space-x-8 items-center justify-end text-grey_100">
          {!user && <LoginForm standalone />}
          {/* <Link
            href="/chat/new"
            className="rounded-full py-2 text-[0.88rem] border hidden md:flex px-3 lg:px-5 font-semibold border-grey_100 hover:bg-orange hover:text-white"
          >
            Chat with Paul
          </Link> */}
          <Button
            className="rounded-full py-2 text-[0.88rem] border hidden md:flex px-3 lg:px-5 font-semibold border-grey_100 hover:bg-orange hover:text-white"
            onClick={handleGoToChats}
            variant="primary"
          >
            Chat with Paul
          </Button>
        </div>
      </div>
    </nav>
  );
};
