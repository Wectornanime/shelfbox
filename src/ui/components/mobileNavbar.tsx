import { Link } from "@heroui/react";

import { HomeIcon } from "@/ui/icons";
import { siteConfig } from "@/app/config/site";

export default function MobileNavbar() {
  return (
    <nav className="flex gap-3 bg-gray-600 py-2 px-3 rounded-xl justify-center w-[75%] fixed bottom-4 right-1/2 translate-x-1/2">
      {siteConfig.navMenuItems.map((item) => (
        <Link key={item.label} href={item.href}>
          <HomeIcon />
        </Link>
      ))}
    </nav>
  );
}
