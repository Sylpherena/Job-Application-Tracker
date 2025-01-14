import { useAuth } from "../../../providers/auth/AuthContext";
import PersonalInformation from "./Sections/PersonalInformation";
import ChangePassword from "./Sections/ChangePassword";
import GeneralSettings from "./Sections/GeneralSettings";

export default function PageContent() {
  const { user } = useAuth();

  return (
    <div className="drawer-content flex flex-col p-2 lg:p-4 gap-4">
      <h2 className="text-base-content text-2xl font-semibold">
        Account Settings
      </h2>
      <div className="flex gap-4">
        <div className="avatar placeholder">
          <div className=" flex justify-center bg-neutral text-neutral-content w-20 h-20 rounded-full">
            <span className="text-3xl">{user?.name.charAt(0)}</span>
          </div>
        </div>
        <div className="flex flex-col gap-4 grow">
          <PersonalInformation />
          <ChangePassword />
          <GeneralSettings />
        </div>
      </div>
    </div>
  );
}
