"use client";

import styles from "../../styles/category.module.css";

type CategoryBadgeProps = {
  index: number;
};

export default function CategoryBadge({ index }: CategoryBadgeProps) {
  return (
    <div className={styles.catBadge}>
      {index + 1}
    </div>
  );
}

