import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

import { PlacesClient } from "./components/client";
import { PlaceColumn } from "./components/columns";

const PlacesPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const places = await prismadb.place.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      section: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedplaces: PlaceColumn[] = places.map((item: any) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    location: item.location,
    section: item.section.name,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PlacesClient data={formattedplaces} />
      </div>
    </div>
  );
};

export default PlacesPage;
