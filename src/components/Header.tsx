import { SquareCodeIcon } from "lucide-react";
import { Button } from "./Button";

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
          <SquareCodeIcon className="h-6 w-6" />
        </a>
      </Button>
    </header>
  );
}
