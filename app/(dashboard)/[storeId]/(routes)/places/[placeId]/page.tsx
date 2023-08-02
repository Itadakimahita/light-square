import prismadb from "@/lib/prismadb";

import { PlaceForm } from "./components/place-form";

const PlacePage = async ({
  params
}: {
  params: { placeId: string, storeId: string }
}) => {
  const place = await prismadb.place.findUnique({
    where: {
      id: params.placeId,
    },
    include: {
      images: true,
    }
  });

  const sections = await prismadb.section.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PlaceForm 
          sections={sections} 
          initialData={place}
        />
      </div>
    </div>
  );
}

export default PlacePage;
