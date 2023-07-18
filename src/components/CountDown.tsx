import { Typography } from "@mui/material";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../utils/storage";

interface CountDownProps {
  onClose: () => void;
}
function CountDown({ onClose }: CountDownProps) {
  const initialTime = 0.1 * 60;
  const [timeRemaining, setTimeRemaining] = useState(
    getLocalStorage("countdownTime") || initialTime
  );

  useEffect(() => {
    if (timeRemaining === 0) {
      setLocalStorage("countdownTime", 0);
      onClose();
      return;
    }
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
      setLocalStorage("countdownTime", timeRemaining);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timeRemaining]);

  const formatTime = (time: any) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div className="count-down__container">
      <Typography variant="h5" className="count-down__time">
        <HourglassEmptyIcon sx={{ marginRight: "8px" }} />{" "}
        {formatTime(timeRemaining)}s
      </Typography>
    </div>
  );
}

export default CountDown;
