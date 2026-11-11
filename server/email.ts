import { ENV } from "./_core/env";

type BundleConfirmationInput = {
  registrationId: string;
  name: string;
  email: string;
  company: string;
  language: "ar" | "en";
  bundle: string;
  estimate: string;
  countries: string;
  size: string;
  format: string;
  analysis: string;
  delivery: string;
  pdfBase64: string;
  pdfFileName: string;
};

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character] ?? character);
}

export async function sendBundleConfirmationEmail(input: BundleConfirmationInput) {
  if (!ENV.resendApiKey || !ENV.resendFromEmail) return { sent: false as const, reason: "not_configured" as const };
  const isArabic = input.language === "ar";
  const labels = isArabic
    ? { subject: "تأكيد حجز بندل البيانات", hello: "مرحباً", intro: "تم تأكيد استلام حجزك بنجاح. تجد تفاصيل الطلب وملف PDF مرفقاً بهذه الرسالة.", order: "رقم الطلب", bundle: "البندل", estimate: "السعر التقديري", countries: "الدول", size: "حجم البيانات", format: "الصيغة", analysis: "التحليل", delivery: "التسليم", footer: "هذا السعر تقديري وغير ملزم، ويخضع لمراجعة المصدر والترخيص والخصوصية." }
    : { subject: "Bundle booking confirmation", hello: "Hello", intro: "Your data bundle booking was received successfully. The order details and PDF summary are attached.", order: "Order ID", bundle: "Bundle", estimate: "Estimated price", countries: "Countries", size: "Data volume", format: "Format", analysis: "Analysis", delivery: "Delivery", footer: "This is an indicative, non-binding estimate subject to source, licensing, and privacy review." };
  const row = (label: string, value: string) => `<tr><td style="padding:8px 0;color:#6b7d72;width:38%">${escapeHtml(label)}</td><td style="padding:8px 0;color:#183d2d;font-weight:700">${escapeHtml(value)}</td></tr>`;
  const html = `<!doctype html><html><body style="margin:0;background:#f5f8f5;font-family:Arial,sans-serif;color:#183d2d"><div style="max-width:620px;margin:24px auto;padding:32px;background:#fff;border:1px solid #dce8df;border-radius:16px"><div style="color:#2d8059;font-size:12px;font-weight:700;letter-spacing:1px">STARTUP ACADEMY</div><h1 style="margin:16px 0 8px;font-size:25px">${labels.subject}</h1><p style="color:#64766c;line-height:1.7">${labels.hello} ${escapeHtml(input.name)},<br>${labels.intro}</p><table style="width:100%;border-collapse:collapse;margin:22px 0">${row(labels.order, input.registrationId)}${row(labels.bundle, input.bundle)}${row(labels.estimate, input.estimate)}${row(labels.countries, input.countries)}${row(labels.size, input.size)}${row(labels.format, input.format)}${row(labels.analysis, input.analysis)}${row(labels.delivery, input.delivery)}${row(isArabic ? "الشركة" : "Company", input.company)}</table><div style="padding:14px;border-radius:10px;background:#eff9f1;color:#507060;font-size:12px;line-height:1.7">${labels.footer}</div><p style="margin:24px 0 0;color:#8a9990;font-size:11px">Startup Academy · Data Products &amp; Systems</p></div></body></html>`;
  const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${ENV.resendApiKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: ENV.resendFromEmail, to: [input.email], subject: labels.subject, html, attachments: [{ filename: input.pdfFileName, content: input.pdfBase64.replace(/^data:application\/pdf;base64,/, "") }] }) });
  if (!response.ok) {
    console.error("[Email] Resend failed", response.status, await response.text());
    return { sent: false as const, reason: "provider_error" as const };
  }
  return { sent: true as const };
}
