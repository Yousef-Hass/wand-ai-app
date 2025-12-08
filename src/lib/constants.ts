export const APP_CONFIG = {
	PARTICLES_COUNT: 50,
	FLOATING_ORBS_COUNT: 6,
	FLOATING_ICONS_COUNT: 4,
	GRID_SIZE: 50,
	ANIMATION_DURATION_RANGE: { min: 10, max: 20 },
	PARTICLE_SIZE_RANGE: { min: 1, max: 5 },
	ORB_SIZE_RANGE: { min: 100, max: 400 },
} as const

export const API_CONFIG = {
	BASE_URL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:4000',
} as const

export const QUERY_KEYS = {
	HEALTH: ['health'],
	REQUESTS: ['requests'],
} as const
