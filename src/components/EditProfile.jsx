import { useState } from "react";
import {
  useGetMyProfileQuery,
  useUpdateAvatarMutation,
} from "../features/profile/profileSlice";
import { useForm } from "react-hook-form";
import { Button, Loader } from "./index";
import { toast } from "react-toastify";

const EditProfile = () => {
  const { register, handleSubmit } = useForm();
  const { data, isLoading } = useGetMyProfileQuery();
  const [updateAvatar, { isLoading: updateLoading }] =
    useUpdateAvatarMutation();

  const [imagePrev, setImagePrev] = useState(null);

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("avatar", data.avatar[0]);

    try {
      const userData = await updateAvatar(formData).unwrap();
      localStorage.setItem(
        "userData",
        JSON.stringify({ ...userData.data, avatar: userData.data.avatar })
      );
      toast.success("Profile photo updated successfully!");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  if (updateLoading) {
    return <Loader />;
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h2 className="font-bold text-2xl">Edit Profile</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex justify-between items-center my-8">
            <div className="flex gap-10 items-center">
              <div className="w-20 h-20 rounded-full">
                <img
                  src={imagePrev ? imagePrev : data.data.account.avatar.url}
                  alt=""
                  className="w-full h-full object-cover object-top rounded-full"
                />
              </div>
              <div>
                <h3>{data.data.account.username}</h3>
                <label
                  htmlFor="avatar"
                  className="text-sm text-blue-600 underline">
                  <input
                    type="file"
                    id="avatar"
                    className="hidden"
                    accept="image/png, image/jpg, image/jpeg"
                    {...register("avatar", {
                      required: "Avatar image is required",
                      onChange: (e) =>
                        setImagePrev(URL.createObjectURL(e.target.files[0])),
                    })}
                  />
                  Change profile photo
                </label>
              </div>
            </div>
            <Button>Save</Button>
          </form>
        </>
      )}
    </>
  );
};

export default EditProfile;
