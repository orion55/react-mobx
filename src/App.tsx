import { Box, Stack } from '@chakra-ui/react';
import { ListUser } from '@/components/ListUser';
import { useCallback, useEffect, useMemo } from 'react';
import { userStore } from '@/stores/userStore.ts';
import { UserFilter } from '@/components/UserFilter';

function App() {
  const store = useMemo(() => userStore, []);

  const fetchUsers = useCallback(() => {
    store.fetchUsers();
  }, [store]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <Box
      pt='150px'
      height='100vh'
      width='100%'
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='flex-start'
      paddingTop={150}
      gap={5}
    >
      <Stack gap={5} align='center' width='100%'>
        <UserFilter />
        <ListUser />
      </Stack>
    </Box>
  );
}

export default App;
