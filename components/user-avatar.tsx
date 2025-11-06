import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

type UserAvatarProps = {
  isExpanded?: boolean;
};
export function UserAvatar({ isExpanded = true }: UserAvatarProps) {
  const menutItems = [
    {
      name: "Terms of Service",
      link: "/terms",
      icon: "",
    },
  ];

  const { user, logout } = useAuth();
  const { firstName, email } = user || {};

  const renderName = firstName
    ? firstName
    : email
    ? email.split("@")[0]
    : "User";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`relative h-11 px-0 py-2 rounded-full  hover:text-white/80 w-full ${
            isExpanded
              ? "justify-between pr-3 hover:bg-black_100/20"
              : "justify-center"
          }`}
        >
          {isExpanded ? (
            <>
              <span className="flex items-center">
                <Avatar className="h-11 w-11 hover:border hover:border-white">
                  {/* <AvatarImage src="" alt="@shadcn" /> */}
                  <AvatarFallback className="text-body_lg2_normal">
                    {renderName[0]}
                  </AvatarFallback>
                </Avatar>

                <span className="ml-3 text-body_lg2_normal capitalize">
                  {renderName}
                </span>
              </span>
              <span>
                <i className="ri-more-fill text-body_lg1_bold"></i>
              </span>{" "}
            </>
          ) : (
            <>
              <Avatar className="h-11 w-11 hover:border hover:border-white">
                {/* <AvatarImage src="" alt="@shadcn" /> */}
                <AvatarFallback className="text-body_lg2_normal">
                  {renderName[0]}
                </AvatarFallback>
              </Avatar>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mb-2" align="start" forceMount>
        <DropdownMenuGroup>
          {menutItems.map((item, index) => (
            <DropdownMenuItem key={item.link}>
              <Link href={item.link}>
                {item.name}
                {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="" />
        <DropdownMenuItem
          onClick={() => logout("/")}
          className="hover:cursor-pointer"
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
