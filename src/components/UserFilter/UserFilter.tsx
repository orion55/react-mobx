import React, { useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { userStore } from '@/stores/userStore.ts';
import { Box, Input } from '@chakra-ui/react';

export const UserFilter: React.FC = observer(() => {
  const searchQuery = useMemo(() => userStore.searchQuery, [userStore.searchQuery]);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    userStore.setSearchQuery(event.target.value);
  }, []);

  return (
    <Box width='100%' maxW='1024px'>
      <Input
        type='text'
        placeholder='Поиск по имени...'
        value={searchQuery}
        onChange={handleSearchChange}
        size='md'
        aria-label='Поиск пользователей'
      />
    </Box>
  );
});
