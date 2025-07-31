import { Loader2 } from 'lucide-react'
import React from 'react'

const Spinner = () => {
  return (
           <div className="flex justify-center items-center h-48">
          <Loader2 className="animate-spin h-8 w-8 " />
        </div>
  )
}

export default Spinner