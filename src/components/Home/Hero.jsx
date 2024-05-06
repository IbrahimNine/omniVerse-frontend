import { useEffect } from "react";
import "./Hero.css";

function Hero() {
  
  useEffect(() => {
    const container = document.querySelector(".Hero");
    container.style.padding = "0 30%";
    const delayEffect = setTimeout(() => {
      container.style.padding = "0";
    }, 10);
    return () => clearTimeout(delayEffect);
  }, []);

  return (
    <div className="HeroWrapper">
      <div className="Hero">
        <div className="gradient"></div>
        <h1>Discover, Collect, Expend</h1>
      </div>
    </div>
  );
}

export default Hero;
