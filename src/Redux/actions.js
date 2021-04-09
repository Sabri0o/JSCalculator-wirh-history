import {LOGS,DELETELOGS} from './types'
const AddLogs = (equation)=>{
  return {
    type : LOGS,
    equation : equation
  }
}

const DeleteLogs = ()=>{
  return {
    type : DELETELOGS,
  }
}

 export {AddLogs,DeleteLogs}