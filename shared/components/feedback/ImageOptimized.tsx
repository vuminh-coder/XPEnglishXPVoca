import Image from 'next/image';

export default function ImageOptimized({ src, alt, width, height, className }: { src: string, alt: string, width?: number, height?: number, className?: string }) {
  return (
    <Image 
      src={src} 
      alt={alt} 
      width={width || 100} 
      height={height || 100} 
      className={className} 
      priority
    />
  );
}