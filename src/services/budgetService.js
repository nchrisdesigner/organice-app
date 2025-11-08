import supabase from "./supabase";

export async function getTransactions() {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')

  if (error) {
    console.log(error)
    throw new Error('Transactions could not be loaded')
  }

  return data
}


export async function deleteTransaction(id){
  const { error } = await supabase
  .from('transactions')
  .delete()
  .eq('id', id)

  if (error) {
    console.log(error)
    throw new Error('Transaction could not be deleted')
  }

}

export async function addTransaction(newTransaction){
  
const { data, error } = await supabase
  .from('transactions')
  .insert([ newTransaction ])
  .select()

    if (error) {
    console.log(error)
    throw new Error('Transaction could not be added')
  }

  return data

}