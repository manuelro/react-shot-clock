import {
  MouseEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import React from "react";

const ClockButton = ({
  children,
  dataTestId,
  ...props
}: {
  children: ReactNode;
  dataTestId: string;
  onClick?: MouseEventHandler;
}) => (
  <button
    {...props}
    data-testid={dataTestId}
    className="bg-gray-900 px-3 py-1 uppercase border-2 border-t-gray-700 border-l-gray-700 border-r-gray-950 border-b-gray-950 text-gray-500 active:border-t-gray-950 active:border-l-gray-950 active:border-r-gray-700 active:border-b-gray-700"
  >
    {children}
  </button>
);

const ShotClock = () => {
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [clockCounter, setClockCounter] = useState(24);
  const [isClockCount, setIsClockCount] = useState(true);

  const resetTimeout = (): void => {
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = null;
  };

  const resetClock = useCallback(() => {
    setClockCounter(24);
  }, []);

  const tickClockRecursive = useCallback(() => {
    resetTimeout();

    if (clockCounter >= 0) {
      if (isClockCount)
        timeout.current = setTimeout(() => {
          if (clockCounter === 0) resetClock();
          else setClockCounter(clockCounter - 1);

          tickClockRecursive();
        }, 1000);
    }
  }, [clockCounter, isClockCount, resetClock]);

  const stopClock = () => {
    setIsClockCount(!isClockCount);
  };

  const clockCounterAsString = () => {
    return clockCounter < 10 ? "0" + clockCounter : clockCounter;
  };

  useEffect(() => {
    tickClockRecursive();
  }, [tickClockRecursive]);

  return (
    <div className="bg-slate-800 p-8">
      <div
        data-testid="seconds"
        className="bg-gray-900 px-12 py-4 text-red-700 text-7xl border-8 border-gray-950 font-mono"
      >
        {clockCounterAsString()}
      </div>

      <div className="flex w-full justify-between mt-5">
        <ClockButton dataTestId="reset" onClick={resetClock}>
          Reset
        </ClockButton>

        <ClockButton dataTestId="toggle" onClick={stopClock}>
          {isClockCount ? "Stop" : "Start"}
        </ClockButton>
      </div>
    </div>
  );
};

export default ShotClock;
