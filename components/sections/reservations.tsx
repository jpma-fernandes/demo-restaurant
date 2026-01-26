"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { format } from "date-fns";
import { pt, enUS } from "date-fns/locale";
import { useLocale } from "next-intl";
import { Calendar } from "@/components/ui/calendar";
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
  PartyPopper,
  Utensils,
  MessageSquare,
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
      setCurrentStep(1);
    }
  };

  const handleGuestsSelect = (guests: number) => {
    setFormData((prev) => ({ ...prev, guests }));
    setCurrentStep(2);
  };

  const handleTimeSelect = (time: string) => {
    setFormData((prev) => ({ ...prev, time }));
    setCurrentStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success(t("success"));

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
      <section className="relative bg-cream py-20 lg:py-32 min-h-[600px] flex items-center overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-mint/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-sunshine/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-mint to-mint-light text-white mb-8 shadow-2xl shadow-mint/30 animate-bounce-in">
              <PartyPopper className="h-12 w-12" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-espresso mb-4">
              {t("success")}
            </h2>
            <p className="text-latte text-lg max-w-md mx-auto mb-8">
              {t("description")}
            </p>
            <div className="inline-flex items-center gap-4 bg-white px-6 py-4 rounded-2xl shadow-lg border-2 border-sand">
              <div className="flex items-center gap-2 text-coffee">
                <CalendarIcon className="h-5 w-5 text-tomato" />
                <span className="font-semibold">
                  {formData.date && format(formData.date, "PPP", { locale: dateLocale })}
                </span>
              </div>
              <div className="w-px h-6 bg-sand" />
              <div className="flex items-center gap-2 text-coffee">
                <Clock className="h-5 w-5 text-tomato" />
                <span className="font-semibold">{formData.time}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-cream-dark py-20 lg:py-28 overflow-hidden" id="reservations">
      {/* Subtle decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-tomato/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sunshine/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      {/* Subtle dots pattern */}
      <div className="absolute inset-0 pattern-dots opacity-15" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header - Clean */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-5 py-2 rounded-full shadow-md mb-6">
            <Utensils className="h-4 w-4 text-tomato" />
            <span className="text-tomato text-sm uppercase tracking-[0.2em] font-bold">
              {t("subtitle")}
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-espresso mb-4 leading-tight">
            {t("title").split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-tomato">{t("title").split(" ").slice(-1)}</span>
          </h2>
          <p className="text-latte text-lg max-w-xl mx-auto">{t("description")}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Progress Bar - Clean with icons */}
          <div className="mb-12">
            <div className="relative flex justify-between">
              {/* Line Background */}
              <div className="absolute top-5 left-0 w-full h-1 bg-sand rounded-full z-0" />

              {/* Active Line Progress */}
              <div
                className="absolute top-5 left-0 h-1 bg-gradient-to-r from-tomato to-tomato-light rounded-full z-0 transition-all duration-500 ease-out"
                style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
              />

              {/* Step Circles with Icons */}
              {STEPS.map((step, index) => {
                const isActive = index <= currentStep;

                return (
                  <div key={step} className="relative z-10 flex flex-col items-center gap-3">
                    <div
                      className={cn(
                        "w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300",
                        isActive
                          ? "bg-gradient-to-br from-tomato to-tomato-light text-white shadow-lg shadow-tomato/25"
                          : "bg-white border-2 border-sand text-latte"
                      )}
                    >
                      {index === 0 && <CalendarIcon className="h-5 w-5" />}
                      {index === 1 && <Users className="h-5 w-5" />}
                      {index === 2 && <Clock className="h-5 w-5" />}
                      {index === 3 && <CheckCircle className="h-5 w-5" />}
                    </div>
                    <span
                      className={cn(
                        "text-xs uppercase tracking-wider font-bold transition-colors duration-300 hidden sm:block",
                        isActive ? "text-tomato" : "text-cappuccino"
                      )}
                    >
                      {t(`steps.${step}`)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main Card - Clean white */}
          <Card className="bg-white border-2 border-sand shadow-xl rounded-3xl relative overflow-hidden min-h-[500px]">
            <CardContent className="p-0">
              {/* Header with Back Button */}
              {currentStep > 0 && (
                <div className="absolute top-6 left-6 z-20">
                  <Button
                    onClick={goBack}
                    variant="ghost"
                    size="sm"
                    className="cursor-pointer text-latte hover:text-tomato hover:bg-soft-beige -ml-2 rounded-xl"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    {t("back")}
                  </Button>
                </div>
              )}

              {/* Selection Summary (Top Right) */}
              <div className="absolute top-6 right-6 z-20 hidden md:flex items-center gap-3 text-sm font-medium">
                {formData.date && (
                  <div className="flex items-center gap-2 bg-soft-beige px-4 py-2 rounded-xl text-coffee">
                    <CalendarIcon className="h-4 w-4 text-tomato" />
                    {format(formData.date, "P", { locale: dateLocale })}
                  </div>
                )}
                {formData.guests > 0 && currentStep > 1 && (
                  <div className="flex items-center gap-2 bg-soft-beige px-4 py-2 rounded-xl text-coffee">
                    <Users className="h-4 w-4 text-tomato" />
                    {formData.guests}
                  </div>
                )}
                {formData.time && currentStep > 2 && (
                  <div className="flex items-center gap-2 bg-soft-beige px-4 py-2 rounded-xl text-coffee">
                    <Clock className="h-4 w-4 text-tomato" />
                    {formData.time}
                  </div>
                )}
              </div>

              {/* Step Content */}
              <div className="p-8 md:p-12 pt-20">

                {/* Step 1: Date Selection */}
                {currentStep === 0 && (
                  <div className="flex flex-col items-center animate-in fade-in slide-in-from-right-8 duration-500">
                    <h3 className="text-2xl font-black text-espresso mb-2">
                      {t("date")}
                    </h3>
                    <p className="text-latte mb-8">{locale === "pt" ? "Escolha o dia perfeito para a sua visita" : "Choose the perfect day for your visit"}</p>
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
                      className="rounded-2xl border-2 border-sand bg-white text-espresso shadow-lg p-4 [--cell-size:--spacing(11)] md:[--cell-size:--spacing(12)]"
                      classNames={{
                        selected: "!bg-tomato text-white hover:!bg-tomato-dark focus:!bg-tomato focus:text-white !rounded-full",
                        today: "!bg-transparent border !border-cappuccino text-espresso font-bold !rounded-full",
                        day: "h-[--cell-size] w-[--cell-size] text-center text-sm p-0 relative focus-within:relative focus-within:z-20 hover:bg-tomato/10 transition-colors rounded-full",
                        head_cell: "text-latte rounded-md w-[--cell-size] font-bold text-[0.8rem]",
                        cell: "h-[--cell-size] w-[--cell-size] text-center text-sm p-0 relative focus-within:relative focus-within:z-20 rounded-full",
                        nav_button: "border-2 border-sand hover:bg-tomato/10 hover:border-tomato hover:text-tomato transition-colors rounded-xl",
                        caption: "flex justify-center pt-1 relative items-center text-tomato font-black tracking-wider uppercase",
                      }}
                    />
                  </div>
                )}

                {/* Step 2: Guest Selection */}
                {currentStep === 1 && (
                  <div className="flex flex-col items-center animate-in fade-in slide-in-from-right-8 duration-500">
                    <h3 className="text-2xl font-black text-espresso mb-2">
                      {t("guestSelection")}
                    </h3>
                    <p className="text-latte mb-8">{locale === "pt" ? "Quantas pessoas vão jantar?" : "How many guests will be dining?"}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 w-full max-w-2xl">
                      {guestOptions.map((num) => (
                        <button
                          key={num}
                          onClick={() => handleGuestsSelect(num)}
                          className={cn(
                            "cursor-pointer py-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-2 group",
                            formData.guests === num
                              ? "bg-gradient-to-br from-tomato to-tomato-light border-tomato text-white shadow-lg shadow-tomato/25"
                              : "bg-white border-sand text-coffee hover:border-tomato hover:shadow-md"
                          )}
                        >
                          <Users className={cn(
                            "h-5 w-5 transition-colors",
                            formData.guests === num ? "text-white" : "text-tomato"
                          )} />
                          <span className="text-xl font-black">{num}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Time Selection */}
                {currentStep === 2 && (
                  <div className="flex flex-col items-center animate-in fade-in slide-in-from-right-8 duration-500">
                    <h3 className="text-2xl font-black text-espresso mb-2">
                      {t("timeSelection")}
                    </h3>
                    <p className="text-latte mb-8">{locale === "pt" ? "A que horas prefere?" : "What time would you prefer?"}</p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 w-full max-w-2xl">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => handleTimeSelect(time)}
                          className={cn(
                            "cursor-pointer py-4 rounded-xl border-2 text-sm font-bold transition-all duration-300",
                            formData.time === time
                              ? "bg-gradient-to-br from-tomato to-tomato-light border-tomato text-white shadow-lg shadow-tomato/25"
                              : "bg-white border-sand text-coffee hover:border-tomato hover:shadow-md"
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
                      <h3 className="text-2xl font-black text-espresso mb-3">
                        {t("detailsSelection")}
                      </h3>
                      <div className="inline-flex items-center gap-4 bg-soft-beige px-5 py-3 rounded-xl text-coffee font-medium">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-tomato" />
                          {format(formData.date!, "P", { locale: dateLocale })}
                        </div>
                        <div className="w-px h-5 bg-sand" />
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-tomato" />
                          {formData.time}
                        </div>
                        <div className="w-px h-5 bg-sand" />
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-tomato" />
                          {formData.guests} {t("guestsSuffix")}
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="space-y-2">
                          <Label className="text-espresso font-bold flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-tomato/10 flex items-center justify-center">
                              <User className="h-4 w-4 text-tomato" />
                            </div>
                            {t("name")}
                          </Label>
                          <Input
                            value={formData.name}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, name: e.target.value }))
                            }
                            className="bg-soft-beige border-2 border-sand text-espresso placeholder:text-cappuccino focus:border-tomato focus:ring-tomato/20 h-12 rounded-xl"
                            placeholder={t("name")}
                          />
                          {errors.name && (
                            <p className="text-tomato text-sm font-medium">{errors.name}</p>
                          )}
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                          <Label className="text-espresso font-bold flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-tomato/10 flex items-center justify-center">
                              <Phone className="h-4 w-4 text-tomato" />
                            </div>
                            {t("phone")}
                          </Label>
                          <Input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, phone: e.target.value }))
                            }
                            className="bg-soft-beige border-2 border-sand text-espresso placeholder:text-cappuccino focus:border-tomato focus:ring-tomato/20 h-12 rounded-xl"
                            placeholder="+351 ..."
                          />
                          {errors.phone && (
                            <p className="text-tomato text-sm font-medium">{errors.phone}</p>
                          )}
                        </div>
                      </div>

                      {/* Email (Optional) */}
                      <div className="space-y-2">
                        <Label className="text-espresso font-bold flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-mint/10 flex items-center justify-center">
                            <Mail className="h-4 w-4 text-mint" />
                          </div>
                          {t("email")} <span className="text-cappuccino text-xs font-normal">({locale === "pt" ? "opcional" : "optional"})</span>
                        </Label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, email: e.target.value }))
                          }
                          className="bg-soft-beige border-2 border-sand text-espresso placeholder:text-cappuccino focus:border-mint focus:ring-mint/20 h-12 rounded-xl"
                          placeholder={t("email")}
                        />
                        {errors.email && (
                          <p className="text-tomato text-sm font-medium">{errors.email}</p>
                        )}
                      </div>

                      {/* Special Requests */}
                      <div className="space-y-2">
                        <Label className="text-espresso font-bold flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-sunshine/20 flex items-center justify-center">
                            <MessageSquare className="h-4 w-4 text-mustard" />
                          </div>
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
                          className="bg-soft-beige border-2 border-sand text-espresso placeholder:text-cappuccino focus:border-sunshine focus:ring-sunshine/20 min-h-[100px] rounded-xl"
                          placeholder={t("specialRequestsPlaceholder")}
                        />
                      </div>

                      <div className="pt-4">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-tomato to-tomato-light hover:from-tomato-dark hover:to-tomato text-white font-black text-lg py-7 uppercase tracking-wide transition-all duration-300 shadow-xl shadow-tomato/25 rounded-2xl"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center gap-3">
                              <span className="animate-spin h-5 w-5 border-3 border-white border-t-transparent rounded-full" />
                              {locale === "pt" ? "A processar..." : "Processing..."}
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              <CheckCircle className="h-5 w-5" />
                              {t("submit")}
                            </span>
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
    </section>
  );
}
