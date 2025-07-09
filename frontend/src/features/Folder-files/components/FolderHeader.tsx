import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
    BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";
import { ViewSwitcher, type ViewType } from './ViewSwitcher';

const MAX_BREADCRUMBS = 4;

interface FolderHeaderProps {
    view: ViewType;
    onViewChange: (view: ViewType) => void;
}

export const FolderHeader = React.memo(({ view, onViewChange }: FolderHeaderProps) => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter(Boolean);
    const shouldEllipsis = pathnames.length > MAX_BREADCRUMBS;

    // If too many, show first, ellipsis, last two
    let displaySegments = pathnames;
    if (shouldEllipsis) {
        displaySegments = [
            pathnames[0],
            "...",
            ...pathnames.slice(-2),
        ];
    }

    return (
        <div className="flex items-center justify-between p-4">
            <Breadcrumb>
                <BreadcrumbList className="text-base font-semibold sm:text-lg">
                    {displaySegments.map((segment, index) => {
                        // Handle ellipsis
                        if (segment === "...") {
                            return <BreadcrumbEllipsis key="ellipsis" />;
                        }
                        const realIndex = shouldEllipsis && index > 0 ? pathnames.length - (displaySegments.length - index) : index;
                        const to =
                            segment === "..."
                                ? undefined
                                : "/" + pathnames.slice(0, realIndex + 1).join("/");
                        const isLast = index === displaySegments.length - 1;
                        return (
                            <React.Fragment key={to || "ellipsis"}>
                                {index !== 0 && <BreadcrumbSeparator />}
                                <BreadcrumbItem>
                                    {isLast ? (
                                        <BreadcrumbPage className="capitalize">{segment}</BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink asChild>
                                            <Link to={to!} className="capitalize">
                                                {segment}
                                            </Link>
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                            </React.Fragment>
                        );
                    })}
                </BreadcrumbList>
            </Breadcrumb>
            <ViewSwitcher view={view} onViewChange={onViewChange} />
        </div>
    );
});

FolderHeader.displayName = 'FolderHeader'; 