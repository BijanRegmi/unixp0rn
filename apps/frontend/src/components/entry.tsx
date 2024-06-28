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

export function Entry({ entry }: { entry: ListResponse }) {
  return (
    <Card className="font-mono">
      <CardHeader>
        <CardTitle className="flex flex-row items-center gap-2">
          <Avatar>
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
                <FallbackImage src={a.url} id={a.id} />
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
