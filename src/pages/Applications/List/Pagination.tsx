interface PaginationProps {
  page: number;
  totalPages?: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function Pagination(props: PaginationProps) {
  const { page, totalPages = 1, onPrev, onNext } = props;
  return (
    <div className="join w-full flex justify-center p-2">
      <button
        disabled={page === 1}
        className="join-item btn bg-base-100"
        onClick={onPrev}
      >
        «
      </button>
      <button className="join-item btn bg-base-100 cursor-default hover:bg-base-100">
        {"Page " + page}
      </button>
      <button
        className="join-item btn bg-base-100"
        disabled={totalPages === page}
        onClick={onNext}
      >
        »
      </button>
    </div>
  );
}
