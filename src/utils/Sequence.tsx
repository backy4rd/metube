interface SequenceProps {
  Component: React.FC;
  length: number;
}

export default function Sequence({ Component, length }: SequenceProps) {
  return (
    <>
      {Array(Math.floor(length))
        .fill(0)
        .map((_, i) => (
          <Component key={i} />
        ))}
    </>
  );
}
