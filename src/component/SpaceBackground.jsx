import React, { useEffect } from "react";
import anime from "animejs";

function SpaceBackground() {
  useEffect(() => {
    const starAnimation = anime({
      targets: ".star",
      translateX: () =>
        anime.random(-window.innerWidth / 2, window.innerWidth / 2),
      translateY: () =>
        anime.random(-window.innerHeight / 2, window.innerHeight / 2),
      scale: () => anime.random(0.2, 1),
      opacity: () => anime.random(0.2, 1),
      easing: "linear",
      duration: 5000,
      loop: true,
      delay: anime.stagger(50),
    });

    return () => {
      starAnimation.pause();
    };
  }, []);

  const spaceBackgroundStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    backgroundColor: "#001F3F",
    overflow: "hidden",
  };

  const stars = Array.from({ length: 200 }, (_, index) => (
    <div
      key={index}
      className="star"
      style={{
        position: "absolute",
        backgroundColor: "white",
        width: "2px",
        height: "2px",
        borderRadius: "50%",
        left: `${Math.random() * window.innerWidth}px`,
        top: `${Math.random() * window.innerHeight}px`,
      }}
    ></div>
  ));

  return (
    <div className="space-background" style={spaceBackgroundStyle}>
      {stars}
    </div>
  );
}

export default SpaceBackground;
