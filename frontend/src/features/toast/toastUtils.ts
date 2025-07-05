import { toast } from "sonner";

export function showToast(description: string, type?: "success" | "info" | "warning" | "error") {
    if (type === "success") {
        return toast.success(description)
    }
    else if (type === "info") {
        return toast.info(description)
    }
    else if (type === "warning") {
        return toast.warning(description);
    }
    else if (type === "error") {
        return toast.error(description)
    }

    return toast(description)
}