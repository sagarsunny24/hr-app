import { Button, Typography, Box,  Breadcrumbs, Dialog } from "@mui/material";
import { useAppDispatch } from "../../store/hooks";
import { openForm } from "../../store/slices/formSlice";
import EmployeeForm from "./EmployeeForm";
import { hasPermission } from "../../permissions/auth";
import { useAppSelector } from "../../store/hooks";
import AddIcon from "@mui/icons-material/Add";
export default function TopBar() {
  const user = useAppSelector((state) => state.auth.user);
  const isOpen = useAppSelector((state) => state.form.isOpen);
  const empCount = useAppSelector((state)=>state.dashboard.totalEmps)
  const dispatch = useAppDispatch();
  function handleOpen() {
    dispatch(openForm(true));
  }
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "space-between",
        paddingBottom: 5,
      }}
    >
      <Box>

    <Typography
      variant="h4"
      sx={{
        fontWeight: 600,
        lineHeight: 1,
      }}
    >
      <Box
        component="span"
        sx={{ color: "primary.main", mr: 1 }}
      >
        {empCount}
      </Box>
      Employee
    </Typography>

    {/* Breadcrumb */}
    <Breadcrumbs
      separator="/"
      sx={{
        mt: 1,
        color: "text.secondary",
      }}
    >
      <Typography
        sx={{
          color: "primary.main",
          fontWeight: 500,
        }}
      >
        Dashboard
      </Typography>

      <Typography color="text.secondary">
        Employee
      </Typography>
    </Breadcrumbs>
  </Box>

  <Box>
    {hasPermission(user, "create:employee") && (
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleOpen}
        sx={{
          px: 3.5,
          py: 1.5,
          borderRadius: 3,
          textTransform: "none",
          fontWeight: 600,
          fontSize: "1rem",
        }}
      >
        Add Employee
      </Button>
    )}

    <Dialog open={isOpen}>
      <EmployeeForm />
    </Dialog>
  </Box>
    </Box>
  );
}
