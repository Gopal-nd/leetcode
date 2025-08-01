import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function TooltipHelper({message,children}:{message:string,children:React.ReactNode}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
       {children}
      </TooltipTrigger>
      <TooltipContent>
        <p>{message}</p>
      </TooltipContent>
    </Tooltip>
  )
}
