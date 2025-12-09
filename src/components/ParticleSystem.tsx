import { motion } from 'framer-motion';
import { ANIMATION_EASING } from '../lib/animations';

const ParticleSystem = () => {
	const generateWavePath = (amplitude: number, frequency: number, phase: number) => {
		let path = 'M 0,100';
		const width = 1200;
		const steps = 100;
		
		for (let i = 0; i <= steps; i++) {
			const x = (i / steps) * width;
			const y = 100 - amplitude * Math.sin((x * frequency + phase) * Math.PI * 2);
			path += ` L ${x},${y}`;
		}
		path += ' L 1200,100 Z';
		return path;
	};

	return (
		<div className="absolute inset-0 overflow-hidden pointer-events-none">
			<motion.svg
				className="absolute bottom-0 left-0 w-full"
				style={{ height: '50%' }}
				preserveAspectRatio="none"
				viewBox="0 0 1200 100"
			>
				<motion.path
					d={generateWavePath(15, 0.005, 0)}
					fill="rgba(59, 130, 246, 0.25)"
					animate={{
						d: [
							generateWavePath(15, 0.005, 0),
							generateWavePath(15, 0.005, 0.5),
							generateWavePath(15, 0.005, 1),
						],
						x: [0, -200, -400],
					}}
					transition={{
						duration: 8,
						repeat: Infinity,
						ease: ANIMATION_EASING.LINEAR,
					}}
				/>
			</motion.svg>
			
			<motion.svg
				className="absolute bottom-0 left-0 w-full"
				style={{ height: '40%' }}
				preserveAspectRatio="none"
				viewBox="0 0 1200 100"
			>
				<motion.path
					d={generateWavePath(20, 0.004, 0)}
					fill="rgba(16, 185, 129, 0.2)"
					animate={{
						d: [
							generateWavePath(20, 0.004, 0),
							generateWavePath(20, 0.004, 0.5),
							generateWavePath(20, 0.004, 1),
						],
						x: [-100, -300, -500],
					}}
					transition={{
						duration: 10,
						delay: 1,
						repeat: Infinity,
						ease: ANIMATION_EASING.LINEAR,
					}}
				/>
			</motion.svg>
			
			<motion.svg
				className="absolute bottom-0 left-0 w-full"
				style={{ height: '35%' }}
				preserveAspectRatio="none"
				viewBox="0 0 1200 100"
			>
				<motion.path
					d={generateWavePath(18, 0.006, 0)}
					fill="rgba(59, 130, 246, 0.15)"
					animate={{
						d: [
							generateWavePath(18, 0.006, 0),
							generateWavePath(18, 0.006, 0.5),
							generateWavePath(18, 0.006, 1),
						],
						x: [100, -100, -300],
					}}
					transition={{
						duration: 12,
						delay: 2,
						repeat: Infinity,
						ease: ANIMATION_EASING.LINEAR,
					}}
				/>
			</motion.svg>
		</div>
	);
};

export default ParticleSystem;
