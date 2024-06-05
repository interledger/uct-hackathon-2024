const Container = ({
  children,
  id = "",
  className = "",
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) => {
  return (
    <div id={id} className={`mx-4 mt-4 md:mx-20 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
