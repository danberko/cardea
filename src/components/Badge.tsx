import React from 'react';

export type BadgeColor = 'red' | 'yellow' | 'green' | 'blue' | 'indigo' | 'purple' | 'pink' | 'gray';

interface BadgeProps {
  children: React.ReactNode;
  color?: BadgeColor;
  className?: string;
}

const colorMap: Record<BadgeColor, string> = {
  red: 'fill-red-500',
  yellow: 'fill-yellow-500',
  green: 'fill-green-500',
  blue: 'fill-blue-500',
  indigo: 'fill-indigo-500',
  purple: 'fill-purple-500',
  pink: 'fill-pink-500',
  gray: 'fill-gray-500',
};

export function Badge({ children, color = 'gray', className = '' }: BadgeProps) {
  const dotColor = colorMap[color];
  
  return (
    <span className={`inline-flex items-center gap-x-1.5 rounded-full bg-white px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-gray-200 ring-inset ${className}`}>
      <svg className={`size-1.5 ${dotColor}`} viewBox="0 0 6 6" aria-hidden="true">
        <circle cx="3" cy="3" r="3" />
      </svg>
      {children}
    </span>
  );
}

// Pre-configured badge variants for common use cases
export function RedBadge({ children, className }: Omit<BadgeProps, 'color'>) {
  return <Badge color="red" className={className}>{children}</Badge>;
}

export function YellowBadge({ children, className }: Omit<BadgeProps, 'color'>) {
  return <Badge color="yellow" className={className}>{children}</Badge>;
}

export function GreenBadge({ children, className }: Omit<BadgeProps, 'color'>) {
  return <Badge color="green" className={className}>{children}</Badge>;
}

export function BlueBadge({ children, className }: Omit<BadgeProps, 'color'>) {
  return <Badge color="blue" className={className}>{children}</Badge>;
}

export function IndigoBadge({ children, className }: Omit<BadgeProps, 'color'>) {
  return <Badge color="indigo" className={className}>{children}</Badge>;
}

export function PurpleBadge({ children, className }: Omit<BadgeProps, 'color'>) {
  return <Badge color="purple" className={className}>{children}</Badge>;
}

export function PinkBadge({ children, className }: Omit<BadgeProps, 'color'>) {
  return <Badge color="pink" className={className}>{children}</Badge>;
}

export function GrayBadge({ children, className }: Omit<BadgeProps, 'color'>) {
  return <Badge color="gray" className={className}>{children}</Badge>;
} 