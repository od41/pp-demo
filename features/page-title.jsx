const PageTitle = ({ title, slotRight = null, className = '', titleClass = '', slotRightClassName = '' }) => {

	return (
		<div className={`flex items-center ${className} `}>
			<h1 className={`text-body_lg1_normal text-neutral-900 ${titleClass}`}>{title}</h1>
			<div className={`ml-auto ${slotRightClassName}`}>
				{slotRight}
			</div>
		</div>
	);
};


export default PageTitle;