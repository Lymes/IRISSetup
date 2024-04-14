import PrimaryButton from "~components/Buttons/PrimaryButton";
import useLicenseCounterHooks from "./useLicenseCounterHooks";

const LicenseCounter = () => {
  const { style, contextData } = useLicenseCounterHooks();

  return (
    <PrimaryButton
      style={style.Container}
      title={"Locked licenses: " + contextData.cloudData.length}
    ></PrimaryButton>
  );
};

export default LicenseCounter;
