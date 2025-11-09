const SummaryCard = ({ title, amount, icon, colorClass, showSign = '' }) => {
  return (
    <article className="border border-neutral-400 rounded-sm p-4 flex flex-col gap-4 bg-gray-50">
      <h2 className="font-regular text-base">{title}</h2>
      <div className="flex justify-between items-center">
        <div aria-hidden="true">{icon}</div>
        <p 
          className={`text-xl font-medium ${colorClass}`}
          aria-label={`${title}: ${showSign}${amount.toFixed(2)} euros`}
        >
          {showSign}{amount.toFixed(2)}€
        </p>
      </div>
    </article>
  )
}

export default SummaryCard