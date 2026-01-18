import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Eye, Ban, User } from "lucide-react";
import UserInformation from "./user-information";

export default function TotalUserTable() {
    return (
        <div className="mt-6 rounded-xl overflow-hidden border">
            <Table>

                {/* HEADER */}
                <TableHeader className="bg-blue-600">
                    <TableRow>
                        <TableHead className="text-white text-lg"> <span className="ml-4"> User </span> </TableHead>
                        <TableHead className="text-white text-lg"><span className=""> Role </span></TableHead>
                        <TableHead className="text-white text-lg"><span className="text-center ml-2  "> Status </span></TableHead>
                        <TableHead className="text-white text-lg text-center">
                            <span> Action

                            </span>
                        </TableHead>
                    </TableRow>
                </TableHeader>

                {/* BODY */}
                <TableBody>
                    <TableRow className="h-20">

                        {/* USER */}
                        <TableCell>
                            <UserInformation />
                        </TableCell>

                        {/* ROLE */}
                        <TableCell className="text-lg">
                            <span className="text-center"> User </span>
                        </TableCell>

                        {/* STATUS */}
                        <TableCell>

                            {/* Active */}
                            <span className="px-4 py-1 rounded-full text-center bg-green-400 text-green-900 text-sm font-medium">
                                Active
                            </span>

                            {/* Blocked */}
                            {/* <span className="px-4 py-1 rounded-full text-center bg-red-400 text-red-900 text-sm font-medium">
                                Blocked
                            </span> */}
                        </TableCell>

                        {/* ACTION */}
                        <TableCell>
                            <div className="flex justify-center gap-4">
                                <Eye className="text-blue-600 cursor-pointer" />
                                <Ban className="text-red-500 cursor-pointer" />
                            </div>
                        </TableCell>

                    </TableRow>
                </TableBody>

            </Table>
        </div>
    );
}
