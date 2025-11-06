interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface CardDividerProps {
  className?: string;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  mode?: "outlined" | "filled" | "elevated"; // Added more options for flexibility
}

// mode: 'outlined' | 'filled'
const Card: React.FC<CardProps> & {
  Title: typeof CardTitle;
  Body: typeof CardBody;
  Divider: typeof CardDivider;
} = ({ children, className = "", mode = "outlined" }) => {
  let additionalClassNames = "";

  switch (mode) {
    case "outlined":
      additionalClassNames += " border";
      break;

    case "filled":
      additionalClassNames += " bg-gray-200";
      break;
  }

  return (
    <div className={`${additionalClassNames} rounded-[4px] ${className}`}>
      {children}
    </div>
  );
};

const CardTitle: React.FC<CardTitleProps> = ({ children, className = "" }) => {
  return <div className={`text-[1.2rem] p-3 ${className}`}>{children}</div>;
};

const CardBody: React.FC<CardBodyProps> = ({ children, className = "" }) => {
  return <div className={`p-3 ${className}`}>{children}</div>;
};

const CardDivider: React.FC<CardDividerProps> = ({ className = "" }) => {
  return <hr className={`${className} m-3 border-b`} />;
};

Card.Title = CardTitle;
Card.Body = CardBody;
Card.Divider = CardDivider;

export default Card;
