import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useAppDispatch,useAppSelector } from '../../store/hooks';
import { changePage } from '../../store/slices/dashboardSlice';
interface PageProps {
  count:number
}
export default function PaginationBar({count}:PageProps) {
  const page = useAppSelector((state)=>state.dashboard.page)
  const dispatch = useAppDispatch()
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(changePage(value));
  }
  return (
    <Stack spacing={2}>
      <Pagination count={count} page={page} variant="outlined" shape="rounded" onChange={handleChange} />
    </Stack>
  );
}