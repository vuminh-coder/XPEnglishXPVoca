"use client";

import React from "react";
import { IpaSound } from "../../data/ipaData";
import { IpaAnatomyViewer, AnatomyViewMode } from "../anatomy/IpaAnatomyViewer";

export interface IpaMouthAnatomySvgProps {
  sound: IpaSound;
  showCapsules?: boolean;
  className?: string;
  defaultView?: AnatomyViewMode;
}

/**
 * Backward-compatible wrapper component for IPA Mouth Anatomy Visualizer.
 * Re-routes to the high-fidelity multi-view IpaAnatomyViewer component.
 */
export const IpaMouthAnatomySvg: React.FC<IpaMouthAnatomySvgProps> = ({
  sound,
  showCapsules = false,
  className = "",
  defaultView = "sagittal",
}) => {
  return (
    <IpaAnatomyViewer
      sound={sound}
      showCapsules={showCapsules}
      className={className}
      defaultView={defaultView}
    />
  );
};
