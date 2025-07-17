import { useState } from 'react'
import SidebarWrapper from '@/features/sidebar/Sidebar'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Trash2, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Bin = () => {
    const [showAlert, setShowAlert] = useState(true);

    return (
        <SidebarWrapper>
            <AnimatePresence>
                {showAlert && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        style={{ position: 'relative' }}
                    >
                        <Alert variant="destructive">
                            <Trash2 />
                            {/* <AlertTitle>Items in Bin will be deleted automatically</AlertTitle> */}
                            <AlertDescription>
                                Files and folders moved to the Bin will be permanently deleted after 30 days. Please restore any items you wish to keep before they are removed.
                            </AlertDescription>
                            <button
                                onClick={() => setShowAlert(false)}
                                className="absolute top-3 right-2 bg-transparent border-none cursor-pointer p-0 text-inherit border-destructive"
                                aria-label="Close alert"
                                type="button"
                            >
                                <X size={18} />
                            </button>
                        </Alert>
                    </motion.div>
                )}
            </AnimatePresence>
            <div>Bin</div>
        </SidebarWrapper>
    )
}

export default Bin