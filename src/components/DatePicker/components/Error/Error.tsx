import type { PropsWithChildren } from "react";
import styles from "./Error.module.scss";

export const Error = ({ children }: PropsWithChildren) => {
  return <span className={styles.error}>{children}</span>;
};
