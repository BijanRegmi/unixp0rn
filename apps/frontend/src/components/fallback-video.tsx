import { useState } from 'react';

export function FallbackVideo({ src, id }: { src: string; id: string }) {
  const [errored, setErrored] = useState(false);

  return !errored ? (
    <video
      className="w-full rounded-md"
      src={src}
      onError={() => setErrored(true)}
      controls
      muted={false}
    />
  ) : (
    <video
      className="w-full rounded-md"
      src={`/app/image?attachmentId=${id}`}
      controls
      muted={false}
    />
  );
}
