import Image from "next/image";
import text from "@/text";
import { Button } from "./ui/Button";

export function Header() {
  return (
    <header>
      <div className="bg-neutral-400 p-1 text-center text-sm text-black">
        {text.HEADER}
      </div>
      <div className="bg-content flex items-center justify-between gap-2 p-3">
        <h1>MH: Wilds Damage Calculator</h1>
        <Button asChild variant="text" className="p-0">
          <a
            href="https://github.com/chanleyou/mhwilds-calculator"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/github.svg"
              alt="GitHub"
              height={24}
              width={24}
              className="invert"
            />
          </a>
        </Button>
      </div>
    </header>
  );
}
