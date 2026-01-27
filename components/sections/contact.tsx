"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ContactFormData, FormErrors } from "@/types";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

export function ContactSection() {
  const t = useTranslations("contact");
  const locale = useLocale();

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t("form.errors.required");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("form.errors.required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("form.errors.invalidEmail");
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t("form.errors.required");
    }

    if (!formData.message.trim()) {
      newErrors.message = t("form.errors.required");
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t("form.errors.messageTooShort");
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
    toast.success(t("form.success"));

    // Reset form after delay
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 3000);
  };

  return (
    <div className="bg-charcoal py-16 sm:py-20 lg:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-8 sm:w-12 bg-ember" />
            <span className="text-ember text-xs sm:text-sm uppercase tracking-[0.2em] font-medium">
              {t("subtitle")}
            </span>
            <div className="h-px w-8 sm:w-12 bg-ember" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-smoke mb-3 sm:mb-4">
            {t("title")}
          </h2>
          <p className="text-iron text-base sm:text-lg">{t("description")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Form */}
          <Card className="bg-steel border-gunmetal">
            <CardContent className="p-4 sm:p-6 md:p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-ember/20 text-ember mb-4">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <p className="text-smoke text-lg">{t("form.success")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label className="text-smoke">{t("form.name")}</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, name: e.target.value }))
                      }
                      className="bg-charcoal border-gunmetal text-smoke placeholder:text-slate"
                      placeholder={t("form.namePlaceholder")}
                    />
                    {errors.name && (
                      <p className="text-destructive text-sm">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label className="text-smoke">{t("form.email")}</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, email: e.target.value }))
                      }
                      className="bg-charcoal border-gunmetal text-smoke placeholder:text-slate"
                      placeholder={t("form.emailPlaceholder")}
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm">{errors.email}</p>
                    )}
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <Label className="text-smoke">{t("form.subject")}</Label>
                    <Input
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          subject: e.target.value,
                        }))
                      }
                      className="bg-charcoal border-gunmetal text-smoke placeholder:text-slate"
                      placeholder={t("form.subjectPlaceholder")}
                    />
                    {errors.subject && (
                      <p className="text-destructive text-sm">{errors.subject}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label className="text-smoke">{t("form.message")}</Label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      className="bg-charcoal border-gunmetal text-smoke placeholder:text-slate min-h-[150px]"
                      placeholder={t("form.messagePlaceholder")}
                    />
                    {errors.message && (
                      <p className="text-destructive text-sm">{errors.message}</p>
                    )}
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
                        {locale === "pt" ? "A enviar..." : "Sending..."}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-5 w-5" />
                        {t("form.submit")}
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8">
            <h3 className="text-smoke text-xl sm:text-2xl font-bold">{t("info.title")}</h3>

            <div className="space-y-4 sm:space-y-6">
              {/* Address */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-ember/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-ember" />
                </div>
                <div>
                  <h4 className="text-smoke font-semibold mb-1">
                    {t("info.address")}
                  </h4>
                  <p className="text-iron whitespace-pre-line">
                    {t("info.addressValue")}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-ember/10 flex items-center justify-center">
                  <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-ember" />
                </div>
                <div>
                  <h4 className="text-smoke font-semibold mb-1">
                    {t("info.phone")}
                  </h4>
                  <a
                    href={`tel:${t("info.phoneValue").replace(/\s/g, "")}`}
                    className="text-iron hover:text-ember transition-colors"
                  >
                    {t("info.phoneValue")}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-ember/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-ember" />
                </div>
                <div>
                  <h4 className="text-smoke font-semibold mb-1">
                    {t("info.email")}
                  </h4>
                  <a
                    href={`mailto:${t("info.emailValue")}`}
                    className="text-iron hover:text-ember transition-colors"
                  >
                    {t("info.emailValue")}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-ember/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-ember" />
                </div>
                <div>
                  <h4 className="text-smoke font-semibold mb-1">
                    {t("info.hours")}
                  </h4>
                  <p className="text-iron whitespace-pre-line">
                    {t("info.hoursValue")}
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-6 sm:mt-8 h-[150px] sm:h-[200px] rounded-lg bg-steel border border-gunmetal flex items-center justify-center">
              <p className="text-slate text-sm">
                {locale === "pt" ? "Mapa interativo" : "Interactive map"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
