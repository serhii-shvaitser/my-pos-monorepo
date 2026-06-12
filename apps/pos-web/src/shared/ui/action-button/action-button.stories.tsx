import type { Meta, StoryObj } from "@storybook/react-vite";
import { ActionButton } from "@/shared/ui/action-button";

const meta: Meta<typeof ActionButton> = {
  title: "Shared/ActionButton",
  component: ActionButton,
  args: {
    children: "Action Button",
  },
};

export default meta;

type Story = StoryObj<typeof ActionButton>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    isPending: true,
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};
