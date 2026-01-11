import { NextResponse, NextRequest } from 'next/server';
import { repairService } from '@/services/repairService';

export const runtime = 'nodejs';

/**
 * GET /api/repair-detail/:id
 * Fetches repair detail by ID using repairService
 * Next.js 15.x API Route with async params (Promise)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    const repairId = Number(id);
    if (isNaN(repairId)) {
      return NextResponse.json(
        { error: 'Invalid ID format' },
        { status: 400 }
      );
    }

    console.log(`[API] GET /api/repair-detail/${id}`);

    const result = await repairService.getById(repairId);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Repair not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: result.data },
      { status: 200 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    console.error(`[API] Error:`, err);

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
