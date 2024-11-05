"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@v1/ui/dialog";

export function Header() {
  return (
    <header className="absolute top-0 w-full flex items-center justify-between p-4 z-10">
      <span className="hidden md:block text-lg text-white font-medium font-departure">Yufugumi</span>

      <nav className="md:mt-2">
        <ul className="flex items-center gap-4">
          {/* <li>
            <a
              href="https://github.com/midday-ai/v1"
              className="text-sm hover:bg-cyan-200 transition px-4 py-2 bg-primary text-secondary rounded-full font-medium font-departure"
            >
              Get started
            </a>
          </li> */}
          <li>
            <Dialog>
              <DialogTrigger
                className="text-sm font-departure px-4 py-2 bg-secondary text-primary rounded-full font-medium hover:bg-cyan-200 transition cursor-pointer"
                asChild
              >
                <span>About</span>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="font-departure">Yufugumi</DialogTitle>
                  <DialogDescription className="font-departure">
                    In search of something meaningful
                  </DialogDescription>
                </DialogHeader>
                <p className="font-departure text-sm">Yufugumi is the creative office of Tom Hackshaw.</p>
              </DialogContent>
            </Dialog>
          </li>
        </ul>
      </nav>
    </header>
  );
}
