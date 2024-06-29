import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Filters as FiltersIcon } from './icons/filters';
import { Asc } from './icons/Asc';
import { Desc } from './icons/Desc';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ListFilter, SortFields } from '@unixp0rn/types';
import { Separator } from './ui/separator';
import { useAtom } from 'jotai';
import { filterAtom, sortAtom } from '@/lib/states';

export function Filters({ refetch }: { refetch: () => void }) {
  const [sort, setSort] = useAtom(sortAtom);
  const [filters, setFilters] = useAtom(filterAtom);

  return (
    <Popover>
      <PopoverTrigger className="absolute top-12 translate-y-[-50%] right-2 border-black border p-2 rounded focus:outline-none">
        <FiltersIcon />
      </PopoverTrigger>
      <PopoverContent>
        <div className="w-full flex gap-4 justify-around mb-4">
          <Select
            value={sort?.field}
            onValueChange={(v: SortFields) => {
              setSort((o) => ({
                field: v,
                order: o?.order || 'DESC',
              }));
            }}
          >
            <SelectTrigger className="focus:ring-transparent">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Reaction_Count">Reaction Count</SelectItem>
              <SelectItem value="Timestamp">Timestamp</SelectItem>
            </SelectContent>
          </Select>
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

        <Separator />

        <div className="mt-4 flex flex-col gap-2 mb-4">
          <div className="w-full flex items-center gap-4">
            <Label>Reaction Count</Label>
            <Input
              className="focus-visible:ring-transparent"
              type="number"
              value={
                filters?.reactionCount?.between?.start ||
                filters?.reactionCount?.gte ||
                ''
              }
              onChange={(e) => {
                setFilters((f) => {
                  const otherValue =
                    filters?.reactionCount?.lte ||
                    filters?.reactionCount?.between?.end;

                  return {
                    ...f,
                    reactionCount: otherValue
                      ? {
                          between: {
                            start: +e.target.value,
                            end: otherValue,
                          },
                        }
                      : { gte: +e.target.value },
                  };
                });
              }}
            />
            <Label>to</Label>
            <Input
              className="focus-visible:ring-transparent"
              type="number"
              value={
                filters?.reactionCount?.between?.end ||
                filters?.reactionCount?.lte ||
                ''
              }
              onChange={(e) => {
                setFilters((f) => {
                  const otherValue =
                    filters?.reactionCount?.gte ||
                    filters?.reactionCount?.between?.start;

                  return {
                    ...f,
                    reactionCount: otherValue
                      ? {
                          between: {
                            start: otherValue,
                            end: +e.target.value,
                          },
                        }
                      : { lte: +e.target.value },
                  };
                });
              }}
            />
          </div>
          <div className="w-full flex items-center gap-4">
            <Label>Content</Label>
            <Input
              type="text"
              className="focus-visible:ring-transparent"
              value={filters?.content || ''}
              onChange={(e) => {
                setFilters((f) => ({
                  ...f,
                  content: e.target.value || undefined,
                }));
              }}
            />
          </div>
          <div className="w-full flex items-center gap-4">
            <Label>Author</Label>
            <Input
              type="text"
              className="focus-visible:ring-transparent"
              value={filters?.authorName || ''}
              onChange={(e) => {
                setFilters((f) => ({
                  ...f,
                  authorName: e.target.value || undefined,
                }));
              }}
            />
          </div>

          {filters?.authorId && (
            <div className="w-full flex items-center gap-4">
              <Label>AuthorId</Label>
              <Input
                type="text"
                className="focus-visible:ring-transparent"
                value={filters?.authorId || ''}
                onChange={(e) => {
                  setFilters((f) => ({
                    ...f,
                    authorId: e.target.value || undefined,
                  }));
                }}
              />
            </div>
          )}
          <div className="w-full flex items-center gap-4">
            <Select
              value={filters?.contentType}
              onValueChange={(v) => {
                setFilters((f) => {
                  return {
                    ...f,
                    contentType: v as ListFilter['contentType'],
                  };
                });
              }}
            >
              <SelectTrigger className="focus:ring-transparent">
                <SelectValue placeholder="Content Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="video">Video</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        <div className="flex w-full justify-end items-center gap-2">
          <button
            className="px-2 py-1 mt-4 border-black border rounded-sm"
            onClick={() => {
              setSort(null);
              setFilters(null);
            }}
          >
            Reset
          </button>
          <button
            className="px-2 py-1 mt-4 border-black border rounded-sm"
            onClick={() => refetch()}
          >
            Apply
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
