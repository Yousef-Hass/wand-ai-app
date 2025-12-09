import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeBackground from '../components/HomeBackground';
import FloatingElements from '../components/FloatingElements';
import ActionCard from '../components/ActionCard';
import ParticleSystem from '../components/ParticleSystem';
import HeroSection from '../components/HeroSection';

const HomePage = () => {
	const navigate = useNavigate();

	const handleStartJourney = useCallback(() => {
		navigate('/search');
	}, [navigate]);

	return (
		<div className="min-h-screen relative overflow-hidden">
			<HomeBackground />
			<ParticleSystem />
			<FloatingElements />
			<div className="relative z-10 min-h-screen grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 lg:p-12">
				<div className="lg:col-span-5 flex flex-col justify-center space-y-8">
					<HeroSection />
				</div>
				<div className="lg:col-span-7 flex items-center justify-end">
					<ActionCard onStartJourney={handleStartJourney} />
				</div>
			</div>
			<div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-transparent to-green-500 opacity-30" />
			<div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 via-transparent to-blue-500 opacity-30" />
		</div>
	);
};

export default HomePage;

