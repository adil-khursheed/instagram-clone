import {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
} from "../features/profile/profileApiSlice";
import { useForm } from "react-hook-form";
import { Button, EditAvatar, Input, Loader } from "./index";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";

const EditProfile = () => {
  const { data: profileData, isLoading } = useGetMyProfileQuery();
  const user = useSelector(selectCurrentUser);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstName: profileData?.data?.firstName || "",
      lastName: profileData?.data?.lastName || "",
      bio: profileData?.data?.bio || "",
    },
  });

  const [updateProfile] = useUpdateProfileMutation();
  const navigate = useNavigate();

  const onProfileSubmit = async (data) => {
    try {
      await updateProfile(data).unwrap();
      navigate(`/${user.username}`);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h2 className="font-bold text-2xl">Edit Profile</h2>

          <EditAvatar profileData={profileData} />

          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onProfileSubmit)}>
            <div className="flex gap-4">
              <Input
                label={"First Name"}
                placeholder="First Name"
                {...register("firstName", { required: true })}
              />
              <Input
                label={"Last Name"}
                placeholder="Last Name"
                {...register("lastName", { required: true })}
              />
            </div>
            <div>
              <label htmlFor="profile-bio">Bio</label>
              <textarea
                id="profile-bio"
                placeholder="Write about yourself"
                className="w-full border border-gray-200 px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200"
                {...register("bio", { required: true })}></textarea>
            </div>
            <div className="flex justify-end">
              <Button type="submit">Save</Button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default EditProfile;
