type SkeletonProps = {
  className?: string;
};

const Skeleton = ({ className = "" }: SkeletonProps) => {
  return (
    <div
      aria-hidden="true"
      className={`skeleton ${className}`}
    />
  );
};

export default Skeleton;