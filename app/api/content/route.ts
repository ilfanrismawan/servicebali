import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const contentFilePath = join(process.cwd(), 'data', 'content.json');

// GET endpoint to fetch content
export async function GET() {
  try {
    if (!existsSync(contentFilePath)) {
      // Return default content if file doesn't exist
      const defaultContent = {
        hero: {
          title: "Service Handphone Terpercaya di Bali",
          subtitle: "Perbaikan cepat, berkualitas, dan harga terjangkau untuk semua merek handphone",
          cta: "Hubungi Kami Sekarang"
        },
        services: {
          title: "Layanan Kami",
          subtitle: "Kami menyediakan berbagai layanan perbaikan handphone profesional",
          items: []
        },
        locations: {
          title: "Lokasi Layanan Kami",
          subtitle: "Kami melayani di berbagai daerah di Bali",
          items: []
        },
        contact: {
          title: "Hubungi Kami",
          subtitle: "Kami siap membantu perbaikan handphone Anda",
          whatsapp: "0851-6277-3332",
          message: "Halo, saya ingin konsultasi tentang service handphone"
        },
        about: {
          title: "Tentang Kami",
          description: "Kami adalah tim profesional yang berpengalaman dalam perbaikan berbagai merek handphone."
        }
      };
      return NextResponse.json(defaultContent);
    }

    const fileContent = readFileSync(contentFilePath, 'utf-8');
    const content = JSON.parse(fileContent);
    return NextResponse.json(content);
  } catch (error) {
    console.error('Error reading content:', error);
    return NextResponse.json(
      { error: 'Failed to read content' },
      { status: 500 }
    );
  }
}

// POST endpoint to update content
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate that we have the required structure
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Invalid content format' },
        { status: 400 }
      );
    }

    // Ensure directory exists
    const dir = join(process.cwd(), 'data');
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    // Write to file
    writeFileSync(contentFilePath, JSON.stringify(body, null, 2), 'utf-8');
    
    return NextResponse.json({ success: true, message: 'Content updated successfully' });
  } catch (error) {
    console.error('Error writing content:', error);
    return NextResponse.json(
      { error: 'Failed to update content' },
      { status: 500 }
    );
  }
}

