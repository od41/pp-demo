import Link from "next/link";
import { useState } from "react";

const PageTabs = ({
  isBreadcrumb = true,
  slotRight = null,
  className = "",
  defaultActiveTab = null,
  underline = "bg-yellow-400",
  tabs = [
    {
      name: "Transactions",
      href: "#",
      icon: "",
      action: () => {},
    },
    {
      name: "Search",
      href: "#",
      icon: <i className="ri-lock-line"></i>,
      action: () => {},
    },
  ],
  breadCrumbs = [
    {
      name: "Transactions",
      href: "#",
      icon: "",
      action: () => {},
    },
    {
      name: "Search",
      href: "#",
      icon: <i className="ri-lock-line"></i>,
      action: () => {},
    },
  ],
}) => {
  const [selectedTab, setSelectedTab] = useState(
    defaultActiveTab ?? tabs[0]?.key ?? tabs[0]?.name
  );
  const [selectedBreadCrumb, setSelectedBreadCrumb] = useState(
    breadCrumbs[0]?.key ?? breadCrumbs[0]?.name
  );
  //   const selectTab = (tab) => {
  //     console.log("name", tab)
  //     setSelectedTab(tab);
  //   };

  if (isBreadcrumb) {
    return (
      <div className={`${className}`}>
        <div>
          <div className="border-b border-neutral-50 dark:border-gray-700 flex items-center flex-col md:flex-row">
            <ol
              className="flex items-center whitespace-nowrap"
              aria-label="Breadcrumb"
            >
              {breadCrumbs.map((breadcrumb, index, array) => {
                const { name, href, icon, action } = breadcrumb;
                const isNotLastItem = index < array.length - 1;
                return (
                  <li
                    className="inline-flex items-center py-5 px-1"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedBreadCrumb(name);
                      if (action) {
                        action(breadcrumb);
                      }
                    }}
                  >
                    <Link
                      className={`flex items-center text-body_sm2_normal ${
                        name === selectedBreadCrumb ? "" : ""
                      }  ${
                        !isNotLastItem ? "text-neutral-900" : "text-neutral-400"
                      }`}
                      href={href}
                    >
                      {name}
                    </Link>
                    {isNotLastItem && (
                      <i className="ri-arrow-right-s-line text-neutral-100 text-body_lg2_normal"></i>
                    )}
                  </li>
                );
              })}
            </ol>
            <div className="ml-auto w-full md:w-auto">{slotRight}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <div>
        <div className="md:border-b border-neutral-50 dark:border-gray-700">
          <nav className="flex space-x-2 flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 flex flex-col md:flex-row md:items-center md:gap-6">
              {tabs.map((tab, index) => {
                const { key, name, href, icon, action } = tab;
                const isActive = key
                  ? key === selectedTab
                  : name === selectedTab;
                return (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedTab(key ?? name);
                      action && action(tab);
                    }}
                    type="button"
                    className={`relative py-5 px-1 inline-flex items-center gap-x-2 text-body_sm2_normal whitespace-nowrap ${
                      isActive ? "text-neutral-900" : "text-neutral-400"
                    } focus:outline-none disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-blue-500`}
                    // className={`relative ${
                    //   (key ? key === selectedTab : name === selectedTab)
                    //     ? `font-semibold border-b ${underline}`
                    //     : ""
                    // }  py-4 px-1 inline-flex items-center gap-x-2  text-sm whitespace-nowrap text-gray-500 hover:font-semibold focus:outline-none disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-blue-500`}
                  >
                    {icon && <span>{icon}</span>}
                    {name}
                    {isActive && (
                      <span
                        className={` absolute bottom-[-1px] w-[30px] left-1/2 transform -translate-x-1/2  h-[2px] ${underline}`}
                      ></span>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="ml-auto">{slotRight}</div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default PageTabs;
