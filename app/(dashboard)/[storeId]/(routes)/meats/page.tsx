import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { MeatColumn } from "./components/columns"
import { MeatsClient } from "./components/client";

const MeatsPage = async ({
    params
}: {
    params: { storeId: string }
}) => {
    const meats = await prismadb.meat.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedmeats: MeatColumn[] = meats.map((item) => ({
        id: item.id,
        name: item.name,
        createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <MeatsClient data={formattedmeats} />
            </div>
        </div>
    );
};

export default MeatsPage;