import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/shared/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

import { usePosMenu } from "../api";
import { useOrderStore } from "@/entities/order";

export function PosMenu() {
  const { data: categories } = usePosMenu();
  const { addOrderItem } = useOrderStore();

  return (
    <Card className="flex-2 p-0 overflow-hidden">
      <CardHeader className="p-2 gap-0 bg-gray-50 border-b">
        <CardTitle>Menu</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <Tabs
          defaultValue="07cbe3a9-2d79-421f-9c33-7cb3c8cb767b"
          className="w-[400px] w-full"
        >
          <TabsList className="w-full">
            {categories?.map(({ id, name }) => (
              <TabsTrigger key={id} value={id}>
                {name}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories?.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <Card>
                <CardHeader>
                  <CardTitle>{category.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground grid grid-cols-3 gap-2">
                  {category.products.map((product) => (
                    <Card
                      key={product.id}
                      onClick={() => addOrderItem(product)}
                      className="p-3 items-center"
                    >
                      <CardContent className="flex flex-1 items-center text-xs p-0">
                        {product.name}
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
      <CardFooter className="p-2 bg-gray-50 border-t">Menu Footer</CardFooter>
    </Card>
  );
}
