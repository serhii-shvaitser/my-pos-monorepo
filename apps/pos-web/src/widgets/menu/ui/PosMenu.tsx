import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/shared/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

import { usePosMenu } from "../api";
import { useOrderStore } from "@/features/manage-order";

export function PosMenu() {
  const { data: categories } = usePosMenu();
  const { addOrderItem } = useOrderStore();

  return (
    <Card className="flex-3 p-0 overflow-hidden">
      <CardHeader className="p-6 bg-gray-50 border-b">
        <CardTitle>Menu</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <Tabs
          defaultValue="07cbe3a9-2d79-421f-9c33-7cb3c8cb767b"
          className="w-[400px] w-full"
        >
          <TabsList className="w-full">
            {categories?.map((category) => (
              <TabsTrigger value={category.id}>{category.name}</TabsTrigger>
            ))}
          </TabsList>

          {categories?.map((category) => (
            <TabsContent value={category.id}>
              <Card>
                <CardHeader>
                  <CardTitle>{category.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground grid grid-cols-4 gap-4">
                  {category.products.map((product) => (
                    <Card>
                      <CardContent
                        onClick={() => addOrderItem(product)}
                        className="text-center"
                      >
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
      <CardFooter className="p-6 bg-gray-50 border-t">
        <p>Menu Footer</p>
      </CardFooter>
    </Card>
  );
}
