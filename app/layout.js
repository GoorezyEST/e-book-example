import ThirdParty from "@/contexts/ThirdParty";
import "@/styles/globals.css";
import { Nunito_Sans } from "next/font/google";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  metadataBase: new URL("https://electronic-booking.vercel.app/"),
  title: "E-Booking",
  description:
    "E-Booking es un proyecto personal destinado a simular una plataforma web utilizable en una situación del mundo real.",
  alternates: {
    canonical: "https://electronic-booking.vercel.app/",
  },
  openGraph: {
    title: "E-Booking",
    sitename: "E-Booking",
    url: "https://electronic-booking.vercel.app/",
  },
  keywords: [
    "E-Booking",
    "E-Booking test",
    "E-Booking example",
    "Example proyect",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunitoSans.className}>
        <ThirdParty>{children}</ThirdParty>
      </body>
    </html>
  );
}
