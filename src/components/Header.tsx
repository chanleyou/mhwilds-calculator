import Image from "next/image";
import { Button } from "./ui/Button";

export function Header() {
  return (
    <header className="bg-content flex items-center justify-between gap-2 p-3">
      <h2>MH: Wilds Damage Calculator</h2>
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
    </header>
  );
}
