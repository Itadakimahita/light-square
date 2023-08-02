import prismadb from "@/lib/prismadb";

import { MeatForm } from "./components/meat-form";

const MeatPage = async ({
    params
}: {
    params: { meatId: string }
}) => {
    const meat = await prismadb.meat.findUnique({
        where: {
            id: params.meatId
        }
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <MeatForm initialData={meat} />
            </div>
        </div>
    );
}

export default MeatPage;