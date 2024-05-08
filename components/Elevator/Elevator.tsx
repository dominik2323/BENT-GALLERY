"use client";

import React from "react";
import { Cabin, SElevator } from "./SElevator";
import { useScrollRig, useScrollbar } from "@14islands/r3f-scroll-rig";

interface ElevatorProps {
  children?: React.ReactNode;
}

const Elevator = ({ children }: ElevatorProps) => {
  return (
    <SElevator>
      <Cabin>{children}</Cabin>
    </SElevator>
  );
};

export default Elevator;
