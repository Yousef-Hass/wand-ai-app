export const theme = {
	colors: {
		primary: {
			green: '#10b981',
			emerald: '#059669',
			teal: '#14b8a6',
		},
		accent: {
			red: '#ef4444',
			rose: '#f43f5e',
			coral: '#ff6b6b',
		},
		gradients: {
			greenToEmerald: 'from-emerald-500 to-green-500',
			greenToTeal: 'from-green-500 via-emerald-500 to-teal-500',
			greenToRed: 'from-emerald-500 via-green-500 to-red-500',
			emeraldToRed: 'from-emerald-400 to-red-500',
			greenToRedOpacity: 'from-emerald-400/20 to-red-500/20',
			tealToRose: 'from-teal-500 to-rose-500',
		},
	},
} as const

