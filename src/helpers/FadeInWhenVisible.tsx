import { motion } from "framer-motion";

type Props = {
	children: React.ReactNode;
};

export function FadeInWhenVisible({ children }: Props) {
	return (
		<motion.div
			initial="hidden"
			whileInView="visible"
			viewport={{ once: false }}
			transition={{ duration: 0.4 }}
			variants={{
				visible: { opacity: 1 },
				hidden: { opacity: 0 },
			}}
		>
			{children}
		</motion.div>
	);
}
