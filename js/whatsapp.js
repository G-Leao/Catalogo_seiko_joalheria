/* =============================================================
   whatsapp.js
   >>> ALTERE AQUI O NÚMERO DE WHATSAPP DA LOJA (único local) <<<
   Formato internacional, apenas dígitos: 55 + DDD + número
   ============================================================= */
const WHATSAPP_NUMBER = "5542988531756";

const WHATSAPP_GENERIC_MESSAGE =
  "Olá! Vim pelo catálogo digital da Gravina e gostaria de mais informações.";

function buildWhatsAppMessage(product) {
  if (!product) return WHATSAPP_GENERIC_MESSAGE;
  const parts = [
    product.brand,
    product.collection,
    product.model || product.reference,
  ]
    .filter(Boolean)
    .join(" ");
  return `Olá! Tenho interesse no relógio ${parts}. Gostaria de saber mais informações sobre esse modelo.`;
}

function whatsappLink(product) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage(product))}`;
}
