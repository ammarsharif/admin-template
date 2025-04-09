// material-ui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import Avatar from 'components/@extended/Avatar';
import { PopupTransition } from 'components/@extended/Transitions';

// assets
import DeleteFilled from '@ant-design/icons/DeleteFilled';

interface Props {
  open: boolean;
  title: string;
  subtitle?: string;
  action: () => Promise<void>;
  onComplete?: () => void;
  handleClose: () => void;
  actionLabel?: string;
  cancelLabel?: string;
  icon?: React.ReactNode;
}

export default function AlertDialog({
  open,
  title,
  subtitle,
  action,
  onComplete,
  handleClose,
  actionLabel = 'Confirm',
  cancelLabel = 'Cancel',
  icon = <DeleteFilled />
}: Props) {
  const handleAction = async () => {
    await action();
    if (onComplete) onComplete();
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      keepMounted
      TransitionComponent={PopupTransition}
      maxWidth="xs"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent sx={{ mt: 2, my: 1 }}>
        <Stack alignItems="center" spacing={3.5}>
          <Avatar color="error" sx={{ width: 72, height: 72, fontSize: '1.75rem' }}>
            {icon}
          </Avatar>
          <Stack spacing={2}>
            <Typography variant="h4" align="center">
              {title}
            </Typography>
            {subtitle && <Typography align="center">{subtitle}</Typography>}
          </Stack>

          <Stack direction="row" spacing={2} sx={{ width: 1 }}>
            <Button fullWidth onClick={handleClose} color="secondary" variant="outlined">
              {cancelLabel}
            </Button>
            <Button fullWidth color="error" variant="contained" onClick={handleAction} autoFocus>
              {actionLabel}
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
