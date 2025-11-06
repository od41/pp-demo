"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// import { IStaticMethods } from "preline/preline";
// declare global {
// 	interface Window {
// 		HSStaticMethods: IStaticMethods;
// 	}
// }

export default function PrelineScript() {
	const path = usePathname();

	useEffect(() => {
		import("preline/preline");
	}, []);

	useEffect(() => {
		let interval = setInterval(() => {
			if (typeof window !== "undefined" && window.HSStaticMethods) {
				window.HSStaticMethods.autoInit();
				clearInterval(interval);
			}
		}, 700);

		return () => {
			clearInterval(interval);
		}
	}, [path]);

	return null;
}