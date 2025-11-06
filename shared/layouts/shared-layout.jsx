// add content to be shared by each layout

import PrelineScript from "@/lib/preline-script";

const SharedLayout = ({ children }) => {
	return (
		<>
			<PrelineScript />
			{children}
		</>
	);
};



export default SharedLayout;

