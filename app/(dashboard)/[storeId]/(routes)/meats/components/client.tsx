"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { columns, MeatColumn } from "./columns";

interface MeatsClientProps {
    data: MeatColumn[];
}

export const MeatsClient: React.FC<MeatsClientProps> = ({
    data
}) => {
    const params = useParams();
    const router = useRouter();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Meats (${data.length})`} description="Manage meats for your products" />
                <Button onClick={() => router.push(`/${params.storeId}/meats/new`)}>
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
            <Heading title="API" description="API Calls for meats" />
            <Separator />
            <ApiList entityName="meats" entityIdName="meatId" />
        </>
    );
};