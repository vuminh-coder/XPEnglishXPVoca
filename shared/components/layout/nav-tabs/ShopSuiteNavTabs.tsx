"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ShoppingBag, Crown, User } from "lucide-react";
import { HeaderPillContainer, HeaderPillItem } from "../AppTopHeader";

export interface ShopSuiteNavTabsProps {
  className?: string;
}

export function ShopSuiteNavTabs({ className }: ShopSuiteNavTabsProps) {
  const pathname = usePathname();

  const isShopActive = pathname === "/shop" || pathname?.startsWith("/shop/");
  const isPremiumActive = pathname === "/premium" || pathname?.startsWith("/premium/");
  const isProfileActive = pathname === "/profile" || pathname?.startsWith("/profile/");

  return (
    <HeaderPillContainer className={className}>
      <HeaderPillItem
        active={isShopActive}
        href="/shop"
        layoutId="shopSuiteNavActiveTab"
        icon={<ShoppingBag className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />}
        label="Cửa hàng"
      />
      <HeaderPillItem
        active={isPremiumActive}
        href="/premium"
        layoutId="shopSuiteNavActiveTab"
        icon={<Crown className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />}
        label="Nâng cấp Premium"
      />
      <HeaderPillItem
        active={isProfileActive}
        href="/profile"
        layoutId="shopSuiteNavActiveTab"
        icon={<User className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />}
        label="Hồ sơ"
      />
    </HeaderPillContainer>
  );
}

export default ShopSuiteNavTabs;
