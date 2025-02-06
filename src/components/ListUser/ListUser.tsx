import { Spinner, Table, Text, VStack } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { userStore } from '@/stores/userStore.ts';
import { FiUser } from 'react-icons/fi';
import { useMemo } from 'react';

const LoadingState = () => (
  <VStack color='teal.600'>
    <Spinner />
    <Text>Loading...</Text>
  </VStack>
);

const ErrorState = observer(() =>
  userStore.error ? <Text color='red'>{userStore.error}</Text> : null,
);

const EmptyStateComponent = () => (
  <VStack textAlign='center'>
    <FiUser size={24} />
    <Text>No Data</Text>
  </VStack>
);

export const ListUser = observer(() => {
  const users = useMemo(() => userStore.filteredUsers, [userStore.filteredUsers]);

  if (userStore.loading) return <LoadingState />;
  if (userStore.error) return <ErrorState />;
  if (!users.length) return <EmptyStateComponent />;

  return (
    <Table.Root size='md' maxWidth='1024px' showColumnBorder variant='outline'>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Name</Table.ColumnHeader>
          <Table.ColumnHeader>Email</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {users.map((user) => (
          <Table.Row key={user.id}>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
});
