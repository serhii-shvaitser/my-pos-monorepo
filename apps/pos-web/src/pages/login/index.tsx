import { LoginForm } from "@/features/auth-by-pin";

export function LoginPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8 bg-slate-50">
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600">
          <span className="text-xl font-bold text-white">MK</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          MyKeeper
        </h1>
      </div>
      <LoginForm />
    </div>
  );
}
