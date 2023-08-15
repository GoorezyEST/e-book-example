import React from "react";
import Link from "next/link";
import styles from "@/styles/modules/breadcrumb.module.css";

const Breadcrumb = ({ routes }) => {
  return (
    <nav className={styles.content}>
      {routes.map((item, index) => (
        <div key={index}>
          {index === 0 && <Link href={item.url}>{item.name} /</Link>}
          {index !== 0 && index !== routes.length - 1 && (
            <Link href={item.url}>{item.name} /</Link>
          )}
          {index === routes.length - 1 && (
            <Link href={item.url}>{item.name} /</Link>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
