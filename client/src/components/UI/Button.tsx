import styles from "../../styles/components/UI/Button.module.scss";
import { Link } from "react-router-dom";

interface ButtonProps {
  content: string;
  link?: string;
  onClick?: () => void;
  className?: string;
  isAnimated?: boolean;
  variant?: "primary" | "secondary" | "danger" | "success" | "warning" | "ghost";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
}

export const Button = ({
                         content,
                         link,
                         onClick,
                         className = "",
                         isAnimated = false,
                         variant = "primary",
                         size = "medium",
                         disabled = false,
                         loading = false,
                         icon
                       }: ButtonProps) => {

  const baseClass = styles.button;
  const variantClass = styles[variant];
  const sizeClass = size !== "medium" ? styles[size] : "";
  const animatedClass = isAnimated ? styles.animated : "";
  const loadingClass = loading ? styles.loading : "";
  const iconClass = icon ? styles.withIcon : "";

  const classes = `${baseClass} ${variantClass} ${sizeClass} ${animatedClass} ${loadingClass} ${iconClass} ${className}`.trim();

  const renderContent = () => (
    <>
      {icon && <span className={styles.icon}>{icon}</span>}
      {loading ? "Loading..." : content}
    </>
  );

  if (link && link.trim().length > 0 && !disabled && !loading) {
    return (
      <Link to={link} className={classes} onClick={onClick}>
        {renderContent()}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {renderContent()}
    </button>
  );
};