import { Header } from "./Header";
import { Footer } from "./Footer";
import { Chatbot } from "./Chatbot";
import type { ReactNode } from "react";

export function Layout({
  children,
  hideHeader = false,
  hideFooter = false,
  hideChat = false,
  headerOverlay = false,
}: {
  children: ReactNode;
  hideHeader?: boolean;
  hideFooter?: boolean;
  hideChat?: boolean;
  headerOverlay?: boolean;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {!hideHeader && <Header />}
      <main className={`flex-1 ${!hideHeader && !headerOverlay ? "pt-24 md:pt-28" : ""}`}>
        {children}
      </main>
      {!hideFooter && <Footer />}
      {!hideChat && <Chatbot />}
    </div>
  );
}
