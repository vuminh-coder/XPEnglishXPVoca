"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { User, Award, Settings } from "lucide-react";
import { HeaderPillContainer, HeaderPillItem } from "../AppTopHeader";

export interface ProfileSuiteNavTabsProps {
  className?: string;
}

export function ProfileSuiteNavTabs({ className }: ProfileSuiteNavTabsProps) {
  const pathname = usePathname();

  const isProfileActive = pathname === "/profile";
  const isAchievementsActive =
    pathname === "/profile/achievements" || pathname?.startsWith("/profile/achievements/");
  const isSettingsActive =
    pathname === "/settings" || pathname?.startsWith("/settings/");

  return (
    <HeaderPillContainer className={className}>
      <HeaderPillItem
        active={isProfileActive}
        href="/profile"
        layoutId="profileSuiteNavActiveTab"
        icon={<User className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />}
        label="Hồ sơ"
      />
      <HeaderPillItem
        active={isAchievementsActive}
        href="/profile/achievements"
        layoutId="profileSuiteNavActiveTab"
        icon={<Award className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />}
        label="Thành tích"
      />
      <HeaderPillItem
        active={isSettingsActive}
        href="/settings"
        layoutId="profileSuiteNavActiveTab"
        icon={<Settings className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />}
        label="Cài đặt"
      />
    </HeaderPillContainer>
  );
}

export default ProfileSuiteNavTabs;
