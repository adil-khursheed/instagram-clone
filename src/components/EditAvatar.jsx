import { useState } from "react";
import { useUpdateAvatarMutation } from "../features/profile/profileApiSlice";
import { Button, Loader } from "./index";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const EditAvatar = ({ profileData }) => {
  const { register, handleSubmit } = useForm();

  const [updateAvatar, { isLoading: updateLoading }] =
    useUpdateAvatarMutation();

  const [imagePrev, setImagePrev] = useState(null);

  const onAvatarSubmit = async (data) => {
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

  return (
    <>
      <form
        onSubmit={handleSubmit(onAvatarSubmit)}
        className="flex justify-between items-center my-8">
        <div className="flex gap-10 items-center">
          <div className="w-20 h-20 rounded-full">
            {updateLoading ? (
              <Loader />
            ) : (
              <img
                src={
                  imagePrev ? imagePrev : profileData?.data?.account.avatar.url
                }
                alt=""
                className="w-full h-full object-cover object-top rounded-full"
              />
            )}
          </div>
          <div>
            <h3>{profileData?.data?.account.username}</h3>
            <label htmlFor="avatar" className="text-sm text-blue-600 underline">
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
        <Button type="submit">Save</Button>
      </form>
    </>
  );
};

export default EditAvatar;
