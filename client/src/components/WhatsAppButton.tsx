import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  className?: string;
}

export default function WhatsAppButton({ 
  phoneNumber, 
  message = "Hi! I'm interested in your music packs.",
  className = ""
}: WhatsAppButtonProps) {
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    console.log("WhatsApp contact opened:", phoneNumber);
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      size="lg"
      className={`fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-300 hover-elevate active-elevate-2 ${className}`}
      data-testid="button-whatsapp-contact"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="sr-only">Contact us on WhatsApp</span>
    </Button>
  );
}