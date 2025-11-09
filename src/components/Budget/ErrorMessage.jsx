const ErrorMessage = ({ message }) => {
  return (
    <div 
      className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm mb-4" 
      role="alert"
      aria-live="assertive"
    >
      <p className="font-medium">Error loading transactions</p>
      <p className="text-sm">{message}</p>
    </div>
  )
}

export default ErrorMessage