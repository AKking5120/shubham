import QRCode from "qrcode";
import { BUSINESS } from "./constants";
import { upiPayUri } from "./quote-workflow";

export async function paymentQrDataUrl(opts: {
  upiId: string;
  amount: number;
  orderId: string;
}): Promise<string> {
  const uri = upiPayUri({
    upiId: opts.upiId,
    payeeName: BUSINESS.name,
    amount: opts.amount,
    orderId: opts.orderId,
  });
  return QRCode.toDataURL(uri, {
    margin: 1,
    width: 280,
    errorCorrectionLevel: "M",
  });
}
