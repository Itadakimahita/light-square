import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { SectionColumn } from "./components/columns"
import { SectionsClient } from "./components/client";

const SectionsPage = async ({
    params
}: {
    params: { storeId: string }
}) => {
    const sections = await prismadb.section.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedSections: SectionColumn[] = sections.map((item: any) => ({
        id: item.id,
        name: item.name,
        createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SectionsClient data={formattedSections} />
            </div>
        </div>
    );
};

export default SectionsPage;