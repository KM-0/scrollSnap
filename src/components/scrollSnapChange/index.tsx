import { useEffect, useRef } from "react";
import "./style.css";

export const Index = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleScrollSnapChange = (e: any) => {
      scroller?.querySelector(":scope .snapped")?.classList.remove("snapped");
      scroller
        ?.querySelector(":scope .snapeTarget")
        ?.classList.remove("snapeTarget");
      e.snapTargetInline.classList.add("snapped");
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleScrollSnapChanging = (e: any) => {
      scroller?.querySelector(":scope .snapped")?.classList.remove("snapped");
      scroller
        ?.querySelector(":scope .snapeTarget")
        ?.classList.remove("snapeTarget");
      e.snapTargetInline.classList.add("snapeTarget");
    };

    scroller?.addEventListener("scrollsnapchange", handleScrollSnapChange);
    scroller?.addEventListener("scrollsnapchanging", handleScrollSnapChanging);

    return () => {
      scroller?.removeEventListener("scrollsnapchange", handleScrollSnapChange);
      scroller?.removeEventListener(
        "scrollsnapchanging",
        handleScrollSnapChanging
      );
    };
  }, []);

  return (
    <div className="section" ref={scrollerRef}>
      <div className="section__item bg-1">HTML</div>
      <div className="section__item bg-2">CSS</div>
      <div className="section__item bg-3">JavaScript</div>
      <div className="section__item bg-4">Go</div>
      <div className="section__item bg-5">Rust</div>
    </div>
  );
};
