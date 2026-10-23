"use client";

import React, { useMemo, useState } from "react";
import { Sparkles, Trophy } from "lucide-react";
import { ZiczacPathStep, ZiczacStepState, ZiczacStepProgress } from "../../types";
import { getCuratedUnitGroups } from "../../data/curatedRoadmapPathway";
import { ZiczacStepNode } from "./ZiczacStepNode";
import { ZiczacMilestoneCheckpoint } from "./ZiczacMilestoneCheckpoint";
import { ZiczacUnitHeader } from "./ZiczacUnitHeader";

interface ZiczacRoadmapPathwayProps {
  steps: ZiczacPathStep[];
  selectedStepId?: string;
  completedStepIds: Set<string>;
  stepSessions?: Record<string, number>;
  getStepProgress?: (stepId: string) => ZiczacStepProgress;
  onAdvanceSession?: (stepId: string) => void;
  onSelectStep: (step: ZiczacPathStep) => void;
  onToggleComplete?: (stepId: string) => void;
}

/**
 * Duolingo S-curve horizontal offset (%) for each step.
 * Uses a true 6-point alternating serpentine wave [60, 67, 58, 42, 33, 40]
 * guaranteeing that:
 * 1. No two consecutive nodes ever share the same horizontal coordinate (minimum 7% delta).
 * 2. Nodes never get stuck in a vertical straight line at 50%.
 * 3. Side titles alternate naturally between Left (<50%) and Right (>50%) on the shorter width side.
 * 4. Stays strictly within mobile safe boundaries [33%, 67%] to prevent title clipping.
 */
export const getNodeHorizontalPercent = (stepNumber: number): number => {
  const pattern = [60, 67, 58, 42, 33, 40];
  const idx = (stepNumber - 1) % pattern.length;
  return pattern[idx];
};

/**
 * Determine which side of the node has shorter width to the boundary
 * (User rule: "xem bên width nào ngắn hơn thì xuất hiện bên đó (bên phải hoặc trái nút )")
 */
export const getShorterWidthSide = (xPercent: number): "left" | "right" => {
  const distanceToLeft = xPercent;
  const distanceToRight = 100 - xPercent;
  return distanceToRight <= distanceToLeft ? "right" : "left";
};

export const ZiczacRoadmapPathway: React.FC<ZiczacRoadmapPathwayProps> = ({
  steps,
  selectedStepId,
  completedStepIds,
  stepSessions,
  getStepProgress,
  onAdvanceSession,
  onSelectStep,
  onToggleComplete,
}) => {
  const units = useMemo(() => getCuratedUnitGroups(), []);
  const [hoveredStepId, setHoveredStepId] = useState<string | null>(null);

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
      <div className="space-y-10 sm:space-y-12">
        {units.map((unit) => {
          return (
            <div key={`unit-${unit.unitNumber}`} className="relative">
              {/* 1. DUOLINGO UNIT HEADER BANNER */}
              <ZiczacUnitHeader unit={unit} />

              {/* 2. DUOLINGO S-CURVE PATHWAY STEPS */}
              <div className="relative w-full max-w-sm sm:max-w-md mx-auto min-h-[460px] pt-36 sm:pt-40 pb-6">
                <div className="space-y-10 sm:space-y-12 relative z-10">
                  {unit.steps.map((step) => {
                    const stepIndex = steps.findIndex((s) => s.id === step.id);
                    const state = getStepState(step, stepIndex);
                    const isSelected = selectedStepId === step.id;
                    const isHovered = hoveredStepId === step.id;
                    const stepProg = getStepProgress ? getStepProgress(step.id) : undefined;

                    // Milestone Checkpoint Trophy: Centered with identical vertical rhythm & button size
                    if (step.isCheckpoint) {
                      return (
                        <div
                          key={step.id}
                          className={`relative w-full flex items-center justify-center min-h-[96px] ${
                            isHovered ? "z-50" : "z-10"
                          }`}
                        >
                          <ZiczacMilestoneCheckpoint
                            step={step}
                            state={state}
                            isSelected={isSelected}
                            isHovered={isHovered}
                            onHoverChange={(hovered) => setHoveredStepId(hovered ? step.id : null)}
                            stepProgress={stepProg}
                            onAdvanceSession={onAdvanceSession}
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

                    return (
                      <div
                        key={step.id}
                        className={`relative w-full flex items-center min-h-[96px] ${
                          isHovered ? "z-50" : "z-10"
                        }`}
                      >
                        <div
                          className={`absolute transform -translate-x-1/2 ${
                            isHovered ? "z-50" : "z-10"
                          }`}
                          style={{ left: `${xPercent}%` }}
                        >
                          <ZiczacStepNode
                            step={step}
                            state={state}
                            isSelected={isSelected}
                            isHovered={isHovered}
                            onHoverChange={(hovered) => setHoveredStepId(hovered ? step.id : null)}
                            stepProgress={stepProg}
                            onAdvanceSession={onAdvanceSession}
                            onSelect={onSelectStep}
                            onToggleComplete={onToggleComplete}
                            placement="top"
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
