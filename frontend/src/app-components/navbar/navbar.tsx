import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import Link from "next/link";
import React, { FC } from "react";
import { usePathname } from "next/navigation";
import { House, Book, User } from "lucide-react";
import { Button } from "@/components/ui/button";
interface IProps {}

/**
 * @author
 * @function @Navbar
 **/

export const Navbar: FC<IProps> = (props) => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  return (
    <div className="flex justify-between items-center h-16 w-full px-10 border-b border-gray-200 bg-white fixed top-0 left-0 z-10">
      <div className="text-xl font-bold">DesignSage</div>
      <NavigationMenu className="flex justify-center items-center h-16 w-full">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                data-active={isActive("/")}
              >
                <div className="flex items-center gap-2">
                  <House height={10} width={10} />
                  Home
                </div>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/questions" legacyBehavior passHref>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                data-active={isActive("/questions")}
              >
                <div className="flex items-center gap-2">
                  <Book height={10} width={10} />
                  Questions
                </div>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/profile" legacyBehavior passHref>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                data-active={isActive("/profile")}
              >
                <div className="flex items-center gap-2">
                  <User height={10} width={10} />
                  Profile
                </div>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Button>Start Practicing</Button>
    </div>
  );
};

export default Navbar;
