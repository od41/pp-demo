import Avatar from "./avatar";

interface AvatarGroupProps {
  avatarPropsArray: Array<{ render: any; className: string }>;
  className?: string;
  size?: number;
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatarPropsArray = [],
  className = "",
  size = 30,
}) => {
  return (
    <div className={`${className} flex -space-x-2`}>
      {avatarPropsArray.map((avatarProps, index) =>
        avatarProps.render ? (
          <span
            className="flex rounded-full overflow-hidden"
            style={{ ...(size && { width: size, height: size }) }}
          >
            {avatarProps.render()}
          </span>
        ) : (
          <Avatar
            key={index}
            size={size}
            {...avatarProps}
            className={`${avatarProps.className ?? ""}`}
          />
        )
      )}
    </div>
  );
};

export default AvatarGroup;
