import { cn } from "@/lib/utils";

interface DashboardContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function DashboardContainer({
  children,
  className,
}: DashboardContainerProps) {
  return (
    <main
      className={cn(
        "flex-1 overflow-y-auto bg-background",
        "px-4 py-5 md:px-6 md:py-6",
        className
      )}
    >
      {children}
    </main>
  );
}
