import { Link } from "react-router-dom";
import "../../styles/components/UI/Button.module.scss";

interface IProps {
  content: string;
  link?: string;
  onClick?: () => void;
  className?: string;
}

export function Button({ content, link, onClick, className }: IProps) {
  if (link) {
    return (
      <Link to={link} onClick={onClick} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button className={className} onClick={onClick}>
      {content}
    </button>
  );
}
