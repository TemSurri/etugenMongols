import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ImgHTMLAttributes,
} from "react";

type StableImageRevealProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "onError" | "onLoad"
> & {
  overlayClassName?: string;
};

export default function StableImageReveal({
  src,
  className,
  overlayClassName = "bg-[#303824]",
  ...imageProps
}: StableImageRevealProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [revealedSrc, setRevealedSrc] = useState<string>();
  const source = typeof src === "string" ? src : undefined;
  const isRevealed = source !== undefined && revealedSrc === source;

  const reveal = useCallback(
    (image: HTMLImageElement) => {
      const finish = () => setRevealedSrc(source);
      void image.decode().catch(() => undefined).then(finish);
    },
    [source],
  );

  useEffect(() => {
    const image = imageRef.current;
    if (image?.complete && image.naturalWidth > 0) reveal(image);
  }, [reveal]);

  return (
    <>
      <img
        {...imageProps}
        ref={imageRef}
        src={src}
        className={className}
        onLoad={(event) => reveal(event.currentTarget)}
      />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-10 origin-right transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:duration-0 ${overlayClassName} ${
          isRevealed ? "translate-x-full" : "translate-x-0"
        }`}
      />
    </>
  );
}
