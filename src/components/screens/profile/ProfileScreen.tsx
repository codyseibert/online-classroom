import { User } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { HeaderLayout } from '../../../layouts/HeaderLayout';
import { trpc } from '../../../utils/trpc';
import { Button } from '../../common/Button/Button';
import { FormGroup } from '../../common/Form/FormGroup/FormGroup';
import { MainHeading } from '../../common/MainHeading';

export const ProfileScreen = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const updateDisplayName = trpc.useMutation('user.updateDisplayName');

  trpc.useQuery(['user.getUser'], {
    onSuccess(userData: User) {
      setValue('displayName', userData.displayName ?? userData?.name);
    },
  });

  const queryClient = trpc.useContext();

  const handleProfileSubmit = async (data) => {
    await updateDisplayName.mutateAsync({
      displayName: data.displayName,
    });
    queryClient.invalidateQueries(['user.getUser']);
  };

  return (
    <HeaderLayout>
      <MainHeading title="Your Profile" />

      <h2 className="text-2xl mb-4">Settings</h2>

      <form
        onSubmit={handleSubmit(handleProfileSubmit)}
        className="w-1/3"
      >
        <FormGroup
          label="Display Name"
          error={errors.displayName && 'Display name is required'}
          name="displayName"
        >
          <>
            <input
              id="displayName"
              className="mb-2"
              {...register('displayName', { required: true })}
            />
            <Button
              isLoading={updateDisplayName.isLoading}
              className="self-end"
            >
              Update
            </Button>
          </>
        </FormGroup>
      </form>
    </HeaderLayout>
  );
};
