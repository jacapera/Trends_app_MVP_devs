import React from "react";
interface NavButtonProps {
    onClick: () => void;
    icon: React.ElementType;
}
export declare const NavButton: ({ onClick, icon }: NavButtonProps) => React.JSX.Element;
export {};
