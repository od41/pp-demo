"use client";
import { useEffect, useRef, useState } from "react";
import { useAnimation, motion, useInView, Variant } from "framer-motion";

/**
 * The props type for {@link AnimatedText}.
 * Beautiful general text animation component. Each letter is animated in one after the other.
 */
export interface AnimatedTextProps {
  /** Word or sentence that will be animated */
  text: string | string[];

  /** HTML element to wrap the text in the DOM. Default is a
   * ```html
   * <p> </p>
   * ```
   *
   * tag
   * */
  el?: keyof JSX.IntrinsicElements;

  /** Additional class name styles for the input text, preferably tailwind-css. */
  className?: string;

  /** Whether the animation will repeat or not. Default is false; will run infinitely */
  once?: boolean;

  /** Time in seconds that repeat animations should delay, default is 0*/
  repeatDelay?: number;

  /** Time in seconds that the first animation should delay, default is 0*/
  initialDelay?: number;

  /** Override the default animation for the animated text.*/
  animation?: {
    hidden: Variant;
    visible: Variant;
  };
}

/** @inner Default animation properties. */
const defaultAnimations = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

/**
 * Renders a beautiful general text animation component. Each letter is animated in one after the other.
 *
 * @category Component
 */
export const AnimatedText = ({
  text,
  el: Wrapper = "p",
  className,
  once,
  repeatDelay,
  initialDelay = 0,
  animation = defaultAnimations,
}: AnimatedTextProps): React.ReactElement => {
  const controls = useAnimation();
  const textArray = Array.isArray(text) ? text : [text];
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once });
  const [isFirstAnimation, setIsFirstAnimation] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const show = () => {
      if (isFirstAnimation && initialDelay > 0) {
        timeout = setTimeout(() => {
          controls.start("visible");
          setIsFirstAnimation(false);
        }, initialDelay * 1000);
      } else {
        controls.start("visible");
      }

      if (repeatDelay) {
        timeout = setTimeout(async () => {
          await controls.start("hidden");
          controls.start("visible");
        }, repeatDelay);
      }
    };

    if (isInView) {
      show();
    } else {
      controls.start("hidden");
    }

    return () => clearTimeout(timeout);
  }, [isInView, isFirstAnimation, initialDelay, repeatDelay, controls]);

  return (
    <Wrapper className={className}>
      <span className="sr-only">{textArray.join(" ")}</span>
      <motion.span
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          visible: { transition: { staggerChildren: 0.05 } },
          hidden: {},
        }}
        aria-hidden
      >
        {textArray.map((line, lineIndex) => (
          <span className="block" key={`${line}-${lineIndex}`}>
            {line.split(" ").map((word, wordIndex) => (
              <span className="inline-block" key={`${word}-${wordIndex}`}>
                {word.split("").map((char, charIndex) => (
                  <motion.span
                    key={`${char}-${charIndex}`}
                    className="inline-block"
                    variants={animation}
                  >
                    {char}
                  </motion.span>
                ))}
                <span className="inline-block">&nbsp;</span>
              </span>
            ))}
          </span>
        ))}
      </motion.span>
    </Wrapper>
  );
};
