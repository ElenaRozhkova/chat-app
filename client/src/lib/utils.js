import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const colors = [
  "bg-[#712c4a57] text-[#ff006e] border-[1px] border-[#ff006faa]",
  "bg-[#ffd60a2a] text-[#ffd60a] border-[1px] border-[#ffd60abb]",
  "bg-[#0077b62a] text-[#0077b6] border-[1px] border-[#0077b6bb]",
  "bg-[#2a9d8f2a] text-[#2a9d8f] border-[1px] border-[#2a9d8fbb]"
]

export const getColor = (color) => {
  if (color >= 0) {
    return colors[color]
  } else return colors[0]

}