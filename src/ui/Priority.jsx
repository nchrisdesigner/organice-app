

const Priority = ({value}) => {


  
  const color = value === 'low' 
  ? 'bg-emerald-100 text-emerald-400'
  : value === 'medium' ? 'bg-amber-100 text-amber-400'
  : 'bg-red-100 text-red-400'

    
  return (
    <span className={`text-xs rounded-full px-3 py-0.5 font-semibold ${color}`}>{value}</span>
  )
}

export default Priority