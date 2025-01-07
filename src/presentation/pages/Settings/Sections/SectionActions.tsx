import clsx from "clsx";

interface SectionActionsProps {
  name: string;
  onSubmit: () => void;
  onDiscard: () => void;
  saveDisabled?: boolean;
  discardDisabled?: boolean;
  isLoading?: boolean;
}

export default function SectionActions(props: SectionActionsProps) {
  const {
    name,
    onSubmit,
    onDiscard,
    saveDisabled = false,
    discardDisabled = false,
    isLoading = false,
  } = props;

  return (
    <div className="flex w-full justify-end p-2 gap-2">
      <button
        className={clsx("btn btn-primary btn-sm", [
          { "btn-disabled": saveDisabled },
        ])}
        onClick={onSubmit}
      >
        Save
        {isLoading && (
          <span
            aria-label={"Saving " + name + " changes, please wait"}
            className="loading loading-spinner loading-sm"
          />
        )}
      </button>
      <button
        className={clsx("btn btn-error btn-sm", [
          { "btn-disabled": discardDisabled },
        ])}
        onClick={onDiscard}
      >
        Discard
        {isLoading && (
          <span
            aria-label="Signing in, please wait"
            className="loading loading-spinner loading-sm"
          />
        )}
      </button>
    </div>
  );
}
