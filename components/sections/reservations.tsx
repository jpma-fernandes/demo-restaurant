"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { format } from "date-fns";
import { pt, enUS } from "date-fns/locale";
import { useLocale } from "next-intl";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function ReservationsSection() {
  const t = useTranslations("reservations");
  const locale = useLocale();
  const dateLocale = locale === "pt" ? pt : enUS;

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

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.date) {
      newErrors.date = t("errors.required");
    } else if (formData.date < new Date()) {
      newErrors.date = t("errors.pastDate");
    }

    if (!formData.time) {
      newErrors.time = t("errors.required");
    }

    if (!formData.name.trim()) {
      newErrors.name = t("errors.required");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("errors.required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
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
      setFormData({
        date: undefined,
        time: "",
        guests: 2,
        name: "",
        email: "",
        phone: "",
        specialRequests: "",
      });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="bg-steel py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-ember/20 text-ember mb-6">
              <CheckCircle className="h-10 w-10" />
            </div>
            <h2 className="text-3xl font-bold text-smoke mb-4">{t("success")}</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-steel py-20 lg:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
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

        {/* Reservation Form */}
        <Card className="max-w-3xl mx-auto bg-charcoal border-gunmetal">
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Date, Time, Guests Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Date Picker */}
                <div className="space-y-2">
                  <Label className="text-smoke flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-ember" />
                    {t("date")}
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-steel border-gunmetal text-smoke hover:bg-gunmetal",
                          !formData.date && "text-slate"
                        )}
                      >
                        {formData.date ? (
                          format(formData.date, "PPP", { locale: dateLocale })
                        ) : (
                          <span>{t("date")}</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-steel border-gunmetal">
                      <Calendar
                        mode="single"
                        selected={formData.date}
                        onSelect={(date) =>
                          setFormData((prev) => ({ ...prev, date }))
                        }
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.date && (
                    <p className="text-destructive text-sm">{errors.date}</p>
                  )}
                </div>

                {/* Time Select */}
                <div className="space-y-2">
                  <Label className="text-smoke flex items-center gap-2">
                    <Clock className="h-4 w-4 text-ember" />
                    {t("time")}
                  </Label>
                  <Select
                    value={formData.time}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, time: value }))
                    }
                  >
                    <SelectTrigger className="bg-steel border-gunmetal text-smoke">
                      <SelectValue placeholder={t("time")} />
                    </SelectTrigger>
                    <SelectContent className="bg-steel border-gunmetal">
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time} className="text-smoke">
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.time && (
                    <p className="text-destructive text-sm">{errors.time}</p>
                  )}
                </div>

                {/* Guests Select */}
                <div className="space-y-2">
                  <Label className="text-smoke flex items-center gap-2">
                    <Users className="h-4 w-4 text-ember" />
                    {t("guests")}
                  </Label>
                  <Select
                    value={formData.guests.toString()}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        guests: parseInt(value),
                      }))
                    }
                  >
                    <SelectTrigger className="bg-steel border-gunmetal text-smoke">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-steel border-gunmetal">
                      {guestOptions.map((num) => (
                        <SelectItem key={num} value={num.toString()} className="text-smoke">
                          {num} {t("guestsSuffix")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Contact Info Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    className="bg-steel border-gunmetal text-smoke placeholder:text-slate"
                    placeholder={t("name")}
                  />
                  {errors.name && (
                    <p className="text-destructive text-sm">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label className="text-smoke flex items-center gap-2">
                    <Mail className="h-4 w-4 text-ember" />
                    {t("email")}
                  </Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="bg-steel border-gunmetal text-smoke placeholder:text-slate"
                    placeholder={t("email")}
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm">{errors.email}</p>
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
                    className="bg-steel border-gunmetal text-smoke placeholder:text-slate"
                    placeholder="+351 XXX XXX XXX"
                  />
                  {errors.phone && (
                    <p className="text-destructive text-sm">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-2">
                <Label className="text-smoke">
                  {t("specialRequests")}{" "}
                  <span className="text-slate text-sm">({locale === "pt" ? "opcional" : "optional"})</span>
                </Label>
                <Textarea
                  value={formData.specialRequests}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      specialRequests: e.target.value,
                    }))
                  }
                  className="bg-steel border-gunmetal text-smoke placeholder:text-slate min-h-[100px]"
                  placeholder={t("specialRequestsPlaceholder")}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-ember hover:bg-rust text-charcoal font-bold text-lg py-6 uppercase tracking-wide transition-all duration-300"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin h-5 w-5 border-2 border-charcoal border-t-transparent rounded-full" />
                    {locale === "pt" ? "A processar..." : "Processing..."}
                  </span>
                ) : (
                  t("submit")
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
