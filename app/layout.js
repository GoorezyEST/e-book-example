import ThirdParty from "@/contexts/ThirdParty";
import "@/styles/globals.css";
import { Nunito_Sans } from "next/font/google";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  metadataBase: new URL(
    "https://ecommerce-cleaning-products-example.vercel.app/"
  ),
  title: "La esquina de la limpieza",
  description:
    "En la esquina de la limpieza te ofrecemos una amplia gama de productos de calidad para el cuidado de tu hogar a un precio accesible. ¡Puedes ver nuestros productos y reservar un pedido a través de nuestro sitio web!",
  alternates: {
    canonical: "https://ecommerce-cleaning-products-example.vercel.app/",
  },
  openGraph: {
    title: "La esquina de la limpieza",
    sitename: "La esquina de la limpieza",
    url: "https://ecommerce-cleaning-products-example.vercel.app/",
  },
  keywords: [
    "La esquina de la limpieza",
    "limpieza",
    "productos de limpieza",
    "productos limpieza reserva",
    "productos limpieza",
    "detergente",
    "lavandina",
    "esponja",
    "rejilla",
    "La Plata",
    "productos de limpieza La Plata",
    "La esquina de la limpieza La Plata",
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
