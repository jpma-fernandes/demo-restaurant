"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { format } from "date-fns";
import { pt, enUS } from "date-fns/locale";
import { useLocale } from "next-intl";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { timeSlots, guestOptions } from "@/config/sections";
import { ReservationFormData, FormErrors } from "@/types";
import {
  CalendarIcon,
  Clock,
  Users,
  User,
  Mail,
  Phone,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Steps definition
const STEPS = ["date", "guests", "time", "details"] as const;

export function ReservationsSection() {
  const t = useTranslations("reservations");
  const locale = useLocale();
  const dateLocale = locale === "pt" ? pt : enUS;

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ReservationFormData>({
    date: undefined,
    time: "",
    guests: 2,
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validation for Details step
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t("errors.required");
    }

    // Email is optional per user request, but simple validation if present
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("errors.invalidEmail");
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t("errors.required");
    } else if (!/^[+]?[\d\s-]{9,}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = t("errors.invalidPhone");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setFormData((prev) => ({ ...prev, date }));
      setCurrentStep(1); // Auto-advance to Guests
    }
  };

  const handleGuestsSelect = (guests: number) => {
    setFormData((prev) => ({ ...prev, guests }));
    setCurrentStep(2); // Auto-advance to Time
  };

  const handleTimeSelect = (time: string) => {
    setFormData((prev) => ({ ...prev, time }));
    setCurrentStep(3); // Auto-advance to Details
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success(t("success"));

    // Reset form after delay
    setTimeout(() => {
      setIsSubmitted(false);
      setCurrentStep(0);
      setFormData({
        date: undefined,
        time: "",
        guests: 2,
        name: "",
        email: "",
        phone: "",
        specialRequests: "",
      });
    }, 5000);
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-steel py-20 lg:py-32 min-h-[600px] flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-ember/10 text-ember mb-8 animate-in zoom-in duration-500">
              <CheckCircle className="h-12 w-12" />
            </div>
            <h2 className="text-4xl font-bold text-smoke mb-4">{t("success")}</h2>
            <p className="text-iron text-lg">
              {t("description")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-steel py-20 lg:py-32" id="reservations">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-ember" />
            <span className="text-ember text-sm uppercase tracking-[0.2em] font-medium">
              {t("subtitle")}
            </span>
            <div className="h-px w-12 bg-ember" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-smoke mb-4">
            {t("title")}
          </h2>
          <p className="text-iron text-lg">{t("description")}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="relative flex justify-between">
              {/* Line Background */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gunmetal -translate-y-1/2 z-0" />

              {/* Active Line Progress */}
              <div
                className="absolute top-1/2 left-0 h-1 bg-ember -translate-y-1/2 z-0 transition-all duration-500 ease-out"
                style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
              />

              {/* Step Circles */}
              {STEPS.map((step, index) => {
                const isActive = index <= currentStep;
                const isCurrent = index === currentStep;

                return (
                  <div key={step} className="relative z-10 flex flex-col items-center gap-3">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                        isActive
                          ? "bg-ember border-ember text-charcoal shadow-[0_0_15px_rgba(255,165,0,0.3)]"
                          : "bg-steel border-gunmetal text-iron"
                      )}
                    >
                      {index === 0 && <CalendarIcon className="h-5 w-5" />}
                      {index === 1 && <Users className="h-5 w-5" />}
                      {index === 2 && <Clock className="h-5 w-5" />}
                      {index === 3 && <CheckCircle className="h-5 w-5" />}
                    </div>
                    <span
                      className={cn(
                        "text-xs uppercase tracking-wider font-semibold transition-colors duration-300 hidden sm:block",
                        isActive ? "text-ember" : "text-iron/50"
                      )}
                    >
                      {t(`steps.${step}`)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main Card */}
          <Card className="bg-charcoal border-gunmetal shadow-2xl relative overflow-hidden min-h-[500px]">
            <CardContent className="p-0">
              {/* Header with Back Button */}
              {currentStep > 0 && (
                <div className="absolute top-6 left-6 z-20">
                  <Button
                    onClick={goBack}
                    variant="ghost"
                    size="sm"
                    className="text-iron hover:text-ember hover:bg-gunmetal/50 -ml-2"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    {t("back")}
                  </Button>
                </div>
              )}

              {/* Selection Summary (Top Right) */}
              <div className="absolute top-6 right-6 z-20 hidden md:flex items-center gap-4 text-xs font-mono text-iron/70">
                {formData.date && (
                  <div className="flex items-center gap-2 bg-gunmetal/30 px-3 py-1.5 rounded-full border border-gunmetal">
                    <CalendarIcon className="h-3 w-3 text-ember" />
                    {format(formData.date, "P", { locale: dateLocale })}
                  </div>
                )}
                {formData.guests > 0 && currentStep > 1 && (
                  <div className="flex items-center gap-2 bg-gunmetal/30 px-3 py-1.5 rounded-full border border-gunmetal">
                    <Users className="h-3 w-3 text-ember" />
                    {formData.guests}
                  </div>
                )}
                {formData.time && currentStep > 2 && (
                  <div className="flex items-center gap-2 bg-gunmetal/30 px-3 py-1.5 rounded-full border border-gunmetal">
                    <Clock className="h-3 w-3 text-ember" />
                    {formData.time}
                  </div>
                )}
              </div>

              {/* Step Content */}
              <div className="p-8 md:p-12 pt-20">

                {/* Step 1: Date Selection */}
                {currentStep === 0 && (
                  <div className="flex flex-col items-center animate-in fade-in slide-in-from-right-8 duration-500">
                    <h3 className="text-2xl font-bold text-smoke mb-8">
                      {t("date")}
                    </h3>
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={handleDateSelect}
                      disabled={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return date < today;
                      }}
                      initialFocus
                      className="rounded-lg border border-gunmetal bg-charcoal text-smoke shadow-sm [--cell-size:--spacing(11)] md:[--cell-size:--spacing(12)]"
                      classNames={{
                        selected: "bg-ember text-charcoal hover:bg-ember/90 focus:bg-ember focus:text-charcoal",
                        today: "!bg-transparent border !border-iron/50 text-smoke font-bold",
                        day: "h-[--cell-size] w-[--cell-size] text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 hover:bg-gunmetal/50 transition-colors rounded-md",
                        head_cell: "text-iron rounded-md w-[--cell-size] font-normal text-[0.8rem]",
                        cell: "h-[--cell-size] w-[--cell-size] text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                        nav_button: "border border-gunmetal hover:bg-gunmetal hover:text-ember transition-colors",
                        caption: "flex justify-center pt-1 relative items-center text-ember font-bold tracking-wider uppercase",
                      }}
                    />
                  </div>
                )}

                {/* Step 2: Guest Selection */}
                {currentStep === 1 && (
                  <div className="flex flex-col items-center animate-in fade-in slide-in-from-right-8 duration-500">
                    <h3 className="text-2xl font-bold text-smoke mb-8">
                      {t("guestSelection")}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 w-full max-w-2xl">
                      {guestOptions.map((num) => (
                        <button
                          key={num}
                          onClick={() => handleGuestsSelect(num)}
                          className={cn(
                            "py-6 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 group",
                            formData.guests === num
                              ? "bg-ember border-ember text-charcoal"
                              : "bg-steel border-gunmetal text-iron hover:border-ember hover:text-smoke"
                          )}
                        >
                          <Users className={cn(
                            "h-6 w-6 transition-colors",
                            formData.guests === num ? "text-charcoal" : "text-ember group-hover:text-ember"
                          )} />
                          <span className="text-xl font-bold">{num}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Time Selection */}
                {currentStep === 2 && (
                  <div className="flex flex-col items-center animate-in fade-in slide-in-from-right-8 duration-500">
                    <h3 className="text-2xl font-bold text-smoke mb-8">
                      {t("timeSelection")}
                    </h3>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 w-full max-w-2xl">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => handleTimeSelect(time)}
                          className={cn(
                            "py-4 rounded-lg border-2 text-sm font-bold transition-all duration-300",
                            formData.time === time
                              ? "bg-ember border-ember text-charcoal"
                              : "bg-steel border-gunmetal text-iron hover:border-ember hover:text-smoke"
                          )}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 4: Details Form */}
                {currentStep === 3 && (
                  <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-smoke">
                        {t("detailsSelection")}
                      </h3>
                      <p className="text-iron mt-2">
                        {format(formData.date!, "P", { locale: dateLocale })} • {formData.time} • {formData.guests} {t("guestsSuffix")}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="space-y-2">
                          <Label className="text-smoke flex items-center gap-2">
                            <User className="h-4 w-4 text-ember" />
                            {t("name")}
                          </Label>
                          <Input
                            value={formData.name}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, name: e.target.value }))
                            }
                            className="bg-steel border-gunmetal text-smoke placeholder:text-slate focus:border-ember h-12"
                            placeholder={t("name")}
                          />
                          {errors.name && (
                            <p className="text-destructive text-sm">{errors.name}</p>
                          )}
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                          <Label className="text-smoke flex items-center gap-2">
                            <Phone className="h-4 w-4 text-ember" />
                            {t("phone")}
                          </Label>
                          <Input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, phone: e.target.value }))
                            }
                            className="bg-steel border-gunmetal text-smoke placeholder:text-slate focus:border-ember h-12"
                            placeholder="+351 ..."
                          />
                          {errors.phone && (
                            <p className="text-destructive text-sm">{errors.phone}</p>
                          )}
                        </div>
                      </div>

                      {/* Email (Optional) */}
                      <div className="space-y-2">
                        <Label className="text-smoke flex items-center gap-2">
                          <Mail className="h-4 w-4 text-ember" />
                          {t("email")} <span className="text-iron/50 text-xs font-normal">({locale === "pt" ? "opcional" : "optional"})</span>
                        </Label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, email: e.target.value }))
                          }
                          className="bg-steel border-gunmetal text-smoke placeholder:text-slate focus:border-ember h-12"
                          placeholder={t("email")}
                        />
                        {errors.email && (
                          <p className="text-destructive text-sm">{errors.email}</p>
                        )}
                      </div>

                      {/* Special Requests */}
                      <div className="space-y-2">
                        <Label className="text-smoke">
                          {t("specialRequests")}
                        </Label>
                        <Textarea
                          value={formData.specialRequests}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              specialRequests: e.target.value,
                            }))
                          }
                          className="bg-steel border-gunmetal text-smoke placeholder:text-slate focus:border-ember min-h-[100px]"
                          placeholder={t("specialRequestsPlaceholder")}
                        />
                      </div>

                      <div className="pt-4">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-ember hover:bg-rust text-charcoal font-bold text-lg py-6 uppercase tracking-wide transition-all duration-300 shadow-lg shadow-ember/20"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center gap-2">
                              <span className="animate-spin h-5 w-5 border-2 border-charcoal border-t-transparent rounded-full" />
                              {locale === "pt" ? "A processar..." : "Processing..."}
                            </span>
                          ) : (
                            t("submit") // "Confirmar Reserva"
                          )}
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
