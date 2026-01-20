import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import MapHolder from "./map-component";

export default function CreateSafeZoneModal() {
    return (
        <>
            <Dialog>
                <DialogTrigger className="w-full rounded-sm h-15 text-white bg-[#0066CC] hover:bg-[#4894db]"> Create Safe Zone </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
}