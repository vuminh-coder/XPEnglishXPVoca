"use client";

import React, { useMemo, useState } from "react";
import { Sparkles, Trophy } from "lucide-react";
import { ZiczacPathStep, ZiczacStepState } from "../../types";
import { getCuratedUnitGroups } from "../../data/curatedRoadmapPathway";
import { ZiczacStepNode } from "./ZiczacStepNode";
import { ZiczacMilestoneCheckpoint } from "./ZiczacMilestoneCheckpoint";
import { ZiczacUnitHeader } from "./ZiczacUnitHeader";

interface ZiczacRoadmapPathwayProps {
  steps: ZiczacPathStep[];
  selectedStepId?: string;
  completedStepIds: Set<string>;
  onSelectStep: (step: ZiczacPathStep) => void;
  onToggleComplete?: (stepId: string) => void;
}

/**
 * Duolingo S-curve horizontal offset (%) for each step
 */
const getNodeHorizontalPercent = (stepNumber: number): number => {
  // Duolingo alternating path pattern (optimized for mobile viewport safety & elegant desktop curve)
  const pattern = [50, 67, 53, 33, 50, 33, 53, 67, 50, 50];
  const idx = (stepNumber - 1) % pattern.length;
  return pattern[idx];
};

/**
 * Determine which side of the node has shorter width to the boundary
 * (User rule: "xem bên width nào ngắn hơn thì xuất hiện bên đó (bên phải hoặc trái nút )")
 */
const getShorterWidthSide = (xPercent: number): "left" | "right" => {
  const distanceToLeft = xPercent;
  const distanceToRight = 100 - xPercent;
  return distanceToRight <= distanceToLeft ? "right" : "left";
};

export const ZiczacRoadmapPathway: React.FC<ZiczacRoadmapPathwayProps> = ({
  steps,
  selectedStepId,
  completedStepIds,
  onSelectStep,
  onToggleComplete,
}) => {
  const units = useMemo(() => getCuratedUnitGroups(), []);

  // Single-active popover state across the entire pathway
  const [activePopoverStepId, setActivePopoverStepId] = useState<string | null>(null);

  const handleTogglePopover = (step: ZiczacPathStep) => {
    onSelectStep(step);
    setActivePopoverStepId((prev) => (prev === step.id ? null : step.id));
  };

  const handleClosePopover = () => {
    setActivePopoverStepId(null);
  };

  // Determine step state
  const getStepState = (step: ZiczacPathStep, index: number): ZiczacStepState => {
    if (completedStepIds.has(step.id)) {
      return "COMPLETED";
    }
    const firstUnfinishedIndex = steps.findIndex((s) => !completedStepIds.has(s.id));
    if (firstUnfinishedIndex === index || (firstUnfinishedIndex === -1 && index === 0)) {
      return "CURRENT";
    }
    return "LOCKED";
  };

  return (
    <div className="w-full relative py-2 select-none">
      {/* Transparent Click-Outside Backdrop when any popover is open */}
      {activePopoverStepId && (
        <div
          className="fixed inset-0 z-30 bg-transparent cursor-default"
          onClick={handleClosePopover}
          aria-hidden="true"
        />
      )}

      <div className="space-y-10 sm:space-y-12">
        {units.map((unit) => {
          return (
            <div key={`unit-${unit.unitNumber}`} className="relative">
              {/* 1. DUOLINGO UNIT HEADER BANNER */}
              <ZiczacUnitHeader unit={unit} />

              {/* 2. DUOLINGO S-CURVE PATHWAY STEPS */}
              <div className="relative w-full max-w-sm sm:max-w-md mx-auto min-h-[460px] py-4">
                <div className="space-y-10 sm:space-y-12 relative z-10">
                  {unit.steps.map((step) => {
                    const stepIndex = steps.findIndex((s) => s.id === step.id);
                    const state = getStepState(step, stepIndex);
                    const isSelected = selectedStepId === step.id;
                    const isPopoverOpen = activePopoverStepId === step.id;

                    // 5th Step: Duolingo Checkpoint Trophy / Treasure Chest Milestone
                    if (step.isCheckpoint) {
                      return (
                        <div key={step.id} className="pt-2 pb-4 flex justify-center">
                          <ZiczacMilestoneCheckpoint
                            step={step}
                            state={state}
                            isSelected={isSelected}
                            isPopoverOpen={isPopoverOpen}
                            onTogglePopover={handleTogglePopover}
                            onClosePopover={handleClosePopover}
                            onSelect={onSelectStep}
                            onToggleComplete={onToggleComplete}
                            placement="top"
                          />
                        </div>
                      );
                    }

                    // Regular Steps: Alternating S-Curve offset
                    const xPercent = getNodeHorizontalPercent(step.stepNumber);
                    const side = getShorterWidthSide(xPercent);

                    // Step 1 of each unit is immediately below the Unit banner,
                    // so its popover displays downward (placement="bottom") to avoid top clipping / banner collision
                    const isFirstStepInUnit = unit.steps[0]?.id === step.id;
                    const placement = isFirstStepInUnit ? "bottom" : "top";

                    return (
                      <div
                        key={step.id}
                        className="relative w-full flex items-center min-h-[96px]"
                      >
                        <div
                          className="absolute transform -translate-x-1/2"
                          style={{ left: `${xPercent}%` }}
                        >
                          <ZiczacStepNode
                            step={step}
                            state={state}
                            isSelected={isSelected}
                            isPopoverOpen={isPopoverOpen}
                            onTogglePopover={handleTogglePopover}
                            onClosePopover={handleClosePopover}
                            onSelect={onSelectStep}
                            onToggleComplete={onToggleComplete}
                            placement={placement}
                            side={side}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Finishing Line Monument */}
      <div className="mt-14 mb-8 text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 text-xs font-bold font-display shadow-2xs">
          <Trophy className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
          <span>ĐÍCH ĐẾN: HOÀN THÀNH TOÀN DIỆN {steps.length} CHẶNG HỌC TẬP</span>
          <Sparkles className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
          Bạn sẽ sẵn sàng bước vào kỳ thi chuẩn hóa quốc tế hoặc giao tiếp công sở tự tin.
        </p>
      </div>
    </div>
  );
};
