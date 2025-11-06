import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: React.ReactNode;
  portalId: string;
}
function Portal({ children, portalId }: PortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  if (mounted) {
    const portalElem = document.querySelector(`#${portalId}`);
    return createPortal(children, portalElem!);
  } else {
    return null;
  }
}

export default Portal;
