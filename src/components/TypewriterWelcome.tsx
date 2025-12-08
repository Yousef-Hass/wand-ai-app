import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { TypeAnimation } from 'react-type-animation';
import { ANIMATION_DELAY, COMMON_ANIMATIONS } from '../lib/animations';
import { theme } from '../lib/theme';

const TypewriterWelcome = () => {
	const { t } = useTranslation();

	return (
		<div className="space-y-8 text-left">
			<motion.div
				{...COMMON_ANIMATIONS.FADE_IN_UP}
				className="relative pl-6 border-l-4 border-emerald-500"
			>
				<div className={`text-5xl md:text-7xl font-black tracking-tight bg-gradient-to-br ${theme.colors.gradients.greenToTeal} bg-clip-text text-transparent leading-tight`}>
					{t('app.title')}
				</div>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, x: -30 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.8, delay: ANIMATION_DELAY.SMALL }}
				className="relative"
			>
				<div className="bg-slate-900/60 backdrop-blur-sm border-2 border-emerald-500/30 rounded-lg p-6 shadow-lg">
					<div className="flex items-start gap-3">
						<div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
						<div className="flex-1">
							<div className="text-lg md:text-xl text-emerald-400 font-mono font-medium mb-2">
								<span className="text-red-500">&gt;</span> Status
							</div>
							<TypeAnimation
								sequence={[
									t('welcome.message1'),
									2000,
									t('welcome.message2'),
									2000,
									t('welcome.message3'),
									2000,
									t('welcome.message4'),
									2000,
									t('welcome.message5'),
									2000,
								]}
								wrapper="div"
								speed={50}
								className="text-white font-mono text-base md:text-lg leading-relaxed"
								repeat={Infinity}
							/>
						</div>
					</div>
				</div>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, x: -30 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.8, delay: ANIMATION_DELAY.MEDIUM }}
				className="relative ml-8"
			>
				<div className="bg-gradient-to-br from-red-500/10 to-emerald-500/10 backdrop-blur-sm border-t-2 border-r-2 border-b-4 border-l-4 border-red-500/40 rounded-tl-none rounded-tr-2xl rounded-br-2xl rounded-bl-2xl p-6 shadow-xl">
					<p className="text-gray-200 text-sm md:text-base leading-loose font-light">
						{t('welcome.description')}
					</p>
				</div>
				<div className="absolute -top-2 -left-2 w-6 h-6 bg-emerald-500 rotate-45" />
			</motion.div>
		</div>
	);
};

export default TypewriterWelcome;
