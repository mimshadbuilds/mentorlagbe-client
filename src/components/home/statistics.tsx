const statistics = [
  { value: "15,000+", label: "Active Students" },
  { value: "1,200+", label: "Vetted & Verified Tutors" },
  { value: "4,800+", label: "Batches Conducted" },
  { value: "99.2%", label: "Guardian Satisfaction" },
];

export default function Statistics() {
  return (
    <section className="w-full bg-surface-container-low py-4 sm:py-5">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-2 rounded-lg bg-surface-container-lowest px-3 py-3 shadow-sm sm:grid-cols-4 sm:px-5 sm:py-4">
          {statistics.map((statistic, index) => (
            <div
              key={statistic.label}
              className={`flex flex-col items-center justify-center px-2 py-2 text-center sm:px-4 ${
                index > 0 ? "sm:border-l sm:border-surface-container" : ""
              } ${index > 1 ? "border-t border-surface-container sm:border-t-0" : ""}`}>
              <span className="font-display text-xl leading-7 font-bold text-primary-container sm:text-2xl sm:leading-8">
                {statistic.value}
              </span>
              <span className="mt-0.5 text-[8px] leading-3 text-on-surface-variant sm:text-[9px]">
                {statistic.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
