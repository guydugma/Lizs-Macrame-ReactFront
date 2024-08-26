import React from "react";
import { useState } from "react";

export const ScrollContext = React.createContext({
  fixHeader: false,
  scrollPosition: 0,
});

export const ScrollContextProvider = ({ children }) => {
  const [prevScrollpos, setPrevScrollpos] = useState(0);
  const [fixHeader, setFixHeader] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  window.onscroll = function () {
    const currentScrollPos = window.scrollY;
    setScrollPosition(currentScrollPos);

    /* if scrolling down, let it scroll out of view as normal */
    if (prevScrollpos <= currentScrollPos && currentScrollPos != 0) {
      setFixHeader(false);
    } else {
      /* otherwise if we're scrolling up, fix the nav to the top */
      setFixHeader(true);
    }
    setPrevScrollpos(currentScrollPos);
  };

  return (
    <ScrollContext.Provider
      value={{
        fixHeader,
        scrollPosition,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
};
