export const OWNER_WHATSAPP = "201012025650";
export const OWNER_EMAIL = "ahmedmokireldin.online@gmail.com";

export function hasRegistrationAccess() {
  try {
    return localStorage.getItem("startup-academy-registered") === "true";
  } catch {
    return false;
  }
}

export function registrationMessage(data?: Record<string, string>) {
  const details = data ? `\n\nبيانات التسجيل:\n${Object.entries(data).map(([key, value]) => `${key}: ${value}`).join("\n")}` : "";
  return `مرحبًا، أريد الوصول إلى دليل البرامج والتقديمات في Startup Academy 2026–2027.${details}`;
}

export function whatsappUrl(message: string) {
  return `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

export function emailUrl(subject: string, body: string) {
  return `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
