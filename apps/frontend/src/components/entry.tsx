import { ListResponse } from '@unixp0rn/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { FallbackImage } from './fallback-image';
import { Reactions } from './reactions';
import { useAtom } from 'jotai';
import { entriesAtom, filterAtom, pageAtom, refetchAtom } from '@/lib/states';
import { FallbackVideo } from './fallback-video';

export function Entries() {
  const [entries, _setEntries] = useAtom(entriesAtom);

  return (
    <div className="flex flex-col items-center justify-center h-[100%-7rem]">
      {entries.length != 0 ? (
        entries.map((entry) => <Entry key={entry.id} entry={entry} />)
      ) : (
        <h1 className="w-fit font-thin font-mono tracking-wider">
          Nothing to display. Change the filters to see some posts.
        </h1>
      )}
    </div>
  );
}

function Entry({ entry }: { entry: ListResponse }) {
  const [_filters, setFilter] = useAtom(filterAtom);
  const [_refetch, setRefetch] = useAtom(refetchAtom);
  const [_page, setPage] = useAtom(pageAtom);

  return (
    <Card className="font-mono w-full">
      <CardHeader>
        <CardTitle className="flex flex-row items-center gap-2">
          <Avatar
            className="cursor-pointer border-slate-500 border-2 rounded-full"
            onClick={() => {
              setFilter((f) => ({ ...f, authorId: entry.authorId }));
              setPage(0);
              setRefetch((r) => !r);
            }}
          >
            <AvatarImage
              src={'https://ui-avatars.com/api/?name=' + entry.author.username}
              className="rounded-full"
            />
          </Avatar>
          <div>
            <span className="block">{entry.author.username}</span>
            <span className="block font-normal text-sm">
              {new Date(entry.timestamp).toLocaleString()}
            </span>
          </div>
        </CardTitle>
        <CardDescription>{entry.content}</CardDescription>
      </CardHeader>
      <CardContent className="px-20 py-6 outline-red-800 ">
        <Carousel
          className="w-1/2 aspect-video outline-green-100"
          opts={{ active: true }}
        >
          <CarouselContent>
            {entry.attachments.map((a) => (
              <CarouselItem key={a.id} className="p-4">
                {a.type.startsWith('video') ? (
                  <FallbackVideo src={a.url} id={a.id} />
                ) : (
                  <FallbackImage src={a.url} id={a.id} />
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
          {entry.attachments.length > 1 && (
            <>
              <CarouselNext />
              <CarouselPrevious />
            </>
          )}
        </Carousel>
      </CardContent>
      <CardFooter>
        <Reactions reactions={entry.reactions} />
      </CardFooter>
    </Card>
  );
}
