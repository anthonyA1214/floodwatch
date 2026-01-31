import {
  Avatar as UIAvatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import {
  IconClock,
  IconFlag,
  IconMapPin,
  IconPoint,
  IconTrash,
} from '@tabler/icons-react';
import Avatar from 'boring-avatars';

export default function PostCard() {
  return (
    <div className="flex flex-col rounded-2xl p-4 border gap-4">
      {/* 1st */}
      <div className="flex gap-2 items-center">
        <UIAvatar className="size-10">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>
            <Avatar name="John Doe" variant="beam" />
          </AvatarFallback>
        </UIAvatar>

        <div className="flex flex-col w-full">
          <div className="flex justify-between w-full items-center">
            <span className="font-semibold">John Doe</span>

            <div className="flex items-center gap-4 text-xs text-gray-600">
              <button className="rounded-full hover:bg-gray-100 p-2 transition">
                <IconFlag className="w-[1.5em]! h-[1.5em]!" />
              </button>
              <button className="rounded-full hover:bg-gray-100 p-2 transition">
                <IconTrash className="w-[1.5em]! h-[1.5em]!" />
              </button>
            </div>
          </div>
          <div className="text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <IconClock className="w-[1.5em]! h-[1.5em]!" />
                <span>2hrs ago</span>
              </div>

              <IconPoint className="w-[1.2em]! h-[1.2em]!" />

              <div className="flex items-center gap-1">
                <IconMapPin className="w-[1.5em]! h-[1.5em]!" />
                <span>BRGY 174, Kai mall caloocan city</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        Heavy rainfall in Zapote area, its starting to accumulate water. Please
        be careful if you&apos;re heading this way! #Flood
      </div>
    </div>
  );
}
