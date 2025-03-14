"use client";

import { useState } from "react";

export function useHamburger() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClose = () => {
    setIsMenuOpen(false);
  };

  return {
    isMenuOpen,
    handleOpen,
    handleClose,
  };
}
