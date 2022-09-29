export const MainHeading = ({ title, children }) => {
  return (
    <section className="flex gap-8 items-end mb-8">
      <h1 className="text-4xl mt-8">{title}</h1>

      {children}
    </section>
  );
};
