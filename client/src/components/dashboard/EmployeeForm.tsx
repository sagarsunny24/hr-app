import {
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

import { useAppDispatch } from "../../store/hooks";
import { openForm } from "../../store/slices/formSlice";
import type { MngrDetails } from "@hr-app/shared";
import useAddEmployee from "../../hooks/useAddEmployee";
import useManagerDetails from "../../hooks/useManagerDetails";
import { useState } from "react";
export default function EmployeeForm() {
  const [managers, setManagers] = useState<MngrDetails[]>();
  const dispatch = useAppDispatch();
  // const addNewEmployee = useAddEmployee()
  const { fetchManagers } = useManagerDetails();
  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    // console.log(dept)
    // addNewEmployee({input:data})
  }
  async function fetchOnChange(e: SelectChangeEvent) {
    const emp_dept = e.target.value;
    const data: MngrDetails[] = await fetchManagers({ filter: { emp_dept,emp_role:'manager' } }) ?? [];
    console.log(data)
    if (data) setManagers(data?? []);
  }
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Box>
        <Typography>Add Employee</Typography>
        <Button onClick={() => dispatch(openForm(false))} variant="outlined">
          Close
        </Button>{" "}
      </Box>
      <Box>
        <TextField
          label="Full Name"
          name="emp_name"
          required
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Email"
          name="emp_email"
          required
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Phone"
          name="emp_phone"
          required
          variant="outlined"
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel id="emp_dept"></InputLabel>
          <Select
            name="emp_dept"
            required
            fullWidth
            onChange={fetchOnChange}
            label="Department"
            labelId="emp_dept"
            sx={{ mb: 2 }}
          >
            <MenuItem value="frontend">Frontend</MenuItem>
            <MenuItem value="backend">Backend</MenuItem>
            <MenuItem value="hr">HR</MenuItem>
            <MenuItem value="xecutive">Executive</MenuItem>
            <MenuItem value="Engineering">Engineering</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Designation"
          name="emp_designation"
          required
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Joining Date"
          name="joining_date"
          variant="outlined"
          type="date"
        />
        <FormControl fullWidth>
          <InputLabel id="emp_status"></InputLabel>
          <Select
            name="emp_status"
            required
            fullWidth
            label="Employment Status"
            labelId="emp_status"
            sx={{ mb: 2 }}
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
          variant="outlined"
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel id="emp-manager-label">Manager</InputLabel>

          <Select
            name="emp_manager_id"
            labelId="emp-manager-label"
            label="Manager"
            required
            fullWidth
            
            sx={{ mb: 2 }}
          >
            {managers?.map((manager) => (
              <MenuItem key={manager.emp_id} value={manager.emp_id}>
                {manager.emp_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box>
        <Button type="submit" variant="contained" size="large">
          Submit
        </Button>
      </Box>
    </Box>
  );
}
