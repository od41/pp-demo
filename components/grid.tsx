interface RowProps {
  children: React.ReactNode;
  className?: string;
}

export const Row: React.FC<RowProps> = ({ children, className = "" }) => {
  return <div className={`flex flex-wrap ${className}`}>{children}</div>;
};

interface ColProps {
  span?: number;
  children: React.ReactNode;
  className?: string;
}

export const Col: React.FC<ColProps> = ({ span, children, className = "" }) => {
  return (
    <div
      className={`${className} overflow-x-hidden`}
      style={{
        ...(span && { flexBasis: (span / 24) * 100 + "%" }),
      }}
    >
      {children}
    </div>
  );
};
