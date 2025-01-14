import ThemeSelector from "../../../components/Layout/ThemeSelector";
import Section from "./Section";

export default function GeneralSettings() {
  return (
    <Section title="General Settings">
      <div className="p-2">
        <label className={"flex justify-between grow"}>
          <div className="label font-semibold">
            <span className="label-text">Change Theme</span>
          </div>
          <ThemeSelector />
        </label>
      </div>
    </Section>
  );
}
