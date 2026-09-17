"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { PlanKey, PlanConfig } from "../types";
import { PLANS } from "../constants";

export function useCheckoutPayment() {
  const searchParams = useSearchParams();
  const { user } = useAuthStore();
  const { addToast } = useNotificationStore();

  const initialPlanParam = searchParams.get("plan") as PlanKey;
  const [selectedKey, setSelectedKey] = useState<PlanKey>(
    initialPlanParam && PLANS[initialPlanParam] ? initialPlanParam : "yearly"
  );

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // 15:00 countdown timer
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const plan = PLANS[selectedKey];

  const transferContent = useMemo(() => {
    const userIdShort = user?.id ? user.id.slice(0, 8).toUpperCase() : "PROVIP";
    return `XP PRO ${userIdShort}`;
  }, [user]);

  const vietQrUrl = useMemo(() => {
    const bank = "MB";
    const acc = "0386766688";
    const name = encodeURIComponent("XP ENGLISH VIP");
    const desc = encodeURIComponent(transferContent);
    return `https://img.vietqr.io/image/${bank}-${acc}-compact2.png?amount=${plan.totalPriceNum}&addInfo=${desc}&accountName=${name}`;
  }, [plan.totalPriceNum, transferContent]);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    addToast({
      type: "success",
      title: "Đã sao chép!",
      message: `Đã sao chép ${fieldName} vào bộ nhớ tạm.`,
    });
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleConfirmTransfer = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsSuccess(true);
      addToast({
        type: "success",
        title: "Kích hoạt Premium thành công!",
        message: `Chào mừng bạn đến với hội viên VIP ${plan.name}.`,
      });
    }, 1800);
  };

  return {
    selectedKey,
    setSelectedKey,
    plan,
    timeLeft,
    formatTimer,
    transferContent,
    vietQrUrl,
    copiedField,
    handleCopy,
    isVerifying,
    isSuccess,
    handleConfirmTransfer,
  };
}
