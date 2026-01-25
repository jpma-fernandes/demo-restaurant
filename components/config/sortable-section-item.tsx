"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useTranslations } from "next-intl";
import { GripVertical } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useSectionConfig } from "@/hooks/use-section-config";
import { cn } from "@/lib/utils";

interface SortableSectionItemProps {
  id: string;
  enabled: boolean;
}

export function SortableSectionItem({ id, enabled }: SortableSectionItemProps) {
  const t = useTranslations();
  const tConfig = useTranslations("config");
  const { toggleSection } = useSectionConfig();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Get the display name from translations
  const getDisplayName = () => {
    try {
      return t(`common.${id}`);
    } catch {
      // Fallback to section-specific title
      try {
        return t(`${id}.title`);
      } catch {
        return id;
      }
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg bg-charcoal border border-gunmetal",
        "transition-all duration-200",
        isDragging && "opacity-50 shadow-lg scale-[1.02]",
        !enabled && "opacity-60"
      )}
    >
      {/* Drag Handle */}
      <button
        {...attributes}
        {...listeners}
        className="touch-none text-slate hover:text-smoke cursor-grab active:cursor-grabbing p-1 -ml-1"
        title={tConfig("dragHandle")}
      >
        <GripVertical className="h-5 w-5" />
      </button>

      {/* Section Name */}
      <span
        className={cn(
          "flex-1 font-medium capitalize",
          enabled ? "text-smoke" : "text-slate"
        )}
      >
        {getDisplayName()}
      </span>

      {/* Toggle Switch */}
      <Switch
        checked={enabled}
        onCheckedChange={() => toggleSection(id)}
        className="data-[state=checked]:bg-ember"
      />
    </div>
  );
}
