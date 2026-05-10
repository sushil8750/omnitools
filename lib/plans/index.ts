export type PlanType = 'free' | 'pro' | 'business'

export interface Plan {
  id: PlanType
  name: string
  description: string
  price: number
  interval: 'month' | 'year'
  features: string[]
  quotas: {
    maxDailyConversions: number
    maxFileSizeMB: number
    maxBatchSize: number
    priorityProcessing: boolean
    aiFeatures: boolean
  }
}

export const PLANS: Record<PlanType, Plan> = {
  free: {
    id: 'free',
    name: 'Free',
    description: 'Perfect for casual use',
    price: 0,
    interval: 'month',
    features: [
      'Access to basic tools',
      '5 conversions per day',
      'Up to 50MB file size',
      'Standard processing speed'
    ],
    quotas: {
      maxDailyConversions: 5,
      maxFileSizeMB: 50,
      maxBatchSize: 3,
      priorityProcessing: false,
      aiFeatures: false
    }
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    description: 'For power users and professionals',
    price: 19,
    interval: 'month',
    features: [
      'Access to all premium tools',
      'Unlimited conversions',
      'Up to 500MB file size',
      'Priority processing',
      'AI-powered features'
    ],
    quotas: {
      maxDailyConversions: 1000, // Effectively unlimited
      maxFileSizeMB: 500,
      maxBatchSize: 20,
      priorityProcessing: true,
      aiFeatures: true
    }
  },
  business: {
    id: 'business',
    name: 'Business',
    description: 'For teams and high-scale needs',
    price: 49,
    interval: 'month',
    features: [
      'Everything in Pro',
      'Up to 2GB file size',
      'Team collaboration',
      'API access (coming soon)',
      'Dedicated support'
    ],
    quotas: {
      maxDailyConversions: 5000,
      maxFileSizeMB: 2000,
      maxBatchSize: 50,
      priorityProcessing: true,
      aiFeatures: true
    }
  }
}
