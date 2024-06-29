import { ListFilter, ListResponse, ListSort } from '@unixp0rn/types';
import { atom } from 'jotai';

export const sortAtom = atom<ListSort | null>({
  field: 'Reaction_Count',
  order: 'DESC',
});
export const filterAtom = atom<ListFilter | null>(null);
export const pageAtom = atom<number>(-2);
export const entriesAtom = atom<ListResponse[]>([]);
export const refetchAtom = atom<boolean>(false);
