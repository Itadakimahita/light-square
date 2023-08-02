import prismadb from "@/lib/prismadb";

import { SectionForm } from "./components/section-form";

const SectionPage = async ({
    params
}: {
    params: { sectionId: string, storeId: string }
}) => {
    const section = await prismadb.section.findUnique({
        where: {
            id: params.sectionId
        }
    });
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SectionForm initialData={section} />
            </div>
        </div>
    );
}

export default SectionPage;