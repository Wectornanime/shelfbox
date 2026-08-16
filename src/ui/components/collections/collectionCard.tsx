import { Card, CardHeader, CardTitle, Link } from "@heroui/react";

interface CollectionCardProps {
  title: string;
  id: string;
}

export default function CollectionCard({ title, id }: CollectionCardProps) {
  return (
    <Link href={`/collections/${id}`}>
      <Card className="flex w-24 gap-2 p-0 rounded-md">
        <img
          alt="Indie Hackers community"
          className="pointer-events-none aspect-square w-24 rounded-md object-cover select-none"
          loading="lazy"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo1.jpg"
        />
        <CardHeader className="px-2 pb-1">
          <CardTitle>{title}</CardTitle>
          {/* <CardDescription>148 members</CardDescription> */}
        </CardHeader>
      </Card>
    </Link>
  );
}
