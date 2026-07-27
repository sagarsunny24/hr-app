import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
interface PageProps {
  count:number
}
export default function PaginationBar({count}:PageProps) {
  return (
    <Stack spacing={2}>
      <Pagination count={count} shape="rounded" />
      <Pagination count={count} variant="outlined" shape="rounded" />
    </Stack>
  );
}