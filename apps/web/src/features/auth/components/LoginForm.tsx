import { useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { type PinLoginRequest, type AuthResponse } from "@repo/types";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const loginWithPin = async (data: PinLoginRequest): Promise<AuthResponse> => {
  const response = await fetch("/api/auth/pin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Invalid PIN");
  }

  return response.json();
};

export function LoginForm() {
  const navigate = useNavigate();
  const [pin, setPin] = useState("");
  const { redirect: redirectPath } = useSearch({
    from: "/login",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: loginWithPin,
    onSuccess: (data) => {
      // Store the token and user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Navigate to the dashboard or previous page
      navigate({ to: redirectPath || "/" });
    },
    onError: () => {
      alert("Невірний код! Спробуйте 1234 або 5555");
      setPin("");
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length === 4) {
      mutate({ pin });
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
          >
            {isPending && <Spinner data-icon="inline-start" />}
            Увійти
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
