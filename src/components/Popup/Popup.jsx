import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useLang from "../../hooks/useLang";

export default function AlertDialog({ open, setOpen, message, type, fn }) {
    const handleClose = () => {
        setOpen(false);
    };

    const isEn = useLang()

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle textTransform={"capitalize"}>
                {isEn ? "Delete" : "حذف"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ mb: 5 }}>
                <Button
                    variant="outlined"
                    sx={{ px: 20 }}
                    onClick={handleClose}
                >
                    {isEn ? "Cancel" :"الغاء"}
                </Button>
                <Button
                    variant="contained"
                    sx={{ px: 20 }}
                    onClick={() => fn()}
                    autoFocus
                    color={type === "delete" ? "error" : "primary"}
                >
                    {isEn ? "Delete" :"حذف"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
