interface SectionProps extends React.PropsWithChildren {
  title: string;
}

export default function Section(props: SectionProps) {
  const { title, children } = props;
  return (
    <div className="card border-primary border overflow-hidden grow">
      <div className="relative top-0 bg-primary rounded-b-none p-1 sm:p-2">
        <h3 className="text-base-content text-xl font-semibold">{title}</h3>
      </div>
      <div className="flex flex-col px-2 sm:px-4 pb-2">{children}</div>
    </div>
  );
}
