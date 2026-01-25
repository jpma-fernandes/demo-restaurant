"use client";

import { useTranslations } from "next-intl";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useSectionConfig } from "@/hooks/use-section-config";
import { SortableSectionItem } from "./sortable-section-item";
import { RotateCcw } from "lucide-react";

interface ConfigPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ConfigPanel({ open, onOpenChange }: ConfigPanelProps) {
  const t = useTranslations("config");
  const { sections, reorderSections, resetToDefaults } = useSectionConfig();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      reorderSections(active.id as string, over.id as string);
    }
  };

  const handleReset = () => {
    if (window.confirm(t("resetConfirm"))) {
      resetToDefaults();
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[350px] sm:w-[400px] bg-steel border-gunmetal overflow-y-auto"
      >
        <SheetHeader className="mb-6">
          <SheetTitle className="text-smoke text-xl">{t("title")}</SheetTitle>
          <SheetDescription className="text-iron">
            {t("description")}
          </SheetDescription>
        </SheetHeader>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sections.map((s) => s.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {sections
                .sort((a, b) => a.order - b.order)
                .map((section) => (
                  <SortableSectionItem
                    key={section.id}
                    id={section.id}
                    enabled={section.enabled}
                  />
                ))}
            </div>
          </SortableContext>
        </DndContext>

        <div className="mt-8 pt-6 border-t border-gunmetal">
          <Button
            variant="outline"
            onClick={handleReset}
            className="w-full border-gunmetal text-iron hover:text-smoke hover:bg-gunmetal"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            {t("reset")}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
