import classes from "./ProgressBar.module.scss";
import { useState, useEffect } from "react";

const ProgressBar = ({ propsProgress }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(propsProgress);
  }, [propsProgress]);
  return (
    <div className={classes.container}>
      <div className={classes.label}>Загрузка {progress}%</div>
      <div
        className={classes.progress}
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
};

export default ProgressBar;
