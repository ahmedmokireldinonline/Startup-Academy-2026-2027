export const WHATSAPP_URL = import.meta.env.VITE_WHATSAPP_URL || "https://wa.me/201012025650";

export function whatsappRequestUrl(subject = "نسخة دليل المستثمرين") {
  const separator = WHATSAPP_URL.includes("?") ? "&" : "?";
  const message = `مرحبًا، أريد حجز ${subject} من Startup Academy.`;
  return `${WHATSAPP_URL}${separator}text=${encodeURIComponent(message)}`;
}
