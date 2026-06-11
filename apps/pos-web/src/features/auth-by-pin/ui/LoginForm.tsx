import { useState } from "react";
import { useLoginByPin } from "../model/useLoginByPin";

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
import { ActionButton } from "@/shared/ui/action-button";

export function LoginForm() {
  const [code, setCode] = useState("W01");
  const [pin, setPin] = useState("1234");
  const { login, isPending } = useLoginByPin({
    onLoginError: () => {
      setCode("");
      setPin("");
    },
  });

  const handleLogin = (e: React.SubmitEvent) => {
    e.preventDefault();
    login({ code, pin });
  };

  const isLoginButtonDisabled = isPending || pin.length != 4;

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
              Waiter code
            </Label>
            <Input
              id="code"
              autoFocus
              className="text-center text-2xl tracking-[1em]"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <div className="grid gap-2 text-center">
            <Label htmlFor="pin" className="sr-only">
              Waiter pin
            </Label>
            <Input
              id="pin"
              // type="password"
              placeholder="****"
              className="text-center text-2xl tracking-[1em]"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              maxLength={4}
            />
          </div>
        </CardContent>
        <CardFooter>
          <ActionButton
            type="submit"
            className="bg-orange-600 hover:bg-orange-700"
            isDisabled={isLoginButtonDisabled}
            isPending={isPending}
          >
            Login
          </ActionButton>
        </CardFooter>
      </form>
    </Card>
  );
}
