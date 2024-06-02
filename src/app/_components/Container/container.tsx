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
    <div id={id} className={`mx-20 my-20 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
