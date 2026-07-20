import { Header } from "./Header";
import { Footer } from "./Footer";
import { Chatbot } from "./Chatbot";
import type { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 pt-40 md:pt-48 lg:pt-52">{children}</main>
      <Footer />
      <Chatbot />
    </div>
  );
}
