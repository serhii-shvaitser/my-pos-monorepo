export interface ActionButtonProps {
  className?: string;
  children: string;
  isButtonDisabled: boolean;
  handleSend: () => void;
  isPending: boolean;
}
