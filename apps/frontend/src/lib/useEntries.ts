import { ListResponse } from '@unixp0rn/types';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import {
  entriesAtom,
  filterAtom,
  pageAtom,
  refetchAtom,
  sortAtom,
} from './states';

export function useEntries() {
  const [_entries, setEntries] = useAtom(entriesAtom);
  const [page, setPage] = useAtom(pageAtom);
  const [filters, _setFilters] = useAtom(filterAtom);
  const [sort, _setSort] = useAtom(sortAtom);

  const [refetchValue, setRefetch] = useAtom(refetchAtom);

  useEffect(() => {
    async function fn() {
      const entries: ListResponse[] = await fetch(
        '/app?' +
          new URLSearchParams({
            skip: (page * 10).toString(),
            take: '10',
            ...(sort ? { sort: JSON.stringify(sort) } : {}),
            ...(filters ? { filter: JSON.stringify(filters) } : {}),
          }).toString(),
      ).then((res) => res.json());

      setEntries((e) => (page == 0 ? entries : [...e, ...entries]));

      if (entries.length == 0) {
        setPage(-1);
      }
    }

    if (page < 0) return;

    fn();
  }, [page, refetchValue]);

  const nextPage = () => {
    setPage((p) => {
      if (p == -2) {
        // If initial fetch
        return 0;
      } else if (p == -1) {
        // If stopped
        return -1;
      } else {
        // If next page}
        return p + 1;
      }
    });
  };

  const refetch = () => {
    setPage(0);
    setRefetch((r) => !r);
  };

  return {
    nextPage,
    refetch,
  };
}
