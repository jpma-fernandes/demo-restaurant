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
  Sparkles,
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
    <section className="bg-cream py-16 sm:py-20 lg:py-28" id="contact">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-mint/10 px-4 py-2 rounded-full mb-4">
            <Mail className="h-4 w-4 text-mint" />
            <span className="text-mint text-xs sm:text-sm font-bold uppercase tracking-wider">
              {t("subtitle")}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-espresso mb-4">
            {t("title").split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-tomato">{t("title").split(" ").slice(-1)}</span>
          </h2>
          <p className="text-latte text-base sm:text-lg">{t("description")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <Card className="bg-white border-2 border-sand shadow-lg shadow-espresso/5">
            <CardContent className="p-5 sm:p-6 lg:p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-mint/20 text-mint mb-4">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <p className="text-espresso text-lg font-semibold">{t("form.success")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label className="text-espresso font-medium">{t("form.name")}</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, name: e.target.value }))
                      }
                      className="bg-cream-dark border-sand text-espresso placeholder:text-cappuccino focus:border-tomato focus:ring-tomato/20"
                      placeholder={t("form.namePlaceholder")}
                    />
                    {errors.name && (
                      <p className="text-destructive text-sm">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label className="text-espresso font-medium">{t("form.email")}</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, email: e.target.value }))
                      }
                      className="bg-cream-dark border-sand text-espresso placeholder:text-cappuccino focus:border-tomato focus:ring-tomato/20"
                      placeholder={t("form.emailPlaceholder")}
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm">{errors.email}</p>
                    )}
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <Label className="text-espresso font-medium">{t("form.subject")}</Label>
                    <Input
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          subject: e.target.value,
                        }))
                      }
                      className="bg-cream-dark border-sand text-espresso placeholder:text-cappuccino focus:border-tomato focus:ring-tomato/20"
                      placeholder={t("form.subjectPlaceholder")}
                    />
                    {errors.subject && (
                      <p className="text-destructive text-sm">{errors.subject}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label className="text-espresso font-medium">{t("form.message")}</Label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      className="bg-cream-dark border-sand text-espresso placeholder:text-cappuccino focus:border-tomato focus:ring-tomato/20 min-h-[140px]"
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
                    className="w-full bg-tomato hover:bg-tomato-dark text-white font-bold text-base sm:text-lg py-5 sm:py-6 uppercase tracking-wide transition-all duration-300 shadow-lg shadow-tomato/20 hover:shadow-tomato/30"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
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
            <h3 className="text-espresso text-xl sm:text-2xl font-bold">{t("info.title")}</h3>

            <div className="space-y-4 sm:space-y-5">
              {/* Address */}
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl border-2 border-sand hover:border-tomato/30 transition-colors">
                <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-tomato/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-tomato" />
                </div>
                <div>
                  <h4 className="text-espresso font-bold mb-1">
                    {t("info.address")}
                  </h4>
                  <p className="text-latte text-sm sm:text-base whitespace-pre-line">
                    {t("info.addressValue")}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl border-2 border-sand hover:border-tomato/30 transition-colors">
                <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-sunshine/20 flex items-center justify-center">
                  <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-mustard" />
                </div>
                <div>
                  <h4 className="text-espresso font-bold mb-1">
                    {t("info.phone")}
                  </h4>
                  <a
                    href={`tel:${t("info.phoneValue").replace(/\s/g, "")}`}
                    className="text-latte hover:text-tomato transition-colors text-sm sm:text-base"
                  >
                    {t("info.phoneValue")}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl border-2 border-sand hover:border-tomato/30 transition-colors">
                <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-mint/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-mint" />
                </div>
                <div>
                  <h4 className="text-espresso font-bold mb-1">
                    {t("info.email")}
                  </h4>
                  <a
                    href={`mailto:${t("info.emailValue")}`}
                    className="text-latte hover:text-tomato transition-colors text-sm sm:text-base"
                  >
                    {t("info.emailValue")}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl border-2 border-sand hover:border-tomato/30 transition-colors">
                <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-tomato/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-tomato" />
                </div>
                <div>
                  <h4 className="text-espresso font-bold mb-1">
                    {t("info.hours")}
                  </h4>
                  <p className="text-latte text-sm sm:text-base whitespace-pre-line">
                    {t("info.hoursValue")}
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="h-[140px] sm:h-[180px] rounded-xl bg-cream-dark border-2 border-sand flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-8 w-8 text-latte mx-auto mb-2" />
                <p className="text-latte text-sm">
                  {locale === "pt" ? "Mapa interativo" : "Interactive map"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
