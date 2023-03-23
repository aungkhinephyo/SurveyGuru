export const DashboardCard = ({
  title,
  className = "",
  style = "",
  children,
}) => {
  return (
    <div
      className={
        "bg-white shadow-md p-3 flex flex-col animate-fade-in-down " + className
      }
      style={style}
    >
      {title && <h2 className="text-xl font-semibold text-center">{title}</h2>}
      {children}
    </div>
  );
};
