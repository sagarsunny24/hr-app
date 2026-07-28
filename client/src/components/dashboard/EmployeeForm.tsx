import {
  Avatar,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";

import { toast, Bounce } from "react-toastify";
import { useAppDispatch } from "../../store/hooks";
import {
  openForm,
  storeInfo,
  empCredentials,
} from "../../store/slices/formSlice";
import type { EmployeeDetails, MngrDetails } from "@hr-app/shared";
import useAddEmployee from "../../hooks/useAddEmployee";
import useManagerDetails from "../../hooks/useManagerDetails";
import { useRef, useState } from "react";
import { uploadImage } from "../../supabase/uploadImage";
export default function EmployeeForm() {
  const [managers, setManagers] = useState<MngrDetails[]>();
  const [profileImg, setProfileImg] = useState<File | null>(null);
  const publicUrl = useRef<string | null>(null);
  const dispatch = useAppDispatch();
  const addNewEmployee = useAddEmployee();
  const { fetchManagers } = useManagerDetails();

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    setProfileImg(e.target.files[0]);
  }
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());
      console.log(data);
      if (profileImg) {
        publicUrl.current = await uploadImage(profileImg);
      }
      const manager = data.emp_manager_id === "" ? null : data.emp_manager_id;
      console.log(publicUrl.current);
      const input = {
        ...data,
        emp_manager_id: manager,
        profile_image_path: publicUrl.current,
      } as EmployeeDetails;
      console.log("input:", input);
      const res = await addNewEmployee({ input });
      dispatch(
        storeInfo({
          email: res.addEmployee?.email,
          pswrd: res.addEmployee?.temp_pswrd,
        }),
      );
      dispatch(empCredentials(true));
      console.log(res.addEmployee?.email);
      console.log(res.addEmployee?.temp_pswrd);
      if (res?.addEmployee?.message) {
        toast.success(res.addEmployee.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
      dispatch(openForm(false));
    } catch (err) {
      toast.error(`Error ${err} occured`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }
  async function fetchOnChange(e: SelectChangeEvent) {
    const emp_dept = e.target.value;
    const data: MngrDetails[] =
      (await fetchManagers({ filter: { emp_dept, emp_role: "manager" } })) ??
      [];
    // console.log(data);
    if (data) setManagers(data ?? []);
  }
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width:600,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: 22,
            fontWeight: 600,
          }}
        >
          Add Employee
        </Typography>

        <Button
          onClick={() => dispatch(openForm(false))}
          variant="outlined"
          sx={{
            textTransform: "none",
          }}
        >
          Close
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          label="Full Name"
          name="emp_name"
          required
          fullWidth
        />

        <TextField
          label="Email"
          name="emp_email"
          required
          fullWidth
        />

        <TextField
          label="Phone"
          name="emp_phone"
          required
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel>Department</InputLabel>
          <Select
            name="emp_dept"
            required
            onChange={fetchOnChange}
            label="Department"
          >
            <MenuItem value="frontend">Frontend</MenuItem>
            <MenuItem value="backend">Backend</MenuItem>
            <MenuItem value="hr">Human Resources</MenuItem>
            <MenuItem value="xecutive">Executive</MenuItem>
            <MenuItem value="Engineering">
              Engineering
            </MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Employee Type</InputLabel>
          <Select
            name="emp_role"
            required
            label="Employee Type"
          >
            <MenuItem value="hr">HR</MenuItem>
            <MenuItem value="manager">Manager</MenuItem>
            <MenuItem value="employee">Employee</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Designation"
          name="emp_designation"
          required
          fullWidth
        />

        <TextField
          label="Joining Date"
          name="emp_joining_date"
          type="date"
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
        />

        <FormControl fullWidth>
          <InputLabel>Employment Status</InputLabel>
          <Select
            name="emp_status"
            required
            label="Employment Status"
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="probation">Probation</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Address"
          name="emp_address"
          required
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel>Manager</InputLabel>
          <Select
            name="emp_manager_id"
            label="Manager"
          >
            <MenuItem value="">
              No Manager
            </MenuItem>

            {managers?.map((manager) => (
              <MenuItem
                key={manager.emp_id}
                value={manager.emp_id}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Avatar
                    src={`${manager.profile_image_path}`}
                    sx={{
                      width: 32,
                      height: 32,
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: 14,
                    }}
                  >
                    {manager.emp_name}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          component="label"
          sx={{
            textTransform: "none",
            justifyContent: "flex-start",
          }}
        >
          Upload Image
          <input
            hidden
            type="file"
            name="profile_image_path"
            onChange={handleImageChange}
          />
        </Button>
      </Box>

      <Button
        type="submit"
        variant="contained"
        size="large"
        sx={{
          textTransform: "none",
          fontSize: 15,
          fontWeight: 600,
        }}
      >
        Submit
      </Button>
    </Box>
  );
}