import { useState } from 'react';

export function FallbackImage({ src, id }: { src: string; id: string }) {
  const [errored, setErrored] = useState(false);

  return !errored ? (
    <img className="w-full rounded-md" src={src} onError={() => setErrored(true)} />
  ) : (
    <img
      className="w-full rounded-md"
      src={`http://localhost:3000/app/image?attachmentId=${id}`}
    />
  );
}
