import Image from "next/image";

const ProfileSidebar = () => {
  return (
    <section className="min-h-[420px] flex items-center relative top-[-40px] z-10 max-w-[368px]">
      <div className="flex flex-col items-center py-6 px-10 rounded-xl xl:rounded-2xl bg-lightGray relative border border-primary pb-[50px] min-h-[300px]">
        <div className="p-2 bg-white rounded-full absolute -top-20">
          <Image
            src="/assets/images/user-placeholder.jpg"
            alt="Profile"
            width={130}
            height={130}
            className="rounded-full shadow-custom"
          />
        </div>

        <section className="flex flex-col items-center gap-3 relative top-10 text-center text-gray font-[600] text-sm xl:text-[20px] ">
          <h2 className="text-primary">Rawiaa Mouktar</h2>
          <p>rawiaa@gmail.com</p>
          <p className="xl:text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </section>
      </div>
    </section>
  );
};

export default ProfileSidebar;
