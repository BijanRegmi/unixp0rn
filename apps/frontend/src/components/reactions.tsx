import { ReactionResponse } from '@unixp0rn/types';

export function Reactions({ reactions }: { reactions: ReactionResponse[] }) {
  return (
    <div className="flex flex-row gap-2">
      {reactions
        .sort((a, b) => (a.count < b.count ? 1 : -1))
        .map((r) => (
          <div
            key={r.id}
            className="border-red-400 border rounded p-1 shadow-md shadow-red-300"
          >
            {r.name} {r.count}
          </div>
        ))}
    </div>
  );
}
