import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import config from "@/lib/config";
import { useUpdateProfileMutation } from "@/redux/services/website/profileApi";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setProfile } from "@/redux/slices/profileSlice";

const ProfileSidebar = () => {
  const dispatch = useDispatch();
  const { name, email_address, profile_picture, phone_number, role } =
    useSelector((state: RootState) => state.profile);
  const [updateProfile] = useUpdateProfileMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const baseUrl = config.apiUrl;

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const formData = new FormData();
      formData.append("profile_picture", e.target.files[0]);
      const response = await updateProfile(formData);

      if ("data" in response) {
        dispatch(setProfile(response.data));
      }
    }
  };

  return (
    <section
      className="top-[25px] z-10 flex flex-col items-center py-6 px-10 rounded-xl xl:rounded-2xl 
                        bg-lightGray relative border border-primary min-w-[280px]"
    >
      <div className="p-2 bg-white rounded-full absolute top-[-100px] group relative">
        <Image
          src={
            profile_picture
              ? baseUrl + profile_picture
              : "/assets/images/user-placeholder.jpg"
          }
          alt="Profile"
          width={130}
          height={130}
          className="rounded-full shadow-custom"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md"
        >
          <Image
            src="/assets/icons/dashboard/camera.svg"
            alt="Change picture"
            width={24}
            height={24}
          />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      <section className="flex flex-col items-center gap-3 relative -top-20 text-center text-gray font-[600] text-sm xl:text-[20px] ">
        <h2 className="text-primary">{name}</h2>
        <p>{email_address}</p>
        <p>{phone_number}</p>
        <p className="xl:text-sm capitalize">{role}</p>
      </section>
    </section>
  );
};

export default ProfileSidebar;
