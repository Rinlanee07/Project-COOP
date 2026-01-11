import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type RepairRequestBody = {
  printerModel: string;
  serialNumber?: string;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  customerAddress?: string;
  issueDesc: string;
  accessories?: string;
  contactInfo?: string;
  notes?: string;
  images?: string[];
};

const DATA_DIR = 'data';
const FILE_PATH = `${DATA_DIR}/repairs.json`;

async function ensureDataFile() {
  const fs = await import('fs/promises');
  const path = await import('path');
  const dir = path.join(process.cwd(), DATA_DIR);
  await fs.mkdir(dir, { recursive: true });
  const file = path.join(process.cwd(), FILE_PATH);
  try {
    await fs.access(file);
  } catch {
    await fs.writeFile(file, JSON.stringify({ repairs: [] }, null, 2));
  }
}

export async function POST(req: Request) {
  try {
    await ensureDataFile();
    const body = await req.json() as RepairRequestBody;

    if (!body || !body.issueDesc) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const fs = await import('fs/promises');
    const path = await import('path');
    const file = path.join(process.cwd(), FILE_PATH);

    const content = await fs.readFile(file, 'utf-8');
    const json = JSON.parse(content);
    const repairs = Array.isArray(json.repairs) ? json.repairs : [];

    const newId = repairs.length > 0 ? repairs[repairs.length - 1].id + 1 : 1;
    const newRepair = {
      id: newId,
      printerModel: body.printerModel,
      serialNumber: body.serialNumber || null,
      customerName: body.customerName || null,
      customerPhone: body.customerPhone || null,
      customerEmail: body.customerEmail || null,
      customerAddress: body.customerAddress || null,
      issueDesc: body.issueDesc,
      accessories: body.accessories || null,
      contactInfo: body.contactInfo || null,
      notes: body.notes || null,
      images: body.images || [],
      requestDate: new Date().toISOString(),
      status: 'PENDING',
    };

    repairs.push(newRepair);
    await fs.writeFile(file, JSON.stringify({ repairs }, null, 2));

    return NextResponse.json({ data: { repairRequestId: newId } });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Failed to create repair' }, { status: 500 });
  }
}
