import fs from 'fs';
import path from 'path';
import GalleryClient from './GalleryClient';

export default async function GalleryPage() {
  const publicDir = path.join(process.cwd(), 'public', 'gallery');
  const photosData = [];

  try {
    if (fs.existsSync(publicDir)) {
      const files = fs.readdirSync(publicDir);
      for (const file of files) {
        // Only include image files
        if (/\.(jpg|jpeg|png|webp|svg)$/i.test(file)) {
          photosData.push({
            src: `/gallery/${file}`,
            filename: file
          });
        }
      }
    }
  } catch (error) {
    console.error("Error reading gallery directory:", error);
  }

  return <GalleryClient photos={photosData} />;
}
