import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

type SafeImageProps = ImageProps & {
  fallbackText?: string;
  fallbackImageUrl?: string;
};

/**
 * A wrapper around Next.js Image component that provides fallback
 * when images fail to load
 */
export default function SafeImage({
  fallbackText,
  fallbackImageUrl,
  alt,
  ...props
}: SafeImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    if (fallbackImageUrl) {
      return (
        <Image
          {...props}
          src={fallbackImageUrl}
          alt={alt}
        />
      );
    }

    // Show initials or first letter as fallback
    return (
      <div 
        className="flex items-center justify-center bg-gray-100 text-gray-800 font-medium" 
        style={{ 
          width: typeof props.width === 'number' ? `${props.width}px` : props.width,
          height: typeof props.height === 'number' ? `${props.height}px` : props.height
        }}
      >
        {fallbackText || alt?.[0]?.toUpperCase() || '?'}
      </div>
    );
  }

  return (
    <Image
      {...props}
      alt={alt}
      onError={() => setError(true)}
    />
  );
} 