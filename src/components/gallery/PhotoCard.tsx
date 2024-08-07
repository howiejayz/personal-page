'use client';

import { useEffect } from 'react';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { Card, CardFooter, CardHeader } from '@nextui-org/card';

import { GalleryPhoto } from '@/lib/definitions';

import { useQueryString } from '@/utils/hooks';

export function PhotoCard({ photo }: { photo: GalleryPhoto }) {
  const router = useRouter();
  const pathname = usePathname();
  const hasQueryString = useQueryString('has');
  const setQueryString = useQueryString('set');

  const hasAreaQuery = hasQueryString('area');

  const queryString = hasAreaQuery
    ? setQueryString('photo', photo.slug)
    : setQueryString('area', photo.areaSlug);

  useEffect(() => {
    router.prefetch(pathname + '?' + queryString);
  }, [pathname, queryString, router]);

  const handlePress = () => {
    router.push(pathname + '?' + queryString, {
      scroll: false,
    });
  };

  return (
    <Card
      isPressable
      disableRipple
      onPress={handlePress}
      isFooterBlurred={hasAreaQuery}
      className="w-full h-[240px] shadow-none"
    >
      {!hasAreaQuery && (
        <CardHeader className="w-fit justify-center overflow-hidden py-2 absolute bottom-1 left-1 ml-1 z-10">
          <p className="text-white text-md font-bold font-serif">
            {photo.placeArea}
          </p>
        </CardHeader>
      )}
      <Image
        src={photo.thumbnailURL}
        placeholder="blur"
        blurDataURL={photo.blurDataURL}
        alt={photo.title || 'untitled'}
        priority={true}
        width={640}
        height={480}
        sizes="(max-width: 768px) 84vw, (max-width: 1280px) 42vw, 28vw"
        className="z-0 w-full h-full object-cover hover:scale-125 transition-transform transform-gpu duration-400 ease-in-out"
      />
      {hasAreaQuery && (
        <CardFooter className="absolute bg-white/30 bottom-0 z-10 justify-center p-2">
          <div>
            <p className="text-white text-tiny flex space-x-3 justify-between font-serif">
              <span>{photo.make}</span>
              <span>{photo.model}</span>
              <span>{photo.lensModel}</span>
              <span>{photo.exposureTime}</span>
              <span>{photo.fNumber}</span>
              <span>{photo.iso}</span>
            </p>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
