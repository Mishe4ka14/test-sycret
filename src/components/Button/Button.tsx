import React, { useMemo } from "react";
import * as styles from "./Button.module.css";

interface IButtonProps {
  onClick?: () => void;
  label: string;
  size?: "small" | "large";
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const Button: React.FC<IButtonProps> = React.memo(
  ({ onClick, label, size }) => {
    return (
      <button
        className={`${styles.button} ${
          size === "large" ? styles.large : styles.small
        }`}
        onClick={onClick}
      >
        {label}
      </button>
    );
  }
);

export default Button;
