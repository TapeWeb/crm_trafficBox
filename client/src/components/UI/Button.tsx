import "../../styles/components/UI/Button.module.scss";
import { Link } from "react-router-dom";

interface ButtonProps {
  content: string;
  link?: string;
  onClick?: () => void;
  className?: string;
  isAnimated?: boolean;
}

export const Button = ({ content, link, onClick, className = "" }: ButtonProps) => {
  const logicButton = () => {
    if (link && link.trim().length > 0) {
      return (
        <Link to={link} className={className} onClick={onClick}>
          {content}
        </Link>
      );
    }

    return (
      <button className={className} onClick={onClick}>
        {content}
      </button>
    );
  };

  return logicButton();
};
