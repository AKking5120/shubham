import {
  digitsOnlyPhone,
  mailtoLink,
  telLink,
  whatsappLinkForPhone,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

type LinkProps = {
  className?: string;
  children?: React.ReactNode;
};

export function formatPhoneDisplay(phone: string) {
  const local = digitsOnlyPhone(phone);
  return local ? `+91 ${local}` : phone;
}

export function PhoneLink({ phone, className, children }: LinkProps & { phone: string }) {
  return (
    <a
      href={telLink(phone)}
      className={cn(
        "cursor-pointer underline-offset-2 transition hover:underline",
        className,
      )}
    >
      {children ?? formatPhoneDisplay(phone)}
    </a>
  );
}

export function EmailLink({
  email,
  className,
  children,
}: LinkProps & { email?: string }) {
  const value = (email ?? "").trim();
  if (!value) return <span className={className}>—</span>;
  return (
    <a
      href={mailtoLink(value)}
      className={cn(
        "cursor-pointer break-all underline-offset-2 transition hover:underline",
        className,
      )}
    >
      {children ?? value}
    </a>
  );
}

export function WhatsAppLink({
  phone,
  message,
  className,
  children,
}: LinkProps & { phone?: string; message?: string }) {
  return (
    <a
      href={whatsappLinkForPhone(phone ?? "", message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "cursor-pointer underline-offset-2 transition hover:underline",
        className,
      )}
    >
      {children ?? "WhatsApp"}
    </a>
  );
}
