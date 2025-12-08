import AnimatedBackground from './components/AnimatedBackground';
import FloatingElements from './components/FloatingElements';
import InteractiveCard from './components/InteractiveCard';
import ParticleSystem from './components/ParticleSystem';
import TypewriterWelcome from './components/TypewriterWelcome';

function App() {
	return (
		<div className="min-h-screen relative overflow-hidden">
			<AnimatedBackground />
			<ParticleSystem />
			<FloatingElements />

			<div className="relative z-10 min-h-screen grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 lg:p-12">
				<div className="lg:col-span-5 flex flex-col justify-center space-y-8">
					<TypewriterWelcome />
				</div>

				<div className="lg:col-span-7 flex items-center justify-end">
					<InteractiveCard />
				</div>
			</div>

			<div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 via-transparent to-red-500 opacity-30" />
			<div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 via-transparent to-emerald-500 opacity-30" />
		</div>
	);
}

export default App;
