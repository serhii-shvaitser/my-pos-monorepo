import { useState } from "react";
import { useLoginByPin } from "@/features/auth-by-pin";

import { Button } from "@/shared/ui/button";
import { Spinner } from "@/shared/ui/spinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

export function LoginForm() {
  const [pin, setPin] = useState("");
  const { login, isPending } = useLoginByPin({
    onLoginError: () => {
      setPin("");
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length === 4) {
      login({ pin });
    }
  };

  return (
    <Card className="w-87 shadow-xl">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">KEEPER SYSTEM</CardTitle>
        <CardDescription>
          Введіть ваш персональний код для входу
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <CardContent className="grid gap-4">
          <div className="grid gap-2 text-center">
            <Label htmlFor="pin" className="sr-only">
              PIN Code
            </Label>
            <Input
              id="pin"
              type="password"
              placeholder="****"
              autoFocus
              className="text-center text-2xl tracking-[1em]"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              maxLength={4}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700"
            disabled={isPending || pin.length != 4}
          >
            {isPending && <Spinner data-icon="inline-start" />}
            Увійти
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
