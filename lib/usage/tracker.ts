import { PlanType, PLANS } from "@/lib/plans"

export interface UserUsage {
  userId: string
  plan: PlanType
  conversionsToday: number
  totalConversions: number
  bandwidthUsedMB: number
  lastActive: number
}

// In-memory store for demo (replace with Redis/DB in production)
const usageStore = new Map<string, UserUsage>()

export class UsageTracker {
  static async getUsage(userId: string, plan: PlanType = 'free'): Promise<UserUsage> {
    let usage = usageStore.get(userId)
    
    if (!usage) {
      usage = {
        userId,
        plan,
        conversionsToday: 0,
        totalConversions: 0,
        bandwidthUsedMB: 0,
        lastActive: Date.now()
      }
      usageStore.set(userId, usage)
    }

    // Reset daily counter if last active was yesterday
    const lastDate = new Date(usage.lastActive).toDateString()
    const todayDate = new Date().toDateString()
    
    if (lastDate !== todayDate) {
      usage.conversionsToday = 0
      usage.lastActive = Date.now()
    }

    return usage
  }

  static async canProcess(userId: string, fileSizeMB: number): Promise<{ allowed: boolean, reason?: string }> {
    const usage = await this.getUsage(userId)
    const plan = PLANS[usage.plan]

    if (usage.conversionsToday >= plan.quotas.maxDailyConversions) {
      return { 
        allowed: false, 
        reason: "Daily conversion limit reached. Upgrade to Pro for unlimited conversions." 
      }
    }

    if (fileSizeMB > plan.quotas.maxFileSizeMB) {
      return { 
        allowed: false, 
        reason: `File size exceeds ${plan.quotas.maxFileSizeMB}MB limit for your current plan.` 
      }
    }

    return { allowed: true }
  }

  static async trackConversion(userId: string, fileSizeMB: number) {
    const usage = await this.getUsage(userId)
    usage.conversionsToday += 1
    usage.totalConversions += 1
    usage.bandwidthUsedMB += fileSizeMB
    usage.lastActive = Date.now()
    usageStore.set(userId, usage)
  }
}
