import { useEffect, useRef, useState } from "react";
import { Leaf } from "lucide-react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide on touch devices
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      return;
    }

    setIsVisible(true);

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    const onMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;

      // Small cursor dot follows instantly
      if (cursor) {
        gsap.to(cursor, {
          x,
          y,
          duration: 0.1,
          ease: "power2.out",
        });
      }

      // Outer follower ring follows smoothly with slight delay
      if (follower) {
        gsap.to(follower, {
          x,
          y,
          duration: 0.35,
          ease: "power3.out",
        });
      }
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "SELECT" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      {/* Small Inner Dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-primary shadow-sm transition-transform duration-150"
        style={{
          transform: "translate3d(-100px, -100px, 0)",
          scale: isHovered ? 1.8 : 1,
        }}
      />

      {/* Outer Agri Ring Follower with Sprout Accent */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 bg-primary/10 shadow-lg backdrop-blur-[2px] transition-all duration-200 ${
          isHovered
            ? "scale-150 border-primary bg-primary/20 text-primary"
            : "scale-100 text-primary/70"
        }`}
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      >
        <Leaf size={isHovered ? 14 : 10} className="transition-all duration-200" />
      </div>
    </div>
  );
}
