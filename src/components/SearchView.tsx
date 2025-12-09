import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import SearchBackground from './SearchBackground';
import QueryInput from './QueryInput';
import { ANIMATION_DELAY } from '../lib/animations';

interface SearchViewProps {
	className?: string;
}

const SearchView = ({ className = '' }: SearchViewProps) => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	const handleBackToHome = useCallback(() => {
		navigate('/');
	}, [navigate]);

	return (
		<div className={`min-h-screen bg-gradient-to-b from-slate-950 via-blue-950/20 to-slate-950 relative ${className}`}>
			<SearchBackground />
			
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="relative z-10 p-6"
			>
				<motion.button
					onClick={handleBackToHome}
					whileHover={{ scale: 1.05, x: -5 }}
					whileTap={{ scale: 0.95 }}
					className="flex items-center gap-3 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 hover:border-blue-500/50 rounded-xl transition-all group backdrop-blur-sm"
					aria-label="Navigate back to home page"
				>
					<ArrowLeft className="w-5 h-5 text-blue-400 group-hover:-translate-x-1 transition-transform" />
					<span className="text-blue-400 font-medium">Back</span>
				</motion.button>
			</motion.div>

			<div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
				<div className="max-w-4xl w-full mx-auto space-y-16">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: ANIMATION_DELAY.SMALL }}
						className="text-center"
					>
						<div className="relative inline-block mb-8">
							<h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-blue-400 via-blue-500 to-green-400 bg-clip-text text-transparent tracking-tighter">
								{t('search.title', 'Unleash Intelligence')}
							</h1>
							<div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-transparent to-green-500 opacity-50" />
						</div>
						<p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto leading-relaxed font-light">
							{t('search.subtitle', 'Transform your questions into actionable insights with our multi-agent AI system')}
						</p>
					</motion.div>
					<QueryInput />
				</div>
			</div>
		</div>
	);
};

export default SearchView;
