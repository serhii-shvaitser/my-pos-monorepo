import { useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
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

export function LoginForm() {
  const navigate = useNavigate();
  const [pin, setPin] = useState("");
  const { redirect: redirectPath } = useSearch({
    from: "/login",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "1234") {
      localStorage.setItem("isAuthenticated", "true");
      navigate({ to: redirectPath });
    } else {
      alert("Невірний код! Спробуйте 1234");
    }
  };

  return (
    <Card className="w-[350px] shadow-xl">
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
            Увійти
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
