import {v2 as cloudinary} from 'cloudinary';
import {NextResponse} from 'next/server';

export const dynamic = 'force-dynamic';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    const {resources} = await cloudinary.search
      .expression('resource_type:image')
      .sort_by('created_at', 'desc')
      .execute();

    const map = resources.map((item: any) => ({
      id: item.public_id,
      url: item.secure_url,
      created_at: item.created_at,
      bytes: item.bytes,
      format: item.format,
      display_name: item.display_name || item.public_id,
      width: item.width,
      height: item.height
    }));

    return NextResponse.json(map);
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json({error: 'Failed to fetch images'}, {status: 500});
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({error: 'No file provided'}, {status: 400});
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          public_id: file.name.split(/\.\w+$/)[0],
          resource_type: 'image',
          invalidate: true,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      uploadStream.end(buffer);
    });


    if (result) {
      return NextResponse.json({
        id: result.public_id,
        url: result.secure_url,
        created_at: result.created_at,
        bytes: result.bytes,
        format: result.format,
        display_name: result.display_name || result.public_id,
        width: result.width,
        height: result.height
      });
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({error: 'Failed to upload file'}, {status: 500});
  }
}
