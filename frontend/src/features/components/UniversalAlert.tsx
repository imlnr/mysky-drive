import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

interface UniversalAlertProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    title: string
    description: string
    onContinue?: () => void
    onCancel?: () => void
    continueText?: string
    cancelText?: string
    continueVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    cancelVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    showCancel?: boolean
    showContinue?: boolean
}

export const UniversalAlert = ({
    open,
    onOpenChange,
    title,
    description,
    onContinue,
    onCancel,
    continueText = "Continue",
    cancelText = "Cancel",
    continueVariant = "default",
    cancelVariant = "outline",
    showCancel = true,
    showContinue = true,
}: UniversalAlertProps) => {
    const handleContinue = () => {
        onContinue?.()
        onOpenChange(false)
    }

    const handleCancel = () => {
        onCancel?.()
        onOpenChange(false)
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    {showCancel && (
                        <AlertDialogCancel asChild>
                            <Button variant={cancelVariant} onClick={handleCancel}>
                                {cancelText}
                            </Button>
                        </AlertDialogCancel>
                    )}
                    {showContinue && (
                        <AlertDialogAction asChild>
                            <Button variant={continueVariant} onClick={handleContinue}>
                                {continueText}
                            </Button>
                        </AlertDialogAction>
                    )}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
