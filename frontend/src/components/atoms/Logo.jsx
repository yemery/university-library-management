import React from "react";

const Logo = () => {
  return (
    <>
      <div className="hidden md:block">
        <img
          src="/logo.svg"
          style={{
            filter:
              "invert(100%) sepia(0%) saturate(7500%) hue-rotate(302deg) brightness(116%) contrast(100%)",
          }}
          className="w-28 h-28 fill-white	"
        />
      </div>

      <div className="block md:hidden">
        <img src="/logo.svg" style={{}} className="w-28 h-28 fill-white	" />
      </div>
    </>
  );
};

export default Logo;
