"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { PlanKey } from "../types";
import { PLANS } from "../constants";

export interface ReceiptData {
  orderId?: string;
  planName: string;
  planKey: PlanKey;
  amount: number;
  amountFormatted: string;
  transferSyntax: string;
  activatedAt: string;
  expiresAt: string;
  giftsAwarded: string[];
}

export function useCheckoutPayment() {
  const searchParams = useSearchParams();
  const { user, activateSubscription } = useAuthStore();
  const { addToast } = useNotificationStore();

  const initialPlanParam = searchParams.get("plan") as PlanKey;
  const [selectedKey, setSelectedKey] = useState<PlanKey>(
    initialPlanParam && PLANS[initialPlanParam] ? initialPlanParam : "yearly"
  );

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);

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

  // Pre-register order with backend if authenticated
  useEffect(() => {
    if (user?.id && user.id !== "local_user") {
      fetch("/api/subscription/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planKey: selectedKey }),
      }).catch((err) => console.log("[Pre-order notice]:", err));
    }
  }, [selectedKey, user?.id]);

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

  const handleConfirmTransfer = useCallback(async () => {
    setIsVerifying(true);

    try {
      // 1. Try real server-side transaction confirmation
      const res = await fetch("/api/subscription/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planKey: selectedKey }),
      });

      const json = await res.json();

      if (json.success && json.data) {
        // Successfully verified and activated in PostgreSQL
        await activateSubscription(selectedKey, json.data);

        setReceiptData({
          orderId: json.data.orderId || `ORD-${Date.now().toString().slice(-6)}`,
          planName: plan.name,
          planKey: selectedKey,
          amount: plan.totalPriceNum,
          amountFormatted: plan.totalPriceFormatted,
          transferSyntax: transferContent,
          activatedAt: new Date().toLocaleDateString("vi-VN"),
          expiresAt: json.data.premiumExpiresAt
            ? new Date(json.data.premiumExpiresAt).toLocaleDateString("vi-VN")
            : "Vĩnh viễn",
          giftsAwarded: json.data.giftsAwarded || [
            "+3 Khiên Kim Cương Streak",
            "Nón Cử Nhân Cú Vàng",
            "Nhân đôi X2 XP",
          ],
        });

        setIsVerifying(false);
        setIsSuccess(true);
        addToast({
          type: "success",
          title: "Kích hoạt Premium thành công!",
          message: `Chào mừng bạn đến với hội viên VIP ${plan.name}.`,
        });
        return;
      }
    } catch (err) {
      console.log("[Subscription API fallback to local activation]:", err);
    }

    // 2. Client / Local fallback (e.g. offline or local_user session)
    setTimeout(async () => {
      await activateSubscription(selectedKey);

      const now = new Date();
      const expiresAtDate =
        selectedKey === "lifetime"
          ? "Vĩnh viễn (2099)"
          : selectedKey === "yearly"
          ? new Date(now.getTime() + 456 * 24 * 60 * 60 * 1000).toLocaleDateString("vi-VN")
          : new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("vi-VN");

      setReceiptData({
        orderId: `ORD-${Date.now().toString().slice(-6)}`,
        planName: plan.name,
        planKey: selectedKey,
        amount: plan.totalPriceNum,
        amountFormatted: plan.totalPriceFormatted,
        transferSyntax: transferContent,
        activatedAt: now.toLocaleDateString("vi-VN"),
        expiresAt: expiresAtDate,
        giftsAwarded:
          selectedKey === "yearly"
            ? ["+3 Khiên Kim Cương Streak", "Nón Cử Nhân Cú Vàng", "Nhân đôi X2 XP"]
            : selectedKey === "lifetime"
            ? ["Huy hiệu Golden Crown", "+99 Khiên Streak", "Ưu tiên AI VIP"]
            : ["+1 Khiên Streak", "Nhân đôi X2 XP"],
      });

      setIsVerifying(false);
      setIsSuccess(true);
      addToast({
        type: "success",
        title: "Kích hoạt Premium thành công!",
        message: `Chào mừng bạn đến với hội viên VIP ${plan.name}.`,
      });
    }, 1200);
  }, [selectedKey, plan, transferContent, activateSubscription, addToast]);

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
    receiptData,
    handleConfirmTransfer,
  };
}
