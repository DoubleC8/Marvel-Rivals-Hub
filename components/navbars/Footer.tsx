import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div
      className="w-full px-5 py-3 bg-[var(--black)] bottom-0 left-0
     text-[var(--secondary-text)] flex flex-col gap-3 text-lg z-50"
    >
      <div className="flex gap-3 justify-center">
        <Link
          href={"https://marvelrivalsapi.com/"}
          rel="noopener noreferrer"
          className="ease-in-out duration-100 hover:text-[var(--yellow)]"
          target="_blank"
        >
          Developer API
        </Link>
        <Link
          href={`mailto:christophercortes@ucsb.edu?subject=Marvel%20Rivals%20Hub%20Feedback`}
          rel="noopener noreferrer"
          className="ease-in-out duration-100 hover:text-[var(--yellow)]"
          target="_blank"
        >
          Contact Us
        </Link>
      </div>
      <p className="text-sm">
        Marvel Rivals is a registered trademark of NetEase Games. Trademarks are
        the property of their respective owners. Game materials copyright
        NetEase Games. NetEase Games has not endorsed and is not responsible for
        this site or its content.
      </p>
    </div>
  );
};

export default Footer;
