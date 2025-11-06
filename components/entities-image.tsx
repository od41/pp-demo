import { useState } from "react";

const { getEntityInitials } = require("@/utils");

type EntityImageProps = {
	src?: string;
	entityName: string;
	imageOnlyProps?: React.ImgHTMLAttributes<HTMLImageElement>;
	initialsSpanOnlyProps?: React.HTMLAttributes<HTMLSpanElement>;
	alt?: string;
	className?: string;
  } & React.HTMLAttributes<HTMLImageElement | HTMLSpanElement>;

const EntityImage = ({ src, entityName, imageOnlyProps, initialsSpanOnlyProps, ...rest }: EntityImageProps) => {
	const [hasError, setHasError] = useState(false);



	return hasError || !src ? (
		<span
			{...rest}
			{...initialsSpanOnlyProps}
		>
				{getEntityInitials(entityName)}
			</span>
		) : (
			<img
				src={src}
				onError={() => setHasError(true)}
				{...rest}
				{...imageOnlyProps}
		/>
	);
};


export default EntityImage;
