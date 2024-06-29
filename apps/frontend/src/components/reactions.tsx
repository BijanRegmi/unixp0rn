import { ReactionResponse } from '@unixp0rn/types';

export function Reactions({ reactions }: { reactions: ReactionResponse[] }) {
  return (
    <div className="flex flex-row gap-2">
      {reactions
        .sort((a, b) => (a.count < b.count ? 1 : -1))
        .map((r) => (
          <div
            key={r.id}
            className="border-red-400 border flex flex-row gap-1 items-center justify-around rounded p-1 shadow-md shadow-red-300"
          >
            {r.url ? (
              <img src={r.url} className="w-6 h-6" />
            ) : (
              <span>{r.name}</span>
            )}
            <span>{r.count}</span>
          </div>
        ))}
    </div>
  );
}
