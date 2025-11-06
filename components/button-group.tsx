import Button from "./button";

interface ButtonGroupProps {
  buttonPropsArray: Array<{
    render: any;
    className: string;
    children: React.ReactNode;
  }>;
  className?: string;
  size?: number;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  buttonPropsArray = [],
  className = "",
}) => {
  return (
    <div className={`${className} inline-flex overflow-hidden `}>
      {buttonPropsArray.map((buttonProps) => (
        <Button
          {...buttonProps}
          className={`${buttonProps.className} [&:not(:last-child)]:border-r-0`}
        />
      ))}
    </div>
  );
};

export default ButtonGroup;
