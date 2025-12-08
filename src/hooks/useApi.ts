import { useQuery } from '@tanstack/react-query'
import { API_CONFIG, QUERY_KEYS } from '../lib/constants'

const fetchHealthStatus = async () => {
  const res = await fetch(`${API_CONFIG.BASE_URL}/healthz`)
  if (!res.ok) throw new Error(`Health check failed: ${res.status}`)
  return res.json()
}

export const useHealthCheck = () =>
  useQuery({
    queryKey: QUERY_KEYS.HEALTH,
    queryFn: fetchHealthStatus,
    refetchInterval: 30000,
    retry: 1,
  })

