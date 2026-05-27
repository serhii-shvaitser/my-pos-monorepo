import { LoginForm } from "@/features/auth-by-pin";

export function LoginPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 gap-8">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xl">MK</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          MyKeeper
        </h1>
      </div>
      <LoginForm />
    </div>
  );
}
