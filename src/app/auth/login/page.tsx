import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "Iniciar sesión",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-muted/50 to-background py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <Trophy className="h-8 w-8 text-primary" />
            <span className="font-black text-2xl">
              <span className="text-primary">Fan</span>Zone
            </span>
          </Link>
          <h1 className="text-2xl font-black mt-4 mb-1">Bienvenido de vuelta</h1>
          <p className="text-muted-foreground text-sm">
            Inicia sesión para acceder a tu cuenta
          </p>
        </div>

        <LoginForm />

        <p className="text-center text-sm text-muted-foreground mt-6">
          ¿No tienes cuenta?{" "}
          <Link href="/auth/registro" className="text-primary font-semibold hover:underline">
            Regístrate gratis
          </Link>
        </p>
      </div>
    </div>
  );
}
