import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function PageHeader({
  title,
  subtitle,
  children,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6",
        className
      )}
    >
      <div className="space-y-1">
        <h1 className="text-[20px] font-bold tracking-tight text-foreground leading-none">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[13px] text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {children && (
        <div className="flex items-center gap-2 flex-wrap">{children}</div>
      )}
    </div>
  );
}
