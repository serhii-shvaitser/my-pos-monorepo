import type { Meta, StoryObj } from "@storybook/react-vite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, delay } from "msw";

import { useOrderStore } from "@/entities/order";
import { ActiveOrder } from "./ActiveOrder";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false, refetchOnWindowFocus: false },
      mutations: { retry: false },
    },
  });

const meta: Meta<typeof ActiveOrder> = {
  title: "Widgets/ActiveOrder",
  component: ActiveOrder,
  args: {
    tableId: "db39496d-c6ec-483b-b785-276bd9198e5b",
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={createTestQueryClient()}>
        <div className="flex h-[400px] w-[260px]">
          <Story />
        </div>
      </QueryClientProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ActiveOrder>;

export const Default: Story = {
  decorators: [
    (Story) => {
      useOrderStore.setState({
        currentOrder: null,
      });
      return <Story />;
    },
  ],
};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post(
          "http://localhost:3001/api/v1/tables/db39496d-c6ec-483b-b785-276bd9198e5b/active-order",
          async () => {
            await delay("infinite");
            return new Response(null, { status: 200 });
          },
        ),
      ],
    },
  },
};

export const WithItems: Story = {
  decorators: [
    (Story) => {
      useOrderStore.setState({
        currentOrder: {
          id: "db39496d-c6ec-483b-b785-276bd9198e5b",
          tableId: "1",
          waiterId: "waiter-1",
          createdAt: new Date(),
          closedAt: new Date(),
          totalAmount: 0,
          status: "open",
          items: [
            {
              productId: "product-1",
              quantity: 2,
              product: {
                id: "product-1",
                name: "Margarita",
                price: 12000,
                categoryId: "category-1",
                isAvailable: true,
                description: "Classic pizza with tomato sauce and cheese",
              },
            },
            {
              productId: "product-2",
              quantity: 1,
              product: {
                id: "product-2",
                name: "Coca-Cola",
                price: 800,
                categoryId: "category-2",
                isAvailable: false,
                description: "Refreshing beverage",
              },
            },
          ],
        },
      });
      return <Story />;
    },
  ],
};
