export const dynamic = "force-static";
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { leads, outreachEmails, deals } from '@/lib/schema';
import { sql } from 'drizzle-orm';

export async function GET() {
  try {
    const db = getDb();

    // Pipeline stats (leads by status)
    const pipelineStats = db.all(sql`
      SELECT status, COUNT(*) as count FROM leads GROUP BY status
    `) as Array<{ status: string; count: number }>;

    const pipeline: Record<string, number> = {};
    for (const row of pipelineStats) {
      pipeline[row.status] = row.count;
    }

    // Category stats
    const categoryStats = db.all(sql`
      SELECT COALESCE(category, industry, 'Other') as category, COUNT(*) as count
      FROM leads GROUP BY category
    `) as Array<{ category: string; count: number }>;

    const categories: Record<string, number> = {};
    for (const row of categoryStats) {
      categories[row.category] = row.count;
    }

    // City stats
    const cityStats = db.all(sql`
      SELECT city, COUNT(*) as count FROM leads GROUP BY city ORDER BY count DESC LIMIT 20
    `) as Array<{ city: string; count: number }>;

    const cities: Record<string, number> = {};
    for (const row of cityStats) {
      cities[row.city] = row.count;
    }

    // Total counts
    const totalLeads = db.all(sql`SELECT COUNT(*) as count FROM leads`)[0] as { count: number };
    const totalEmails = db.all(sql`SELECT COUNT(*) as count FROM outreach_emails`)[0] as { count: number };
    const totalDeals = db.all(sql`SELECT COUNT(*) as count FROM deals`)[0] as { count: number };

    // Revenue stats
    const activeRevenue = db.all(sql`SELECT COALESCE(SUM(value), 0) as total FROM deals WHERE status = 'active'`)[0] as { total: number };
    const closedRevenue = db.all(sql`SELECT COALESCE(SUM(value), 0) as total FROM deals WHERE status = 'completed'`)[0] as { total: number };

    return NextResponse.json({
      pipeline,
      categories,
      cities,
      totalLeads: totalLeads.count,
      totalEmails: totalEmails.count,
      totalDeals: totalDeals.count,
      activeRevenue: activeRevenue.total,
      closedRevenue: closedRevenue.total,
    });
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
