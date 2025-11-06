interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const Avatar: React.FC<AvatarProps> = ({
  size = 70,
  className = "",
  style = {},
  ...rest
}) => {
  return (
    <img
      className={`${className} inline-block rounded-full`}
      {...rest}
      style={{
        width: size,
        height: size,
        ...style,
      }}
    />
  );
};

export default Avatar;
