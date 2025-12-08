import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ANIMATION_DELAY, COMMON_ANIMATIONS } from '../lib/animations';
import { theme } from '../lib/theme';

const InteractiveCard = () => {
	const { t } = useTranslation();

	return (
		<motion.div
			initial={{ opacity: 0, x: 50 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.8, delay: ANIMATION_DELAY.LARGE }}
			className="relative group w-full max-w-lg"
		>
			{/* Main card with sharp corners and diagonal design */}
			<motion.div
				whileHover={{ scale: 1.02, rotate: -1 }}
				whileTap={{ scale: 0.98 }}
				className="relative bg-slate-900/80 backdrop-blur-xl border-4 border-emerald-500/50 shadow-2xl"
				style={{
					clipPath: 'polygon(0 0, calc(100% - 40px) 0, 100% 40px, 100% 100%, 40px 100%, 0 calc(100% - 40px))',
				}}
			>
				{/* Diagonal accent line */}
				<div className="absolute top-0 right-0 w-32 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent transform rotate-45 origin-right" />
				<div className="absolute bottom-0 left-0 w-32 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent transform -rotate-45 origin-left" />

				<div className="relative z-10 p-10">
					{/* Icon in top-left corner */}
					<motion.div
						{...COMMON_ANIMATIONS.ROTATE_INFINITE}
						className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-br from-emerald-500 to-red-500 flex items-center justify-center"
						style={{
							clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
						}}
					>
						<Sparkles className="w-6 h-6 text-white" />
					</motion.div>

					{/* Content aligned left */}
					<div className="space-y-6">
						<div className="border-l-4 border-emerald-500 pl-4">
							<h3 className="text-3xl font-extrabold text-white uppercase tracking-wider mb-2">
								{t('card.title')}
							</h3>
							<div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-red-500" />
						</div>

						<p className="text-gray-300 text-left text-base leading-relaxed font-light">
							{t('card.description')}
						</p>

						{/* Button with asymmetric design */}
						<motion.button
							{...COMMON_ANIMATIONS.SCALE_HOVER}
							className={`relative w-full bg-gradient-to-r ${theme.colors.gradients.emeraldToRed} hover:from-emerald-600 hover:to-red-600 text-white font-bold py-4 px-8 transition-all duration-300 flex items-center justify-between group overflow-hidden`}
							style={{
								clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
							}}
						>
							<span className="relative z-10 uppercase tracking-wider text-sm">
								{t('card.button')}
							</span>
							<ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform" />
							{/* Hover effect overlay */}
							<div className="absolute inset-0 bg-white/10 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
						</motion.button>
					</div>
				</div>

				{/* Corner decorations */}
				<div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-emerald-500" />
				<div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-red-500" />
			</motion.div>
		</motion.div>
	);
};

export default InteractiveCard;
