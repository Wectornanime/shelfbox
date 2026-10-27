import { AlertDialog, Button, PressEvent } from "@heroui/react";

interface UserDialogConfirmProps {
  children: React.ReactNode;
  status?: "default" | "accent" | "success" | "warning" | "danger";
  header: string;
  body?: string;
  actionCancel?: {
    onPress: () => void;
    label: string;
  };
  actionConfirm: {
    onPress: (e: PressEvent) => void;
    label: string;
  };
}

export default function UserDialogConfirm({
  children,
  status = "danger",
  header,
  body,
  actionCancel,
  actionConfirm,
}: UserDialogConfirmProps) {
  return (
    <AlertDialog>
      {children}
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status={status} />
              <AlertDialog.Heading>{header}</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>{body}</p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button
                slot="close"
                variant="tertiary"
                onPress={actionCancel?.onPress}
              >
                {actionCancel ? actionCancel.label : "Cancelar"}
              </Button>
              <Button
                slot="close"
                variant={status === "danger" ? "danger" : "primary"}
                onPress={actionConfirm.onPress}
              >
                {actionConfirm.label}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
