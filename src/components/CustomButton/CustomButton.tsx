import React, { useMemo } from "react";
import * as styles from "./CustomButton.module.css";

interface ICustomButtonProps {
  onClick?: () => void;
  label: string;
  size?: "small" | "medium" | "large";
}

const CustomButton: React.FC<ICustomButtonProps> = React.memo(
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

export default CustomButton;
