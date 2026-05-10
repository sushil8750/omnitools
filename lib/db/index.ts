// Database Abstraction Shell
// Ready for future integration with Prisma, Supabase, or Drizzle

export interface UserHistory {
  id: string;
  toolSlug: string;
  timestamp: Date;
  status: 'success' | 'failed';
}

export class DB {
  static async saveHistory(entry: UserHistory) {
    // Save to database
    console.log("[DB] Saving history entry:", entry);
  }

  static async getHistory(userId: string): Promise<UserHistory[]> {
    // Fetch from database
    return [];
  }
}
