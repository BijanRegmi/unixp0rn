import { ListFilter, ListResponse, ListSort } from '@unixp0rn/types';
import { useEffect, useState } from 'react';

export function useEntries() {
  const [entries, setEntries] = useState<ListResponse[]>([]);
  const [page, setPage] = useState<number>(0);
  const [filters, setFilters] = useState<ListFilter | null>(null);
  const [sort, setSort] = useState<ListSort | null>({
    field: 'Timestamp',
    order: 'DESC',
  });

  useEffect(() => {
    async function fn() {
      const entries: ListResponse[] = await fetch(
        'http://localhost:3000/app?' +
        new URLSearchParams({
          skip: (page * 10).toString(),
          take: '10',
          ...(sort ? { sort: JSON.stringify(sort) } : {}),
          ...(filters ? { filter: JSON.stringify(filters) } : {}),
        }).toString(),
      ).then((res) => res.json());
      if (entries.length == 0) {
        setPage(-1);
      }
      setEntries((e) => [...e, ...entries]);
    }

    if (page == -1) return;

    fn();
  }, []);

  const nextPage = () => {
    setPage((p) => p + 1);
  };

  return { entries, page, filters, setFilters, sort, setSort, nextPage };
}
