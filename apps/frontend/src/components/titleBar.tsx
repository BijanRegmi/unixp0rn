import { type useEntries } from '@/lib/useEntries';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Filters } from './icons/filters';
import { Asc } from './icons/Asc';
import { Desc } from './icons/Desc';

type TitleBarProps = Pick<
  ReturnType<typeof useEntries>,
  'filters' | 'setFilters' | 'setSort' | 'sort'
>;

export function TitleBar({
  sort,
  setSort,
  filters,
  setFilters,
}: TitleBarProps) {
  return (
    <div className="w-full h-24 p-2 sticky top-0 bg-white z-50 border-b-2 border-black ">
      <div className="h-full mx-auto flex flex-col items-center">
        <h1 className="font-bold w-fit p-2 capitalize text-3xl border-black border rounded">
          U
        </h1>
        <h2>UNIXP0RN</h2>
      </div>
      <Popover>
        <PopoverTrigger className="absolute top-12 translate-y-[-50%] right-2 border-black border p-2 rounded focus:outline-none">
          <Filters />
        </PopoverTrigger>
        <PopoverContent>
          <div
            className={`w-full flex flex-gap justify-between mb-4 ${!!sort && 'border-r-black border-r '}`}
          >
            <button
              className="hover:scale-105"
              onClick={() => {
                setSort((o) =>
                  !o
                    ? { order: 'DESC', field: 'Reaction_Count' }
                    : {
                      order: o.order,
                      field:
                        o.field === 'Timestamp'
                          ? 'Reaction_Count'
                          : 'Timestamp',
                    },
                );
              }}
            >
              {sort?.field === 'Timestamp' ? 'Timestamp' : 'Reaction Count'}
            </button>
            <button
              onClick={() => {
                setSort((o) =>
                  !o
                    ? { order: 'DESC', field: 'Reaction_Count' }
                    : {
                      field: o.field,
                      order: o.order === 'DESC' ? 'ASC' : 'DESC',
                    },
                );
              }}
            >
              {sort?.order === 'ASC' ? <Asc /> : <Desc />}
            </button>
          </div>
          <div className="w-full flex flex-gap gap-4">
            <label>Reaction Count</label>
            <input
              className="appearance-none outline-none h-full w-8 border-b border-black"
              type="number"
              value={
                filters?.reactionCount?.between?.start ||
                filters?.reactionCount?.gte
              }
              onChange={(e) => {
                setFilters((f) => {
                  const otherValue =
                    filters?.reactionCount?.lte ||
                    filters?.reactionCount?.between?.end;

                  return {
                    ...f,
                    reactionCount: otherValue
                      ? { between: { start: +e.target.value, end: otherValue } }
                      : { gte: +e.target.value },
                  };
                });
              }}
            />
            <label>to</label>
            <input
              className="appearance-none outline-none h-full w-8 border-b border-black"
              type="number"
              value={
                filters?.reactionCount?.between?.end ||
                filters?.reactionCount?.lte
              }
              onChange={(e) => {
                setFilters((f) => {
                  const otherValue =
                    filters?.reactionCount?.gte ||
                    filters?.reactionCount?.between?.start;

                  return {
                    ...f,
                    reactionCount: otherValue
                      ? { between: { start: otherValue, end: +e.target.value } }
                      : { lte: +e.target.value },
                  };
                });
              }}
            />
          </div>
          <div className="w-full flex flex-gap gap-4">
            <label>Content</label>
            <input
              className="appearance-none outline-none h-full w-full border-b border-black"
              type="text"
              value={filters?.content}
              onChange={(e) => {
                setFilters((f) => ({
                  ...f,
                  content: e.target.value || undefined,
                }));
              }}
            />
          </div>

          <button
            className="ml-auto block px-2 py-1 mt-4 border-black border rounded-sm"
            onClick={() => {
              setSort(null);
              setFilters(null);
            }}
          >
            Clear
          </button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
