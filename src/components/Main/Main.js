import React from "react";
import Services from "../Services/Services";
import HomeBanner from "../HomeBanner/HomeBanner";
import MenuSection from "../MenuSection/MenuSection";
import AboutSection from "../AboutSection/AboutSection";

const Main = () => {
   return (
      <>
         <HomeBanner />
         <Services />
         <MenuSection />
         <AboutSection />
      </>
   );
};

export default Main;
