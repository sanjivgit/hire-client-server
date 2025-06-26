
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { FileText } from "lucide-react"

interface IframeModalProps {
    blobUrl?: any;
    title?: string
    description?: string;
    isOpen: boolean;
    setIsOpen: () => void;
}

export default function IframeModal({
    blobUrl,
    title = "File Preview",
    description = "Preview of the secure file content",
    isOpen = false,
    setIsOpen,
}: IframeModalProps) {
    // Example blob URL for demonstration
    const exampleBlobUrl =
        blobUrl || "data:text/html,<html><body><h1>Sample Content</h1><p>This is a sample file preview.</p></body></html>"

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-w-4xl w-full h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                <div className="flex-1 min-h-0 border rounded-md overflow-hidden">
                    {exampleBlobUrl ? (
                        <iframe
                            src={exampleBlobUrl}
                            style={{ width: "100%", height: "100%" }}
                            title="Secure File"
                            className="border-0"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                            <div className="text-center">
                                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p>No file to preview</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex justify-end pt-4">
                    <Button variant="outline" onClick={setIsOpen}>
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
