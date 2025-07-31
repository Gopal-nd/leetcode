import { Skeleton } from "@/components/ui/skeleton"

export function LoadingSkeleton({w,h,n}:{w:number,h:number,n:number}) {
  return (
    <div className="flex items-center space-x-4">
        {
            Array.from({ length: n  }).map((_, index) => (
              <Skeleton key={index} className={`h-${h } w-${w}`} />
            ))
        }

      </div>
    
  )
}
