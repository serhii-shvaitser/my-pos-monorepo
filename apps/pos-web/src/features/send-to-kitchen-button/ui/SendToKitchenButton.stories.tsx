import type { Meta, StoryObj } from "@storybook/react-vite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse, delay } from "msw";
import { userEvent, within, expect } from "storybook/test";

import { useOrderStore } from "@/entities/order";
import { SendToKitchenButton } from "./SendToKitchenButton";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

const meta: Meta<typeof SendToKitchenButton> = {
  title: "Features/KitchenOrder/SendToKitchenButton",
  component: SendToKitchenButton,
  args: {
    tableId: "1",
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={createTestQueryClient()}>
        <Story />
      </QueryClientProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof SendToKitchenButton>;

export const Default: Story = {};

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
                name: "Margherita Pizza",
                price: 10,
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
                price: 3,
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
  parameters: {
    msw: {
      handlers: [
        http.post(
          "http://localhost:3001/api/v1/orders/db39496d-c6ec-483b-b785-276bd9198e5b/items",
          async () => {
            await delay(4000);
            return HttpResponse.json({ success: true });
          },
        ),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByText(/Send to kitchen/i);

    await userEvent.click(button);

    await expect(button).toBeDisabled();
  },
};

export const WithoutItems: Story = {
  decorators: [
    (Story) => {
      useOrderStore.setState({
        currentOrder: null,
      });

      return <Story />;
    },
  ],
};
