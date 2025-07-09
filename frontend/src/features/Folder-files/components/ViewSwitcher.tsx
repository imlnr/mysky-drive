import React from 'react';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Grid3X3, List, Grid, Calendar } from 'lucide-react';

export type ViewType = 'grid' | 'list' | 'compact' | 'detailed';

interface ViewSwitcherProps {
    view: ViewType;
    onViewChange: (view: ViewType) => void;
}

const viewOptions = [
    { type: 'grid' as ViewType, icon: Grid3X3, label: 'Grid' },
    { type: 'list' as ViewType, icon: List, label: 'List' },
    { type: 'compact' as ViewType, icon: Grid, label: 'Compact' },
    { type: 'detailed' as ViewType, icon: Calendar, label: 'Detailed' },
];

export const ViewSwitcher = React.memo(({ view, onViewChange }: ViewSwitcherProps) => {
    const currentView = viewOptions.find(v => v.type === view);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                    {currentView?.icon &&
                        React.createElement(currentView.icon, { className: "h-4 w-4 mr-2" })}
                    {currentView?.label}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {viewOptions.map((option) => (
                    <DropdownMenuItem
                        key={option.type}
                        onClick={() => onViewChange(option.type)}
                        className={view === option.type ? "bg-accent" : ""}
                    >
                        <option.icon className="h-4 w-4 mr-2" />
                        {option.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
});

ViewSwitcher.displayName = 'ViewSwitcher'; 